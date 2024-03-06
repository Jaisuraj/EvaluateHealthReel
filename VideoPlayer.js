// VideoPlayer.js
import React, {useRef, useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles, colors} from './sharedData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import {useNavigation, useIsFocused} from '@react-navigation/native';

const VideoPlayer = ({videoUrl, playing, setPlaying, card}) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (videoRef.current) {
      if (setPlaying) {
        videoRef.current.seek(0);
      }
    }
  }, [setPlaying]);
  const handleVideoPress = videoUrl => {
    navigation.navigate('MultiReels', {
      videoUrl: videoUrl,
      user: card,
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        source={{uri: videoUrl}}
        style={styles.video}
        resizeMode="contain"
        paused={!setPlaying}
        muted={isMuted}
        onPress={handleVideoPress}
      />
      <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
        <MaterialIcons
          name={isMuted ? 'volume-off' : 'volume-up'}
          size={24}
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayer;
