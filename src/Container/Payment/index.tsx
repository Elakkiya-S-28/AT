// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Linking } from 'react-native';
// import ICONS from '../../Images/Icon';
// import { useNavigation, useRoute } from '@react-navigation/core';
// import axios from 'axios';

// const Payment = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { token, items } = route.params;
//   console.log(token, "Token from payment");
//   console.log(items, "ITEMS FROM PAYMENT");
//   const [orderDetails, setOrderDetails] = useState([]);
//   const [utrNumber, setUtrNumber] = useState('');
//   const [reportUrl, setReportUrl] = useState('');

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axios.put(
//           'http://3.82.35.124:3001/order/updateOrderStatus',
//           {
//             "status": "IN-CART",
//             "orderId":1,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//         console.log('Response from updateOrderStatus:', response.data.message);
//         setOrderDetails(response.data.message); 
//         // Assume reportUrl comes from the response
//         setReportUrl(response.data.reportUrl || '');
//       } catch (error) {
//         console.error('Error fetching order details:', error.response?.data || error.message);
//       }
//     };

//     fetchOrderDetails();
//   }, [token, items.orderId, items.status]);

//   const downloadReport = () => {
//     if (reportUrl) {
//       Linking.openURL(reportUrl);
//     } else {
//       console.log('Report URL is not available');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image source={ICONS.left} style={{ tintColor: 'white', height: 24, width: 24 }} />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Payment Option</Text>
//       </View>
//       <View style={styles.paymentDetailsSection}>
//         <Text style={styles.subHeader}>ASHOK TEXTILES BANK ACCOUNT DETAILS</Text>
//         <View style={styles.row}>
//           <Text style={styles.label}>BANK NAME</Text>
//           <Text style={styles.value}>INDIAN BANK</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>ACCOUNT NUMBER</Text>
//           <Text style={styles.value}>7471513244</Text>
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

//       <View style={styles.invoiceSection}>
//         <Text style={styles.invoiceText}>INVOICE NUMBER : 27734</Text>
//         <Text style={styles.instructions}>Once done with the payment enter the UTR No.</Text>
//         <TextInput
//           style={styles.utrInput}
//           placeholder="ENTER THE UTR NO"
//           placeholderTextColor={'gray'}
//           value={utrNumber}
//           onChangeText={setUtrNumber}
//         />
//         <TouchableOpacity style={styles.submitButton}>
//           <Text style={styles.submitButtonText}>Submit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.downloadButton} onPress={downloadReport}>
//           <Text style={styles.downloadButtonText}>DOWNLOAD INVOICE</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#EEF7FF',
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 20,
//     backgroundColor: '#1679AB',
//     padding: 20,
//     flexDirection: 'row'
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//     marginLeft: 20,
//   },
//   paymentDetailsSection: {
//     backgroundColor: '#FFF',
//     padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//     marginTop: 30,
//     margin: 20,
//   },
//   subHeader: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'black',
//   },
//   invoiceSection: {
//     backgroundColor: '#FFF',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
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
//   downloadButton: {
//     backgroundColor: '#1679AB',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     width: '100%',
//   },
//   downloadButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default Payment;


import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Linking, Alert, Modal } from 'react-native';
import ICONS from '../../Images/Icon';
import { useNavigation, useRoute } from '@react-navigation/core';
import axios from 'axios';
import { ROUTES } from '../../Routes';

