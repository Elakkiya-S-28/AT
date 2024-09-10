// // import React, { useEffect, useState } from 'react';
// // import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
// // import IMAGES from '../../Images/Image';
// // import ICONS from '../../Images/Icon';
// // import { ROUTES } from '../../Routes';
// // import { useRoute } from '@react-navigation/core';
// // import axios from 'axios';

// // const ReviewScreen = ({ navigation }) => {
// //   const route = useRoute();
// //   const { token, email, cartItems } = route.params;
// //   const [orderDetails, setOrderDetails] = useState([]);
// //   console.log(cartItems,"CARTITEMS")
// //   const fetchAddOrder = async () => {

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
// //       console.log('Order Responsesss:', response);

// //     } catch (error) {
// //       console.error('Error adding to cart:', error);
// //     }
// //   }

// //   const fetchOrderDetails = async () => {
// //     try {
// //       const response = await axios.post(
// //         'http://3.82.35.124:3001/user/getOrderDetails',
// //         {
// //           status: 'IN-CART',
// //           email: email,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       );
// //       console.log(response.data.message, "loggg");
// //       console.log(response.data.message[0].products, "MEssage");
// //       setOrderDetails(response.data.message);
// //     } catch (error) {
// //       console.error('Error fetching order details:', error.response?.data || error.message);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrderDetails();
// //     fetchAddOrder();
// //   }, [token, email]);

// //   const handleDelete = async (orderId) => {
// //     try {
// //       await axios.delete(`http://3.82.35.124:3001/order/deleteOrders?id=${orderId}`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       // Fetch updated order details after successful deletion
// //       fetchOrderDetails();
// //       Alert.alert('Success', 'Item deleted successfully');
// //     } catch (error) {
// //       console.error('Error deleting item:', error.response?.data || error.message);
// //       Alert.alert('Error', 'Failed to delete item');
// //     }
// //   };

// //   const totalQuantity = orderDetails.reduce((sum, order) => {
// //     return sum + order.products.reduce((orderSum, product) => orderSum + product.quantity, 0);
// //   }, 0);

// //   const totalPrice = orderDetails.reduce((sum, order) => {
// //     return sum + order.totalPrice;
// //   }, 0);

// //   const totalItems = orderDetails.length;

