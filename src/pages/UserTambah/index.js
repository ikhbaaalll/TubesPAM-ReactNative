import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput,
  ToastAndroid,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { ButtonCustom, ArrowBack } from '../../components';

const UserTambah = ({ route, navigation }) => {
  const [isPress, setIsPress] = React.useState(false);
  const { userKelas } = route.params
  const [getUserKelas, setUserKelas] = useState(JSON.stringify(userKelas).replace(/\"/g, ""))
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordValidation, setPasswordValidation] = useState('')

  const touchProps = {
    activeOpacity: 1,
    underlayColor: 'white',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('Button Custom Pressed'),
  };

  const addSiswa = () => {
    const re = /\S+@\S+\.\S+/

    if (nama && email && password && passwordValidation) {
      if (re.test(email)) {
        if (password == passwordValidation) {
          fetch('https://tubespamqrcode.herokuapp.com/api/user/store', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nama: nama,
              kelas: getUserKelas,
              email: email,
              password: password
            }),
          })
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson.error == null) {
                ToastAndroid.show("Sukses menambah siswa", ToastAndroid.SHORT);
                setNama('')
                setEmail('')
                setPassword('')
                setPasswordValidation('')
                navigation.navigate("Kelas")
              } else {
                Alert.alert(
                  "Error",
                  "Email telah digunakan",
                  [
                    {
                      text: "OK",
                      style: "cancel",
                    },
                  ],
                  {
                    cancelable: true
                  }
                );
              }
            })
        } else {
          Alert.alert(
            "Error",
            "Password tidak sesuai",
            [
              {
                text: "OK",
                style: "cancel",
              },
            ],
            {
              cancelable: true
            }
          );
        }
      } else {
        Alert.alert(
          "Error",
          "Email tidak sesuai",
          [
            {
              text: "OK",
              style: "cancel",
            },
          ],
          {
            cancelable: true
          }
        );
      }

    } else {
      Alert.alert(
        "Error",
        "Masukkan seluruh field",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        {
          cancelable: true
        }
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowBack />
        <Text style={styles.text_header}>Tambah Siswa</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.boxShadow}></View>
        <ScrollView>
          <View style={styles.footerBox}>
            <Text style={styles.title}>Nama</Text>
            <View style={styles.containerInput}>
              <View>
                <TextInput
                  value={nama}
                  onChangeText={text => setNama(text)}
                  label="nama"
                  autoCapitalize="none"
                  style={styles.textInput}
                  placeholder="Nama Lengkap Siswa"
                />
              </View>
              <Feather
                name="user"
                color={ColorPrimary}
                size={25}
                style={{ marginBottom: 5 }}
              />
            </View>
            <Text style={styles.title}>E-mail</Text>
            <View style={styles.containerInput}>
              <View>
                <TextInput
                  label="Email"
                  returnKeyType="next"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  style={styles.textInput}
                  placeholder="E-mail Siswa"
                />
              </View>
              <Feather
                name="mail"
                color={ColorPrimary}
                size={25}
                style={{ marginBottom: 5 }}
              />
            </View>
            <Text style={styles.title}>Password</Text>
            <View style={styles.containerInput}>
              <View>
                <TextInput
                  label="validasi"
                  returnKeyType="done"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry
                  style={styles.textInput}
                  placeholder="Password"
                />
              </View>
              <FontAwesome name="key" color={ColorPrimary} size={25} />
            </View>
            <Text style={styles.title}>Validasi Password</Text>
            <View style={styles.containerInput}>
              <TextInput
                label="validasi"
                returnKeyType="done"
                value={passwordValidation}
                onChangeText={text => setPasswordValidation(text)}
                secureTextEntry
                style={styles.textInput}
                placeholder="Validasi Password"
              />
              <FontAwesome name="key" color={ColorPrimary} size={25} />
            </View>

            <TouchableHighlight {...touchProps} onPress={addSiswa}>
              <ButtonCustom title="Tambah" isPress={isPress} />
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default UserTambah;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPrimary,
  },
  header: {
    flex: 1,
    // flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  footerBox: {
    paddingTop: 30,
    paddingHorizontal: 10
  },
  boxShadow: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: ColorPrimary,
    shadowColor: '#005343',
    elevation: 8,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
  },
  picker: {
    // paddingTop: 30,
    marginBottom: 30,
    // marginTop: 30,
    borderBottomWidth: 2,
    borderBottomColor: ColorPrimary,
  },
  title: {
    color: ColorPrimary,
    fontSize: 12,
  },
  respon: {
    marginTop: 30,
    padding: 5,
    // textAlign: 'center',
    color: '#f58ca1',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    // marginLeft: 15,
    marginRight: 5,
    color: '#000',
    fontSize: 16,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: ColorPrimary,
  },
});
