import React from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import ICONS from '../../Images/Icon';

const CustomTextInput = ({
  validate,
  validationMessage,
  isPasswordField,
  label,
  placeholder,
  keyboardType,
  secureTextEntry,
  value,
  onChangeText,
  style,
  toggleSecureEntry,
  showPassword,
  borderColor = '#ccc', 
  onSubmit, // New prop for submit action
}) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, { borderColor }]}>
        <TextInput
          style={[styles.textInput, style]}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={'gray'}
          secureTextEntry={secureTextEntry && !showPassword}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit} // Trigger the function on submit
          returnKeyType="done" // Show 'done' button on the keyboard
        />
        {isPasswordField && (
          <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIconContainer}>
            <Image source={showPassword ? ICONS.password : ICONS.hide} style={styles.eyeIcon} />
          </TouchableOpacity>
        )}
      </View>
      {validate && (
        <Text style={styles.validationMessage}>{validationMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    color: 'black',
    fontSize: 15,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    color: 'black',
  },
  validationMessage: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
  eyeIconContainer: {
    padding: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
});

export default CustomTextInput;
