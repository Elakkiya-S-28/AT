import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ROUTES } from '../../Routes';
import IMAGES from '../../Images/Image';
import { COLORS } from '../../config/COLORS';

const OnBoard = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: IMAGES.onboardimage1,
      content: 'Manufacturers of top notch eco-friendly yarns and fabrics',
    },
    {
      image: IMAGES.walkthrough,
      content:
        'Innovative solutions with sustainable practices and high performance teams',
    },
    {
      image: IMAGES.onboardimage2,
      content: 'Steered thought leadership fostering inclusive growth',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.navigate(ROUTES.FirstScreen);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={slides[currentSlide].image} style={styles.image} />
      <Text style={styles.content}>{slides[currentSlide].content}</Text>

      {/* Dots for slide indication */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentSlide ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentSlide === slides.length - 1 ? 'Finish' : 'Next'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.skip} onPress={() => navigation.navigate(ROUTES.FirstScreen)}>Skip</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 500,
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: 25,
    color: 'black',
    fontWeight: '600',
    marginHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#0b2239',
  },
  inactiveDot: {
    backgroundColor: '#ddd',
  },
  button: {
    padding: 15,
    backgroundColor: '#0b2239',
    borderRadius: 10,
    margin: 16,
    width: '40%',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
  },
  skip: {
    color: COLORS.DarkBlue,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    textDecorationLine: 'underline',
    fontSize: 15
  }
});

export default OnBoard;