const Payment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { token, items,totalPrice,totalQuantity,category,email} = route.params;
  console.log(items, "Token from payment");
  const order = items[0];
  console.log(items[0].userEmail,items[0].orderId,"ITEMSSS");
  console.log(items[0].products, "ITEMS FROM PAYMENT");
  console.log(totalPrice,totalQuantity,"TOTALPRICE QUANTITY")
  const [utrNumber, setUtrNumber] = useState('');
  const [reportUrl, setReportUrl] = useState('');
  const [modalopen, setModalopen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // const fetchOrderDetails = async () => {
  //   try {
  //     const response = await axios.put(
  //       'http://3.82.35.124:3001/order/updateOrderStatus',
  //       {
  //         status: "IN-CART",
  //         orderId: items[0].orderId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  //     console.log('Response from updateOrderStatus:', response.data);
  //     if (response.data.status === 200) {
  //       setModalVisible(true); // Show success modal
  //     }
  //   } catch (error) {
  //     console.error('Error fetching order details:', error.response?.data || error.message);
  //   }
  // };
 
  // useEffect ( () =>{
  //   fetchOrderDetails();
  // },[])
  const handleReportGeneration = async () => {
    if (!items || items.length === 0 || !items[0].products) {
      Alert.alert('Error', 'No items available for report generation');
      return;
    }

    const reportData = {
      orderno: items[0].orderId,
      date: new Date().toLocaleDateString(),
      name: items[0].userEmail,
      UTRno: utrNumber,
      product: items[0].products.map(product => ({
        name: product.productName,
        // hsncode: product.hsnCode || 'N/A',
        hsncode:items[0].orderId,
        quantity: product.quantity,
        rate: totalPrice|| '0',
        disc: '0',
        gst: '5%',
        packing: product.packing,
      })),
    };

    try {
      const response = await axios.post(
        'http://3.82.35.124:3001/report',
        reportData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Report generated:', response.data);
     if(response.data.message === 'Order updated Successfully'){
      setModalopen(true)
      console.log("dkadsklj")
     }
 
      // if (docURL) {
      //   setReportUrl(docURL);
      //   Alert.alert('Success', 'Report generated successfully');
      // } else {
      //   Alert.alert('Error', 'Report URL is not available');
      // }
    } catch (error) {
      console.error('Error generating report:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to generate report');
    }
  };

  // const downloadReport = () => {
  //   if (reportUrl) {
  //     Linking.openURL(reportUrl);
  //   } else {
  //     console.log('Report URL is not available');
  //   }
  // };

  const handleNav = () => {
    navigation.navigate(ROUTES.PdfScreen,{
      email: order.userEmail,
      orderId: order.orderId,
      token
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ICONS.left} style={{ tintColor: 'white', height: 24, width: 24 }} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment Option</Text>
      </View>
      {category === 'yarn' ? (
         <View style={styles.paymentDetailsSection}>
         <Text style={styles.subHeader}>ASHOK TEXTILES BANK ACCOUNT DETAILS</Text>
         <View style={styles.row}>
           <Text style={styles.label}>BANK NAME</Text>
           <Text style={styles.value}>INDIAN BANK</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.label}>ACCOUNT NUMBER</Text>
           <Text style={styles.value}>443862595</Text>
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
      ) : (
         <View style={styles.paymentDetailsSection}>
         <Text style={styles.subHeader}>ASHOK TEXTILES BANK ACCOUNT DETAILS</Text>
         <View style={styles.row}>
           <Text style={styles.label}>BANK NAME</Text>
           <Text style={styles.value}>INDIAN BANK</Text>
         </View>
         <View style={styles.row}>
           <Text style={styles.label}>ACCOUNT NUMBER</Text>
           <Text style={styles.value}>7471513244</Text>
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
 
      )}
     

      <View style={styles.invoiceSection}>
        {category === 'yarn' ? (
          <Text style={styles.invoiceText}>ORDER NUMBER: YA {items[0].orderId}</Text>
        ) : (
          <Text style={styles.invoiceText}>ORDER NUMBER: FA {items[0].orderId}</Text>
        )}
        
        <Text style={styles.instructions}>Once done with the payment enter the UTR No.</Text>
        <TextInput
          style={styles.utrInput}
          placeholder="ENTER THE UTR NO"
          placeholderTextColor={'gray'}
          value={utrNumber}
          onChangeText={setUtrNumber}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleReportGeneration}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.downloadButton} onPress={downloadReport}>
          <Text style={styles.downloadButtonText}>DOWNLOAD INVOICE</Text>
        </TouchableOpacity> */}
      </View>
     
      {/* Success Modal */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Order status updated successfully!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalopen}
        onRequestClose={() => {
          setModalVisible(!modalopen);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Order status updated successfully!!!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleNav}
            >
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
    backgroundColor: '#EEF7FF',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1679AB',
    padding: 20,
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
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
  invoiceSection: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
  downloadButton: {
    backgroundColor: '#1679AB',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  downloadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    // width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#1679AB',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Payment;
