// // import React, { useState, useEffect } from 'react';
// // import { View, StyleSheet, Text } from 'react-native';
// // import StepIndicator from 'react-native-step-indicator';
// // import SettingsHeader from '../../Component/Header';
// // import { useRoute } from '@react-navigation/core';
// // import { COLORS } from '../../config/COLORS';
// // import CustomButton from '../../Component/CustomButton';

// // const customStyles = {
// //   stepIndicatorSize: 25,
// //   currentStepIndicatorSize: 30,
// //   separatorStrokeWidth: 2,
// //   currentStepStrokeWidth: 3,
// //   stepStrokeCurrentColor: COLORS.DarkBlue,
// //   stepStrokeWidth: 3,
// //   stepStrokeFinishedColor: COLORS.DarkBlue,
// //   stepStrokeUnFinishedColor: '#aaaaaa',
// //   separatorFinishedColor: COLORS.DarkBlue,
// //   separatorUnFinishedColor: '#aaaaaa',
// //   stepIndicatorFinishedColor: COLORS.DarkBlue,
// //   stepIndicatorUnFinishedColor: '#ffffff',
// //   stepIndicatorCurrentColor: '#ffffff',
// //   stepIndicatorLabelFontSize: 13,
// //   currentStepIndicatorLabelFontSize: 13,
// //   stepIndicatorLabelCurrentColor: COLORS.DarkBlue,
// //   stepIndicatorLabelFinishedColor: '#ffffff',
// //   stepIndicatorLabelUnFinishedColor: '#aaaaaa',
// //   labelColor: '#999999',
// //   labelSize: 13,
// //   currentStepLabelColor: COLORS.DarkBlue
// // };

// // const TrackingScreen = () => {
// //   const route = useRoute();
// //   const { order } = route.params;
// //   console.log(order,"ORDERS IN TRACKING SCREEN")
// //   // Default labels if location data is not available
// //   const [labels, setLabels] = useState([]);

// //   useEffect(() => {
// //     if (order && order.message && Array.isArray(order.message.location)) {
// //       // Create labels from location data
// //       const locationLabels = order.message.location.map(loc => {
// //         return {
// //           label: loc.location,
// //           subLabel: new Date(loc.datetime).toLocaleString() // Format the datetime as needed
// //         };
// //       });

// //       // Update labels for StepIndicator
// //       setLabels(locationLabels);
// //     }
// //   }, [order]);

// //   const [currentPosition, setCurrentPosition] = useState(0);

// //   const onPageChange = (position) => {
// //     setCurrentPosition(position);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <SettingsHeader title={'Your Orders'} />
// //       <CustomButton title={'Invoice'}  bgColor={COLORS.DarkBlue} textColor={'white'} borderColor={COLORS.DarkBlue}/>
// //       <StepIndicator
// //         direction='vertical'
// //         customStyles={customStyles}
// //         currentPosition={currentPosition}
// //         stepCount={labels.length}
// //         labels={labels.map(loc => loc.label)} // Use only the main label for StepIndicator
// //       />
// //       {/* Optionally display sub-labels somewhere in your UI */}
// //       {labels.length > 0 && (
// //         <View style={styles.subLabelContainer}>
// //           {labels.map((loc, index) => (
// //             <View key={index} style={styles.subLabel}>
// //               <Text>{loc.label}</Text>
             
// //             </View>
// //           ))}
// //         </View>
// //       )}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     // backgroundColor: '#fff',
// //   //  alignSelf:'center'
    
// //   },
// //   subLabelContainer: {
// //     marginTop: 20,
// //     paddingHorizontal: 20,
    
// //   },
// //   subLabel: {
// //     marginBottom: 10,
// //   },
// //   subLabelText: {
// //     color: '#999999',
// //     fontSize: 12,
// //   },
// // });

// // export default TrackingScreen;
// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import StepIndicator from 'react-native-step-indicator';
// import SettingsHeader from '../../Component/Header';
// import { useRoute } from '@react-navigation/core';
// import { COLORS } from '../../config/COLORS';
// import CustomButton from '../../Component/CustomButton';

// const customStyles = {
//   stepIndicatorSize: 25,
//   currentStepIndicatorSize: 30,
//   separatorStrokeWidth: 2,
//   currentStepStrokeWidth: 3,
//   stepStrokeCurrentColor: COLORS.DarkBlue,
//   stepStrokeWidth: 3,
//   stepStrokeFinishedColor: COLORS.DarkBlue,
//   stepStrokeUnFinishedColor: '#aaaaaa',
//   separatorFinishedColor: COLORS.DarkBlue,
//   separatorUnFinishedColor: '#aaaaaa',
//   stepIndicatorFinishedColor: COLORS.DarkBlue,
//   stepIndicatorUnFinishedColor: '#ffffff',
//   stepIndicatorCurrentColor: '#ffffff',
//   stepIndicatorLabelFontSize: 13,
//   currentStepIndicatorLabelFontSize: 13,
//   stepIndicatorLabelCurrentColor: COLORS.DarkBlue,
//   stepIndicatorLabelFinishedColor: '#ffffff',
//   stepIndicatorLabelUnFinishedColor: '#aaaaaa',
//   labelColor: '#999999',
//   labelSize: 13,
//   currentStepLabelColor: COLORS.DarkBlue
// };

