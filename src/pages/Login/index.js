import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  BackHandler,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

export default function index({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [user, setUser] = useState({
    nama: '',
    kelas: '',
    role: '',
    email: '',
  });

  const checkConnection = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      BackHandler.exitApp();
    }
  });

  useEffect(() => {
    checkConnection();
  }, [])

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
    }
    fetch('https://tubespamqrcode.herokuapp.com/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.user != null) {
          setUser({
            nama: responseJson.user.nama,
            kelas: responseJson.user.kelas,
            role: responseJson.user.role,
            email: responseJson.user.email,
          });

          AsyncStorage.setItem('id', responseJson.user.id.toString());
          AsyncStorage.setItem('email', responseJson.user.email);
          AsyncStorage.setItem('nama', responseJson.user.nama);
          AsyncStorage.setItem('kelas', responseJson.user.kelas.toString());
          AsyncStorage.setItem('role', responseJson.user.role.toString());
          setEmail({ ...email, value: '' })
          setPassword({ ...password, value: '' })
          navigation.navigate('MainApp');
        } else {
          alert("Akun tidak terdaftar");
          setEmail({ ...email, error: responseJson.error });
        }
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={ColorPrimary} barStyle="light-content" />
      <View style={styles.header}></View>
      <View style={styles.footer}>
        <View style={styles.boxLogin}>
          <Text style={styles.text_header}>Selamat Datang</Text>
          {/* <InputText Title="Email" Icon="user" /> */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.title}>E-mail</Text>
            <View style={styles.containerInput}>
              <FontAwesome name="user-o" color={ColorPrimary} size={25} />
              <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                style={styles.textInput}
                placeholder="Masukkan E-mail"
              />
            </View>
          </View>
          {/* <InputText Title="Password" Icon="key" /> */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.title}>Password</Text>
            <View style={styles.containerInput}>
              <FontAwesome name="key" color={ColorPrimary} size={25} />
              <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
                style={styles.textInput}
                placeholder="Masukkan Password"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={onLoginPressed}>
            <LinearGradient
              colors={['#a1ffea', '#86E3CE']}
              style={styles.gradien}>
              <Text style={styles.text_button}>Masuk</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
  gradien: {
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
  title: {
    color: '#05375a',
    fontSize: 15,
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: ColorPrimary,
    marginTop: -12,
    marginLeft: 15,
    marginRight: 5,
    color: ColorPrimary,
    fontSize: 20,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});
