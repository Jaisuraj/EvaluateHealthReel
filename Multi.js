import React from 'react';
import {ScrollView} from 'react-native';
import InstaCard from './InstaCard';
import {useNavigation} from '@react-navigation/native';
import {View, FlatList} from 'react-native';

const Multi = () => {
  const navigation = useNavigation();

  const cards = [
    {
      name: 'User 1',
      tagline: 'Tagline 1',
      verified: true,
      photo: require('./image.jpeg'),
      photos: './image.jpeg',
      videos: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'https://via.placeholder.com/500',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'https://via.placeholder.com/500',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'https://via.placeholder.com/500',
      ],
      description:
        'long long long long long ,long ,logn Description long long long long long ,long ,logn Description long long long long longlong long long long long ,long ,logn Description long long long long long ,long ,logn Description long long long long longlong long long long long ,long ,logn Description long long long long long ,long ,logn Description long long long long longlong long long long long ,long ,logn Description long long long long long ,long ,logn Description long long long long long ',
      timestamp: '2024-03-06T14:30:00Z',
    },
    {
      name: 'User 2',
      tagline: 'Tagline 2',
      verified: false,
      photo: require('./image1.jpeg'),
      photos: './image1.jpeg',
      videos: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'https://via.placeholder.com/500',
      ],
      description:
        'long long long long long ,long ,logn Description long long long long long ,long ,logn Description long long long long longlong long long long long ,long ,logn Description long long long long long ,long ,logn Description long long long long longlong long long long long ,long ,logn Description long long long long long ,long ,logn Description long long long long longlong long long long long ,long ,logn Description long long long long long ,long ,logn Description long long long long long ',
      timestamp: '2024-03-06T22:30:00Z',
    },
  ];

  return (
    <FlatList
      data={cards}
      renderItem={({item}) => <InstaCard card={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Multi;
