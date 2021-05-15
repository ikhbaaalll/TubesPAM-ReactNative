import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';

const ButtonCustom = ({title, isPress, type}) => {
  return (
    <View style={styles.box}>
      <View style={styles.container}>
        <LinearGradient colors={type == "hapus" ? ['#ffd9e1', '#f58ca1'] : ['#a1ffea', '#86E3CE']} style={isPress ?  styles.gradienBaru : styles.gradien}>
          <Text style={isPress ? styles.text_buttonBaru : styles.text_button}>{title}</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default ButtonCustom;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  box: {
    // backgroundColor: '#31ec92',
    marginTop: 30,
    paddingBottom: 30,
    marginRight: 10,
  },
  gradien: {
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 8,
  },
  gradienBaru: {
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 30,
  },
  text_button: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text_buttonBaru: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
