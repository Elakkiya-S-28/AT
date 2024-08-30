// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import ICONS from '../../Images/Icon';
// import { useNavigation, useRoute } from '@react-navigation/core';
// import { ROUTES } from '../../Routes';
// import axios from 'axios';

// const Checkout = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { token, items, totalQuantity, totalItems, totalPrice } = route.params;
//   const [remainingTime, setRemainingTime] = useState(2 * 60 * 60); // 2 hours in seconds

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setRemainingTime(prevTime => {
//         if (prevTime <= 0) {
//           clearInterval(timer);
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image source={ICONS.left} style={{ tintColor: 'white', height: 24, width: 24 }} />
//         </TouchableOpacity>
//         <Text style={styles.title}>Summary</Text>
//       </View>
//       <View style={{ margin: 16 }}>
//         <View style={styles.section}>
//           <Text style={styles.sectionText}>Fabric</Text>
//           <Text style={styles.itemCount}>{totalItems} items</Text>
//         </View>

//         <View style={styles.card}>
//           <View style={styles.row}>
//             <Text style={styles.label}>ORDER NUMBER</Text>
//             <Text style={styles.value}>{items[0].orderId}</Text>
//           </View>

//           <View style={styles.row}>
//             <Text style={styles.label}>QUANTITIES</Text>
//             <Text style={styles.value}>{totalQuantity}</Text>
//           </View>

//           <View style={styles.row}>
//             <Text style={styles.label}>TOTAL PRICE</Text>
//             <Text style={styles.value}>{totalPrice}</Text>
//           </View>

//           <View style={styles.row}>
//             <Text style={styles.label}>BOOKING STATUS</Text>
//             <View style={styles.bookedContainer}>
//               <Text style={styles.bookedText}>Booked</Text>
//             </View>
//           </View>

//           <View style={{ justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
//             <View style={styles.timeContainer}>
//               <Text style={styles.timeText}>{formatTime(remainingTime)} left</Text>
//             </View>
//           </View>

//           <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate(ROUTES.Payment, { token, items, totalPrice, totalQuantity })}>
//             <Text style={styles.payText}>PAY AMOUNT</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EEF7FF',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     marginBottom: 20,
//     backgroundColor: '#1679AB',
//   },
//   title: {
//     flex: 1,
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign: 'center',
//   },
//   section: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   sectionText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   itemCount: {
//     fontSize: 16,
//     color: '#555',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   value: {
//     fontSize: 14,
//     color: '#333',
//   },
//   bookedContainer: {
//     backgroundColor: 'green',
//     borderRadius: 5,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   bookedText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   timeContainer: {
//     backgroundColor: '#1679AB',
//     borderRadius: 5,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     alignSelf: 'center',
//     padding: 15,
//   },
//   timeText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   payButton: {
//     backgroundColor: '#1679AB',
//     borderRadius: 5,
//     padding: 10,
//     alignItems: 'center',
//   },
//   payText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default Checkout;


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ICONS from '../../Images/Icon';
import { useNavigation, useRoute } from '@react-navigation/core';
import { ROUTES } from '../../Routes';
import { useTimer } from '../../Context/TimerContext'; 
import { COLORS } from '../../config/COLORS';

const Checkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { token, items, totalQuantity, totalItems, totalPrice, category ,email} = route.params;
  const { remainingTime, setRemainingTime } = useTimer();

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setRemainingTime]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ICONS.left} style={{ tintColor: 'white', height: 24, width: 24 }} />
        </TouchableOpacity>
        <Text style={styles.title}>Summary</Text>
      </View>
      <View style={{ margin: 16 }}>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Fabric</Text>
          <Text style={styles.itemCount}>{totalItems} items</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>ORDER NUMBER</Text>
            {category === 'yarn' ? (
               <Text style={styles.value}>YA {items[0].orderId}</Text>
            ) : (
              <Text style={styles.value}>FA {items[0].orderId}</Text>
            )}
           
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>QUANTITIES</Text>
            <Text style={styles.value}>{totalQuantity}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>TOTAL PRICE</Text>
            <Text style={styles.value}>{totalPrice}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>BOOKING STATUS</Text>
            <View style={styles.bookedContainer}>
              <Text style={styles.bookedText}>Booked</Text>
            </View>
          </View>

          <View style={{ justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(remainingTime)} left</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate(ROUTES.Payment, { token, items, totalPrice, totalQuantity,category, email})}>
            <Text style={styles.payText}>PAY AMOUNT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF7FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#1679AB',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  itemCount: {
    fontSize: 16,
    color: '#555',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  bookedContainer: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bookedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timeContainer: {
    backgroundColor: COLORS.DarkBlue,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'center',
    padding: 15,
  },
  timeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: COLORS.DarkBlue,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  payText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Checkout;
