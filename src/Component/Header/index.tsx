import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../config/COLORS';

const SettingsHeader = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: '#1679AB',
    backgroundColor:COLORS.DarkBlue,
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
});

export default SettingsHeader;
