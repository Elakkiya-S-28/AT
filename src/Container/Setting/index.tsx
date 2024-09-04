import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import ProfileTextInput from '../../Component/ProfileTextInput';
import CustomButton from '../../Component/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/core';
import { ROUTES } from '../../Routes';
import { COLORS } from '../../config/COLORS';
import Header from '../../Component/Header';
import axios from 'axios';
import { API_URL } from '../../config/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const route = useRoute();
  const { emails, token } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const profile = async () => {
      try {
        if (!token) {
          console.error("Token is not available");
          return;
        }

        console.log(emails, "Emails", API_URL);
        const response = await axios.post(
          `${API_URL}/user/getUserDetails?email=${emails}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response, "RESPONSE SETTINGS");
        console.log(response.data, "RESPONSE DATA SETTINGS");

        if (response.data.status === 200) {
          setData(response.data.message);
        } else {
          console.error("Error in response data");
        }
      } catch (error) {
        console.error(error.response?.data || error.message, "ERROR FETCHING PROFILE DATA");
      }
    };

    if (emails && token) {
      profile();
    }
  }, [emails, token]);
  console.log(data.mobile,"MOBILE")
  return (
    <View style={styles.container}>
      <Header title={'Profile'} />
      <View style={{ padding: 20 }}>
        <ProfileTextInput
          label="Full Name"
          value={data.name}
          secureTextEntry={false}
        />
        <ProfileTextInput
          label="E-mail"
          value={data.email}
          secureTextEntry={false}
        />
        <ProfileTextInput
          label="Phone Number"
          value={data.mobile.toString()}
          secureTextEntry={false}
        />
         <ProfileTextInput
          label="Address"
          value={data.address}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#EEF7FF',
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
