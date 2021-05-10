import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import InputText from '../../components/TextInput';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';

const index = () => {
  return (
    <View style={styles.container}>
    <StatusBar backgroundColor={ColorPrimary} barStyle="light-content"/>
      <View style={styles.header}></View>
      <View style={styles.footer}>
        <View style={styles.boxLogin}>
          <Text style={styles.text_header}>Selamat Datang</Text>
          <InputText Title="Username" Icon="user" />
          <InputText Title="Password" Icon="key" />
          <View style={styles.button}>
            <LinearGradient colors={['#a1ffea','#86E3CE']} style={styles.signIn}>
              <Text style={styles.text_button}>Masuk</Text>
            </LinearGradient>
          </View>
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPrimary,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  boxLogin: {
    marginHorizontal: 30,
  },
  text_header: {
    textAlign: 'center',
    color: ColorPrimary,
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
    marginBottom: 75,
  },
  text_footer: {
    color: '#fff',
    fontSize: 18,
  },
  text_button: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  signIn: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
