import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { COLORS } from '../../config/COLORS';
import Header from '../../Component/Header';

const TrackingScreen = () => {
  const [currentPosition, setCurrentPosition] = useState(2);
  const labels = ["Order Confirmed", "Shipped", "Out of Delivery", "Delivery"];

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

  const onPageChange = (position) => {
    setCurrentPosition(position);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Your Orders</Text>
      </View> */}
      <Header title={'Your Orders'}/>
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
    // backgroundColor: '#EEF7FF',
  },
  headerContainer: {
    backgroundColor: '#1679AB',
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  stepIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'flex-end', // Align to the right
    paddingHorizontal: 20, 
  },
});

export default TrackingScreen;
