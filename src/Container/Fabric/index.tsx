// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Modal,
//   Alert,
// } from 'react-native';
// import IMAGES from '../../Images/Image';
// import ICONS from '../../Images/Icon';
// import {ROUTES} from '../../Routes';
// import {useRoute, useNavigation} from '@react-navigation/core';
// import axios from 'axios';
// import {useEffect, useState} from 'react';
// import {API_URL} from '../../config/API';
// import {COLORS} from '../../config/COLORS';

// const Fabric = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const {token, email, product} = route.params;
//   const [cartItems, setCartItems] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [openModal, setOpenModal] = useState(false);
//   const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
//   const [addOrder,setAddOrder]=useState('')
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('blur', () => {
//       setQuantities({});
//       setCartItems([]);
//     });

//     return unsubscribe;
//   }, [navigation]);

//   const handleAddToCart = productId => {
//     const quantity = quantities[productId];
//     if (!quantity) {
//       setOpenModal(true);
//       return;
//     }

//     const newProduct = {
//       productId,
//       quantity: parseInt(quantity, 10),
//     };

//     setCartItems(prevItems => [...prevItems, newProduct]);
//     setQuantities(prevQuantities => ({...prevQuantities, [productId]: ''}));
//   };

//   const handleNavigateToReview = async () => {
//     if (cartItems.length === 0) {
//       setOpenModal(true);
//       return;
//     }
  
//     const orderData = {
//       user: {
//         email: email,
//         role: 'BUYER',
//       },
//       products: cartItems.map(item => ({
//         productId: item.productId,
//         quantity: item.quantity,
//       })),
//       status: 'IN-CART',
//       // Ensure that orderId is not included in orderData
//     };
  
//     try {
//       const response = await axios.post(
//         `${API_URL}/order/addOrder`,
//         orderData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       console.log('Order Response:', response.data);
//       navigation.navigate(ROUTES.ReviewScreen, {
//         cartItems: response.data,
//         token,
//         email,
//       });
//     } catch (error) {
//       console.error(
//         'Error adding to cart:',
//         error.response?.data || error.message,
//       );
//       if (error.response?.data?.message === 'Your account is temporarily blocked. Please contact admin: +91 97551 11444.') {
//         Alert.alert('Your account is temporarily blocked', 'Please contact admin: +91 97551 11444.');
//       }
//     }
//   };
  

//   const renderHeader = () => (
//     <View style={{margin: 16}}>
//       <Text style={styles.subtitle}>In the spotlight</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             source={ICONS.left}
//             style={{tintColor: 'white', height: 24, width: 24}}
//           />
//         </TouchableOpacity>
//         <Text style={styles.header}>Fabric</Text>
//         <TouchableOpacity onPress={handleNavigateToReview}>
//           <Image
//             source={ICONS.cart}
//             style={{tintColor: 'white', height: 24, width: 24}}
//           />
//           {cartItems.length > 0 && (
//             <View style={styles.notification}>
//               <Text style={styles.notificationText}>{cartItems.length}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={product}
//         scrollEnabled={true}
//         ListHeaderComponent={renderHeader}
//         renderItem={({item}) => (
//           <View style={styles.card}>
//             <Image source={IMAGES.fabric} style={styles.productImage} />
//             <View style={styles.productInfo}>
//               <Text style={styles.productName}>{item.productName}</Text>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   placeholder="kg"
//                   placeholderTextColor={'gray'}
//                   style={styles.input}
//                   keyboardType="numeric"
//                   value={quantities[item.productId] || ''}
//                   onChangeText={text =>
//                     setQuantities({...quantities, [item.productId]: text})
//                   }
//                 />
//               </View>
//               <Text style={styles.price}>Rs. {item.gstPriceForBuyer}/kg</Text>
//             </View>
//             <View style={styles.buttonContainer}>
//               {/* <TouchableOpacity
//                 style={styles.addButton}
//                 >
//                 <Text style={styles.addButtonText}>EDIT</Text>
//               </TouchableOpacity> */}
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => handleAddToCart(item.productId)}>
//                 <Text style={styles.addButtonText}>ADD</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         keyExtractor={item => item._id}
//       />

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={openModal}
//         onRequestClose={() => {
//           setOpenModal(!openModal);
//         }}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalMessage}>Please, Add the Quantity !!</Text>
//             <View style={styles.modalButtonContainer}>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={() => setOpenModal(false)}>
//                 <Text style={styles.modalButtonText}>Ok</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={openCheckoutModal}
//         onRequestClose={() => {
//           setOpenCheckoutModal(!openCheckoutModal);
//         }}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalMessage}>
//               Please Add the Product
//             </Text>
//             <View style={styles.modalButtonContainer}>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={() => setOpenCheckoutModal(false)}>
//                 <Text style={styles.modalButtonText}>Ok</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     backgroundColor: COLORS.DarkBlue,
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: 'black',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: {width: 0, height: 1},
//     shadowRadius: 5,
//     elevation: 3,
//     margin: 16,
//     padding: 16,
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     marginRight: 16,
//   },
//   productInfo: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: '500',
//     marginBottom: 8,
//     color: 'black',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#757575',
//     borderRadius: 5,
//     width: '70%',
//     paddingHorizontal: 8,
//     marginBottom: 8,
//   },
//   input: {
//     flex: 1,
//     color: 'black',
//   },
//   price: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: 'black',
//   },
//   buttonContainer: {
//     flexDirection: 'column',
//     justifyContent: 'flex-end',
//     marginTop: 10,
//     marginBottom:10
//   },
//   addButton: {
//     backgroundColor: COLORS.DarkBlue,
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginLeft: 10,
//     marginTop:5,
//     marginBottom:5
//   },
//   addButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   modalMessage: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//     color:'black',
//     fontWeight:'bold'
//   },
//   modalButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   modalButton: {
//     backgroundColor: COLORS.DarkBlue,
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   modalButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   notification: {
//     position: 'absolute',
//     top: -10,
//     right: -10,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   notificationText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
// });

// export default Fabric;


// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Modal,
//   Alert,
// } from 'react-native';
// import IMAGES from '../../Images/Image';
// import ICONS from '../../Images/Icon';
// import {ROUTES} from '../../Routes';
// import {useRoute, useNavigation} from '@react-navigation/core';
// import axios from 'axios';
// import {useEffect, useState} from 'react';
// import {API_URL} from '../../config/API';
// import {COLORS} from '../../config/COLORS';

// const Fabric = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const {token, email, product} = route.params;
//   const [cartItems, setCartItems] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [openModal, setOpenModal] = useState(false);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('blur', () => {
//       setQuantities({});
//       setCartItems([]);
//     });

//     return unsubscribe;
//   }, [navigation]);

//   const handleAddToCart = productId => {
//     const quantity = quantities[productId];
//     if (!quantity) {
//       setOpenModal(true);
//       return;
//     }

//     const newProduct = {
//       productId,
//       quantity: parseInt(quantity, 10),
//     };

//     setCartItems(prevItems => [...prevItems, newProduct]);
//     setQuantities(prevQuantities => ({...prevQuantities, [productId]: ''}));
//   };

//   const handleNavigateToReview = async () => {
//     if (cartItems.length === 0) {
//       setOpenModal(true);
//       return;
//     }

//     const orderData = {
//       user: {
//         email: email,
//         role: 'BUYER',
//       },
//       products: cartItems.map(item => ({
//         productId: item.productId,
//         quantity: item.quantity,
//       })),
//       status: 'IN-CART',
//     };

//     try {
//       const response = await axios.post(
//         `${API_URL}/order/addOrder`,
//         orderData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       console.log('Order Response:', response.data);
//       navigation.navigate(ROUTES.ReviewScreen, {
//         cartItems: response.data,
//         token,
//         email,
//         cat:'fabric'
//       });
//     } catch (error) {
//       console.error(
//         'Error adding to cart:',
//         error.response?.data || error.message,
//       );
//       if (error.response?.data?.message === 'Your account is temporarily blocked. Please contact admin: +91 97551 11444.') {
//         Alert.alert('Your account is temporarily blocked', 'Please contact admin: +91 97551 11444.');
//       }
//     }
//   };

//   const renderHeader = () => (
//     <View style={{margin: 16}}>
//       <Text style={styles.subtitle}>In the spotlight</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
          
//           <Image
//             source={ICONS.left}
//             style={{tintColor: 'white', height: 24, width: 24}}
//           />
//         </TouchableOpacity>
//         <Text style={styles.header}>Fabric</Text>
//         <TouchableOpacity onPress={handleNavigateToReview}>
//           <Image
//             source={ICONS.cart}
//             style={{tintColor: 'white', height: 24, width: 24}}
//           />
//           {cartItems.length > 0 && (
//             <View style={styles.notification}>
//               <Text style={styles.notificationText}>{cartItems.length}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={product}
//         scrollEnabled={true}
//         ListHeaderComponent={renderHeader}
//         renderItem={({item}) => (
//           <View style={styles.card}>
//             <View>

//              <Text style={{color:'black', textAlign:'center', marginBottom:5, fontWeight:'bold'}}>Qty: {item.quantity}</Text>
//             <Image source={{uri:item.imageUrl}} style={styles.productImage} />
//             </View>
//             <View style={styles.productInfo}>
//               <Text style={styles.productName}>{item.productName}</Text>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   placeholder="kg"
//                   placeholderTextColor={'gray'}
//                   style={styles.input}
//                   keyboardType="numeric"
//                   value={quantities[item.productId] || ''}
//                   onChangeText={text =>
//                     setQuantities({...quantities, [item.productId]: text})
//                   }
//                 />
//               </View>
//               <Text style={styles.price}>Rs. {item.gstPriceForBuyer}/kg</Text>
//             </View>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => handleAddToCart(item.productId)}>
//                 <Text style={styles.addButtonText}>ADD</Text>
//               </TouchableOpacity>
             
//             </View>
           
//           </View>
//         )}
//         keyExtractor={item => item._id}
//       />

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={openModal}
//         onRequestClose={() => {
//           setOpenModal(!openModal);
//         }}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalMessage}>Please, Add the Quantity !!</Text>
//             <View style={styles.modalButtonContainer}>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={() => setOpenModal(false)}>
//                 <Text style={styles.modalButtonText}>Ok</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     backgroundColor: COLORS.DarkBlue,
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: 'black',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: {width: 0, height: 1},
//     shadowRadius: 5,
//     elevation: 3,
//     margin: 16,
//     padding: 16,
//   },
//   productImage: {
//     width: 90,
//     height: 90,
//     marginRight: 16,
//     borderRadius:6
//   },
//   productInfo: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: '500',
//     marginBottom: 8,
//     color: 'black',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#757575',
//     borderRadius: 5,
//     width: '70%',
//     paddingHorizontal: 8,
//     marginBottom: 8,
//   },
//   input: {
//     flex: 1,
//     color: 'black',
//   },
//   price: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: 'black',
//   },
//   buttonContainer: {
//     flexDirection: 'column',
//     justifyContent: 'flex-end',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   addButton: {
//     backgroundColor: COLORS.DarkBlue,
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginLeft: 10,
//     marginTop: 5,
//     marginBottom: 5,
//   },
//   addButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   modalMessage: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   modalButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     width: '100%',
//   },
//   modalButton: {
//     backgroundColor: COLORS.DarkBlue,
//     borderRadius: 5,
//     padding: 10,
//     marginHorizontal: 5,
//   },
//   modalButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   notification: {
//     position: 'absolute',
//     top: -5,
//     right: -5,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   notificationText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
// });

// export default Fabric;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  RefreshControl,  // Import RefreshControl
} from 'react-native';
import IMAGES from '../../Images/Image';
import ICONS from '../../Images/Icon';
import { ROUTES } from '../../Routes';
import { useRoute, useNavigation } from '@react-navigation/core';
import axios from 'axios';
import { API_URL } from '../../config/API';
import { COLORS } from '../../config/COLORS';

const Fabric = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { token, email , user} = route.params;
  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
  console.log(product,"PRODUCT......", user)
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setQuantities({});
      setCartItems([]);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.post(
          API_URL + '/user/getCategory',
          { category:user }, // Make sure 'category' is defined in the outer scope
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(response.data.message, 'Response from mainscreen');
        setProduct(response.data.message);
      } catch (error) {
        console.log(error, "ERROR IN FETCH CAT", error.response?.data);
      }
    };
  
    if (token ) { 
      fetchCategory();
    }
  }, [token]); 
  
  const refreshData = async () => {
    setRefreshing(true);  // Start refreshing

    try {
      // Fetch the updated product list or any relevant data
      const response = await axios.get(`${API_URL}/product/getProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Assuming 'product' needs to be updated
      setProduct(response.data.products);  // Update with the new data
    } catch (error) {
      console.error('Error refreshing data:', error.message);
    } finally {
      setRefreshing(false);  // End refreshing
    }
  };

  const handleAddToCart = (productId) => {
    const quantity = quantities[productId];
    if (!quantity) {
      setOpenModal(true);
      return;
    }

    const newProduct = {
      productId,
      quantity: parseInt(quantity, 10),
    };

    setCartItems(prevItems => [...prevItems, newProduct]);
    setQuantities(prevQuantities => ({ ...prevQuantities, [productId]: '' }));
  };

  const handleNavigateToReview = async () => {
    if (cartItems.length === 0) {
      setOpenModal(true);
      return;
    }

    const orderData = {
      user: {
        email: email,
        role: 'BUYER',
      },
      products: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      status: 'IN-CART',
    };

    try {
      const response = await axios.post(
        `${API_URL}/order/addOrder`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Order Response:', response.data);
      navigation.navigate(ROUTES.ReviewScreen, {
        cartItems: response.data,
        token,
        email,
        cat: 'fabric'
      });
    } catch (error) {
      console.error(
        'Error adding to cart:',
        error.response?.data || error.message,
      );
      if (error.response?.data?.message === 'Your account is temporarily blocked. Please contact admin: +91 97551 11444.') {
        Alert.alert('Your account is temporarily blocked', 'Please contact admin: +91 97551 11444.');
      }
    }
  };

  const renderHeader = () => (
    <View style={{ margin: 16 }}>
      <Text style={styles.subtitle}>In the spotlight</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={ICONS.left}
            style={{ tintColor: 'white', height: 24, width: 24 }}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Fabric</Text>
        <TouchableOpacity onPress={handleNavigateToReview}>
          <Image
            source={ICONS.cart}
            style={{ tintColor: 'white', height: 24, width: 24 }}
          />
          {cartItems.length > 0 && (
            <View style={styles.notification}>
              <Text style={styles.notificationText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <FlatList
        data={product}
        scrollEnabled={true}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={{ color: 'black', textAlign: 'center', marginBottom: 5, fontWeight: 'bold' }}>Qty: {item.quantity}</Text>
              <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.productName}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="kg"
                  placeholderTextColor={'gray'}
                  style={styles.input}
                  keyboardType="numeric"
                  value={quantities[item.productId] || ''}
                  onChangeText={text =>
                    setQuantities({ ...quantities, [item.productId]: text })
                  }
                />
              </View>
              <Text style={styles.price}>Rs. {item.gstPriceForBuyer}/kg</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(item.productId)}>
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshData}
          />
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(!openModal);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalMessage}>Please, Add the Product !!</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setOpenModal(false)}>
                <Text style={styles.modalButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: COLORS.DarkBlue,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
    margin: 16,
    padding: 16,
  },
  productImage: {
    width: 90,
    height: 90,
    marginRight: 16,
    borderRadius: 6,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 5,
    width: '70%',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    color: 'black',
  },
  price: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: COLORS.DarkBlue,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  notification: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  modalButtonContainer: {
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: COLORS.DarkBlue,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Fabric;