// //   const navigateToCheckout = () => {
// //     navigation.navigate(ROUTES.Checkout, {
// //       items: orderDetails,
// //       totalQuantity: totalQuantity,
// //       totalPrice: totalPrice,
// //       token: token,
// //       totalItems: totalItems,
// //     });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.headerContainer}>
// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Image source={ICONS.left} style={{ tintColor: 'white', height: 24, width: 24 }} />
// //         </TouchableOpacity>
// //         <Text style={styles.header}>Review Basket</Text>
// //         <Text style={styles.itemCount}>{totalItems} items</Text>
// //       </View>
// //       {/* <View style={{marginBottom:10}}> */}
// //       <FlatList
// //         data={orderDetails}
// //         renderItem={({ item }) => (
// //           <View style={styles.card}>
// //             <View style={styles.imageContainer}>
// //               <Image source={IMAGES.fabric} style={styles.productImage} />
// //               <View style={styles.discountBox}>
// //                 <Text style={styles.discount}>30% OFF</Text>
// //               </View>
// //             </View>
// //             <View style={styles.productInfo}>
// //               <Text style={styles.productName}>Order ID: {item.orderId}</Text>
// //               {item.products.map((product, index) => (
// //                 <View key={index}>
// //                   <Text style={{ color: 'black', fontWeight: 'bold' }}>Product Name: {product.productName}</Text>
// //                   <Text style={{ color: 'black', fontWeight: 'bold' }}>Quantity: {product.quantity}</Text>
// //                 </View>
// //               ))}
// //               <Text style={styles.price}>Total Price: ₹ {item.totalPrice}</Text>
// //             </View>
// //             <TouchableOpacity
// //               style={styles.deleteButton}
// //               onPress={() => handleDelete(item.orderId)}
// //             >
// //               <Image source={ICONS.delete} style={styles.deleteIcon} />
// //             </TouchableOpacity>
// //           </View>
// //         )}
// //         keyExtractor={item => item._id}
// //       />
// //       {/* </View> */}
// //       <View style={styles.fixedFooter}>
// //         <Text style={styles.totalPrice}>Total Price: ₹ {totalPrice}</Text>
// //         <Text style={styles.totalQuantity}>Total Quantity: {totalQuantity}</Text>
// //         <TouchableOpacity style={styles.checkoutButton} onPress={navigateToCheckout}>
// //           <Text style={styles.checkoutButtonText}>Checkout</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#EEF7FF',
// //   },
// //   headerContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     padding: 16,
// //     backgroundColor: '#1679AB',
// //   },
// //   header: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#FFF',
// //   },
// //   itemCount: {
// //     fontSize: 16,
// //     color: '#FFF',
// //   },
// //   card: {
// //     flexDirection: 'row',
// //     padding: 16,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#DDD',
// //     position: 'relative',
// //   },
// //   imageContainer: {
// //     position: 'relative',
// //   },
// //   productImage: {
// //     width: 80,
// //     height: 80,
// //     borderRadius: 10,
// //     marginRight: 16,
// //     marginTop:0
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
// //     justifyContent: 'center',
// //     paddingBottom:8,
// //   },
// //   productName: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     marginBottom: 8,
// //     color: 'gray',
// //   },
// //   quantity: {
// //     fontSize: 14,
// //     marginBottom: 8,
// //     color: 'black',
// //   },
// //   price: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: 'black',
// //   },
// //   deleteButton: {
// //     position: 'absolute',
// //     top: 42,
// //     right: 35,
// //   },
// //   deleteIcon: {
// //     width: 24,
// //     height: 24,
// //     tintColor: 'red',
// //   },
// //   footer: {
// //     padding: 16,
// //     backgroundColor: '#FFF',
// //     borderTopWidth: 1,
// //     borderTopColor: '#DDD',
// //     alignItems: 'center',
// //   },
// //   totalPrice: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 8,
// //     color: 'black',
// //   },
// //   totalQuantity: {
// //     fontSize: 16,
// //     marginBottom: 16,
// //     color: 'black',
// //   },
// //   checkoutButton: {
// //     backgroundColor: '#1679AB',
// //     borderRadius: 5,
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //   },
// //   checkoutButtonText: {
// //     color: 'white',
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// //   fixedFooter: {
// //     position: 'absolute',
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     paddingVertical: 16,
// //     paddingHorizontal: 16,
// //     backgroundColor: '#FFF',
// //     borderTopWidth: 1,
// //     borderTopColor: '#DDD',
// //     alignItems: 'center',

// //   },
// // });

// // export default ReviewScreen;


// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   Pressable,
// } from 'react-native';
// import IMAGES from '../../Images/Image';
// import ICONS from '../../Images/Icon';
// import {ROUTES} from '../../Routes';
// import {useRoute} from '@react-navigation/core';
// import axios from 'axios';
// import {API_URL} from '../../config/API';
// import {COLORS} from '../../config/COLORS';

// const ReviewScreen = ({navigation}) => {
//   const route = useRoute();
//   const {token, email, category} = route.params;
//   const [orderDetails, setOrderDetails] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [loading, setLoading] = useState(true); // Added loading state

//   const fetchOrderDetails = async () => {
//     try {
//       const payload = {status: 'IN-CART', email: email};
//       const response = await axios.post(
//         API_URL + '/user/getOrderDetails',
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       if (response.data && response.data.message.length > 0) {
//         setOrderDetails(response.data.message);
//       } else {
//         setOrderDetails([]); // Set empty orders if no data
//       }
//     } catch (error) {
//       console.error('Error fetching order details:', error.response?.data || error.message);
//       setOrderDetails([]); // Set empty array if there's an error
//     } finally {
//       setLoading(false); // Loading is complete
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [token, email]);

