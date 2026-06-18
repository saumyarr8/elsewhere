"use client";

import { useState, useRef, useEffect } from 'react';

const playlist = [
  {
    title: 'Angel',
    artist: 'Massive Attack',
    src: '/audio/Massive Attack - Angel - MassiveAttackVEVO.mp3'
  },
  {
    title: 'The Spoils ft. Hope Sandoval',
    artist: 'Massive Attack',
    src: '/audio/Massive Attack - The Spoils ft. Hope Sandoval - MassiveAttackVEVO.mp3'
  },
  {
    title: 'Boiler Room NYC Live Set',
    artist: 'DARKSIDE',
    src: '/audio/DARKSIDE Boiler Room NYC Live Set - ALBEGX.mp3'
  }
];

export default function MusicPlayer({ style }: { style?: React.CSSProperties }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false); // Added toggle state
  // We use a state to ensure hydration matches server
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // When track index changes, we need to make sure the audio element loads the new src and plays if it was already playing.
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => console.error("Audio playback interrupted or failed:", error));
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback interrupted or failed:", error);
        });
      }
    } else {
      audioRef.current.pause();
    }
  };

  const handleEnded = () => {
    // Go to next track, or loop back to first
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const currentTrack = playlist[currentTrackIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', ...style }}>
      <button 
        onClick={togglePlay}
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 4, 
          alignItems: 'center', 
          width: 183, 
          cursor: 'pointer', 
          background: 'none', 
          border: 'none'
        }}
      >
        <audio 
          ref={audioRef} 
          src={currentTrack.src}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleEnded}
        />
        
        <div style={{ height: 118, position: 'relative', width: 160 }}>
          <div style={{ position: 'absolute', height: 117.958, left: 14.52, top: -0.14, width: 119.266, overflow: 'hidden' }}>
            <img 
              alt="" 
              style={{ 
                position: 'absolute', 
                height: '124.3%', 
                left: '-11.12%', 
                maxWidth: 'none', 
                top: '-12.15%', 
                width: '122.94%',
                transition: 'transform 0.5s ease',
              }} 
              className={isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}
              src="/images/vinyl-record.png" 
            />
          </div>
          <div style={{ position: 'absolute', height: 10.953, left: 'calc(50% - 5.85px)', top: 54.4, width: 88.613 }}>
            <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/icons/vinyl-controls.svg" />
          </div>
        </div>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: '#1c1c1c', display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', width: '100%', whiteSpace: 'nowrap', fontWeight: 400 }}>
          <p style={{ textTransform: 'uppercase', margin: 0, maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {mounted ? currentTrack.title : 'Angel'}
          </p>
          <p style={{ margin: 0, maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {mounted ? currentTrack.artist : 'Massive Attack'}
          </p>
        </div>
      </button>

      {/* Playlist Menu Toggle */}
      {mounted && (
        <div style={{ width: '100%', maxWidth: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => setShowPlaylist(!showPlaylist)}
            style={{
              background: 'none',
              border: '1px solid #eaeaea',
              borderRadius: '20px',
              padding: '6px 12px',
              fontSize: '10px',
              fontFamily: 'Montserrat, sans-serif',
              textTransform: 'uppercase',
              cursor: 'pointer',
              color: '#848484',
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#f9f9f9'}
            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
          >
            {showPlaylist ? 'Hide Playlist ▲' : 'Show Playlist ▼'}
          </button>

          {/* Actual Playlist */}
          {showPlaylist && (
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0, 
              width: '100%', 
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {playlist.map((track, index) => {
                const isActive = index === currentTrackIndex;
                return (
                  <li key={index} style={{ width: '100%' }}>
                    <button
                      onClick={() => {
                        setCurrentTrackIndex(index);
                        if (!isPlaying) {
                          // Trigger play when a track is manually selected if it was paused
                          setTimeout(() => {
                            if (audioRef.current && audioRef.current.paused) {
                              audioRef.current.play().catch(console.error);
                            }
                          }, 0);
                        }
                        // Optionally auto-hide the playlist after picking a song:
                        // setShowPlaylist(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: isActive ? '#f0f0f0' : 'transparent',
                        border: '1px solid #eaeaea',
                        borderRadius: '4px',
                        padding: '8px',
                        cursor: 'pointer',
                        fontFamily: 'Montserrat, sans-serif',
                        transition: 'background 0.2s ease',
                      }}
                    >
                      <p style={{ fontSize: '12px', fontWeight: isActive ? 600 : 400, margin: 0, color: '#1c1c1c', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {track.title}
                      </p>
                      <p style={{ fontSize: '10px', margin: 0, color: '#848484', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {track.artist}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

