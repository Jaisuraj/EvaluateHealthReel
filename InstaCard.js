import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import VideoPlayer from './VideoPlayer';
import {dummyUsers, colors, styles} from './sharedData';
import Header from './Header';
import Footer from './Footer';

const InstaCard = ({card}) => {
  // const [liked, setLiked] = useState(false);
  // const [bookmarked, setBookmarked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isFocused1 = useIsFocused();
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  // const smallAnimatedHeartIconRef = useRef(null);
  // const [modalVisible, setModalVisible] = useState(false);
  // const smallAnimatedBookmarkIconRef = useRef(null);

  // Create state for tracking the playing state of each video
  const [videoPlayingStates, setVideoPlayingStates] = useState(
    card.videos.map(() => false),
  );

  // const handleOnPressLike = () => {
  //   animateIcon(smallAnimatedHeartIconRef, 'heart');
  // };

  // const handleOnPressBookmark = () => {
  //   animateIcon(smallAnimatedBookmarkIconRef, 'bookmark');
  // };

  // const animateIcon = (iconRef, iconName) => {
  //   iconRef.current.stopAnimation();
  //   iconRef.current
  //     .bounceIn()
  //     .then(() => iconRef.current.bounceOut())
  //     .then(() =>
  //       iconName === 'heart' ? setLiked(!liked) : setBookmarked(!bookmarked),
  //     );
  // };
  // const toggleModal = () => {
  //   setModalVisible(modalVisible);
  // };
  // const renderUserCircles = () => {
  //   return (
  //     <View style={styles.userCircleContainer}>
  //       {/* Render user circles */}
  //       {dummyUsers.map(user => (
  //         <TouchableOpacity
  //           key={user.id}
  //           style={styles.userCircle}
  //           onPress={() => handleShareToUser(user)}>
  //           <Image source={user.photo} style={styles.userImage} />
  //           <Text style={styles.userName}>{user.name}</Text>
  //         </TouchableOpacity>
  //       ))}
  //       {/* Button to share to WhatsApp */}
  //       <TouchableOpacity
  //         style={[styles.userCircle, {backgroundColor: 'lightblue'}]}
  //         onPress={shareToWhatsApp}>
  //         <Image
  //           source={require('./whatsapp_logo1.png')}
  //           style={styles.whatsappLogo}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  // const shareToWhatsApp = () => {
  //   // Implement your logic to share to WhatsApp
  //   console.log('Shared to WhatsApp');
  //   // Close the modal after sharing
  //   setModalVisible(false);
  // };

  // const handleShareToUser = user => {
  //   // Implement your logic to share the content to the selected user
  //   console.log(`Shared to user: ${user.name}`);
  //   // Close the modal after sharing
  //   setModalVisible(false);
  // };

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
        showsHorizontalScrollIndicator={true}
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
              />
            ) : (
              <Image
                source={{uri: videoUrl}}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Footer />
      {/* <ModalContent
        renderUserCircles={renderUserCircles}
        modalVisible={modalVisible} // Correctly pass modalVisible prop
        toggleModal={toggleModal} // Correctly pass toggleModal prop
      /> */}

      <View style={styles.photoDescriptionContainer}>
        <Text style={styles.name}>5342 likes</Text>
        <Text style={styles.name}>{card.name} new posts</Text>
      </View>
    </View>
  );
};

export default InstaCard;
