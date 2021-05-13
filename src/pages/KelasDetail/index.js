import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';
import {ButtonIcon, ArrowBack, StatusKomponen} from '../../components';
import Feather from 'react-native-vector-icons/Feather';

const KelasDetail = () => {
  const [hadir, setHadir] = useState(true);

  const icon = hadir => {
    return hadir ? (
      <Feather name="check-circle" style={styles.check} />
    ) : (
      <Feather name="x-circle" style={styles.silang} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Keterangan disini bisa diisi pake keterangan */}
        {/* // untuk view di siswa hadir */}
        <ArrowBack user="siswa" status="belum" type="detail" />
        {/* <ArrowBack user="siswa" status="belum" type="detail"/>  untuk view di siswa ga hadir */}
        {/* <ArrowBack user="guru" status="belum" type="detail"/> untuk view di guru kalau kelas selesai */}
        {/* <ArrowBack user="siswa" status="belum" type="detail"/> untuk view di guru kalau kelas belum */}
        <Text style={styles.text_header}>Pertemuan 1</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.boxShadow}></View>
        <ScrollView>
          <View style={styles.footerBox}>
            <View style={styles.profilBox}>
              <Text style={styles.nip}>Guru</Text>
              <Text style={styles.nama}>Fikri Halim Ch Semoga S.Kom</Text>
              <Text style={styles.nip}>Pelajaran</Text>
              <Text style={styles.nama}>
                Pendidikan Jasmani, Olahraga, dan Kesehatan
              </Text>
              <Text style={styles.nip}>Topik</Text>
              <Text style={styles.nama}>
                Kebugaran Jasmani dengan permainan bola besar
              </Text>
            </View>
            <Text style={styles.kehadiran}>Kehadiran Siswa</Text>
            {/* untuk siswa hadir */}
            <View style={styles.hadirBox}>
              <Text style={styles.siswa}>Fikri Halim Ch</Text>
              <StatusKomponen status="hadir"/>
              {/* <Feather name="check-circle" style={styles.check} /> */}
            </View>
            {/* untuk siswa ga hadir */}
            <View style={styles.hadirBox}>
              <Text style={styles.siswa}>Fikri Halim Ch</Text>
              <StatusKomponen status="tidak"/>
              {/* <Feather name="x-circle" style={styles.silang} /> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default KelasDetail;

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
  },
  profilBox: {
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  hadirBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 15,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: ColorSecondary,
    // backgroundColor: ColorPrimary
  },
  boxShadow: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: ColorPrimary,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
  },
  text_footer: {
    color: ColorPrimary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  foto: {
    width: 200,
    height: 200,
  },
  nama: {
    // marginTop: ,
    color: '#4d4d4d',
    fontWeight: 'bold',
    fontSize: 18,
  },
  nip: {
    color: ColorPrimary,
    fontSize: 15,
    marginTop: 15,
  },
  siswa: {
    color: '#4d4d4d',
    fontSize: 17,
  },
  check: {
    borderRadius: 50,
    padding: 5,
    marginRight: 10,
    color: ColorPrimary,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    fontSize: 25,
    elevation: 10,
  },
  silang: {
    borderRadius: 50,
    padding: 5,
    marginRight: 10,
    color: '#f58ca1',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    fontSize: 25,
    elevation: 10,
  },
  kehadiran: {
    marginTop: 40,
    //   borderTo
    fontWeight: 'bold',
    color: ColorPrimary,
    fontSize: 30,
  },
});
