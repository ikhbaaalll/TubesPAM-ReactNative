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

const Profil = ({ navigation }) => {
  const [idUser, setIdUser] = useState('1');
  const [kelas, setKelas] = useState('1');
  const [detail, setDetail] = useState({
    user: {
      nama: '',
      kelas: '',
    },
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
            {/* <FontAwesome name="user-circle" color={ColorPrimary} size={100} /> */}
            <Donut
              key={100}
              percentage={parseInt(detail.totalPresensi)}
              color={cekWarna(parseInt(detail.totalPresentasi))}
              delay={8000}
              max={parseInt(detail.total) > 0 ? parseInt(detail.total) : 1}
              radius={100}
            />
            <Text style={styles.nama}>{detail.user.nama}</Text>
            <Text style={styles.kelas}>Kelas {detail.user.kelas}</Text>
            <Text style={styles.kelas}>
              Kehadiran {detail.totalPresensi}/{detail.total}
            </Text>
            <TouchableHighlight {...touchProps} onPress={logout}>
              <View style={styles.logoutButton(isPress)}>
                <Feather name="log-out" style={styles.logoutIcon} />
                <Text style={styles.logoutText}>Logout</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.footerBot}>
            {/* map dari sini untuk 1 matapelajaran */}
            <View style={styles.hadirBox}>
              <View style={{ flex: 3, marginRight: 20 }}>
                <Text style={styles.pelajaran}>Matematika</Text>
                <Text style={styles.siswa}>
                  Hadir: {detail.presensiMatematika}
                </Text>
                <Text style={styles.siswa}>
                  Tidak Hadir: {detail.absenMatematika}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Donut
                  key={99}
                  percentage={parseInt(detail.presensiMatematika)}
                  color={cekWarna(parseInt(detail.persentaseMatematika))}
                  delay={8000}
                  max={((parseInt(detail.presensiMatematika) + parseInt(detail.absenMatematika)) > 0) ? parseInt(detail.presensiMatematika) + parseInt(detail.absenMatematika) : 1}
                  radius={40}
                />
              </View>
            </View>
            <View style={styles.hadirBox}>
              <View style={{ flex: 3, marginRight: 20 }}>
                <Text style={styles.pelajaran}>Bahasa Inggris</Text>
                <Text style={styles.siswa}>
                  Hadir: {detail.presensiBahasaInggris}
                </Text>
                <Text style={styles.siswa}>
                  Tidak Hadir: {detail.absenBahasaInggris}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Donut
                  key={98}
                  percentage={parseInt(detail.presensiBahasaInggris)}
                  color={cekWarna(parseInt(detail.presentaseBahasaInggris))}
                  delay={8000}
                  max={((parseInt(detail.presensiBahasaInggris) + parseInt(detail.absenBahasaInggris)) > 0) ? parseInt(detail.presensiBahasaInggris) + parseInt(detail.absenBahasaInggris) : 1}
                  radius={40}
                />
              </View>
            </View>
            <View style={styles.hadirBox}>
              <View style={{ flex: 3, marginRight: 20 }}>
                <Text style={styles.pelajaran}>Bahasa Indonesia</Text>
                <Text style={styles.siswa}>
                  Hadir: {detail.presensiBahasaIndonesia}
                </Text>
                <Text style={styles.siswa}>
                  Tidak Hadir: {detail.absenBahasaIndonesia}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Donut
                  key={97}
                  percentage={parseInt(detail.presensiBahasaIndonesia)}
                  color={cekWarna(parseInt(detail.presentaseBahasaIndonesia))}
                  delay={8000}
                  max={(parseInt(detail.presensiBahasaIndonesia) + parseInt(detail.absenBahasaIndonesia)) > 0 ? detail.presensiBahasaIndonesia + detail.absenBahasaIndonesia : 1}
                  radius={40}
                />
              </View>
            </View>
            <View style={styles.hadirBox}>
              <View style={{ flex: 3, marginRight: 20 }}>
                <Text style={styles.pelajaran}>Ilmu Pengetahuan Alam</Text>
                <Text style={styles.siswa}>Hadir: {detail.presensiIpa}</Text>
                <Text style={styles.siswa}>Tidak Hadir: {detail.absenIpa}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Donut
                  key={96}
                  percentage={parseInt(detail.presensiIpa)}
                  color={cekWarna(parseInt(detail.presentaseIpa))}
                  delay={8000}
                  max={(parseInt(detail.presensiIpa) + parseInt(detail.absenIpa)) > 0 ? parseInt(detail.presensiIpa) + parseInt(detail.absenIpa) : 1}
                  radius={40}
                />
              </View>
            </View>
            <View style={styles.hadirBox}>
              <View style={{ flex: 3, marginRight: 20 }}>
                <Text style={styles.pelajaran}>IPS</Text>
                <Text style={styles.siswa}>Hadir: {detail.presensiIps}</Text>
                <Text style={styles.siswa}>Tidak Hadir: {detail.absenIps}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Donut
                  key={95}
                  percentage={parseInt(detail.presensiIps)}
                  color={cekWarna(parseInt(detail.presentaseIps))}
                  delay={8000}
                  max={(parseInt(detail.presensiIps) + parseInt(detail.absenIps)) > 0 ? parseInt(detail.presensiIps) + parseInt(detail.absenIps) : 1}
                  radius={40}
                />
              </View>
            </View>
            <View style={styles.hadirBox}>
              <View style={{ flex: 3, marginRight: 20 }}>
                <Text style={styles.pelajaran}>Seni Budaya</Text>
                <Text style={styles.siswa}>Hadir: {detail.presensiSeni}</Text>
                <Text style={styles.siswa}>
                  Tidak Hadir: {detail.absenSeni}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Donut
                  key={94}
                  percentage={parseInt(detail.presensiSeni)}
                  color={cekWarna(parseInt(detail.presentaseSeni))}
                  delay={8000}
                  max={(parseInt(detail.presensiSeni) + parseInt(detail.absenSeni)) > 0 ? parseInt(detail.presensiSeni) + parseInt(detail.absenSeni) : 1}
                  radius={40}
                />
              </View>
            </View>
            <View style={styles.hadirBox}>
              <View style={{ flex: 3, marginRight: 20 }}>
                <Text style={styles.pelajaran}>PKN</Text>
                <Text style={styles.siswa}>Hadir: {detail.presensiPkn}</Text>
                <Text style={styles.siswa}>Tidak Hadir: {detail.absenPkn}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Donut
                  key={93}
                  percentage={parseInt(detail.presensiPkn)}
                  color={cekWarna(parseInt(detail.presentasePkn))}
                  delay={8000}
                  max={(parseInt(detail.presensiPkn) + parseInt(detail.absenPkn)) > 0 ? parseInt(detail.presensiPkn) + parseInt(detail.absenPkn) : 1}
                  radius={40}
                />
              </View>
            </View>
            <View style={styles.hadirBox}>
              <View style={{ flex: 3, marginRight: 20 }}>
                <Text style={styles.pelajaran}>
                  Pendidikan Jasmani Olahraga dan Kesehatan
                </Text>
                <Text style={styles.siswa}>
                  Hadir: {detail.presensiOlahraga}
                </Text>
                <Text style={styles.siswa}>
                  Tidak Hadir: {detail.absenOlahraga}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Donut
                  key={92}
                  percentage={parseInt(detail.presensiOlahraga)}
                  color={cekWarna(parseInt(detail.presentaseOlahraga))}
                  delay={8000}
                  max={(parseInt(detail.presensiOlahraga) + parseInt(detail.absenOlahraga)) > 0 ? parseInt(detail.presensiOlahraga) + parseInt(detail.absenOlahraga) : 1}
                  radius={40}
                />
              </View>
            </View>
            {/* sampai sini */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Profil;

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
    elevation: 15,
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
    marginTop: 20,
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
