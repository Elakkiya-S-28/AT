import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import CustomButton from '../../Component/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {ROUTES} from '../../Routes';
import IMAGES from '../../Images/Image';
import {COLORS} from '../../config/COLORS';

const FirstScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={IMAGES.mainimg} style={styles.topImage} />
      </View>

      {/* <View style={styles.middleSection}>

      </View> */}

      <View style={styles.bottomSection}>
        <Image source={IMAGES.ATImage} style={styles.middleImage} />
        <Text style={styles.companyName}>ASHOK TEXTILES</Text>
        <Text style={styles.subtitle}>(SARANYA SPINNING MILLS PVT LTD)</Text>
        <CustomButton
          title={'Get Started'}
          onPress={() => navigation.navigate(ROUTES.LoginMainScreen)}
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
  },
  topSection: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImage: {
    height: 350,
    width: '100%',
  },
  middleSection: {
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // Added flex to take up equal space
  },
  middleImage: {
    height: 130,
    width: 130,
    resizeMode: 'cover',
  },
  bottomSection: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 25,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    marginTop: 34,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    // marginTop: 10,
    marginBottom: 20,
  },
});

export default FirstScreen;
