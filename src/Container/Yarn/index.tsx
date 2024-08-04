// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
// import IMAGES from '../../Images/Image';
// import ICONS from '../../Images/Icon';
// import { ROUTES } from '../../Routes';
// import axios from 'axios';
// import { useRoute } from '@react-navigation/core';


// const Yarn = ({ navigation }) => {
//   const route = useRoute();
//   const { token, email } = route.params;
//   const [cartItems, setCartItems] = useState([]);

//   const handleAddToCart = async (productId, quantity) => {
//     const orderData = {
//       user: {
//         email: email,
//         role: 'BUYER'
//       },
//       products: [
//         {
//           productId,
//           quantity
//         }
//       ],
//       status: 'IN-CART',
//       orderId: 37 
//     };
//     console.log(orderData, "OrderData");

//     try {
//       const response = await axios.post(
//         'http://3.82.35.124:3001/order/addOrder',
//         orderData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       console.log('Order Response:', response.data);
//       setCartItems([...cartItems, { productId, quantity }]);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image source={ICONS.left} style={{ tintColor: 'white', height: 24, width: 24 }} />
//         </TouchableOpacity>
//         <Text style={styles.header}>Yarn</Text>
//         <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ReviewScreen, { cartItems, token, email })}>
//           <Image source={ICONS.cart} style={{ tintColor: 'white', height: 24, width: 24 }} />
//           {cartItems.length > 0 && (
//             <View style={styles.notification}>
//               <Text style={styles.notificationText}>{cartItems.length}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>
//       <View style={{ margin: 16 }}>
//         <Text style={styles.subtitle}>In the spotlight</Text>
//         <FlatList
//           data={products}
//           renderItem={({ item }) => (
//             <View style={styles.card}>
//               <View style={styles.imageContainer}>
//                 <Image source={item.image} style={styles.productImage} />
//                 <View style={styles.discountBox}>
//                   <Text style={styles.discount}>{item.discount}</Text>
//                 </View>
//               </View>
//               <View style={styles.productInfo}>
//                 <Text style={styles.productName}>{item.name}</Text>
//                 <View style={styles.inputContainer}>
//                   <Text style={styles.unit}>kg</Text>
//                   <TextInput
//                     placeholder="0"
//                     style={styles.input}
//                     keyboardType="numeric"
//                   />
//                 </View>
//                 <View style={{ flexDirection: 'row' }}>
//                   <Text style={styles.price}>Rs. {item.price}/kg</Text>
//                   <TouchableOpacity
//                     style={styles.addButton}
//                     onPress={() => handleAddToCart(item.id, 10)}  // Set quantity dynamically as needed
//                   >
//                     <Text style={styles.addButtonText}>ADD</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           )}
//           keyExtractor={item => item.id.toString()}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'#EEF7FF',
//     // backgroundColor: '#F8E7E1',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     // backgroundColor: '#FF7F7F',
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
//   unit: {
//     color: 'gray',
//     marginLeft: 4,
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


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import IMAGES from '../../Images/Image';
import ICONS from '../../Images/Icon';
import { ROUTES } from '../../Routes';
import { useRoute, useNavigation } from '@react-navigation/core';
import axios from 'axios';

const Yarn = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { token, email, product } = route.params;
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setQuantities({});
      setCartItems([]);
    });

    return unsubscribe;
  }, [navigation]);

  const handleAddToCart = async (productId) => {
    const quantity = quantities[productId];
    if (!quantity) {
      console.error('Quantity is required');
      return;
    }

    const orderData = {
      user: {
        email: email,
        role: 'BUYER'
      },
      products: [
        {
          productId,
          quantity: parseInt(quantity, 10)
        }
      ],
      status: 'IN-CART',
      orderId: 37
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
      setCartItems([...cartItems, { productId, quantity: parseInt(quantity, 10) }]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Extract the category from the first product (assuming all products have the same category)
  const category = product.length > 0 ? product[0].category : '';

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ICONS.left} style={{ tintColor: 'white', height: 24, width: 24 }} />
        </TouchableOpacity>
        <Text style={styles.header}>Yarn</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ReviewScreen, { cartItems, token, email, category })}>
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
                  <Image source={IMAGES.yarn} style={styles.productImage} />
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
});

export default Yarn;
