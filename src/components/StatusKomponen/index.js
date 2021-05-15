import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
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
      fetch('http://192.168.43.152:1010/api/isadmin', {
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

    fetch('http://192.168.43.152:1010/api/kelas/get/presensi', {
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
      .then((responseJson) => { setHadir(responseJson.status == '1' ? 'hadir' : 'tidak'), console.log(responseJson.status) })
  }, [hadir])

  var touchProps = {
    activeOpacity: 1,
    underlayColor: '#fff',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('Button statuskomponen Pressed'),
  };

  const isPresent = () => {
    if (admin == '1') {
      fetch('http://192.168.43.152:1010/api/kelas/update/presensi', {
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
        .then((responseJson) => { setHadir(responseJson.status == '1' ? 'hadir' : 'tidak') })
    }
  }

  return (
    <TouchableHighlight {...touchProps} onPress={isPresent}>
      <Feather
        name={hadir == "hadir" ? "check-circle" : "x-circle"}
        style={styles.check(isPress, hadir)}
      />
    </TouchableHighlight>
  );
};

export default StatusKomponen;

const styles = StyleSheet.create({
  check: (isPress, hadir) => ({
    borderRadius: 50,
    padding: isPress ? 5 : 6,
    marginRight: 10,
    color: hadir == "hadir" ? ColorPrimary : '#f58ca1',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    fontSize: 25,
    elevation: isPress ? 0 : 10,
    borderWidth: isPress ? 1 : 0,
    borderColor: hadir == "hadir" ? ColorPrimary : '#f58ca1',
  }),
});
