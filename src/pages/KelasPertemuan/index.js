import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { ButtonPertemuan, ArrowBack } from '../../components';
import AsyncStorage from '@react-native-community/async-storage';

const KelasPertemuan = ({ route, navigation }) => {
  const [listKelas, setListKelas] = useState([])
  const { kelas, userKelas } = route.params
  const [user, setUser] = useState('2')

  useEffect(() => {
    const _getUser = async () => {
      const role = await AsyncStorage.getItem('role')
      if (!role) {
        navigation.replace('Login')
        setUser(null)
      }
      setUser(role)
    }
    _getUser()

    fetch('https://tubespamqrcode.herokuapp.com/api/kelas/list', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pelajaran: JSON.stringify(kelas).replace(/\"/g, ""),
        kelas: JSON.stringify(userKelas).replace(/\"/g, "")
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        setListKelas(responseJson)
      })

  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowBack />
        <Text style={styles.text_header}>{JSON.stringify(kelas).replace(/\"/g, "")}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.boxShadow}></View>
        <ScrollView>
          <View style={styles.footerBox}>
            {
              listKelas ?
                listKelas.map(data => {
                  return <ButtonPertemuan key={data.id} topik={data.nama} id={data.id} status={data.status} pelajaran={data.pelajaran} role={user} qr={data.qr_code} />
                }) : null
            }
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default KelasPertemuan;

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
  text_footer: {
    textAlign: 'center',
    color: ColorPrimary,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
  },
});
