import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ToastAndroid,
  BackHandler
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
const { width } = Dimensions.get('screen');
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

export default function index() {
  const [user, setUser] = useState()

  const checkConnection = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      BackHandler.exitApp();
    }
  });

  useEffect(() => {
    checkConnection();

    const _getUser = async () => {
      const id = await AsyncStorage.getItem('id')
      if (!id) {
        navigation.replace('Login')
        setUser(null)
      }
      setUser(id)
    }
    _getUser()

  }, [])

  const onSuccess = (e) => {
    fetch('https://tubespamqrcode.herokuapp.com/api/kelas/siswa/presensi', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: e.data,
        user: user,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          ToastAndroid.show("Presensi berhasil", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Presensi gagal", ToastAndroid.SHORT);
        }
      }).catch(e => {
        ToastAndroid.show("Presensi gagal, pastikan barcode sesuai", ToastAndroid.SHORT)
      })
  };

  return (
    <View style={{ flex: 1 }}>
      <QRCodeScanner
        onRead={onSuccess}
      />
      <View
        style={{
          ...StyleSheet.absoluteFill,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: width / 1.5,
            height: width / 1.5,
          }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.boxTopLeft} />
            <View style={styles.boxFlex} />
            <View style={styles.boxTopRight} />
          </View>
          <View style={styles.boxFlex}></View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.boxBottomLeft} />
            <View style={styles.boxFlex} />
            <View style={styles.boxBottomRight} />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  boxFlex: {
    flex: 1,
  },
  boxTopLeft: {
    flex: 1,
    borderColor: '#000',
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  boxTopRight: {
    flex: 1,
    borderColor: '#000',
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  boxBottomLeft: {
    flex: 1,
    borderColor: '#000',
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  boxBottomRight: {
    flex: 1,
    borderColor: '#000',
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
});
