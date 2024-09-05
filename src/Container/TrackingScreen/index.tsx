import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, BackHandler } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { COLORS } from '../../config/COLORS';
import Header from '../../Component/Header';
import { useRoute, useNavigation } from '@react-navigation/native';
import CustomButton from '../../Component/CustomButton';
import { ROUTES } from '../../Routes'; // Ensure this is the correct import for your route names

const TrackingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params;

  const [currentPosition, setCurrentPosition] = useState(0);
  const [labels, setLabels] = useState([]);
  const [invoice, setInvoice] = useState(true);

  useEffect(() => {
    if (order?.tracking?.length) {
      const trackingInfo = order.tracking[0];

      // Extract city names and create labels from trackingInfo
      const cities = Object.keys(trackingInfo).sort(); // Ensure correct order if needed
      setLabels(cities.map(city => city.charAt(0).toUpperCase() + city.slice(1)));

      // Determine the current position based on trackingInfo
      const position = cities.findIndex(city => trackingInfo[city] === true);
      setCurrentPosition(position === -1 ? 0 : position);
    }
  }, [order]);

  // Handle back navigation to MainTab
  const handleBackNavigation = () => {
    navigation.navigate(ROUTES.MainTab); // Ensure MainTab is the correct route
    return true; // Prevent default back behavior
  };

  // Handle "Invoice" button press
  const handleInvoicePress = () => {
    navigation.navigate(ROUTES.MainTab); // Navigate back to MainTab
  };

  // Listen for hardware back button press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackNavigation);

    return () => backHandler.remove(); // Cleanup the event listener on component unmount
  }, []);

  // Override header back button behavior
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomButton
          title={'Back'}
          onPress={handleBackNavigation}
          bgColor={COLORS.DarkBlue}
          textColor={'white'}
          borderColor={COLORS.DarkBlue}
        />
      ),
    });
  }, [navigation]);

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: COLORS.DarkBlue,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: COLORS.DarkBlue,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: COLORS.DarkBlue,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: COLORS.DarkBlue,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: COLORS.DarkBlue,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: COLORS.DarkBlue,
  };

  return (
    <View style={styles.container}>
      <Header title={'Order Tracking'} />
      <View style={styles.stepIndicatorContainer}>
        {invoice ? (
          <CustomButton
            title={'Invoice'}
            onPress={handleInvoicePress}
            bgColor={COLORS.DarkBlue}
            textColor={'white'}
            borderColor={COLORS.DarkBlue}
          />
        ) : (
          <Text>No Data</Text>
        )}

        <StepIndicator
          direction='vertical'
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={labels.length}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default TrackingScreen;