// const TrackingScreen = () => {
//   const route = useRoute();
//   const { order } = route.params;
//   const [labels, setLabels] = useState([]);
//   const [currentPosition, setCurrentPosition] = useState(0);

//   useEffect(() => {
//     if (order && order.message) {
//       const steps = [];
//       let position = 0;

//       if (order.message.orderConfirmed) {
//         steps.push('Order Confirmed');
//         position = 0; // First step: Order Confirmed
//       }

//       if (order.message.shipped) {
//         steps.push('Shipped');
//         position = 1; // Second step: Shipped
//       }

//       if (order.message.inTransit) {
//         steps.push('In Transit');
//         position = 2; // Third step: In Transit
//       }

//       if (order.message.delivered) {
//         steps.push('Delivered');
//         position = 3; // Final step: Delivered
//       }

//       setLabels(steps);
//       setCurrentPosition(position);
//     }
//   }, [order]);

//   const renderLabel = ({ position, stepStatus, label }) => {
//     const isInTransit = label === 'In Transit';
//     return (
//       <View style={[styles.labelContainer, isInTransit && styles.inTransitContainer]}>
//         <Text style={[styles.label, isInTransit && styles.inTransitLabel]}>{label}</Text>
//         {isInTransit && order.message.location && (
//           <View style={styles.subLabelContainer}>
//             {order.message.location.map((loc, index) => (
//               <Text key={index} style={styles.subLabel}>
//                 Location: {loc.location}, Time: {new Date(loc.datetime).toLocaleString()}
//               </Text>
//             ))}
//           </View>
//         )}
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <SettingsHeader title={'Your Orders'} />
//       <CustomButton title={'Invoice'} bgColor={COLORS.DarkBlue} textColor={'white'} borderColor={COLORS.DarkBlue} />
      
//       <StepIndicator
//         direction="vertical"
//         customStyles={customStyles}
//         currentPosition={currentPosition}
//         stepCount={labels.length}
//         labels={labels}
//         renderLabel={renderLabel}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // paddingHorizontal: 20,
//     // paddingVertical: 10,
//   },
//   labelContainer: {
//     // flexDirection: 'row', // Default for other labels
//     // alignItems: 'center',
//     marginLeft: 10,
//   },
//   inTransitContainer: {
//     // flexDirection: 'column', // Aligns In Transit label and sub-labels vertically
//     // alignItems: 'flex-start', // Align to the left
//   },
//   label: {
//     color: COLORS.DarkBlue,
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   inTransitLabel: {
//     marginBottom: 5, // Space below In Transit label
//   },
//   subLabelContainer: {
//     marginTop: 5, // Space between In Transit label and sub-labels
//   },
//   subLabel: {
//     color: '#666666',
//     fontSize: 12,
//   },
// });

// export default TrackingScreen;

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/core';
import CustomStepIndicator from '../../Component/stepIndicator';
import SettingsHeader from '../../Component/Header';
import CustomButton from '../../Component/CustomButton';
import { COLORS } from '../../config/COLORS';

const TrackingScreen = () => {
  const route = useRoute();
  const { order } = route.params;
  const [currentPosition, setCurrentPosition] = useState(0);
  const [stepDetails, setStepDetails] = useState([]);
  const [steps, setSteps] = useState([]);
console.log(order,"TRACKING")
  useEffect(() => {
  
    if (order && order.message) {
      const stepLabels = [];
      const details = [];
      let position = 0;

      if (order.message.orderConfirmed) {
        stepLabels.push('Order Confirmed');
        details.push([]);
        position = 0;
      }
     
      if (order.message.inTransit) {
        stepLabels.push('In Transit');
        details.push(
          order.message.location.map(
            loc => `Location: ${loc.location}, Time: ${new Date(loc.datetime).toLocaleString()}`
          )
        );
        position = 1;
      }

      if (order.message.shipped) {
        stepLabels.push('Shipped');
        details.push([]);
        position = 2;
      }

     

      if (order.message.delivered) {
        stepLabels.push('Delivered');
        details.push([]);
        position = 3;
      }

      setSteps(stepLabels);
      setStepDetails(details);
      setCurrentPosition(position);
    }
  }, [order]);

  return (
    <View style={{ flex: 1 }}>
      <SettingsHeader title={'Tracking'}/>
      <CustomButton title={'Invoice'} onPress={() => console.log('Pressed')} bgColor={COLORS.DarkBlue} textColor={'white'} borderColor={COLORS.DarkBlue}/>
      <CustomStepIndicator steps={steps} currentPosition={currentPosition} stepDetails={stepDetails} />
    </View>
  );
};

export default TrackingScreen;
