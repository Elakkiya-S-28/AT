import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import CustomButton from '../../Component/CustomButton';
import CustomTextInput from '../../Component/CustomTextInput';
import Checkbox from '../../Component/CustomCheckBox';
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../../Routes';
import ICONS from '../../Images/Icon';
import axios from 'axios';

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gst, setGst] = useState('');
  const [pan, setPan] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('BUYER');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    else if (!/^\d{10}$/.test(mobileNumber)) newErrors.mobileNumber = 'Invalid mobile number';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email';
    if (!address.trim()) newErrors.address = 'Address is required';
    else if (!/^[a-zA-Z0-9.,/ ]+$/.test(address)) newErrors.address = 'Invalid address';
    if (!role) newErrors.role = 'Role is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.trim().length < 6) newErrors.password = 'Password must be at least 6 characters long';
    else if (password.trim() !== password) newErrors.password = 'Password cannot contain only spaces';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    const signUpData = {
      name: name.trim(),
      email: email.trim(),
      hashPassword: password.trim(),
      role: role,
      mobile: mobileNumber,
      address: address.trim(),
      panNo: pan.trim(),
      gstNo: gst.trim(),
    };

    try {
      const response = await axios.post('http://3.82.35.124:3001/user/signup', signUpData);
      console.log('Response:', response.data);
      navigation.navigate(ROUTES.LoginMainScreen); // Navigate to success screen
    } catch (error) {
      console.error('Signup Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={ICONS.left} style={{ height: 24, width: 24 }} />
          </TouchableOpacity>
          <Text style={styles.backText}>Back</Text>
        </View>

        <View>
          <Text style={styles.title}>
            <Text style={styles.titleAshok}>Ashok Textiles </Text>
          </Text>

          <CustomTextInput
            label="Name"
            placeholder="Enter your name"
            keyboardType="default"
            secureTextEntry={false}
            value={name}
            onChangeText={setName}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <CustomTextInput
            label="Mobile Number"
            placeholder="Enter your mobile number"
            keyboardType="numeric"
            secureTextEntry={false}
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}

          <CustomTextInput
            label="Email ID"
            placeholder="Enter your email"
            keyboardType="email-address"
            secureTextEntry={false}
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <CustomTextInput
            label="GST"
            placeholder="Enter your GST number"
            keyboardType="default"
            secureTextEntry={false}
            value={gst}
            onChangeText={setGst}
          />

          <CustomTextInput
            label="PAN"
            placeholder="Enter your PAN number"
            keyboardType="default"
            secureTextEntry={false}
            value={pan}
            onChangeText={setPan}
          />

          <CustomTextInput
            label="Password"
            placeholder="Enter your password"
            keyboardType="default"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            isPasswordField={true}
            toggleSecureEntry={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <CustomTextInput
            label="Address"
            placeholder="Enter your address"
            keyboardType="default"
            secureTextEntry={false}
            value={address}
            onChangeText={setAddress}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

          <Text style={{ color: 'black' }}>Role</Text>
          <View style={styles.checkboxRow}>
            <Checkbox
              label="Customer"
              checked={role === 'BUYER'}
              onChange={() => setRole('BUYER')}
            />
            <Checkbox
              label="Agent"
              checked={role === 'AGENT'}
              onChange={() => setRole('AGENT')}
            />
          </View>
          {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}

          <CustomButton
            title="Register"
            onPress={handleSignUp}
            bgColor="#1679AB"
            textColor="#FFFFFF"
            borderColor="#1679AB"
          />
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.Login)}>
              <Text style={styles.registerText}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
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
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  titleAshok: {
    color: '#1679AB',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
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
    color: 'green',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default SignUp;
