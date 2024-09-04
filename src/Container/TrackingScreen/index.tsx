import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { COLORS } from '../../config/COLORS';
import Header from '../../Component/Header';
import { useRoute } from '@react-navigation/native';

const TrackingScreen = () => {
  const route = useRoute();
  const { order } = route.params;

  const [currentPosition, setCurrentPosition] = useState(0);
  const [labels, setLabels] = useState([]);

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
    currentStepLabelColor: COLORS.DarkBlue
  };

  return (
    <View style={styles.container}>
      <Header title={'Order Tracking'} />
      <View style={styles.stepIndicatorContainer}>
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
