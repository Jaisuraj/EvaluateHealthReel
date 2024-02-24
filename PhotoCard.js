import React, {useState, useRef} from 'react';
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

const PhotoCard = ({card}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const smallAnimatedHeartIconRef = useRef(null);
  const smallAnimatedBookmarkIconRef = useRef(null);
  const videoRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const animateIcon = (iconRef, iconName) => {
    iconRef.current.stopAnimation();

    iconRef.current
      .bounceIn()
      .then(() => iconRef.current.bounceOut())
      .then(() => iconRef.current.bounceIn())
      .then(() =>
        iconName === 'heart' ? setLiked(!liked) : setBookmarked(!bookmarked),
      );
  };

  const handleOnPressLike = () => {
    animateIcon(smallAnimatedHeartIconRef, 'heart');
  };

  const handleOnPressBookmark = () => {
    animateIcon(smallAnimatedBookmarkIconRef, 'bookmark');
  };

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    videoRefs.current.forEach((videoRef, i) => {
      if (i !== index) {
        videoRef?.current?.pause();
      }
    });
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
      <View style={{flex: 1}}>
        <ScrollView
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
                <View style={styles.videoContainer}>
                  <Video
                    ref={ref => (videoRefs.current[index] = ref)}
                    source={{uri: videoUrl}}
                    style={styles.video}
                    resizeMode="cover"
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
                  <TouchableOpacity
                    style={styles.muteButton}
                    onPress={toggleMute}>
                    <MaterialIcons
                      name={isMuted ? 'volume-off' : 'volume-up'}
                      size={24}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <Image
                  source={{uri: videoUrl}}
                  style={{width: '100%', height: '100%', borderRadius: 10}}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Scroll dots */}
        <View style={styles.scrollDots}>
          {card.videos.map((_, index) => (
            <View
              key={index}
              style={[
                styles.scrollDot,
                {backgroundColor: index === 0 ? colors.white : colors.white},
              ]}
            />
          ))}
        </View>
      </View>

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
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  video: {
    flex: 1,
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
  scrollDots: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scrollDot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    marginHorizontal: 3,
    backgroundColor: colors.white,
  },
  playPauseButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});

export default PhotoCard;
