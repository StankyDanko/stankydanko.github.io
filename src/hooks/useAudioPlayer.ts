import { useState, useRef, useEffect, useCallback } from 'react'
import { tracks, type Track } from '../data/tracks'

export interface AudioPlayerState {
  currentTrack: Track
  isPlaying: boolean
  currentTime: number
  duration: number
  trackIndex: number
}

export interface AudioPlayerControls {
  play: () => void
  pause: () => void
  togglePlay: () => void
  next: () => void
  previous: () => void
  seekTo: (time: number) => void
  playTrack: (index: number) => void
}

export function useAudioPlayer(): AudioPlayerState & AudioPlayerControls {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Keep ref in sync with state
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'
    audioRef.current = audio

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onDurationChange = () => setDuration(audio.duration || 0)
    const onEnded = () => {
      setTrackIndex((prev) => {
        const next = prev + 1
        return next < tracks.length ? next : 0
      })
    }
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Load track when index changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const wasPlaying = isPlayingRef.current

    // Reset time/duration via audio element — timeupdate/durationchange handlers will sync state
    audio.src = tracks[trackIndex].file
    audio.currentTime = 0
    audio.load()

    if (wasPlaying) {
      audio.play().catch(() => {
        // Browser may block autoplay
      })
    }
  }, [trackIndex])

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => setIsPlaying(false))
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  const next = useCallback(() => {
    setTrackIndex((prev) => (prev + 1) % tracks.length)
  }, [])

  const previous = useCallback(() => {
    const audio = audioRef.current
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }
    setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
  }, [])

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const playTrack = useCallback((index: number) => {
    if (index >= 0 && index < tracks.length) {
      setTrackIndex(index)
      const audio = audioRef.current
      if (audio) {
        const onCanPlay = () => {
          audio.play().catch(() => setIsPlaying(false))
          audio.removeEventListener('canplay', onCanPlay)
        }
        audio.addEventListener('canplay', onCanPlay)
      }
    }
  }, [])

  return {
    currentTrack: tracks[trackIndex],
    isPlaying,
    currentTime,
    duration,
    trackIndex,
    play,
    pause,
    togglePlay,
    next,
    previous,
    seekTo,
    playTrack,
  }
}
