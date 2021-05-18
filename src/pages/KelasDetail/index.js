import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  BackHandler,
  Alert
} from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { ArrowBack, ItemSiswa } from '../../components';
import NetInfo from "@react-native-community/netinfo";

const KelasDetail = ({ route, navigation }) => {
  const [hadir, setHadir] = useState(true);
  const { kelasId, roleUser, userId } = route.params
  const [role, setRole] = useState(JSON.stringify(roleUser).replace(/\"/g, ""))
  const [status, setStatus] = useState('0')
  const [user, setUser] = useState(JSON.stringify(userId).replace(/\"/g, ""))
  const [presensi, setPresensi] = useState('0')
  const [statusKelas, setStatusKelas] = useState('0')
  const [totalPresensi, setTotalPresensi] = useState('0')
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
  const [totalHadir, setTotalHadir] = useState(0);
  const [total, setTotal] = useState(0);

  const checkConnection = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      BackHandler.exitApp();
    }
  });

  useEffect(() => {
    checkConnection();

    fetch('https://tubespamqrcode.herokuapp.com/api/kelas/show', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: JSON.stringify(kelasId).replace(/\"/g, ""),
        user: user
      }),
    })
      .then(response => response.json())
      .then((responseJson) => { setDetail(responseJson.kelas), setKelas(responseJson.presensi), setStatus(responseJson.kelas.status), setPresensi(responseJson.status), setStatusKelas(responseJson.statusKelas), setTotalPresensi(responseJson.total), setTotal(responseJson.totalPresensi), setTotalHadir(responseJson.totalHadir) })
  }, [])

  const deleteKelas = () => {
    Alert.alert(
      "Peringatan",
      "Yakin ingin menghapus kelas?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          style: "cancel",
          onPress: () => {
            fetch('https://tubespamqrcode.herokuapp.com/api/kelas/destroy', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: JSON.stringify(kelasId).replace(/\"/g, ""),
              }),
            })
              .then(response => response.json())
              .then(responseJson => {
                if (responseJson == 'Sukses') {
                  ToastAndroid.show("Sukses menghapus kelas", ToastAndroid.SHORT);
                  navigation.navigate('Kelas')
                }
              })
          },
        },
      ],
      {
        cancelable: true
      }
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowBack user={role == '1' ? 'guru' : 'siswa'} status={role == '1' ? statusKelas == '0' ? 'belum' : 'selesai' : presensi == '0' ? 'belum' : 'selesai'} type="detail" id={JSON.stringify(kelasId).replace(/\"/g, "")} />
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
            <Text style={styles.kehadiran}>Kehadiran Siswa {totalHadir}/{totalPresensi}</Text>
            {/* untuk siswa hadir */}
            {
              kelas.map(data => {
                return <ItemSiswa key={data.id} nama={data.user.nama} status={data.status} id={data.id} />
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
    justifyContent: 'space-between',
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
    paddingVertical: 30,
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
    shadowColor: '#31ec92',
    elevation: 8,
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
