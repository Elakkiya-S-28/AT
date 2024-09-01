import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../Routes';

const tracks = [
  { name: "Fabric", date: "2024-09-01", address: "123 Main St" },
  { name: "Yarn", date: "2024-09-02", address: "456 Elm St" },
  { name: "Yarn", date: "2024-09-03", address: "789 Pine St" },
  { name: "Fabric", date: "2024-09-04", address: "101 Maple St" }
]; // Add your track details here

const TrackListScreen = () => {
  const navigation = useNavigation();

  const handleTrackPress = (track) => {
    navigation.navigate(ROUTES.TrackingScreen, { track });
  };

  const renderTrackItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.trackItem} 
      onPress={() => handleTrackPress(item)}
    >
      {/* <Image
        source={{ uri: 'https://via.placeholder.com/80' }} // Replace with your image URL
        style={styles.trackImage}
      /> */}
      <View style={styles.trackContent}>
        <Text style={styles.trackName}>{item.name}</Text>
        <Text style={styles.trackDate}>Date: {item.date}</Text>
        <Text style={styles.trackAddress}>Delivered to: {item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       
        <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Your Orders</Text>
        </View>
        <View style={{margin:16}}>
        <FlatList 
        data={tracks}
        renderItem={renderTrackItem}
        keyExtractor={(item, index) => index.toString()}
      />
     
        </View>
       
    
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF7FF',
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    elevation: 1, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop:5
  },
  trackImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  trackContent: {
    flex: 1,
  },
  trackName: {
    fontSize: 18,
    color: '#333',
    fontWeight:'bold',
    marginBottom: 4,
  },
  trackDate: {
    fontSize: 14,
    color: '#666',
    fontWeight:'600'
  },
  trackAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontWeight:'400'
  },
  headerContainer: {
    backgroundColor: '#1679AB',
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
  },
});

export default TrackListScreen;
