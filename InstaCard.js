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
      </View>
    </View>
  );
};

export default InstaCard;
