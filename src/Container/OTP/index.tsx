import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import CustomButton from '../../Component/CustomButton';
import {ROUTES} from '../../Routes';
import {useNavigation, useRoute} from '@react-navigation/core';
import {COLORS} from '../../config/COLORS';
import SettingsHeader from '../../Component/Header';

const OTPInput = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const refs = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params;
  console.log('Email in OTP', email);

  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrorMessage(''); // Clear error when typing

    if (value && index < otp.length - 1) {
      refs.current[index + 1].focus();
    }
    if (!value && index > 0) {
      refs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      refs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setErrorMessage('Please enter the full OTP.');
      return;
    }
    console.log('OTP Entered:', otpCode);
    navigation.navigate(ROUTES.ForgotPassword, {
      otpCode: otpCode,
      email: email,
    });
  };

  return (
    <>
      <SettingsHeader title={'Enter OTP'} />
      <View style={styles.container}>
        <Text style={styles.title}>
          Enter the OTP received on your Email
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((_, index) => (
            <TextInput
              key={index}
              ref={el => (refs.current[index] = el)}
              style={styles.input}
              value={otp[index]}
              onChangeText={value => handleInputChange(value, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <CustomButton
          title="Submit"
          onPress={handleSubmit}
          bgColor={COLORS.DarkBlue}
          textColor="white"
          borderColor={COLORS.DarkBlue}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
});

export default OTPInput;
