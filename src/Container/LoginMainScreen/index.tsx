import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Modal,
  ActivityIndicator,
} from 'react-native';
import CustomButton from '../../Component/CustomButton';
import CustomTextInput from '../../Component/CustomTextInput';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import { ROUTES } from '../../Routes';
import ICONS from '../../Images/Icon';
import axios from 'axios';
import IMAGES from '../../Images/Image';
import { API_URL } from '../../config/API';
import { COLORS } from '../../config/COLORS';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginMainScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate email
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Reset email and password when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
    }, [])
  );

  // Handle login
  const handleLogin = async () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    const trimmedPassword = password.trim();
    if (password !== trimmedPassword) {
      setPasswordError('Password should not contain leading or trailing spaces');
      isValid = false;
    } else if (password === '') {
      setPasswordError('Password cannot be empty');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) {
      setAlertMessage('Please Enter the fields correctly.');
      setAlertVisible(true);
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password: trimmedPassword,
        role: 'BUYER',
      });
      console.log('Login response:', response.data);
      if (response.data.message === 'User logged in successfully') {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('email', email);
        navigation.navigate(ROUTES.MainTab, {
          screen: ROUTES.MainScreen,
          params: {
            token: response.data.token,
            email: email,
          },
        });
      } else {
        setAlertMessage('Login failed. Please try again.');
        setAlertVisible(true);
      }
    } catch (error) {
      console.error('Login error:', error.response);
      setAlertMessage('Please log in later');
      setAlertVisible(true);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <ImageBackground
      source={IMAGES.loginimage}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={ICONS.left}
              style={{ height: 24, width: 24, tintColor: 'white' }}
            />
          </TouchableOpacity>
          <Text style={styles.backText}>Back</Text>
        </View>

        <View style={{ marginTop: 150 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Email ID</Text>
          <CustomTextInput
            placeholder="Email id"
            keyboardType="email-address"
            secureTextEntry={false}
            value={email}
            onChangeText={text => {
              setEmail(text);
              setEmailError('');
            }}
            validate={emailError !== ''}
            validationMessage={emailError}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Password</Text>
          <CustomTextInput
            placeholder="Password"
            keyboardType="default"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => {
              setPassword(text);
              setPasswordError('');
            }}
            validate={passwordError !== ''}
            validationMessage={passwordError}
            isPasswordField={true}
            toggleSecureEntry={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
          />

          <CustomButton
            title="Login"
            onPress={handleLogin}
            bgColor={COLORS.DarkBlue}
            textColor="#FFFFFF"
            borderColor={COLORS.DarkBlue}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.ForgotEmail)}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.SignUp)}>
              <Text style={styles.registerText}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.DarkBlue} />
        </View>
      )}

      <Modal
        transparent={true}
        visible={alertVisible}
        animationType="slide"
        onRequestClose={() => setAlertVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>{alertMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setAlertVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 20,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity here
  },
  backText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 1,
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'right',
    marginTop: 20,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  registerText: {
    color: 'rgba(144, 238, 144, 1)',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 17,
    marginBottom: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: COLORS.DarkBlue,
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginMainScreen;
