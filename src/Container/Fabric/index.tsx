// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
// import IMAGES from '../../Images/Image';
// import ICONS from '../../Images/Icon';
// import { ROUTES } from '../../Routes';
// import { useRoute, useNavigation } from '@react-navigation/core';
// import axios from 'axios';

// const Fabric = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { token, email, product } = route.params;
//   const [cartItems, setCartItems] = useState([]);
//   const [quantities, setQuantities] = useState({});

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('blur', () => {
//       setQuantities({});
//       setCartItems([]);
//     });

//     return unsubscribe;
//   }, [navigation]);

  

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image source={ICONS.left} style={{ tintColor: 'white', height: 24, width: 24 }} />
//         </TouchableOpacity>
//         <Text style={styles.header}>Fabric</Text>
//         <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ReviewScreen, { cartItems, token, email })}>
//           <Image source={ICONS.cart} style={{ tintColor: 'white', height: 24, width: 24 }} />
//           {cartItems.length > 0 && (
//             <View style={styles.notification}>
//               <Text style={styles.notificationText}>{cartItems.length}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={{ margin: 16 }}>
//           <Text style={styles.subtitle}>In the spotlight</Text>
//           <FlatList
//             data={product}
//             renderItem={({ item }) => (
//               <View style={styles.card}>
//                 <View style={styles.imageContainer}>
//                   <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'justify' }}>{item.productId}</Text>
//                   <Image source={IMAGES.fabric} style={styles.productImage} />
//                   <View style={styles.discountBox}>
//                     <Text style={styles.discount}>30% OFF</Text>
//                   </View>
//                 </View>
//                 <View style={styles.productInfo}>
//                   <Text style={styles.productName}>{item.productName}</Text>
//                   <View style={styles.inputContainer}>
//                     <TextInput
//                       placeholder="kg"
//                       placeholderTextColor={'gray'}
//                       style={styles.input}
//                       keyboardType="numeric"
//                       value={quantities[item.productId] || ''}
//                       onChangeText={(text) => setQuantities({ ...quantities, [item.productId]: text })}
//                     />
//                   </View>
//                   <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Text style={styles.price}>Rs. {item.gstPriceForBuyer}/kg</Text>
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
//             keyExtractor={item => item._id}
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
//   scrollContainer: {
//     paddingBottom: 20,
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
//     shadowOffset: { width: 0, height: 1 },
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
//   discountBox: {
//     position: 'absolute',
//     top: 18,
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
//     width: '70%',
//     paddingHorizontal: 8,
//     marginBottom: 8,
//   },
//   input: {
//     flex: 1,
//     color: 'black',
//   },
//   unit: {
//     color: 'gray',
//     marginLeft: 4,
//   },
//   price: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: 'black',
//     marginRight: 10,
//   },
//   addButton: {
//     backgroundColor: '#FF4D4D',
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
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

// export default Fabric;


// import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import IMAGES from '../../Images/Image';
import ICONS from '../../Images/Icon';
import { ROUTES } from '../../Routes';
import { useRoute, useNavigation } from '@react-navigation/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Fabric = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { token, email, product } = route.params;
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [openModal,setOpenModal] = useState(false);
  const[openCheckoutModal, setOpenCheckoutModal] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setQuantities({});
      setCartItems([]);
    });

    return unsubscribe;
  }, [navigation]);

  const handleAddToCart = (productId) => {
    const quantity = quantities[productId];
    if (!quantity) {
      // console.error('Quantity is required');
      setOpenModal(true);
      return;
    }

    const newProduct = {
      productId,
      quantity: parseInt(quantity, 10),
    };

    setCartItems((prevItems) => [...prevItems, newProduct]);
    setQuantities((prevQuantities) => ({ ...prevQuantities, [productId]: '' }));
  };

  const handleNavigateToReview = async () => {
    const orderData = {
      user: {
        email: email,
        role: 'BUYER',
      },
      products: cartItems,
      status: 'IN-CART',
      
    };

    try {
      const response = await axios.post(
        'http://3.82.35.124:3001/order/addOrder',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Order Response:', response.data);
      navigation.navigate(ROUTES.ReviewScreen, { cartItems: response.data, token, email });
    } catch (error) {
      console.error('Error adding to cart:', error);
      // setOpenCheckoutModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ICONS.left} style={{ tintColor: 'white', height: 24, width: 24 }} />
        </TouchableOpacity>
        <Text style={styles.header}>Fabric</Text>
        <TouchableOpacity onPress={handleNavigateToReview}>
          <Image source={ICONS.cart} style={{ tintColor: 'white', height: 24, width: 24 }} />
          {cartItems.length > 0 && (
            <View style={styles.notification}>
              <Text style={styles.notificationText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ margin: 16 }}>
          <Text style={styles.subtitle}>In the spotlight</Text>
          <FlatList
            data={product}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.imageContainer}>
                  <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'justify' }}>{item.productId}</Text>
                  <Image source={IMAGES.fabric} style={styles.productImage} />
                  <View style={styles.discountBox}>
                    <Text style={styles.discount}>30% OFF</Text>
                  </View>
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
                      onChangeText={(text) => setQuantities({ ...quantities, [item.productId]: text })}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.price}>Rs. {item.gstPriceForBuyer}/kg</Text>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => handleAddToCart(item.productId)}
                    >
                      <Text style={styles.addButtonText}>ADD</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item._id}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(!openModal);
        }}
      >
        <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* <Text style={styles.modalTitle}>Confirm</Text> */}
          
          <Text style={styles.modalMessage}>Please, Add the Quantity !!</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setOpenModal(false)}
            >
              <Text style={styles.modalButtonText}>Ok</Text>
            </TouchableOpacity>
         
          </View>
        </View>
      </View>
      </Modal>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={openCheckoutModal}
        onRequestClose={() => {
          setOpenCheckoutModal(!openCheckoutModal);
        }}
      >
        <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          
          <Text style={styles.modalMessage}>Please, Add the Quantity !!</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setOpenCheckoutModal(false)}
            >
              <Text style={styles.modalButtonText}>Ok</Text>
            </TouchableOpacity>
         
          </View>
        </View>
      </View>
      </Modal> */}
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
    marginBottom: 16,
    backgroundColor: '#1679AB',
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
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
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
    top: 18,
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
  price: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#FF4D4D',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
  
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    fontWeight:'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'black',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#CCC',
  },
  modalButtonConfirm: {
    backgroundColor: '#1679AB',
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Fabric;
