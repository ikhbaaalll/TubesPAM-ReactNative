import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  ToastAndroid,
  Alert,
  BackHandler
} from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { ButtonCustom, ArrowBack, DateTimeChooser } from '../../components';
import Feather from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

const KelasTambah = ({ navigation }) => {
  const [isPress, setIsPress] = React.useState(false);
  const [pelajaran, setPelajaran] = useState('pilih');
  const [judul, setJudul] = useState(null);
  const [tanggal, setTanggal] = useState(null);
  const [waktu, setWaktu] = useState(null);
  const [userId, setUserId] = useState(null);
  const [kelas, setKelas] = useState(null)

  const touchProps = {
    activeOpacity: 1,
    underlayColor: 'white',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('Button Custom Pressed'),
  };

  const checkConnection = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      BackHandler.exitApp();
    }
  });

  useEffect(() => {
    checkConnection();

    const _session = async () => {
      const getUserId = await AsyncStorage.getItem('id')
      const getUserKelas = await AsyncStorage.getItem('kelas')
      setUserId(getUserId)
      setKelas(getUserKelas)
    }
    _session()
  }, [])

  const onPressAddKelas = () => {
    if (judul && tanggal && waktu && pelajaran != 'pilih') {
      fetch('https://tubespamqrcode.herokuapp.com/api/kelas', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          nama: judul,
          pelajaran: pelajaran,
          tanggal: tanggal,
          waktu: waktu,
          kelas: kelas
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.status) {
            ToastAndroid.show("Sukses membuat kelas", ToastAndroid.SHORT);
            navigation.navigate("Profil")
            setPelajaran('pilih')
            setJudul('')
            setWaktu(null)
          }
        })

    } else {
      Alert.alert(
        "Error",
        "Masukkan seluruh field yang tersedia",
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

  const getTanggal = (data) => {
    setTanggal(data)
  }

  const getWaktu = (data) => {
    setWaktu(data)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowBack />
        <Text style={styles.text_header}>Tambah Kelas</Text>
      </View>
      <View style={styles.footer}>
        {/* <Text style={styles.text_footer}>Data Kelas</Text> */}
        <View style={styles.box}>
          <View style={styles.boxShadow}></View>

          <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.picker}>
              <Text style={styles.title}>Mata Pelajaran</Text>
              <Picker
                selectedValue={pelajaran}
                onValueChange={(itemValue, itemIndex) =>
                  setPelajaran(itemValue)
                }>
                <Picker.Item label="Pilih Mata Pelajaran" value="pilih" />
                <Picker.Item label="Matematika" value="Matematika" />
                <Picker.Item label="Bahasa Inggris" value="Bahasa Inggris" />
                <Picker.Item
                  label="Bahasa Indonesia"
                  value="Bahasa Indonesia"
                />
                <Picker.Item
                  label="Ilmu Pengetahuan Alam"
                  value="Ilmu Pengetahuan Alam"
                />
                <Picker.Item
                  label="Ilmu Pengetahuan Sosial"
                  value="Ilmu Pengetahuan Sosial"
                />
                <Picker.Item label="Seni Budaya" value="Seni Budaya" />
                <Picker.Item
                  label="Pendidikan Pancasila dan Kewarganegaraan"
                  value="Pendidikan Pancasila dan Kewarganegaraan"
                />
                <Picker.Item
                  label="Pendidikan Jasmani, Olahraga, dan Kesehatan"
                  value="Pendidikan Jasmani, Olahraga, dan Kesehatan"
                />
              </Picker>
            </View>
            <Text style={styles.title}>Topik</Text>
            <View style={styles.containerInput}>
              <View>
                <TextInput
                  value={judul}
                  onChangeText={text => setJudul(text)}
                  label="Topik"
                  autoCapitalize="none"
                  style={styles.textInput}
                  placeholder="Topik Bahasan"
                />
              </View>
              <Feather
                name="tag"
                color={ColorPrimary}
                size={25}
                style={{ marginBottom: 5 }}
              />
            </View>
            <DateTimeChooser getTanggal={getTanggal} getWaktu={getWaktu} mode="time" title={waktu ? tanggal + ' - ' + waktu : 'Pilih waktu'} />
            <TouchableHighlight {...touchProps} onPress={onPressAddKelas}>
              <ButtonCustom title="Tambah" isPress={isPress} />
            </TouchableHighlight>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default KelasTambah;

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
  text_footer: {
    textAlign: 'center',
    color: ColorPrimary,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
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
  signIn: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    color: '#05375a',
    fontSize: 12,
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
  title: {
    color: ColorPrimary,
    fontSize: 12,
  },
  picker: {
    paddingTop: 30,
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: ColorPrimary,
  },
});
