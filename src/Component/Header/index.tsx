import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../config/COLORS';  // Assuming COLORS is correctly imported from your project
import ICONS from '../../Images/Icon';  // Assuming ICONS is correctly imported from your project
import { useNavigation } from '@react-navigation/core';

const SettingsHeader = ({ title, onPress }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onPress} style={styles.backButton}>
        <Image source={ICONS.left} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.DarkBlue,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 5,
  },
  backIcon: {
    tintColor: 'white',
    height: 24,
    width: 24,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight:'bold'
  },
});

export default SettingsHeader;
