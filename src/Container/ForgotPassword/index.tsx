import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import CustomButton from '../../Component/CustomButton'; // Import your CustomButton component
import CustomTextInput from '../../Component/CustomTextInput'; // Import the CustomTextInput component
import { useNavigation, useRoute } from '@react-navigation/core';
import { ROUTES } from '../../Routes';
import ICONS from '../../Images/Icon';
import { COLORS } from '../../config/COLORS';
import axios from 'axios';
import { API_URL } from '../../config/API';

const ForgotPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmpwd, setShowconfirmPwd] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { otpCode, email } = route.params;
  console.log(otpCode, "OTP", email, "EMAIL", password)
  console.log(typeof(otpCode),"TYPE",typeof(email),"EMAIL",typeof(password))
  const handleNav = async () => {
    try {
      const response = await axios.post(API_URL + '/user/verifyOtp', {
        email: email,
        otp: Number(otpCode),
        newPassword: password
      });
      
      console.log(response, "RESPONSE FORGOT PASSWORD");
      console.log(response.data, "RESPONSE DATA FORGOT");
      if(response.data.status === 200 ){
        Alert.alert(
          'Success',
          'OTP Verified Successfully and New Password has been Set',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate(ROUTES.LoginMainScreen); 
              }
            }
          ]
        );
      }
      
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("ERROR..:", error.response.data);
      } else {
        console.log("ERROR:", error.message);
      }
      Alert.alert("Error", error.response?.data?.message || "An unexpected error occurred");
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ICONS.left} style={{ height: 24, width: 24 }} />
        </TouchableOpacity>
        <Text style={styles.backText}>Back</Text>

      </View>

      <View style={{ marginTop: 120, }}>

        <Text style={styles.title}>
          Forgot Password
        </Text>
        <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>Enter the Email Address which you have registered</Text>
        <CustomTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="New Password"
          keyboardType="default"
          isPasswordField={true}
          secureTextEntry={!showPassword}
          toggleSecureEntry={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
        />
        <CustomTextInput
          value={confirmPwd}
          isPasswordField={true}
          onChangeText={setConfirmPwd}
          placeholder="Confirm Password"
          keyboardType="default"
          secureTextEntry={true}
          text="Confirm Password"
          secureTextEntry={!showconfirmpwd}
          toggleSecureEntry={() => setShowconfirmPwd(!showconfirmpwd)}
            showPassword={showconfirmpwd}
        />

        <CustomButton
          title="Forgot Password"
          onPress={handleNav}
          bgColor={COLORS.DarkBlue}
          textColor="white"
          borderColor={COLORS.DarkBlue}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    // justifyContent: 'center',
  },
  backText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 1,
  },
  title: {
    fontSize: 24,
    color: '#1679AB',
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  titleAshok: {
    color: '#ef6c00', // Orange color for "Ashok"
  },
  forgotPasswordText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  footerText: {
    color: '#333',
  },
  registerText: {
    color: '#ef6c00',
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
