import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ReelsPage from './ReelsPage';
import Multi from './Multi';

const Stack = createStackNavigator();

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
