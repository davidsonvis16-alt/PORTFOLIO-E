import { useEffect, useRef } from "react";

const activeTrackId = { current: null };
const iframeRefs = new Map();

function sendSpotifyCommand(iframe, method, params) {
  if (!iframe?.contentWindow) return;
  try {
    const payload = params
      ? JSON.stringify({ method, params })
      : JSON.stringify({ method });
    iframe.contentWindow.postMessage(payload, "https://open.spotify.com");
  } catch {
    // ignore
  }
}

export default function SpotifyCard({ song }) {
  const iframeRef = useRef(null);
  const trackId = song.spotify.match(/track\/([a-zA-Z0-9]+)/)?.[1] || null;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !trackId) return;

    iframeRefs.set(trackId, iframe);

    const handleMessage = (event) => {
      if (event.origin !== "https://open.spotify.com") return;

      try {
        const message = JSON.parse(event.data);

        if (message.event === "ready") {
          sendSpotifyCommand(iframe, "subscribe", ["player_state_changed"]);
        }

        if (message.event === "player_state_changed") {
          const isPlaying = message.data?.isPlaying;

          if (isPlaying) {
            for (const [id, otherIframe] of iframeRefs) {
              if (id !== trackId && otherIframe !== iframe) {
                sendSpotifyCommand(otherIframe, "pause");
              }
            }
            activeTrackId.current = trackId;
          } else if (activeTrackId.current === trackId) {
            activeTrackId.current = null;
          }
        }
      } catch {
        // ignore non-JSON or unexpected messages
      }
    };

    window.addEventListener("message", handleMessage);

    const fallbackTimer = setTimeout(() => {
      sendSpotifyCommand(iframe, "subscribe", ["player_state_changed"]);
    }, 800);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(fallbackTimer);
      iframeRefs.delete(trackId);
      if (activeTrackId.current === trackId) {
        activeTrackId.current = null;
      }
    };
  }, [trackId]);

  return (
    <div className="pulse-card">
      <div className="pulse-card-artwork">
        {trackId ? (
          <iframe
            ref={iframeRef}
            src={`https://open.spotify.com/embed/track/${trackId}`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={`${song.title} by ${song.artist}`}
            className="pulse-spotify-iframe"
          />
        ) : (
          <div className="pulse-card-artwork-placeholder">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
        )}
      </div>
      <a
        href={song.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="pulse-card-info"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="pulse-card-title">{song.title}</div>
        <div className="pulse-card-artist">{song.artist}</div>
      </a>
    </div>
  );
}
