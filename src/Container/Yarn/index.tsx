// // import React, { useState } from 'react';
// // import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
// // import IMAGES from '../../Images/Image';
// // import ICONS from '../../Images/Icon';
// // import { ROUTES } from '../../Routes';
// // import axios from 'axios';
// // import { useRoute } from '@react-navigation/core';

// // const Yarn = ({ navigation }) => {
// //   const route = useRoute();
// //   const { token, email } = route.params;
// //   const [cartItems, setCartItems] = useState([]);

// //   const handleAddToCart = async (productId, quantity) => {
// //     const orderData = {
// //       user: {
// //         email: email,
// //         role: 'BUYER'
// //       },
// //       products: [
// //         {
// //           productId,
// //           quantity
// //         }
// //       ],
// //       status: 'IN-CART',
// //       orderId: 37
// //     };
// //     console.log(orderData, "OrderData");

// //     try {
// //       const response = await axios.post(
// //         'http://3.82.35.124:3001/order/addOrder',
// //         orderData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       );
// //       console.log('Order Response:', response.data);
// //       setCartItems([...cartItems, { productId, quantity }]);
// //     } catch (error) {
// //       console.error('Error adding to cart:', error);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.headerContainer}>
// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Image source={ICONS.left} style={{ tintColor: 'white', height: 24, width: 24 }} />
// //         </TouchableOpacity>
// //         <Text style={styles.header}>Yarn</Text>
// //         <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ReviewScreen, { cartItems, token, email })}>
// //           <Image source={ICONS.cart} style={{ tintColor: 'white', height: 24, width: 24 }} />
// //           {cartItems.length > 0 && (
// //             <View style={styles.notification}>
// //               <Text style={styles.notificationText}>{cartItems.length}</Text>
// //             </View>
// //           )}
// //         </TouchableOpacity>
// //       </View>
// //       <View style={{ margin: 16 }}>
// //         <Text style={styles.subtitle}>In the spotlight</Text>
// //         <FlatList
// //           data={products}
// //           renderItem={({ item }) => (
// //             <View style={styles.card}>
// //               <View style={styles.imageContainer}>
// //                 <Image source={item.image} style={styles.productImage} />
// //                 <View style={styles.discountBox}>
// //                   <Text style={styles.discount}>{item.discount}</Text>
// //                 </View>
// //               </View>
// //               <View style={styles.productInfo}>
// //                 <Text style={styles.productName}>{item.name}</Text>
// //                 <View style={styles.inputContainer}>
// //                   <Text style={styles.unit}>kg</Text>
// //                   <TextInput
// //                     placeholder="0"
// //                     style={styles.input}
// //                     keyboardType="numeric"
// //                   />
// //                 </View>
// //                 <View style={{ flexDirection: 'row' }}>
// //                   <Text style={styles.price}>Rs. {item.price}/kg</Text>
// //                   <TouchableOpacity
// //                     style={styles.addButton}
// //                     onPress={() => handleAddToCart(item.id, 10)}  // Set quantity dynamically as needed
// //                   >
// //                     <Text style={styles.addButtonText}>ADD</Text>
// //                   </TouchableOpacity>
// //                 </View>
// //               </View>
// //             </View>
// //           )}
// //           keyExtractor={item => item.id.toString()}
// //         />
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor:'#EEF7FF',
// //     // backgroundColor: '#F8E7E1',
// //   },
// //   headerContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     marginBottom: 16,
// //     // backgroundColor: '#FF7F7F',
// //     backgroundColor: '#1679AB',
// //     padding: 20,
// //   },
// //   header: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: 'white',
// //   },
// //   subtitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 16,
// //     color: 'black',
// //   },
// //   card: {
// //     backgroundColor: 'white',
// //     borderRadius: 10,
// //     padding: 16,
// //     marginBottom: 16,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowRadius: 5,
// //     elevation: 3,
// //   },
// //   imageContainer: {
// //     position: 'relative',
// //   },
// //   productImage: {
// //     width: 80,
// //     height: 80,
// //     borderRadius: 10,
// //     marginRight: 16,
// //   },
// //   discountBox: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     backgroundColor: 'red',
// //     borderTopLeftRadius: 10,
// //     borderBottomRightRadius: 10,
// //     padding: 4,
// //   },
// //   discount: {
// //     color: 'white',
// //     fontWeight: 'bold',
// //     fontSize: 12,
// //   },
// //   productInfo: {
// //     flex: 1,
// //   },
// //   productName: {
// //     fontSize: 18,
// //     fontWeight: '500',
// //     marginVertical: 8,
// //     color: 'black',
// //   },
// //   inputContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderWidth: 1,
// //     borderColor: '#757575',
// //     borderRadius: 5,
// //     width: '50%',
// //     paddingHorizontal: 8,
// //     paddingVertical: 5,
// //     marginBottom: 8,
// //   },
// //   input: {
// //     flex: 1,
// //     color: 'black',
// //   },
// //   unit: {
// //     color: 'gray',
// //     marginLeft: 4,
// //   },
// //   price: {
// //     fontSize: 16,
// //     marginBottom: 8,
// //     color: 'black',
// //     marginTop: 5,
// //   },
// //   addButton: {
// //     backgroundColor: '#FF4D4D',
// //     borderRadius: 5,
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //     marginLeft: 20,
// //   },
// //   addButtonText: {
// //     color: 'white',
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// //   notification: {
// //     position: 'absolute',
// //     top: -10,
// //     right: -10,
// //     backgroundColor: 'red',
// //     borderRadius: 10,
// //     width: 20,
// //     height: 20,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   notificationText: {
// //     color: 'white',
// //     fontSize: 12,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default Yarn;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import IMAGES from '../../Images/Image';
import ICONS from '../../Images/Icon';
import {ROUTES} from '../../Routes';
import {useRoute, useNavigation} from '@react-navigation/core';
import axios from 'axios';
import {API_URL} from '../../config/API';
import {COLORS} from '../../config/COLORS';

