import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';
import {ButtonIcon} from '../../components';
import {Logo} from '../../assets';

const HomeGuru = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Home</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.boxShadow}></View>
        <ScrollView>
          <View style={styles.footerBox}>
            <View style={styles.imageBox}>
              <ImageBackground
                source={Logo}
                style={styles.image}></ImageBackground>
            </View>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={styles.text_footer}>Manajemen Kelas</Text>
              <View style={styles.menuBox1}>
                <ButtonIcon title="Hapus" value="hapuskelas"  type="menu" source="minus-square"/>
                <ButtonIcon title="Tambah" value="tambahkelas" type="menu" source="plus-square"/>
              </View>
              <Text style={styles.text_footer}>Manajemen Akun Siswa</Text>
              <View style={styles.menuBox}>
                <ButtonIcon title="Hapus" value="hapuskelas" type="menu" source="user-x"/>
                <ButtonIcon title="Tambah" value="tambahkelas" type="menu" source="user-plus"/>
                <ButtonIcon title="Edit" value="hapuskelas" type="menu" source="edit-3"/>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeGuru;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPrimary,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
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
  menuBox: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuBox1: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 30,
    marginTop: 30,
    marginBottom: 30,
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  image: {
    width: 200,
    height: 200,
  },
});
