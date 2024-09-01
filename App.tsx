import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {AuthProvider} from './src/Context';
import Navigation from './src/Navigation';
import {TimerProvider} from './src/Context/TimerContext';

const App = () => {
  return (
    <TimerProvider>
      <AuthProvider>
        <SafeAreaView style={styles.container}>
          <Navigation />
        </SafeAreaView>
      </AuthProvider>
    </TimerProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
