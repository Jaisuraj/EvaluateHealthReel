import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PhotoCard from './PhotoCard';
import ReelsPage from './ReelsPage';

const Stack = createStackNavigator();

const cards = [
  {
    name: 'Jaisuraj Bantupalli',
    photo: require('./image.jpeg'),
    tagline: 'Jaisuraj Bantupalli. original audio',
    verified: true,
    verifiedIcon: require('./verified.png'),
    videos: [
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://via.placeholder.com/500',
    ],
  },
  {
    name: 'Another User',
    photo: require('./image1.jpeg'),
    tagline: 'Another User. original audio',
    verified: false,
    verifiedIcon: null,
    videos: [
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://via.placeholder.com/500',
    ],
  },
  // Add more card data as needed
];

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={`PhotoCard`}
          component={() => <PhotoCard card={cards[0]} />}
        />
        <Stack.Screen name="ReelsPage" component={ReelsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