//   const latestOrder =
//     orderDetails.length > 0
//       ? orderDetails.reduce(
//           (latest, order) =>
//             new Date(order.createdOn) > new Date(latest.createdOn)
//               ? order
//               : latest,
//           orderDetails[0],
//         )
//       : null;
  
//   const products = latestOrder?.products || [];
//   const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
//   const totalPrice = latestOrder?.totalPrice || 0;
//   console.log(orderDetails,"ORDERDETAILS")
//   const navigateToCheckout = () => {
//     navigation.navigate(ROUTES.Checkout, {
//       items: [latestOrder],
//       totalQuantity,
//       totalPrice,
//       token,
//       totalItems: 1,
//       category,
//       email,
//       products,
//     });
//   };

//   const handleBackPress = () => {
//     setIsModalVisible(true);
//   };

//   const handleConfirmBack = () => {
//     setIsModalVisible(false);
//     navigation.goBack();
//   };

//   const handleDelete = async (orderId) => {
//     try {
//       await axios.delete(`${API_URL}/order/deleteOrders?id=${orderId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       Alert.alert('Success', 'Item deleted successfully');
//       fetchOrderDetails(); // Refresh orders after deletion
//     } catch (error) {
//       console.error('Error deleting item:', error.response?.data || error.message);
//       Alert.alert('Error', 'Failed to delete item');
//     }
//   };

//   if (loading) {
//     return <Text>Loading...</Text>; // Show loading indicator
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={handleBackPress}>
//           <Image source={ICONS.left} style={{tintColor: 'white', height: 24, width: 24}} />
//         </TouchableOpacity>
//         <Text style={styles.header}>Review Basket</Text>
//         <Text style={styles.itemCount}>
//           {products.length > 0 ? `${products.length} item(s)` : '0 items'}
//         </Text>
//       </View>
      
//       {orderDetails.length > 0 ? (
//         <FlatList
//           data={products}
//           renderItem={({item}) => (
//             <View style={styles.card}>
//               <View style={styles.imageContainer}>
//                 <Image source={IMAGES.fabric} style={styles.productImage} />
//                 <View style={styles.discountBox}>
//                   <Text style={styles.discount}>30% OFF</Text>
//                 </View>
//               </View>
//               <View style={styles.productInfo}>
//                 <Text style={styles.productName}>Product Name: {item.productName}</Text>
//                 <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
//                 <Text style={styles.price}>Price: ₹ {item.price}</Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={() => handleDelete(latestOrder.orderId)}>
//                 <Image source={ICONS.delete} style={styles.deleteIcon} />
//               </TouchableOpacity>
//             </View>
//           )}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       ) : (
//         <Text style={styles.noOrders}>No orders available</Text> // Show this when no orders are available
//       )}

//       {orderDetails.length > 0 && (
//        <View style={styles.fixedFooter}>
//                 <Text style={styles.totalPrice}>Total Price: ₹ {totalPrice}</Text>
//                <Text style={styles.totalQuantity}>Total Quantity: {totalQuantity}</Text>
//                 <TouchableOpacity style={styles.checkoutButton} onPress={navigateToCheckout}>
//                   <Text style={styles.checkoutButtonText}>Checkout</Text>
//                 </TouchableOpacity>
//            </View>
//       )}

