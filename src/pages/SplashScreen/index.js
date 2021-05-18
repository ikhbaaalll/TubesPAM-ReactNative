import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {Splash, SplashBackground} from '../../assets';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Auth')
    }, 5000);
  }, [navigation]);

  return (
    <ImageBackground source={SplashBackground} style={styles.background}>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          marginBottom: 40,
        }}>
        <Text style={{color: ColorPrimary, fontSize: 15}}>
          Copyright &copy; 2021 Powered by <Text style={{fontWeight:'bold',fontSize: 16}}>FAMI.ly</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
