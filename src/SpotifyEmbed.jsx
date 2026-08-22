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

export default function SpotifyEmbed({ trackId, title, artist }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

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
    <iframe
      ref={iframeRef}
      src={`https://open.spotify.com/embed/track/${trackId}`}
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title={`${title} by ${artist}`}
      className="pulse-spotify-iframe"
    />
  );
}
