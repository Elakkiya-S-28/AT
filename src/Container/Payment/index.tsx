// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
//   Linking,
//   Alert,
//   Modal,
// } from 'react-native';
// import ICONS from '../../Images/Icon';
// import {useNavigation, useRoute} from '@react-navigation/core';
// import axios from 'axios';
// import {ROUTES} from '../../Routes';
// import {API_URL} from '../../config/API';
// import SettingsHeader from '../../Component/Header';

// const Payment = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {token, items, totalPrice, totalQuantity, category, email} = route.params;
//   const order = items[0];

//   const [utrNumber, setUtrNumber] = useState('');
//   const [reportUrl, setReportUrl] = useState('');
//   const [modalopen, setModalopen] = useState(false);

//   const handleReportGeneration = async () => {
//     if (!items || items.length === 0 || !items[0].products) {
//       Alert.alert('Error', 'No items available for report generation');
//       return;
//     }

//     const reportData = {
//       orderno: items[0].orderId,
//       date: new Date().toLocaleDateString(),
//       name: items[0].userEmail,
//       UTRno: utrNumber,
//       product: items[0].products.map(product => ({
//         name: product.productName,
//         hsncode: items[0].orderId,
//         quantity: product.quantity,
//         rate: totalPrice || '0',
//         disc: '0',
//         gst: '5%',
//         packing: product.packing,
//       })),
//     };

//     try {
//       const response = await axios.post(API_URL + '/report', reportData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.data.message === 'Order updated Successfully') {
//         setModalopen(true);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to generate report');
//     }
//   };

//   const handleNav = () => {
//     navigation.navigate(ROUTES.PdfScreen, {
//       email: order.userEmail,
//       orderId: order.orderId,
//       token,
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <SettingsHeader title={'Payment'} />
//       <View style={{flexDirection:'column',justifyContent:'space-between'}}>

//      <View style={{marginTop:40, marginBottom:20}}>
//       <View style={styles.paymentDetailsSection}>
//         <Text style={styles.subHeader}>
//           ASHOK TEXTILES BANK ACCOUNT DETAILS
//         </Text>
//         <View style={styles.row}>
//           <Text style={styles.label}>BANK NAME</Text>
//           <Text style={styles.value}>INDIAN BANK</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>ACCOUNT NUMBER</Text>
//           <Text style={styles.value}>
//             {category === 'yarn' ? '443862595' : '7471513244'}
//           </Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>IFSC CODE</Text>
//           <Text style={styles.value}>IDIB000N011</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>ACCOUNT NAME</Text>
//           <Text style={styles.value}>ASHOK TEXTILES</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>BRANCH NAME</Text>
//           <Text style={styles.value}>NAMAKKAL</Text>
//         </View>
//       </View>
//       </View>

//       <View style={styles.invoiceSection}>
//         <Text style={styles.invoiceText}>
//           ORDER NUMBER: {category === 'yarn' ? 'YA' : 'FA'} {items[0].orderId}
//         </Text>
//         <Text style={styles.instructions}>
//           Once done with the payment enter the UTR No.
//         </Text>
//         <TextInput
//           style={styles.utrInput}
//           placeholder="ENTER THE UTR NO"
//           placeholderTextColor={'gray'}
//           value={utrNumber}
//           onChangeText={setUtrNumber}
//         />
//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={handleReportGeneration}>
//           <Text style={styles.submitButtonText}>Submit</Text>
//         </TouchableOpacity>
//       </View>
//       </View>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalopen}
//         onRequestClose={() => setModalopen(!modalopen)}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>
//               Order status updated successfully!!!
//             </Text>
//             <TouchableOpacity style={styles.modalButton} onPress={handleNav}>
//               <Text style={styles.modalButtonText}>OK</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     // backgroundColor: '#EEF7FF',
//   },
//   paymentDetailsSection: {
//     backgroundColor: '#FFF',
//     padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//     marginTop: 30,
//     margin: 20,
//     justifyContent: 'space-between', // Added this line
//   },
//   subHeader: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'black',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   value: {
//     fontSize: 14,
//     color: 'black',
//   },
//   invoiceSection: {
//     backgroundColor: '#FFF',
//     padding: 20,
//     marginTop:20,
//     margin:16,
//         borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'space-between', // Added this line
//   },
//   invoiceText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'black',
//   },
//   instructions: {
//     fontSize: 12,
//     marginBottom: 10,
//     color: 'black',
//   },
//   utrInput: {
//     borderWidth: 1,
//     borderColor: '#CCC',
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//     marginBottom: 10,
//     color: 'black',
//   },
//   submitButton: {
//     backgroundColor: '#CCC',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: 10,
//   },
//   submitButtonText: {
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowOffset: {width: 0, height: 2},
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 20,
//     color: 'black',
//   },
//   modalButton: {
//     backgroundColor: '#1679AB',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   modalButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default Payment;


