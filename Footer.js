// Footer.js
import {styles, colors, dummyUsers, modalStyles} from './sharedData';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';

const Footer = () => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isFocused1 = useIsFocused();
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const smallAnimatedHeartIconRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const smallAnimatedBookmarkIconRef = useRef(null);
  const [searchText, setSearchText] = useState('');

  // const [liked, setLiked] = useState(false);
  // const smallAnimatedHeartIconRef = useRef(null);

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
    //animateIcon(smallAnimatedHeartIconRef, 'heart');
    setLiked(!liked);
  };

  const handleOnPressBookmark = () => {
    //animateIcon(smallAnimatedBookmarkIconRef, 'bookmark');
    setBookmarked(!bookmarked);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const renderUserCircles = () => {
    const filteredUsers = dummyUsers.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    return (
      <View>
        <TextInput
          style={modalStyles.searchBar}
          placeholder="Search"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
        <View style={modalStyles.userCircleContainer}>
          {filteredUsers.map(user => (
            <TouchableOpacity
              key={user.id}
              style={modalStyles.userCircle}
              onPress={() => handleShareToUser(user)}>
              <Image source={user.photo} style={modalStyles.userImage} />
              <Text style={modalStyles.userName}>{user.name}</Text>
            </TouchableOpacity>
          ))}
          {/* Button to share to WhatsApp */}
          <TouchableOpacity
            style={[modalStyles.userCircle, {backgroundColor: 'white'}]}
            onPress={shareToWhatsApp}>
            <Image
              source={require('./whatsapp_logo1.png')}
              style={modalStyles.whatsappLogo}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const shareToWhatsApp = () => {
    // Implement your logic to share to WhatsApp
    console.log('Shared to WhatsApp');
    // Close the modal after sharing
    setModalVisible(false);
  };

  const handleShareToUser = user => {
    // Implement your logic to share the content to the selected user
    console.log(`Shared to user: ${user.name}`);
    // Close the modal after sharing
    setModalVisible(false);
  };
  return (
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
        <TouchableOpacity activeOpacity={1} onPress={toggleModal}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          toggleModal();
        }}>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            {/* Close icon */}
            <TouchableOpacity
              style={modalStyles.closeIcon}
              onPress={() => toggleModal()}>
              <Icon1 name="times" size={24} color={colors.black} />
            </TouchableOpacity>
            <Text style={modalStyles.modalTitle}>Share to</Text>
            <View style={modalStyles.userCircleContainer}>
              {renderUserCircles()}
            </View>
            {/* <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={toggleModal}>
              <Text style={modalStyles.closeButtonText}>Close</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Footer;
