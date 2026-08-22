import { useState, useEffect } from "react";
import { usePulsePlayer } from "./PulsePlayerContext";

const TRACK_ID_REGEX = /track\/([a-zA-Z0-9]+)/;
const metadataCache = new Map();

function parseSpotifyTitle(fullTitle) {
  if (!fullTitle) return { title: "Unknown Track", artist: "Spotify" };
  const parts = fullTitle.split(" - ");
  if (parts.length >= 2) {
    return {
      title: parts.slice(0, parts.length - 1).join(" - "),
      artist: parts[parts.length - 1],
    };
  }
  return { title: fullTitle, artist: "Spotify" };
}

export default function PulsePreviewCard({ spotifyUrl, title, artist, categoryIndex, songIndex }) {
  const [metadata, setMetadata] = useState(null);
  const [metadataLoading, setMetadataLoading] = useState(true);
  const [metadataError, setMetadataError] = useState(false);

  const { activeCategoryIndex, currentSongIndex, isPlaying, playSong } = usePulsePlayer();
  const isCurrentPlaying = activeCategoryIndex === categoryIndex && currentSongIndex === songIndex && isPlaying;

  useEffect(() => {
    if (!spotifyUrl) {
      setMetadataError(true);
      setMetadataLoading(false);
      return;
    }

    const match = spotifyUrl.match(TRACK_ID_REGEX);
    if (!match) {
      setMetadataError(true);
      setMetadataLoading(false);
      return;
    }

    const id = match[1];

    if (metadataCache.has(id)) {
      setMetadata(metadataCache.get(id));
      setMetadataLoading(false);
      return;
    }

    let cancelled = false;

    const fetchMetadata = async () => {
      try {
        const response = await fetch(
          `https://open.spotify.com/oembed?url=${encodeURIComponent(`https://open.spotify.com/track/${id}`)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        metadataCache.set(id, data);

        if (!cancelled) {
          setMetadata(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Spotify metadata fetch failed:", err);
          setMetadataError(true);
        }
      } finally {
        if (!cancelled) {
          setMetadataLoading(false);
        }
      }
    };

    fetchMetadata();

    return () => {
      cancelled = true;
    };
  }, [spotifyUrl]);

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    playSong(categoryIndex, songIndex);
  };

  const parsed = parseSpotifyTitle(metadata?.title);
  const displayTitle = title || parsed.title;
  const displayArtist = artist || parsed.artist;
  const artworkUrl = metadata?.thumbnail_url || null;

  return (
    <div className={`pulse-card ${isCurrentPlaying ? "pulse-card--playing" : ""}`}>
      <div className="pulse-card-artwork">
        {artworkUrl ? (
          <img
            src={artworkUrl}
            alt={displayTitle}
            className="pulse-card-artwork-img"
            loading="lazy"
          />
        ) : (
          <div className="pulse-card-artwork-placeholder">
            {metadataLoading ? (
              <div className="pulse-card-spinner" />
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            )}
          </div>
        )}

        <button
          className="pulse-card-play-button"
          onClick={handlePlayClick}
          aria-label={isCurrentPlaying ? `Pause ${displayTitle}` : `Play ${displayTitle}`}
          type="button"
        >
          {isCurrentPlaying ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {isCurrentPlaying && (
          <div className="pulse-card-playing-indicator">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>

      <div className="pulse-card-info">
        <div className="pulse-card-title">{displayTitle}</div>
        <div className="pulse-card-artist">{displayArtist}</div>
      </div>
    </div>
  );
}
