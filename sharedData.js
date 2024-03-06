// sharedData.js
import {StyleSheet, Dimensions} from 'react-native';

export const colors = {
  transparent: 'transparent',
  white: '#fff',
  heartColor: '#e92f3c',
  textPrimary: '#515151',
  black: '#000',
  blue: '#00f',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
  },
  userTagline: {
    fontSize: 14,
    color: colors.white,
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
    height: 450,
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
  shareButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%', // Adjusted width to cover the entire screen
    borderTopLeftRadius: 20, // Added border radius to top corners for better appearance
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    height: Dimensions.get('window').height / 2, // Set the height to half of the screen height
    position: 'relative',
    bottom: 0, // Position the modal content at the bottom of the screen
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userCircleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping to the next line
    justifyContent: 'flex-start', // Start aligning icons from the left
    marginBottom: 20,
  },
  userCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  whatsappLogo: {
    width: 40,
    height: 40,
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchBar: {
    width: '100%',
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export const dummyUsers = [
  {id: 1, initials: 'AB', name: 'Alice', photo: require('./image.jpeg')},
  {id: 2, initials: 'CD', name: 'Bob', photo: require('./image1.jpeg')},
  {id: 3, initials: 'EF', name: 'Charlie', photo: require('./image.jpeg')},
  {id: 4, initials: 'GH', name: 'David', photo: require('./image1.jpeg')},
  {id: 5, initials: 'IJ', name: 'Emma', photo: require('./image.jpeg')},
  // Add more dummy users as needed
];
