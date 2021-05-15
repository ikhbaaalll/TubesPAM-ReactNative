import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { ButtonIcon, ArrowBack } from '../../components';

const UserKelas = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowBack />
        <Text style={styles.text_header}>Kelas Siswa</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.boxShadow}></View>
        <ScrollView>
          <View style={styles.footerBox}>
            <ButtonIcon title="Tambah" value="Kelas 1" type="menu" source="plus"/>
            <ButtonIcon title="kelas 1" value="Kelas 1" />
            <ButtonIcon title="kelas 2" value="Kelas 2" />
            <ButtonIcon title="kelas 3" value="Kelas 3" />
            <ButtonIcon title="kelas 4" value="Kelas 4" />
            <ButtonIcon title="kelas 5" value="Kelas 5" />
            <ButtonIcon title="kelas 6" value="Kelas 6" />
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
