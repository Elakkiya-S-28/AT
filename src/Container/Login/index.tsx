import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import CustomButton from '../../Component/CustomButton';
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../../Routes';
import IMAGES from '../../Images/Image';

const Login = () => {
  const navigation = useNavigation();
  return (

    <ImageBackground style={styles.container} source={IMAGES.loginimage}
      style={styles.background}
      resizeMode="cover">
          <View style={styles.container}>
     
          <Text style={styles.subText}>If you'd like to login or sign up??</Text>
      <CustomButton title={'Login'} onPress={() => navigation.navigate(ROUTES.LoginMainScreen)} bgColor={'#1679AB'} textColor={'white'} borderColor={'#1679AB'} />
      <CustomButton title={'Register'} onPress={() => navigation.navigate(ROUTES.SignUp)} bgColor={'white'} textColor={'#1679AB'} borderColor={'white'} />
      
      </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subText: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    fontWeight:'bold',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 40,
    fontWeight: 'bold'
  },
  loginButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#ef5350',
    fontSize: 16,
  },
  registerButton: {
    borderColor: '#ffffff',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 40,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  touchIdContainer: {
    alignItems: 'center',
  },
  touchIdText: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 20,
    marginTop: 10,
  },
  touchIdIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  touchIdLabel: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default Login;
