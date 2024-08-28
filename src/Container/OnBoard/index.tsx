import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ROUTES } from '../../Routes';
import IMAGES from '../../Images/Image';

const OnBoard = ({ navigation }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: IMAGES.onboardImage,
            content: 'Manufacturers of top notch eco-friendly yarns and fabrics',
        },
        {
            image: IMAGES.walkthrough,
            content: 'Innovative solutions with sustainable practices and high performance teams',
        },
        {
            image: IMAGES.onboardimg,
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
        color: 'black', fontWeight: '600',
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
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        alignSelf: 'center'
    },
});

export default OnBoard;
