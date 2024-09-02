import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomButton = ({title, onPress, bgColor, textColor, borderColor}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {backgroundColor: bgColor, borderColor: borderColor},
      ]}
      onPress={onPress}>
      <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 10,
    // paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2, // Add border width to make borderColor effective
    width: '50%', 
    alignSelf:'center'// Set constant width
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
