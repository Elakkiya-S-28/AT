import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Assuming you have a COLORS object for consistent colors
const COLORS = {
  DarkBlue: '#001f3f', // Example color, replace with your actual COLORS.DarkBlue value
  LightGray: '#aaaaaa',
  White: '#ffffff',
  Black: '#000000',
};

const CustomStepIndicator = ({ currentPosition, stepDetails, steps }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const subLabelCount = stepDetails[index]?.length || 0;
        const lineHeight = 30 + subLabelCount * 20; // Adjust line height dynamically

        // Check if the step is finished (current or before)
        const isFinished = index <= currentPosition;

        return (
          <View key={index} style={styles.stepWrapper}>
            <View style={styles.stepContainer}>
              <View style={styles.stepCircleWrapper}>
                <View
                  style={[
                    styles.stepCircle,
                    isFinished && styles.finishedStepCircle, // Apply finished style for current and previous
                  ]}
                >
                  <Text
                    style={[
                      styles.stepNumber,
                      isFinished && styles.finishedStepNumber, // Show tick symbol for finished steps
                    ]}
                  >
                    {isFinished ? '✓' : index + 1} {/* Show tick for finished */}
                  </Text>
                </View>
                {index < steps.length - 1 && (
                  <View style={[styles.stepLine, { height: lineHeight }]} />
                )}
              </View>

              <View style={styles.stepContentWrapper}>
                <View style={styles.stepLabelWrapper}>
                  <Text
                    style={[
                      styles.stepLabel,
                      isFinished && styles.finishedStepLabel, // Apply dark blue color for finished
                    ]}
                  >
                    {step}
                  </Text>
                </View>

                {stepDetails[index] && (
                  <View style={styles.subLabelContainer}>
                    {stepDetails[index].map((detail, detailIndex) => (
                      <Text key={detailIndex} style={styles.subLabel}>
                        {detail}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepCircleWrapper: {
    alignItems: 'center',
    position: 'relative',
    width: 40,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.LightGray,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.White,
  },
  finishedStepCircle: {
    backgroundColor: COLORS.DarkBlue, // Dark Blue background for finished steps
    borderColor: COLORS.DarkBlue,
  },
  stepNumber: {
    fontSize: 16,
    color: COLORS.LightGray,
  },
  finishedStepNumber: {
    color: COLORS.White, // White tick color for finished steps
  },
  stepLine: {
    width: 2,
    backgroundColor: COLORS.LightGray,
    position: 'absolute',
    top: 30, // Adjusts to center the line from the circle
    left: 19, // Aligns with the center of the circle
    zIndex: -1,
  },
  stepContentWrapper: {
    marginLeft: 20,
    flex: 1,
    justifyContent: 'center',
  },
  stepLabelWrapper: {
    justifyContent: 'center', // Vertically center the main label
  },
  stepLabel: {
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  finishedStepLabel: {
    color: COLORS.DarkBlue, // Dark Blue text color for finished labels
  },
  subLabelContainer: {
    marginTop: 5,
    paddingLeft: 5, // Add slight padding for sublabels to align better
  },
  subLabel: {
    color: '#666',
    fontSize: 12,
  },
});

export default CustomStepIndicator;
