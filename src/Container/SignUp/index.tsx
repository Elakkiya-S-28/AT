import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import CustomButton from '../../Component/CustomButton';
import CustomTextInput from '../../Component/CustomTextInput';
import Checkbox from '../../Component/CustomCheckBox';
import {useNavigation} from '@react-navigation/core';
import {ROUTES} from '../../Routes';
import ICONS from '../../Images/Icon';
import axios from 'axios';
import {API_URL} from '../../config/API';
import {COLORS} from '../../config/COLORS';

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
  const [buttonClicked, setButtonClicked] = useState(false); // New state for button click
  const [visible, setVisible] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email';
    }
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    } else if (!/^[a-zA-Z0-9.,/ ]+$/.test(address)) {
      newErrors.address = 'Invalid address';
    }
    if (!role) {
      newErrors.role = 'Role is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    } else if (password.trim() === '') {
      newErrors.password = 'Password cannot contain only spaces';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    setButtonClicked(true); // Indicate that the button was clicked
    if (!validate()) {
      return;
    }

    const signUpData = {
      name: name.trim(),
      email: email.trim(),
      hashPassword: password.trim(),
      role: role,
      mobile: Number(mobileNumber),
      address: address.trim(),
      panNo: pan.trim(),
      gstNo: gst.trim(),
    };
    console.log(signUpData, 'SIGNUPDATA');
    try {
      const response = await axios.post(API_URL + '/user/signup', signUpData);
      console.log('Response:', response.data);
      setVisible(true); // Show success modal
    } catch (error) {
      console.log('Error in signup', error.response);
      console.error(
        'Signup Error:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  const getBorderColor = field => {
    if (buttonClicked) {
      // Check if the button has been clicked
      if (errors[field]) {
        return 'red';
      }
      if (!errors[field] && !field) {
        return 'green';
      }
    }
    return '#ccc'; // Default border color
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={ICONS.left} style={{height: 24, width: 24}} />
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
            onsubmit={!!errors.name}
            borderColor={getBorderColor('name')}
            validate={!!errors.name}
            validationMessage={errors.name}
          />

          <CustomTextInput
            label="Mobile Number"
            placeholder="Enter your mobile number"
            keyboardType="numeric"
            secureTextEntry={false}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            borderColor={getBorderColor('mobileNumber')}
            validate={!!errors.mobileNumber}
            validationMessage={errors.mobileNumber}
          />

          <CustomTextInput
            label="Email ID"
            placeholder="Enter your email"
            keyboardType="email-address"
            secureTextEntry={false}
            value={email}
            onChangeText={setEmail}
            borderColor={getBorderColor('email')}
            validate={!!errors.email}
            validationMessage={errors.email}
          />

          <CustomTextInput
            label="GST"
            placeholder="Enter your GST number"
            keyboardType="default"
            secureTextEntry={false}
            value={gst}
            onChangeText={setGst}
            borderColor={getBorderColor('gst')}
            validate={!!errors.gst}
            validationMessage={errors.gst}
          />

          <CustomTextInput
            label="PAN"
            placeholder="Enter your PAN number"
            keyboardType="default"
            secureTextEntry={false}
            value={pan}
            onChangeText={setPan}
            borderColor={getBorderColor('pan')}
            validate={!!errors.pan}
            validationMessage={errors.pan}
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
            borderColor={getBorderColor('password')}
            validate={!!errors.password}
            validationMessage={errors.password}
          />

          <CustomTextInput
            label="Address"
            placeholder="Enter your address"
            keyboardType="default"
            secureTextEntry={false}
            value={address}
            onChangeText={setAddress}
            borderColor={getBorderColor('address')}
            validate={!!errors.address}
            validationMessage={errors.address}
          />

          <Text style={{color: 'black'}}>Role</Text>
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
            bgColor={COLORS.DarkBlue}
            textColor="#FFFFFF"
            borderColor={COLORS.DarkBlue}
          />
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LoginMainScreen)}>
              <Text style={styles.registerText}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal transparent={true} visible={visible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Success</Text>
            <Text style={styles.modalMessage}>Registration successful!</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setVisible(false);
                navigation.navigate(ROUTES.LoginMainScreen);
              }}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  titleAshok: {
    fontWeight: 'bold',
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#333',
    marginRight: 5,
  },
  registerText: {
    color: '#1679AB',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modalMessage: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.DarkBlue,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SignUp;
