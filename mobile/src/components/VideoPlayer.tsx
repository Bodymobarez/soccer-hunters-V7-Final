import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';

interface VideoPlayerProps {
  source: { uri: string };
  poster?: string;
  title?: string;
  onEnd?: () => void;
  onError?: (error: any) => void;
  style?: any;
  controls?: boolean;
  autoplay?: boolean;
  repeat?: boolean;
}

const { width } = Dimensions.get('window');

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source,
  poster,
  title,
  onEnd,
  onError,
  style,
  controls = true,
  autoplay = false,
  repeat = false,
}) => {
  const theme = useTheme();
  const videoRef = useRef<Video>(null);
  
  const [isPaused, setIsPaused] = useState(!autoplay);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(controls);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // إخفاء أدوات التحكم بعد فترة زمنية
    if (showControls && !isPaused) {
      hideControlsAfterDelay();
    }
    
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isPaused]);
  
  const hideControlsAfterDelay = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };
  
  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };
  
  const toggleControls = () => {
    setShowControls(!showControls);
    if (!showControls) {
      hideControlsAfterDelay();
    }
  };
  
  const handleProgress = (data: { currentTime: number }) => {
    setCurrentTime(data.currentTime);
  };
  
  const handleLoad = (data: { duration: number }) => {
    setDuration(data.duration);
    setIsLoading(false);
  };
  
  const handleVideoError = (error: any) => {
    setIsError(true);
    setErrorMessage('Error loading video');
    setIsLoading(false);
    if (onError) {
      onError(error);
    }
  };
  
  const onSeek = (value: number) => {
    if (videoRef.current) {
      videoRef.current.seek(value);
    }
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const handleFullscreen = () => {
    // للتنفيذ لاحقًا مع مكتبة للتعامل مع الشاشة الكاملة
  };
  
  return (
    <View style={[styles.container, style]}>
      {title && (
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      )}
      
      <TouchableOpacity activeOpacity={0.9} onPress={toggleControls} style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={source}
          style={styles.video}
          poster={poster}
          posterResizeMode="cover"
          resizeMode="contain"
          paused={isPaused}
          onLoad={handleLoad}
          onProgress={handleProgress}
          onEnd={onEnd}
          onError={handleVideoError}
          repeat={repeat}
        />
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
        
        {isError && (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle" size={40} color="white" />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
        
        {showControls && !isError && (
          <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
              <Icon 
                name={isPaused ? "play" : "pause"} 
                size={30} 
                color="white" 
              />
            </TouchableOpacity>
            
            <View style={styles.progressContainer}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Slider
                style={styles.progressBar}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                onSlidingComplete={onSeek}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
                thumbTintColor={theme.colors.primary}
              />
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
            
            <TouchableOpacity style={styles.fullscreenButton} onPress={handleFullscreen}>
              <Icon name="fullscreen" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoContainer: {
    position: 'relative',
    aspectRatio: 16 / 9,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  errorText: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    marginHorizontal: 8,
  },
  timeText: {
    color: 'white',
    fontSize: 12,
  },
  fullscreenButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default VideoPlayer;