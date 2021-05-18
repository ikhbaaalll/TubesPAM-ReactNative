import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, BackHandler } from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { ButtonIcon, ArrowBack } from '../../components';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

const UserKelas = ({ navigation }) => {
  const [kelas, setKelas] = useState('1')

  const checkConnection = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      BackHandler.exitApp();
    }
  });

  useEffect(() => {
    checkConnection();

    const _getKelas = async () => {
      const user = await AsyncStorage.getItem('kelas')
      if (!user) {
        navigation.replace('Login')
        setKelas(null)
      }
      setKelas(user)
    }
    _getKelas()

  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Kelas Siswa</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.boxShadow}></View>
        <ScrollView>
          <View style={styles.footerBox}>
            <ButtonIcon title="Tambah" value="Kelas 1" type="tambahsiswa" source="plus" userKelas={kelas} />
            <ButtonIcon title="Kelas 1" value="1" type="kelas" userKelas={kelas} />
            <ButtonIcon title="Kelas 2" value="2" type="kelas" userKelas={kelas} />
            <ButtonIcon title="Kelas 3" value="3" type="kelas" userKelas={kelas} />
            <ButtonIcon title="Kelas 4" value="4" type="kelas" userKelas={kelas} />
            <ButtonIcon title="Kelas 5" value="5" type="kelas" userKelas={kelas} />
            <ButtonIcon title="Kelas 6" value="6" type="kelas" userKelas={kelas} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default UserKelas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPrimary,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
    paddingTop: 20,
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
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
  footerBox: {
    paddingTop: 30,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#000',
  },
  boxShadow: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: ColorPrimary,
    shadowColor: '#005343',
    // marginBottom: 20,
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
});
