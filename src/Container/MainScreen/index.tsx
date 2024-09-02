import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import IMAGES from '../../Images/Image';
import { ROUTES } from '../../Routes';
import { useRoute } from '@react-navigation/core';
import axios from 'axios';
import ICONS from '../../Images/Icon';
import { API_URL } from '../../config/API';
import { COLORS } from '../../config/COLORS';

const categories = [
  { id: '1', title: ROUTES.Fabric, image: IMAGES.images, category: 'fabric' },
  { id: '2', title: ROUTES.Yarn, image: IMAGES.yarn, category: 'yarn' },
];

const MainScreen = ({ navigation }) => {
  const route = useRoute();
  const { token, email } = route.params; // Extract token from route params
  console.log(token, 'Token from mainscreen', email);
  const [alert,setAlert]=useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [product, setProduct] = useState([]);
  const handleCategoryPress = category => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  // const fetchCategory = async (category) => {
  //   try {
  //     const response = await axios.post(
  //       'http://3.82.35.124:3001/user/getCategory',
  //       { category },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  //     console.log(response.data.message, "Response from mainscreen");
  //     setProduct(response.data.message);
  //     if (response.data.message[0].category === 'yarn') {
  //       navigation.navigate(ROUTES.Yarn, { token, email ,product  });
  //     } else if (response.data.message[0].category === 'fabric') {
  //       navigation.navigate(ROUTES.Fabric, { token, email , product});
  //     }
  //     setModalVisible(false);
  //   } catch (error) {
  //     console.error('Error fetching category:', error);
  //     setModalVisible(false);
  //   }
  // };
  const fetchCategory = async category => {
    try {
      const response = await axios.post(
        API_URL + '/user/getCategory',
        { category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data.message, 'Response from mainscreen');
      setProduct(response.data.message);
      if (
        response.data.message === 'The selected category has no product to show'
      ) {
        setAlert(true)
        // Alert.alert(' The selected category has no product to show ');
      }
      if (response.data.message.length > 0) {
        const firstProduct = response.data.message[0];
        if (firstProduct.category === 'yarn') {
          navigation.navigate(ROUTES.Yarn, {
            token,
            email,
            product: response.data.message,
          });
        } else if (firstProduct.category === 'fabric') {
          navigation.navigate(ROUTES.Fabric, {
            token,
            email,
            product: response.data.message,
          });
        }
      } else {
        return false;
      }

      setModalVisible(false);
    } catch (error) {
      console.error('Error fetching category:', error);
      setModalVisible(false);
    }
  };

  console.log(product, 'Productsss');
  const CustomModal = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* <Text style={styles.modalTitle}>Confirm</Text> */}

          <Text style={styles.modalMessage}>
            Would you like to purchase {selectedCategory}?
          </Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonConfirm]}
              onPress={() => fetchCategory(selectedCategory)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      
        <View style={{flexDirection:'row'}}>
           <Image source={IMAGES.ATImage} style={{height:45, width:45, }}/>
             <Text style={styles.headerText}>Ashok Textile</Text>
        </View>
        <TouchableOpacity style={{marginTop:4, marginRight:4}} onPress={() => navigation.navigate(ROUTES.Settings)}>
        <Image
          source={ICONS.user}
          style={{
            height: 24,
            width: 24,
            tintColor: 'white',
            alignItems: 'center',
            marginTop: 3,
          }}
        />
        </TouchableOpacity>
        
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.header}>Shop by Category</Text>
        <View style={{flexDirection:'row'}}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCategoryPress(item.category)}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        </View>
        
      </View>
      {/* <Text style={{ color: 'black', fontWeight: 'bold', margin: 16, fontSize: 20 }}>Check your Orders here</Text> */}
      {/* <View style={[styles.card, { margin: 16 }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.TrackListScreen)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',  
            flex: 1 
          }}>
          <Text style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 16
          }}>
            Your Order
          </Text>
          <Image source={ICONS.right} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
      </View> */}

      <CustomModal />
    
    <Modal
      transparent={true}
      animationType="slide"
      visible={alert}
      onRequestClose={() => {
        setAlert(!alert);
      }}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* <Text style={styles.modalTitle}>Confirm</Text> */}

          <Text style={styles.modalMessage}>
          The selected category has no product to show
          </Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setAlert(false)}>
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
    // backgroundColor: '#EEF7FF',
  },
  headerContainer: {
    backgroundColor: COLORS.DarkBlue,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginLeft:12,
    marginTop:5
  },
  bodyContainer: {
    margin: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 46,
    color: 'black',
    textAlign:'center'
  },
  // card: {
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   padding: 26,
  //   marginBottom: 60,
  //   // flexDirection: 'row',
  //   // alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOpacity: 0.3,
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowRadius: 5,
  //   elevation: 3,
  // },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    width:'70%',
    borderRadius: 10, 
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5, 
    marginBottom: 16, 
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  },
  image: {
    width: 150,
    height: 150,
    // borderRadius: 10,
    // marginRight: 16,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginTop:12,
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
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
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
    backgroundColor: COLORS.DarkBlue,
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default MainScreen;
