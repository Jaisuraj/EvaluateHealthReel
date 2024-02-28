import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useRoute} from '@react-navigation/native';
import Slider from '@react-native-community/slider';

const colors = {
  transparent: 'transparent',
  white: '#fff',
  heartColor: '#e92f3c',
  textPrimary: '#515151',
  black: '#000',
  blue: '#00f', // Blue color for verified badge
};
const {width, height} = Dimensions.get('window');

const ReelsPage = () => {
  const route = useRoute();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const {videoUrl, user} = route.params;
  const videoRef = useRef(null);
  const currentVideoRef = useRef(null); // Ref for the currently playing video

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
      setIsPlaying(!isPlaying); // Toggle the isPlaying state
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleOnPressLike = () => {
    setLiked(!liked);
  };

  const handleOnPressBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const onSliderValueChange = value => {
    setVideoProgress(value);
  };

  const onSliderSlidingComplete = value => {
    const newPosition = value * videoDuration;
    videoRef.current.seek(newPosition);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.videoContainer} onPress={togglePlayPause}>
        <Video
          ref={videoRef}
          source={{uri: videoUrl}}
          style={styles.video}
          resizeMode="cover"
          paused={!isPlaying} // Start with paused state
          muted={isMuted}
          onProgress={data =>
            setVideoProgress(data.currentTime / data.seekableDuration)
          }
          onLoad={data => setVideoDuration(data.duration)}
        />
        <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
          <MaterialIcons
            name={isMuted ? 'volume-off' : 'volume-up'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}>
            <Image source={user.photo} style={styles.userPhoto} />
            <Text style={styles.userName}>{user.name}</Text>
            {user.verified && (
              <Icon name="checkcircle" size={12} color={colors.blue} />
            )}
          </View>
          <Text style={styles.userTagline}>{user.tagline}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.videoControls}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={videoProgress}
          onValueChange={onSliderValueChange}
          onSlidingComplete={onSliderSlidingComplete}
          minimumTrackTintColor="#FFF"
          maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
          thumbTintColor="#FFF"
        />
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity activeOpacity={1} onPress={handleOnPressLike}>
          <Icon
            name={liked ? 'heart' : 'hearto'}
            color={liked ? '#e92f3c' : 'white'}
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
        <MaterialIcons
          name="comment"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Icon1 name="send" size={24} color="white" style={styles.icon} />
        <TouchableOpacity activeOpacity={1} onPress={handleOnPressBookmark}>
          <Icon1
            name={bookmarked ? 'bookmark' : 'bookmark-o'}
            color={bookmarked ? '#e92f3c' : 'white'}
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    height: height - 100, // 90% of screen height
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    paddingBottom: 30,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  icon: {
    marginBottom: 10,
  },
  muteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
  },
  userInfoContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    flexDirection: 'column',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  userName: {
    fontSize: 12,
    color: 'white',
    marginRight: 5,
  },
  userTagline: {
    fontSize: 10,
    color: 'white',
  },
  videoControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  slider: {
    width: '50%',
    height: 40,
  },
});

export default ReelsPage;
