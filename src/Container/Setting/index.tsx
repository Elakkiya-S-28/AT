// Settings.js
import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import ProfileTextInput from '../../Component/ProfileTextInput';
import CustomButton from '../../Component/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {ROUTES} from '../../Routes';
import {COLORS} from '../../config/COLORS';

const Settings = () => {
  const [name, setName] = useState('Elakkiya S');
  const [email, setEmail] = useState('selvarajanelakkiya@gmail.com');
  const [password, setPassword] = useState('1234567');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Replace with the actual image URL
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Image
            source={{ uri: 'https://via.placeholder.com/20' }} // Replace with the actual edit icon URL
            style={styles.editIconImage}
          />
        </TouchableOpacity>
      </View> */}
      <View style={{backgroundColor: '#1679AB', padding: 10}}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            padding: 10,
            textAlign: 'center',
          }}>
          Settings
        </Text>
      </View>
      <View style={{padding: 20}}>
        <ProfileTextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          secureTextEntry={false}
        />
        <ProfileTextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          secureTextEntry={false}
        />
        <ProfileTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <ProfileTextInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          secureTextEntry={false}
        />
        <CustomButton
          title={'Logout'}
          onPress={() => navigation.navigate(ROUTES.FirstScreen)}
          bgColor={COLORS.DarkBlue}
          textColor={'white'}
          borderColor={COLORS.DarkBlue}
        />
      </View>
      {/* Add more inputs as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF7FF',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  editIconImage: {
    width: 20,
    height: 20,
  },
});

export default Settings;
