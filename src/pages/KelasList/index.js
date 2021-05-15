import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { ButtonIcon, ArrowBack } from '../../components';
import AsyncStorage from '@react-native-community/async-storage';

const KelasList = () => {
  const [kelas, setKelas] = useState('1')

  useEffect(() => {
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
        <ArrowBack />
        <Text style={styles.text_header}>Mata Pelajaran</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.boxShadow}></View>
        <ScrollView>
          <View style={styles.footerBox}>
            <ButtonIcon title="MTK" value="Matematika" userKelas={kelas} />
            <ButtonIcon title="B.Ing" value="Bahasa Inggris" userKelas={kelas} />
            <ButtonIcon title="B.Ind" value="Bahasa Indonesia" userKelas={kelas} />
            <ButtonIcon title="IPA" value="Ilmu Pengetahuan Alam" userKelas={kelas} />
            <ButtonIcon title="IPS" value="Ilmu Pengetahuan Sosial" userKelas={kelas} />
            <ButtonIcon title="PKN" value="Pendidikan Pancasila dan Kewarganegaraan" userKelas={kelas} />
            <ButtonIcon title="Seni" value="Seni Budaya" />
            <ButtonIcon title="PJOK" value="Pendidikan Jasmani, Olahraga, dan Kesehatan" userKelas={kelas} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default KelasList;

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
