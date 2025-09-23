// SpotifyPlayer.jsx
import React, { useState, useEffect, useRef } from "react";
import "./SpotifyPlayer.css";

let globalPlayer = null; // reuse single player across pages

const SpotifyPlayer = ({ token, trackUri }) => {
  const playerRef = useRef(globalPlayer);
  const [deviceId, setDeviceId] = useState(globalPlayer ? globalPlayer.deviceId : null);
  const [isPaused, setIsPaused] = useState(true);
  const [isReady, setIsReady] = useState(!!globalPlayer);

  // 1️⃣ Ensure global stub exists to prevent AnthemError
  useEffect(() => {
    if (!window.onSpotifyWebPlaybackSDKReady) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("Spotify SDK loaded (stub callback)");
      };
    }
  }, []);

  // 2️⃣ Initialize player once when token is available
  useEffect(() => {
    if (!token || playerRef.current) return;

    const loadSpotifySDK = () =>
      new Promise((resolve) => {
        if (window.Spotify) return resolve();
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        script.onload = () => {
          console.log("Spotify SDK script loaded dynamically");
          resolve();
        };
        document.body.appendChild(script);
      });

    const initPlayer = async () => {
      await loadSpotifySDK();

      const player = new window.Spotify.Player({
        name: "My Web Player",
        getOAuthToken: (cb) => cb(token),
        volume: 0.5,
      });

      playerRef.current = player;
      globalPlayer = player;

      // Connect player
      const connected = await player.connect();
      console.log("Player connected?", connected);

      // Player state change
      player.addListener("player_state_changed", (state) => {
        if (!state) return;
        setIsPaused(state.paused);
      });

      // Ready
      player.addListener("ready", async ({ device_id }) => {
        console.log("Player ready with device ID:", device_id);
        setDeviceId(device_id);
        setIsReady(true);
        playerRef.current.deviceId = device_id;

        try {
          await fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            body: JSON.stringify({ device_ids: [device_id], play: false }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Playback transferred to web player");
        } catch (err) {
          console.error("Error transferring playback:", err);
        }
      });

      // Errors
      ["initialization_error", "authentication_error", "account_error", "playback_error"].forEach(
        (event) => {
          player.addListener(event, ({ message }) => console.error(`${event}:`, message));
        }
      );
    };

    initPlayer();
  }, [token]);

  // 3️⃣ Toggle play/pause manually (no auto-play)
  const togglePlay = async () => {
    if (!playerRef.current || !deviceId) return;

    try {
      if (isPaused) {
        await fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
          {
            method: "PUT",
            body: JSON.stringify({ uris: [trackUri] }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsPaused(false);
      } else {
        await playerRef.current.pause();
        setIsPaused(true);
      }
    } catch (err) {
      console.error("Error toggling playback:", err);
    }
  };

  return (
    <div style={{  padding: "10px", borderRadius: "8px", width: "300px" }}>
      <button className="playButton" onClick={togglePlay} disabled={!isReady}>
        {isPaused ? "Play" : "Pause"}
      </button>
      { /* border: "1px solid #ccc", <div style={{ marginTop: "5px", fontSize: "12px", color: "#555" }}>
        Device ID: {deviceId || "Not ready"}
      </div> */ }
    </div>
  );
};

export default SpotifyPlayer;
