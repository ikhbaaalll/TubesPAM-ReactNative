import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { ArrowBack, Siswa } from '../../components';

const UserList = ({ route, navigation }) => {
  const { kelas, userKelas } = route.params
  const [getKelas, setKelas] = useState(JSON.stringify(kelas).replace(/\"/g, ""))
  const [getUserKelas, setUserKelas] = useState(JSON.stringify(userKelas).replace(/\"/g, ""))
  const [listUser, setListUser] = useState([])

  useEffect(() => {
    fetch('http://192.168.43.152:1010/api/user/index', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        kelas: getKelas
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        setListUser(responseJson), console.log(responseJson)
      })

  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowBack />
        <Text style={styles.text_header}>Siswa Kelas {getKelas}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.boxShadow}></View>
        <ScrollView>
          <View style={styles.footerBox}>
            {
              listUser.map(data => {
                return <Siswa key={data.id} nama={data.nama} id={data.id} kelas={data.kelas} userKelas={getUserKelas} email={data.email} />
              })
            }
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default UserList;

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
    color: ColorPrimary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  kehadiran: {
    // marginTop: 40,
    //   borderTo
    fontWeight: 'bold',
    color: ColorPrimary,
    fontSize: 30,
  },
});
