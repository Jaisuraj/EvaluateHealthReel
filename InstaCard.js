import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const colors = {
  transparent: 'transparent',
  white: '#fff',
  heartColor: '#e92f3c',
  textPrimary: '#515151',
  black: '#000',
  blue: '#00f',
};

const InstaCard = ({card}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Add isPlaying state
  const smallAnimatedHeartIconRef = useRef(null);
  const smallAnimatedBookmarkIconRef = useRef(null);
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const scrollViewRef = useRef(null);
  const videoRefs = useRef([]);

  const handleOnPressLike = () => {
    animateIcon(smallAnimatedHeartIconRef, 'heart');
  };

  const handleOnPressBookmark = () => {
    animateIcon(smallAnimatedBookmarkIconRef, 'bookmark');
  };

  const animateIcon = (iconRef, iconName) => {
    iconRef.current.stopAnimation();
    iconRef.current
      .bounceIn()
      .then(() => iconRef.current.bounceOut())
      .then(() =>
        iconName === 'heart' ? setLiked(!liked) : setBookmarked(!bookmarked),
      );
  };

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setIsPlaying(false); // Pause video on scroll
  };

  const handleVideoPress = videoUrl => {
    navigation.navigate('ReelsPage', {videoUrl: videoUrl, user: card});
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={card.photo} style={styles.userPhoto} />
        <View style={styles.userInfo}>
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{card.name}</Text>
            {card.verified && (
              <Image source={card.verifiedIcon} style={styles.verifiedIcon} />
            )}
          </View>
          <Text style={styles.userTagline}>{card.tagline}</Text>
        </View>
      </View>

      {/* Video slider */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={200}>
        {card.videos.map((videoUrl, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            style={styles.card}
            onPress={() => handleVideoPress(videoUrl)}>
            {videoUrl.endsWith('.mp4') ? (
              <VideoPlayer
                videoUrl={videoUrl}
                index={index}
                videoRefs={videoRefs}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying} // Pass setIsPlaying
              />
            ) : (
              <Image
                source={{uri: videoUrl}}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity activeOpacity={1} onPress={handleOnPressLike}>
            <Animatable.View
              ref={smallAnimatedHeartIconRef}
              style={styles.icon}
              duration={300}
              delay={200}>
              <Icon
                name={liked ? 'heart' : 'hearto'}
                color={liked ? colors.heartColor : colors.white}
                size={24}
              />
            </Animatable.View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}>
            <MaterialIcons
              name="comment"
              size={24}
              color={colors.white}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}>
            <Icon1
              name="send"
              size={24}
              color={colors.white}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={1} onPress={handleOnPressBookmark}>
          <Animatable.View
            ref={smallAnimatedBookmarkIconRef}
            style={styles.icon}
            duration={300}
            delay={200}>
            <Icon1
              name={bookmarked ? 'bookmark' : 'bookmark-o'}
              color={bookmarked ? colors.heartColor : colors.white}
              size={24}
            />
          </Animatable.View>
        </TouchableOpacity>
      </View>
      <View style={styles.photoDescriptionContainer}>
        <Text style={styles.name}>5342 likes</Text>
        <Text style={styles.name}>{card.name} new posts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    color: colors.white,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  userTagline: {
    fontSize: 14,
    color: colors.white,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
  card: {
    width: Dimensions.get('window').width,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  videoContainer: {
    width: Dimensions.get('window').width,
    height: 200,
    position: 'relative',
  },
  video: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  muteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: colors.black,
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
    color: colors.white,
  },
  photoDescriptionContainer: {
    padding: 10,
    alignItems: 'left',
    backgroundColor: colors.black,
  },
  name: {
    color: colors.white,
    fontSize: 12,
  },
});

const VideoPlayer = ({videoUrl, index, videoRefs, isPlaying, setIsPlaying}) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(isPlaying => !isPlaying); // Toggle isPlaying
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    // Add the video ref to the videoRefs array
    videoRefs.current[index] = videoRef.current;
  }, []);

  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        source={{uri: videoUrl}}
        style={styles.video}
        resizeMode="contain"
        paused={!isPlaying}
        muted={isMuted}
      />
      <TouchableOpacity
        style={styles.playPauseButton}
        onPress={togglePlayPause}>
        <Icon
          name={isPlaying ? 'pause' : 'play'}
          color={colors.white}
          size={24}
        />
      </TouchableOpacity>
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

export default InstaCard;