import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/core';
import SettingsHeader from '../../Component/Header';
import {ROUTES} from '../../Routes';
import {API_URL} from '../../config/API';
import { COLORS } from '../../config/COLORS';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {token, items, totalPrice, category} = route.params;
  console.log(items,"ITEM IN PAYMENT")
  const order = items[0];

  const [utrNumber, setUtrNumber] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  console.log(typeof(utrNumber))
  // Function to update order status
  const updateOrderStatus = async () => {
    if (!utrNumber) {
      Alert.alert('Error', 'Please enter the UTR number.');
      return;
    }

    const updateOrderData = {
      status: 'QUEUED',
      orderId: order.orderId,
      UTRno: utrNumber,
    };
   
    try {
      const response = await axios.put(`${API_URL}/order/updateOrderStatus`, updateOrderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
   
    console.log(response.data,"RESPONSE DATA IN PAYMENT")
    if (response.data.message.toLowerCase() === 'order status updated successfully') {
      // await AsyncStorage.setItem('token',token),
      setModalOpen(true);
    } else {
      Alert.alert('Error', 'Failed to update order status.');
    }
    
    } catch (error) {
      if (error.response) {
        // Server responded with a status code out of the range of 2xx
        console.log('Error Response:', error.response.data);
        console.log('Error Status:', error.response.status);
        console.log('Error Headers:', error.response.headers);
        Alert.alert('Error', `Server responded with error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // Request was made but no response received
        console.log('Error Request:', error.request);
        Alert.alert('Error', 'No response from server.');
      } else {
        console.log('Error Message:', error.message);
        Alert.alert('Error', error.message);
      }
    }
    
  };

  const handleNav = () => {
    setModalOpen(false);
    navigation.navigate(ROUTES.TrackListScreen, {
      email: order.userEmail,
      orderId: order.orderId,
      token,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SettingsHeader title={'Payment'} />
      <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
        <View style={{marginTop: 40, marginBottom: 20}}>
          <View style={styles.paymentDetailsSection}>
            <Text style={styles.subHeader}>ASHOK TEXTILES BANK ACCOUNT DETAILS</Text>
            <View style={styles.row}>
              <Text style={styles.label}>BANK NAME</Text>
              <Text style={styles.value}>INDIAN BANK</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>ACCOUNT NUMBER</Text>
              <Text style={styles.value}>
                {category === 'yarn' ? '443862595' : '7471513244'}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>IFSC CODE</Text>
              <Text style={styles.value}>IDIB000N011</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>ACCOUNT NAME</Text>
              <Text style={styles.value}>ASHOK TEXTILES</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>BRANCH NAME</Text>
              <Text style={styles.value}>NAMAKKAL</Text>
            </View>
          </View>
        </View>

        <View style={styles.invoiceSection}>
          <Text style={styles.invoiceText}>
            ORDER NUMBER: {category === 'yarn' ? 'YA' : 'FA'} {items[0].orderId}
          </Text>
          <Text style={styles.instructions}>
            Once done with the payment enter the UTR No.
          </Text>
          <TextInput
            style={styles.utrInput}
            placeholder="ENTER THE UTR NO"
            placeholderTextColor={'gray'}
            value={utrNumber}
            onChangeText={setUtrNumber}
          />
          <TouchableOpacity style={styles.submitButton} onPress={updateOrderStatus}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(!modalOpen)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Order updated successfully!!!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleNav}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  paymentDetailsSection: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 30,
    margin: 20,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  value: {
    fontSize: 14,
    color: 'black',
  },
  invoiceSection: {
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: 20,
    margin: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  invoiceText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  instructions: {
    fontSize: 12,
    marginBottom: 10,
    color: 'black',
  },
  utrInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#CCC',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
  },
  modalButton: {
    backgroundColor:COLORS.DarkBlue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Payment;