const Yarn = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {token, email, user} = route.params;

  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);

  // Clear cart and quantities when the component is blurred
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setQuantities({});
      setCartItems([]);
    });

    return unsubscribe;
  }, [navigation]);

  // Fetch product categories
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.post(
          API_URL + '/user/getCategory',
          { category: user },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        setProduct(response.data.message);
      } catch (error) {
        console.log('Error fetching category:', error.response?.data);
      }
    };

    if (token) {
      fetchCategory();
    }
  }, [token]);

  // Handle adding product to cart
  const handleAddToCart = productId => {
    const quantity = quantities[productId];
    
    if (!quantity || quantity <= 0) {
      Alert.alert('Invalid Quantity', 'Please enter a valid quantity.');
      return;
    }

    const existingProduct = cartItems.find(item => item.productId === productId);
    
    // Update quantity if product is already in the cart
    if (existingProduct) {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.productId === productId ? { ...item, quantity: parseInt(quantity) } : item
        )
      );
    } else {
      // Add new product to the cart
      const newProduct = {
        productId,
        quantity: parseInt(quantity),
      };
      setCartItems(prevItems => [...prevItems, newProduct]);
    }

    // Clear the quantity input for the added product
    setQuantities(prevQuantities => ({ ...prevQuantities, [productId]: '' }));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setOpenCheckoutModal(true);
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
        API_URL + '/order/addOrder',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // Navigate to review screen with the cart items
      navigation.navigate(ROUTES.ReviewScreen, {
        cartItems: response.data,
        token,
        email,
        cat: 'yarn',
      });
    } catch (error) {
      console.error('Error during checkout:', error.response?.data);
      Alert.alert('Error', 'Failed to place the order.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={ICONS.left}
            style={{tintColor: 'white', height: 24, width: 24}}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Yarn</Text>
        <TouchableOpacity onPress={handleCheckout}>
          <Image
            source={ICONS.cart}
            style={{tintColor: 'white', height: 24, width: 24}}
          />
          {cartItems.length > 0 && (
            <View style={styles.notification}>
              <Text style={styles.notificationText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{margin: 16}}>
          <Text style={styles.subtitle}>In the spotlight</Text>
          <FlatList
            data={product}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image source={{uri: item.imageUrl}} style={styles.productImage} />
                  <Text style={{ color: 'black', textAlign: 'center', marginBottom: 5, fontWeight: 'bold' }}>
                    Qty: {item.quantity}
                  </Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.productName}</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Enter quantity"
                      placeholderTextColor={'gray'}
                      style={styles.input}
                      keyboardType="numeric"
                      value={quantities[item.productId] || ''}
                      onChangeText={text => setQuantities({...quantities, [item.productId]: text})}
                    />
                  </View>
                  <Text style={styles.price}>Rs. {item.gstPriceForBuyer}/m</Text>
                </View>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddToCart(item.productId)}>
                  <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item._id}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openCheckoutModal}
        onRequestClose={() => setOpenCheckoutModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalMessage}>
              Please Add the Product
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setOpenCheckoutModal(false)}>
              <Text style={styles.modalButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#EEF7FF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    // backgroundColor: '#1679AB',
    backgroundColor:COLORS.DarkBlue,
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
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  discountBox: {
    position: 'absolute',
    top: 19.5,
    left: 0,
    backgroundColor: 'red',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 4,
  },
  discount: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 8,
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
  unit: {
    color: 'gray',
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
    marginRight: 10,
  },
  addButton: {
    // backgroundColor: '#FF4D4D',
    backgroundColor: COLORS.DarkBlue,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop:5,
    marginBottom:5
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color:'black',
    fontWeight:'bold'
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    backgroundColor: COLORS.DarkBlue,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  notification: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom:10
  },
});

