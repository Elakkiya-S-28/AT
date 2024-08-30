import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CustomButton from '../../Component/CustomButton'; // Import your CustomButton component
import CustomTextInput from '../../Component/CustomTextInput'; // Import the CustomTextInput component
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../../Routes';
import ICONS from '../../Images/Icon';
import { COLORS } from '../../config/COLORS';

const ForgotPassword = () => {
    const navigation = useNavigation();
    
  return (
    <View style={styles.container}>
      <View  style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ICONS.left} style={{height:24,width:24}}/>
        </TouchableOpacity>
        <Text style={styles.backText}>Back</Text>
   
      </View>
      
    <View style={{marginTop:120,}}>
        
      <Text style={styles.title}>
        Forgot Password
      </Text>
       <Text style={{color:'black', fontSize:18, fontWeight:'600'}}>Enter the Email Address which you have registered</Text>
      <CustomTextInput
        placeholder="Email id"
        keyboardType="email-address"
        secureTextEntry={false}
        text="Email ID"
      />
       <CustomTextInput
        placeholder="New Password"
        keyboardType="default"
        secureTextEntry={true}
        text="New Password"
      />
      <CustomTextInput
        placeholder="Confirm Password"
        keyboardType="default"
        secureTextEntry={true}
        text="Confirm Password"
      />

      <CustomButton
        title="Forgot Password"
        onPress={() => navigation.navigate(ROUTES.LoginMainScreen)}
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
    marginLeft:10,
    marginTop:1,
  },
  title: {
    fontSize: 24,
    color: '#1679AB',
    marginBottom: 40,
    textAlign: 'center',
    fontWeight:'bold',
    
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
