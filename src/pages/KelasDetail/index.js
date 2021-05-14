import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { ButtonIcon, ArrowBack, StatusKomponen } from '../../components';
import Feather from 'react-native-vector-icons/Feather';

const KelasDetail = ({ route, navigation }) => {
  const [hadir, setHadir] = useState(true);
  const { kelasId } = route.params
  const [role, setRole] = useState('2')
  const [status, setStatus] = useState('0')
  const [detail, setDetail] = useState({
    nama: '',
    pelajaran: '',
    tanggal: '',
    waktu: '',
    status: '',
    user: {
      nama: ''
    }
  });
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    fetch('http://192.168.43.152:1010/api/kelas/show', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: JSON.stringify(kelasId).replace(/\"/g, "")
      }),
    })
      .then(response => response.json())
      .then((responseJson) => { setDetail(responseJson.kelas), setKelas(responseJson.presensi), setRole(responseJson.kelas.user.role), setStatus(responseJson.kelas.status) })
    console.log(status)
  }, [])

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
        <ArrowBack user={role == '1' ? 'guru' : 'siswa'} status={status == '0' ? 'belum' : 'selesai'} type="detail" />
        <Text style={styles.text_header}>{detail.nama}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.boxShadow}></View>
        <ScrollView>
          <View style={styles.footerBox}>
            <View style={styles.profilBox}>
              <Text style={styles.nip}>Guru</Text>
              <Text style={styles.nama}>{detail.user.nama}</Text>
              <Text style={styles.nip}>Pelajaran</Text>
              <Text style={styles.nama}>
                {detail.pelajaran}
              </Text>
              <Text style={styles.nip}>Topik</Text>
              <Text style={styles.nama}>
                {detail.nama}
              </Text>
              <Text style={styles.nip}>Tanggal</Text>
              <Text style={styles.nama}>
                {detail.tanggal}
              </Text>
              <Text style={styles.nip}>Waktu</Text>
              <Text style={styles.nama}>
                {detail.waktu}
              </Text>
            </View>
            <Text style={styles.kehadiran}>Kehadiran Siswa</Text>
            {/* untuk siswa hadir */}
            {
              kelas.map(data => {
                return <View style={styles.hadirBox}>
                  <Text style={styles.siswa}>{data.user.nama}</Text>
                  <StatusKomponen status={data.status == '1' ? 'hadir' : 'tidak'} />
                  {/* <Feather name="check-circle" style={styles.check} /> */}
                </View>
              })
            }
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