export default Yarn;


// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import IMAGES from '../../Images/Image';
// import ICONS from '../../Images/Icon';
// import {ROUTES} from '../../Routes';
// import {useRoute, useNavigation} from '@react-navigation/core';
// import axios from 'axios';
// import {API_URL} from '../../config/API';
// import {COLORS} from '../../config/COLORS';

// const Yarn = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const {token, email, product} = route.params;
//   const [cartItems, setCartItems] = useState([]);
//   const [quantities, setQuantities] = useState({});
  
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('blur', () => {
//       setQuantities({});
//       setCartItems([]);
//     });

//     return unsubscribe;
//   }, [navigation]);

//   const handleAddToCart = async productId => {
//     const quantity = quantities[productId];
//     if (!quantity) {
//       Alert.alert('Quantity is required');
//       return;
//     }
  
//     const orderData = {
//       user: {
//         email: email,
//         role: 'BUYER',
//       },
//       products: [
//         {
//           productId,
//           quantity: parseInt(quantity, 10),
//         },
//       ],
//       status: 'IN-CART',
//     };
  
//     try {
//       const response = await axios.post(
//         API_URL + '/order/addOrder',
//         orderData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       console.log('Order Response:', response.data);
//       setCartItems([...cartItems, {productId, quantity: parseInt(quantity, 10), cat:}]);
//     } catch (error) {
//       console.error('Error adding to cart:', error.response.data);
//       if (error.response.data.message === 'Your account is temporarily blocked. Please contact admin: +91 97551 11444.') {
//         Alert.alert('Your account is temporarily blocked', 'Please contact admin: +91 97551 11444.');
//       } else {
//         Alert.alert(error.response.data.message);
//       }
//     }
//   };
  

//   const category = product.length > 0 ? product[0].category : '';

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image source={ICONS.left} style={{tintColor: 'white', height: 24, width: 24}} />
//         </TouchableOpacity>
//         <Text style={styles.header}>Yarn</Text>
//         <TouchableOpacity
//           onPress={() => navigation.navigate(ROUTES.ReviewScreen, {
//             cartItems,
//             token,
//             email,
//             category,
//           })}
//         >
//           <Image source={ICONS.cart} style={{tintColor: 'white', height: 24, width: 24}} />
//           {cartItems.length > 0 && (
//             <View style={styles.notification}>
//               <Text style={styles.notificationText}>{cartItems.length}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={{margin: 16}}>
//           <Text style={styles.subtitle}>In the spotlight</Text>
//           <FlatList
//             data={product}
//             renderItem={({item}) => (
//               <View style={styles.card}>
//                 <View style={styles.imageContainer}>
//                   <Image source={IMAGES.yarn} style={styles.productImage} />
//                 </View>
//                 <View style={styles.productInfo}>
//                   <Text style={styles.productName}>{item.productName}</Text>
//                   <View style={styles.inputContainer}>
//                     <TextInput
//                       placeholder="kg"
//                       placeholderTextColor={'gray'}
//                       style={styles.input}
//                       keyboardType="numeric"
//                       value={quantities[item.productId]}
//                       onChangeText={value =>
//                         setQuantities({...quantities, [item.productId]: value})
//                       }
//                     />
//                   </View>
//                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                     <Text style={styles.price}>Rs. {item.price}/kg</Text>
//                     <TouchableOpacity
//                       style={styles.addButton}
//                       onPress={() => handleAddToCart(item.productId)}
//                     >
//                       <Text style={styles.addButtonText}>ADD</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             )}
//             keyExtractor={item => item.productId.toString()}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EEF7FF',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     backgroundColor: '#1679AB',
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
//     padding: 16,
//     marginBottom: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: {width: 0, height: 1},
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   productImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     marginRight: 16,
//   },
//   productInfo: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: '500',
//     marginVertical: 8,
//     color: 'black',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#757575',
//     borderRadius: 5,
//     width: '50%',
//     paddingHorizontal: 8,
//     paddingVertical: 5,
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
//     marginTop: 5,
//   },
//   addButton: {
//     backgroundColor: '#FF4D4D',
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginLeft: 20,
//   },
//   addButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
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

// export default Yarn;
