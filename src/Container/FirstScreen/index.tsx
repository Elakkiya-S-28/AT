import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../../Component/CustomButton';
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../../Routes';
import IMAGES from '../../Images/Image';

const StartingPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.middleSection}>
       <Image source={IMAGES.image} style={{height:'100%'}}/>
      
      </View>
      <View style={styles.bottomSection}>
      
        <Image
          source={IMAGES.MainImage}
          style={styles.logo}
        />
   
      
        <Text style={styles.companyName}>ASHOK TEXTILES</Text>
        <Text style={styles.subtitle}>(SARANYA SPINNING MILLS PVT LTD)</Text>
        <CustomButton title={'Get Started'} onPress={() => navigation.navigate(ROUTES.LoginMainScreen)} bgColor={'#1679AB'} textColor={'white'} borderColor={'#1679AB'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 18,
    color: '#757575',
    marginTop: 50,
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FF7F7F',
    zIndex: 1,
  },
  logo: {
    width: 150,
    height: 150,
    // position:'relative',
    // top:200,
    // marginTop: 50,
   
  },
  bottomSection: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // zIndex: 1,
    margin: 16,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00695c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default StartingPage;