//       <Modal visible={isModalVisible} transparent={true} animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>
//               Are you sure you want to go back? Your order will be erased.
//             </Text>
//             <View style={styles.modalButtons}>
//               <Pressable style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
//                 <Text style={styles.modalButtonText}>Cancel</Text>
//               </Pressable>
//               <Pressable style={styles.modalButton} onPress={handleConfirmBack}>
//                 <Text style={styles.modalButtonText}>Go Back</Text>
//               </Pressable>
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
//     // backgroundColor: '#EEF7FF',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 16,
//     // backgroundColor: '#1679AB',
//     backgroundColor: COLORS.DarkBlue,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   itemCount: {
//     fontSize: 16,
//     color: '#FFF',
//   },
//   card: {
//     flexDirection: 'row',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DDD',
//     position: 'relative',
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   productImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     marginRight: 16,
//     marginTop: 0,
//   },
//   discountBox: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     backgroundColor: 'red',
//     borderTopLeftRadius: 10,
//     borderBottomRightRadius: 10,
//     padding: 4,
//   },
//   discount: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 12,
//   },
//   productInfo: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingBottom: 8,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: 'gray',
//   },
//   quantity: {
//     fontSize: 14,
//     marginBottom: 8,
//     color: 'black',
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   deleteButton: {
//     position: 'absolute',
//     top: 42,
//     right: 35,
//   },
//   deleteIcon: {
//     width: 24,
//     height: 24,
//     tintColor:'red'
//   },
//   noOrders: {
//     textAlign: 'center',
//     fontSize: 18,
//     marginTop: 20,
//     color: 'gray',
//   },
//   fixedFooter: {
//     padding: 16,
//     backgroundColor: '#FFF',
//     borderTopWidth: 1,
//     borderTopColor: '#DDD',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   totalPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color:'black'
//   },
//   totalQuantity: {
//     fontSize: 16,
//     marginBottom: 16,
//     color:'black'
//   },
//   checkoutButton: {
//     backgroundColor: COLORS.DarkBlue,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   checkoutButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: '#FFF',
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 16,
//     textAlign: 'center',
//     color:'black',
//     fontWeight:'600'
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   modalButton: {
//     flex: 1,
//     padding: 12,
//     alignItems: 'center',
//     borderRadius: 8,
//     backgroundColor: COLORS.DarkBlue,
//     marginHorizontal: 8,
//   },
//   modalButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ReviewScreen;

// // import React, {useEffect, useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   FlatList,
// //   Image,
// //   TouchableOpacity,
// //   Alert,
// //   Modal,
// //   Pressable,
// // } from 'react-native';
// // import IMAGES from '../../Images/Image';
// // import ICONS from '../../Images/Icon';
// // import {ROUTES} from '../../Routes';
// // import {useRoute} from '@react-navigation/core';
// // import axios from 'axios';
// // import {API_URL} from '../../config/API';
// // import {COLORS} from '../../config/COLORS';

// // const ReviewScreen = ({navigation}) => {
// //   const route = useRoute();
// //   const {token, email, cartItems, category} = route.params;
// //   const [orderDetails, setOrderDetails] = useState([]);
// //   const [isModalVisible, setIsModalVisible] = useState(false);
// //   const [loading, setLoading] = useState(true);

// //   const fetchAddOrder = async () => {
// //     try {
// //       const response = await axios.post(
// //         `${API_URL}/order/addOrder`,
// //         {
// //           user: {email, role: 'BUYER'},
// //           products: cartItems,
// //           status: 'IN-CART',
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         },
// //       );
// //       console.log('Order Response:', response.data);
// //       await fetchOrderDetails();
// //     } catch (error) {
// //       console.error('Error adding to cart:', error.response?.data || error.message);
// //     }
// //   };
  

// //   const fetchOrderDetails = async () => {
// //     try {
// //       const payload = {status: 'IN-CART', email: email};

// //       const response = await axios.post(
// //         `${API_URL}/user/getOrderDetails`,
// //         payload,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         },
// //       );
// //       console.log(response.data,"GETORDER")
// //       const fetchedOrders = response.data.message;

// //       // Grouping products by productId and accumulating quantities
// //       const groupedProducts = fetchedOrders.reduce((acc, order) => {
// //         order.products.forEach(product => {
// //           const existingProduct = acc.find(p => p.productId === product.productId);
// //           if (existingProduct) {
// //             existingProduct.quantity += product.quantity;
// //           } else {
// //             acc.push({...product});
// //           }
// //         });
// //         return acc;
// //       }, []);

// //       setOrderDetails(groupedProducts);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error('Error fetching order details:', error.response?.data || error.message);
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrderDetails();
// //     fetchAddOrder();
// //   }, [token, email]);

// //   const totalQuantity = orderDetails.reduce(
// //     (sum, product) => sum + product.quantity,
// //     0,
// //   );
// //   const totalPrice = orderDetails.reduce(
// //     (sum, product) => sum + product.price * product.quantity,
// //     0,
// //   );

// //   const navigateToCheckout = () => {
// //     navigation.navigate(ROUTES.Checkout, {
// //       items: orderDetails,
// //       totalQuantity,
// //       totalPrice,
// //       token,
// //       totalItems: orderDetails.length,
// //       category,
// //       email,
// //       products: orderDetails,
// //     });
// //   };

// //   const handleBackPress = () => {
// //     setIsModalVisible(true);
// //   };

// //   const handleConfirmBack = () => {
// //     setIsModalVisible(false);
// //     setOrderDetails([]);
// //     navigation.goBack();
// //   };
// //   const handleDelete = async (orderId) => {
// //     try {
// //       await axios.delete(`${API_URL}/order/deleteOrders`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //         params: {
// //           id: orderId // Make sure this matches the API's expected parameter
// //         }
// //       });
  
// //       // Manually update the state to remove the deleted product
// //       const updatedOrderDetails = orderDetails.filter(
// //         (order) => order.orderId !== orderId // Ensure you're filtering by the correct ID
// //       );
// //       setOrderDetails(updatedOrderDetails);
  
// //       Alert.alert('Success', 'Item deleted successfully');
// //     } catch (error) {
// //       console.error('Error deleting item:', error.response?.data || error.message);
// //       Alert.alert('Error', 'Failed to delete item');
// //     }
// //   };
  

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.headerContainer}>
// //         <TouchableOpacity onPress={handleBackPress}>
// //           <Image source={ICONS.left} style={{tintColor: 'white', height: 24, width: 24}} />
// //         </TouchableOpacity>
// //         <Text style={styles.header}>Review Basket</Text>
// //         <Text style={styles.itemCount}>
// //           {orderDetails.length > 0 ? `${orderDetails.length} item(s)` : '0 items'}
// //         </Text>
// //       </View>

