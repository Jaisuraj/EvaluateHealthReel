import React from 'react';
import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import ReelsPage from './ReelsPage'; // Assuming ReelsPage is your component

const {width, height} = Dimensions.get('window');
const reelsData = [
  {
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    user: {
      name: 'User 2',
      photo: require('./image1.jpeg'),
      tagline: 'Tagline 2',
      verified: false,
    },
  },
  // Add more reels data as needed
];

const MultipleReelsPage = ({route}) => {
  const {videoUrl, user} = route.params; // First reel data passed via params
  const firstReelData = {videoUrl, user};

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ReelsPage videoUrl={firstReelData.videoUrl} user={firstReelData.user} />
      {reelsData.map((data, index) => (
        <ReelsPage key={index} videoUrl={data.videoUrl} user={data.user} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
});

export default MultipleReelsPage;
