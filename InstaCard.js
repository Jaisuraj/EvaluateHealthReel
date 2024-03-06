import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import VideoPlayer from './VideoPlayer';
import {dummyUsers, colors, styles} from './sharedData';
import Header from './Header';
import Footer from './Footer';
import Pagination from './Pagination';

const ShortView = ({onPressMore}) => (
  <View style={{flexDirection: 'row'}}>
    <Text style={styles.name}>Description (Short View) </Text>
    <TouchableOpacity onPress={onPressMore}>
      <Text style={styles.name}> Show More</Text>
    </TouchableOpacity>
  </View>
);

const LongView = ({onClose, description}) => (
  <View>
    <Text style={styles.name}>{description}</Text>
    <TouchableOpacity onPress={onClose}>
      <Text style={styles.name}> Show Less </Text>
    </TouchableOpacity>
  </View>
);

const formatTimestamp = timestamp => {
  const now = new Date();
  console.log(now);
  const postTime = new Date(timestamp);

  const timeDiff = now.getTime() - postTime.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    if (days === 1) {
      return 'yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      return postTime.toLocaleDateString(undefined, options);
    }
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
  } else {
    return 'few seconds ago';
  }
};

const DescriptionComponent = ({description}) => {
  const [showLongView, setShowLongView] = useState(false);

  const handlePressMore = () => {
    setShowLongView(true);
  };

  const handleCloseLongView = () => {
    setShowLongView(false);
  };

  return (
    <View>
      {showLongView ? (
        <LongView onClose={handleCloseLongView} description={description} />
      ) : (
        <ShortView onPressMore={handlePressMore} />
      )}
    </View>
  );
};

const InstaCard = ({card}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isFocused1 = useIsFocused();
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const smallAnimatedHeartIconRef = useRef(null);
  const [showLongView, setShowLongView] = useState(false);
  const [videoPlayingStates, setVideoPlayingStates] = useState(
    card.videos.map(() => false),
  );

  const handlePressMore = () => {
    setShowLongView(true);
  };

  const handleCloseLongView = () => {
    setShowLongView(false);
  };

  const handleOnPressLike = () => {
    animateIcon(smallAnimatedHeartIconRef, 'heart');
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

  const handleVideoPress = videoUrl => {
    navigation.navigate('MultiReels', {
      videoUrl: videoUrl,
      user: card,
    });
  };

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / Dimensions.get('window').width);
    setActiveIndex(index);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: Dimensions.get('window').width * activeIndex,
      animated: false,
    });
  }, [activeIndex, isFocused1]);

  return (
    <View style={styles.container}>
      <Header card={card} />
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
            style={[
              styles.videoContainer,
              {width: Dimensions.get('window').width},
            ]}
            onPress={() => handleVideoPress(videoUrl)}>
            {videoUrl.endsWith('.mp4') ? (
              <VideoPlayer
                videoUrl={videoUrl}
                index={index}
                playing={videoPlayingStates[index]}
                setPlaying={playing => {
                  const newPlayingStates = [...videoPlayingStates];
                  newPlayingStates[index] = playing;
                  setVideoPlayingStates(newPlayingStates);
                }}
                card={card}
                handleOnPressLike={handleOnPressLike}
              />
            ) : (
              <Image
                source={{uri: videoUrl}}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            )}
            <View style={styles.videoCounterContainer}>
              <Text style={styles.videoCounterText}>{`${index + 1}/${
                card.videos.length
              }`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Pagination
        totalItems={card.videos.length}
        activeIndex={activeIndex}
        onPress={setActiveIndex}
      />
      <Footer />
      <View style={styles.photoDescriptionContainer}>
        <Text style={styles.name}>5342 likes</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.name}>{card.name}</Text>
          <DescriptionComponent description={card.description} />
        </View>
        <Text style={styles.name}>
          Timestamp: {formatTimestamp(card.timestamp)}
        </Text>
      </View>
    </View>
  );
};

export default InstaCard;
