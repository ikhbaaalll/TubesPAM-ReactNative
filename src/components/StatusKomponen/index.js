import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ToastAndroid } from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

const StatusKomponen = ({ status, id }) => {
  var [isPress, setIsPress] = useState(false);
  const [hadir, setHadir] = useState(status)
  const [admin, setAdmin] = useState(0);

  useEffect(() => {
    const _isAdmin = async () => {
      const getUserId = await AsyncStorage.getItem('id')
      fetch('https://tubespamqrcode.herokuapp.com/api/isadmin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: getUserId,
        }),
      })
        .then(response => response.json())
        .then((responseJson) => { setAdmin(responseJson.role) })
    }
    _isAdmin()

    fetch('https://tubespamqrcode.herokuapp.com/api/kelas/get/presensi', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(response => response.json())
      .then((responseJson) => { setHadir(responseJson.status == '1' ? 'hadir' : 'tidak') })
  }, [hadir])

  var touchProps = {
    activeOpacity: 1,
    underlayColor: '#fff',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
  };

  const isPresent = () => {
    fetch('https://tubespamqrcode.herokuapp.com/api/kelas/update/presensi', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        status: hadir == 'hadir' ? '0' : '1'
      }),
    })
      .then(response => response.json())
      .then((responseJson) => {
        setHadir(responseJson.status == '1' ? 'hadir' : 'tidak')
        const hadir = responseJson.status == '1' ? "hadir" : "tidak hadir"
        const text = "Sukses merubah status menjadi " + hadir
        ToastAndroid.show(text, ToastAndroid.LONG)
      })
  }

  return (
    <TouchableHighlight {...touchProps} onPress={admin == '1' ? isPresent : null}>
      <Feather
        name={hadir == "hadir" ? "check-circle" : status == "edit" ? "edit" : "x-circle"}
        style={styles.check(isPress, hadir)}
      />
    </TouchableHighlight>
  );
};

export default StatusKomponen;

const styles = StyleSheet.create({
  check: (isPress, status) => ({
    borderRadius: 50,
    padding: isPress ? 5 : 6,
    marginRight: 10,
    color: status == "hadir" ? ColorPrimary : '#f58ca1',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    fontSize: 25,
    elevation: isPress ? 0 : 10,
    borderWidth: isPress ? 1 : 0,
    borderColor: status == "hadir" ? ColorPrimary : '#f58ca1',
  }),
});
