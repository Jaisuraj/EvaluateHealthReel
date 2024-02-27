import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InstaCard from './InstaCard';
import ReelsPage from './ReelsPage';
import Multi from './Multi';

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
];

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={`Multi`} component={() => <Multi />} />
        <Stack.Screen name="ReelsPage" component={ReelsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
