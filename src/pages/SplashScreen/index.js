import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {Splash, SplashBackground} from '../../assets';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
        navigation.replace('Login')
    }, 3000);
  },[navigation]);

  return(
   <ImageBackground source={SplashBackground} style={styles.background}></ImageBackground>
  )    
};

export default SplashScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
