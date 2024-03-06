// Header.js
import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {styles, colors} from './sharedData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = ({card}) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={card.photo} style={styles.userPhoto} />
      <View style={styles.userInfo}>
        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>{card.name}</Text>
          {card.verified && (
            <Image source={card.verifiedIcon} style={styles.verifiedIcon} />
          )}
          <TouchableOpacity activeOpacity={1} style={{marginLeft: 'auto'}}>
            <MaterialIcons
              name="more-vert"
              size={24}
              color={colors.white}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.userTagline}>{card.tagline}</Text>
      </View>
    </View>
  );
};

export default Header;
