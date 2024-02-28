import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ReelsPage from './ReelsPage';
import Multi from './Multi';
import MultipleReelsPage from './MultiReels';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={`Multi`} component={() => <Multi />} />
        <Stack.Screen name="MultiReels" component={MultipleReelsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
