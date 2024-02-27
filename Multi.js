import React from 'react';
import {ScrollView} from 'react-native';
import InstaCard from './InstaCard'; // Assuming the InstaCard component is defined in a separate file';
import {useNavigation} from '@react-navigation/native';

const Multi = () => {
  const navigation = useNavigation();

  // Assuming you have an array of cards
  const cards = [
    // Sample card data
    {
      name: 'User 1',
      tagline: 'Tagline 1',
      verified: true,
      photo: require('./image.jpeg'),
      videos: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'https://via.placeholder.com/500',
      ], // Sample video URLs
    },
    {
      name: 'User 2',
      tagline: 'Tagline 2',
      verified: false,
      photo: require('./image1.jpeg'),
      videos: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'https://via.placeholder.com/500',
      ], // Sample video URLs
    },
    // Add more cards as needed
  ];

  return (
    <ScrollView style={{flex: 1}}>
      {cards.map((card, index) => (
        <InstaCard key={index} card={card} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

export default Multi;
