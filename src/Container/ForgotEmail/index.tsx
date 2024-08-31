import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Alert } from 'react-native';
import CustomTextInput from '../../Component/CustomTextInput';
import CustomButton from '../../Component/CustomButton';
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../../Routes';
import { COLORS } from '../../config/COLORS';
import IMAGES from '../../Images/Image';
import axios from 'axios';
import { API_URL } from '../../config/API';

export const ForgotEmail = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        // Regular expression for validating an Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleForgotPassword = async() => {
        if (!email) {
            setEmailError('Email is required');
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
            try{
                const response = await axios.get(API_URL + `/user/getOTP?email=${email}`)
                console.log(response,"REsponse");
                console.log(response.data, "RESPONSE of DATA in ForgotEMail")
                if(response.data.status === 200){
                    navigation.navigate(ROUTES.OTPInput, { email:email });
                }
            }
            catch(error){
                console.log("Error", error.response)
            }
          
        }
    };
    const getEmailBorderColor = () => {
        if (emailError) {
            return 'red';
        } else if (email) {
            return 'green';
        } else {
            return '#ccc';
        }
    };
    return (
        <View style={styles.container}>
            <Image source={IMAGES.onboardimg} style={{ height: 300, width: '100%' }} />
            <Text style={styles.title}>
                Forgot Password
            </Text>
            <View style={{ margin: 16 }}>
                <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>Enter the Email Address</Text>
                <CustomTextInput
                    placeholder="Email id"
                    keyboardType="email-address"
                    secureTextEntry={false}
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailError('');
                    }}
                    validationMessage={emailError}
                    validate={emailError}
                    borderColor={getEmailBorderColor()}
                />

                <View style={{ marginTop: 20 }}>
                    <CustomButton
                        title="Forgot Password"
                        onPress={handleForgotPassword}
                        bgColor={COLORS.DarkBlue}
                        textColor="white"
                        borderColor={COLORS.DarkBlue}
                    />
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        color: '#1679AB',
        marginBottom: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 50,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        marginBottom: 10,
    },
});

export default ForgotEmail;
