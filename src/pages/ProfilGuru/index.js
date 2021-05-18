import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Button,
  ScrollView,
  Alert,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import Feather from 'react-native-vector-icons/Feather';
import { Donut } from '../../components';

const ProfilGuru = ({ navigation }) => {
  const [idUser, setIdUser] = useState('1');
  const [kelas, setKelas] = useState('1');
  const [detail, setDetail] = useState({
    user: {
      nama: '',
      kelas: '',
    },
    siswa: 0,
    presensiMatematika: 0,
    absenMatematika: 0,
    persentaseMatematika: 0,
    presensiBahasaInggris: 0,
    absenBahasaInggris: 0,
    presentaseBahasaInggris: 0,
    presensiBahasaIndonesia: 0,
    absenBahasaIndonesia: 0,
    presentaseBahasaIndonesia: 0,
    presensiIpa: 0,
    absenIpa: 0,
    presentaseIpa: 0,
    presensiIps: 0,
    absenIps: 0,
    presentaseIps: 0,
    presensiSeni: 0,
    absenSeni: 0,
    presentaseSeni: 0,
    presensiPkn: 0,
    absenPkn: 0,
    presentasePkn: 0,
    presensiOlahraga: 0,
    absenOlahraga: 0,
    presentaseOlahraga: 0,
    totalPresensi: 0,
    total: 0,
    totalPresentasi: 0,
  });
  var [isPress, setIsPress] = useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: '#fff',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
  };
  const logout = () => {
    Alert.alert(
      'Peringatan',
      'Yakin ingin keluar?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          style: 'cancel',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.navigate('Login');
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const checkConnection = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      BackHandler.exitApp();
    }
  });

  const cekWarna = (persentase) => {
    if (persentase > 70) return ColorPrimary;
    if (persentase > 50) return 'tomato';
    if (persentase > 0) return 'red';
    return ColorSecondary;
  };

  useEffect(() => {
    checkConnection();

    const _getUser = async () => {
      const user = await AsyncStorage.getItem('id');
      const getKelas = await AsyncStorage.getItem('kelas');
      if (!user) {
        navigation.replace('Login');
      }
      setIdUser(user);
      setKelas(getKelas);
    };
    _getUser();

    fetch('https://tubespamqrcode.herokuapp.com/api/user/show', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: idUser,
        kelas: kelas,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        setDetail(responseJson);
      });
  }, [idUser, kelas]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Profil</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.boxShadow}></View>
        <ScrollView>
          <View style={styles.footerBox}></View>
          <View style={styles.footerTop}>
            <FontAwesome name="user-circle" color={ColorPrimary} size={100} />
            <Text style={styles.nama}>{detail.user.nama}</Text>
            <Text style={styles.kelas}>Guru Kelas {detail.user.kelas}</Text>
            <Text style={styles.kelas}>
              Siswa kelas {detail.user.kelas} :   {detail.siswa} orang
            </Text>
            <TouchableHighlight onPress={logout} {...touchProps}>
              <View style={styles.logoutButton(isPress)}>
                <Feather name="log-out" style={styles.logoutIcon} />
                <Text style={styles.logoutText}>Logout</Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfilGuru;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPrimary,
  },
  header: {
    flex: 1,
    // flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'flex-end',
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
    paddingHorizontal: 10,
  },
  footerTop: {
    justifyContent: 'center',
    alignItems: 'center',
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
  nama: {
    fontSize: 30,
    fontWeight: 'bold',
    color: ColorPrimary,
    marginTop: 20,
  },
  kelas: {
    fontSize: 15,
    color: '#525252',
  },
  footerBot: {
    marginTop: 40,
  },
  hadirBox: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 15,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: ColorSecondary,
    // backgroundColor: ColorPrimary
  },
  pelajaran: {
    color: '#4d4d4d',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  siswa: {
    color: '#4d4d4d',
    fontSize: 15,
  },
  logoutButton: isPress => ({
    marginVertical: 20,
    backgroundColor: '#fff',
    borderColor: ColorPrimary,
    borderRadius: 5,
    borderWidth: 2,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: isPress ? 0 : 6,
  }),
  logoutText: {
    color: ColorPrimary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  logoutIcon: {
    marginRight: 10,
    color: ColorPrimary,
    fontSize: 15,
  },
});