// //       {loading ? (
// //         <Text>Loading...</Text>
// //       ) : orderDetails.length > 0 ? (
// //         <FlatList
// //           data={orderDetails}
// //           renderItem={({item}) => (
// //             <View style={styles.card}>
// //               <View style={styles.imageContainer}>
// //                 <Image source={IMAGES.fabric} style={styles.productImage} />
// //                 <View style={styles.discountBox}>
// //                   <Text style={styles.discount}>30% OFF</Text>
// //                 </View>
// //               </View>
// //               <View style={styles.productInfo}>
// //                 <Text style={styles.productName}>Product Name: {item.productName}</Text>
// //                 <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
// //                 <Text style={styles.price}>Price: ₹ {item.price}</Text>
// //               </View>
// //               <TouchableOpacity
// //                 style={styles.deleteButton}
// //                 onPress={() => handleDelete(item.productId)}>
// //                 <Image source={ICONS.delete} style={styles.deleteIcon} />
// //               </TouchableOpacity>
// //             </View>
// //           )}
// //           keyExtractor={(item, index) => index.toString()}
// //         />
// //       ) : (
// //         <Text style={styles.noOrders}>No products available</Text>
// //       )}

// //       <View style={styles.fixedFooter}>
// //         <Text style={styles.totalPrice}>Total Price: ₹ {totalPrice}</Text>
// //         <Text style={styles.totalQuantity}>Total Quantity: {totalQuantity}</Text>
// //         <TouchableOpacity style={styles.checkoutButton} onPress={navigateToCheckout}>
// //           <Text style={styles.checkoutButtonText}>Checkout</Text>
// //         </TouchableOpacity>
// //       </View>

// //       <Modal visible={isModalVisible} transparent={true} animationType="slide">
// //         <View style={styles.modalContainer}>
// //           <View style={styles.modalContent}>
// //             <Text style={styles.modalText}>
// //               Are you sure you want to go back? Your order will be erased.
// //             </Text>
// //             <View style={styles.modalButtons}>
// //               <Pressable style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
// //                 <Text style={styles.modalButtonText}>Cancel</Text>
// //               </Pressable>
// //               <Pressable style={styles.modalButton} onPress={handleConfirmBack}>
// //                 <Text style={styles.modalButtonText}>Go Back</Text>
// //               </Pressable>
// //             </View>
// //           </View>
// //         </View>
// //       </Modal>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     // backgroundColor: '#EEF7FF',
// //   },
// //   headerContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     padding: 16,
// //     // backgroundColor: '#1679AB',
// //     backgroundColor: COLORS.DarkBlue
// //   },
// //   header: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#FFF',
// //   },
// //   itemCount: {
// //     fontSize: 16,
// //     color: '#FFF',
// //   },
// //   card: {
// //     flexDirection: 'row',
// //     padding: 16,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#DDD',
// //     position: 'relative',
// //   },
// //   imageContainer: {
// //     position: 'relative',
// //   },
// //   productImage: {
// //     width: 80,
// //     height: 80,
// //     borderRadius: 10,
// //     marginRight: 16,
// //     marginTop: 0,
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
// //     justifyContent: 'center',
// //     paddingBottom: 8,
// //   },
// //   productName: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   quantity: {
// //     fontSize: 14,
// //     color: '#555',
// //   },
// //   price: {
// //     fontSize: 14,
// //     color: '#555',
// //   },
// //   deleteButton: {
// //     alignSelf: 'center',
// //     padding: 8,
// //     marginTop: -8,
// //   },
// //   deleteIcon: {
// //     height: 20,
// //     width: 20,
// //     tintColor: 'red',
// //   },
// //   fixedFooter: {
// //     position: 'absolute',
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     backgroundColor: 'white',
// //     padding: 16,
// //     borderTopWidth: 1,
// //     borderTopColor: '#DDD',
// //   },
// //   totalPrice: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   totalQuantity: {
// //     fontSize: 16,
// //     color: '#555',
// //   },
// //   checkoutButton: {
// //     backgroundColor: '#1679AB',
// //     padding: 16,
// //     borderRadius: 8,
// //     marginTop: 16,
// //     alignItems: 'center',
// //   },
// //   checkoutButtonText: {
// //     color: '#FFF',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   modalContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0,0,0,0.5)',
// //   },
// //   modalContent: {
// //     backgroundColor: 'white',
// //     padding: 24,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //   },
// //   modalText: {
// //     fontSize: 18,
// //     marginBottom: 16,
// //   },
// //   modalButtons: {
// //     flexDirection: 'row',
// //   },
// //   modalButton: {
// //     backgroundColor: '#1679AB',
// //     padding: 10,
// //     borderRadius: 8,
// //     margin: 5,
// //   },
// //   modalButtonText: {
// //     color: 'white',
// //   },
// //   noOrders: {
// //     textAlign: 'center',
// //     marginTop: 20,
// //     fontSize: 16,
// //     color: COLORS.lightgrey
// //   }
// // });

// // export default ReviewScreen;


import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  RefreshControl,
} from 'react-native';
import IMAGES from '../../Images/Image';
import ICONS from '../../Images/Icon';
import {ROUTES} from '../../Routes';
import {useRoute} from '@react-navigation/core';
import axios from 'axios';
import {API_URL} from '../../config/API';
import {COLORS} from '../../config/COLORS';

const ReviewScreen = ({navigation}) => {
  const route = useRoute();
  const {token, email, category} = route.params;
  const [orderDetails, setOrderDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Added refreshing state

  const fetchOrderDetails = async () => {
    setLoading(true); // Set loading to true when starting to fetch
    try {
      const payload = {status: 'IN-CART', email: email};
      const response = await axios.post(
        `${API_URL}/user/getOrderDetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data && response.data.message.length > 0) {
        setOrderDetails(response.data.message);
      } else {
        setOrderDetails([]);
      }
    } catch (error) {
      console.error('Error fetching order details:', error.response?.data || error.message);
      setOrderDetails([]);
    } finally {
      setLoading(false);
      setRefreshing(false); // End refreshing
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [token, email]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrderDetails();
  };

  const latestOrder =
    orderDetails.length > 0
      ? orderDetails.reduce(
          (latest, order) =>
            new Date(order.createdOn) > new Date(latest.createdOn)
              ? order
              : latest,
          orderDetails[0],
        )
      : null;

  const products = latestOrder?.products || [];
  const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalPrice = latestOrder?.totalPrice || 0;
  
  const navigateToCheckout = () => {
    navigation.navigate(ROUTES.Checkout, {
      items: [latestOrder],
      totalQuantity,
      totalPrice,
      token,
      totalItems: 1,
      category,
      email,
      products,
    });
  };

  const handleBackPress = () => {
    setIsModalVisible(true);
  };

  const handleConfirmBack = () => {
    setIsModalVisible(false);
    navigation.goBack();
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${API_URL}/order/deleteOrders?id=${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Success', 'Item deleted successfully');
      fetchOrderDetails(); // Refresh orders after deletion
    } catch (error) {
      console.error('Error deleting item:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>; // Show loading indicator
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image source={ICONS.left} style={{tintColor: 'white', height: 24, width: 24}} />
        </TouchableOpacity>
        <Text style={styles.header}>Review Basket</Text>
        <Text style={styles.itemCount}>
          {products.length > 0 ? `${products.length} item(s)` : '0 items'}
        </Text>
      </View>
      
      {orderDetails.length > 0 ? (
        <FlatList
          data={products}
          renderItem={({item}) => (
            <View style={styles.card}>
              <View style={styles.imageContainer}>
                <Image source={IMAGES.fabric} style={styles.productImage} />
                <View style={styles.discountBox}>
                  <Text style={styles.discount}>30% OFF</Text>
                </View>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Product Name: {item.productName}</Text>
                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.price}>Price: ₹ {item.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(latestOrder.orderId)}>
                <Image source={ICONS.delete} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      ) : (
        <Text style={styles.noOrders}>No orders available</Text> // Show this when no orders are available
      )}

      {orderDetails.length > 0 && (
        <View style={styles.fixedFooter}>
          <Text style={styles.totalPrice}>Total Price: ₹ {totalPrice}</Text>
          <Text style={styles.totalQuantity}>Total Quantity: {totalQuantity}</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={navigateToCheckout}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to go back? Your order will be erased.
            </Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={handleConfirmBack}>
                <Text style={styles.modalButtonText}>Go Back</Text>
              </Pressable>
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
    backgroundColor: '#EEF7FF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.DarkBlue,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  itemCount: {
    fontSize: 16,
    color: '#FFF',
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  discountBox: {
    position: 'absolute',
    top: 0,
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
    justifyContent: 'center',
    paddingBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'gray',
  },
  quantity: {
    fontSize: 14,
    marginBottom: 8,
    color: 'black',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  deleteButton: {
    position: 'absolute',
    top: 42,
    right: 35,
  },
  deleteIcon: {
    width: 24,
    height: 24,
    tintColor:'red'
  },
  noOrders: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: 'gray',
  },
  fixedFooter: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  totalQuantity: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  checkoutButton: {
    backgroundColor: COLORS.DarkBlue,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: COLORS.DarkBlue,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default ReviewScreen;
