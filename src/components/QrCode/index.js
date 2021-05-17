import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Switch } from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';

const QrCode = ({ source, status, id }) => {
  const [isEnabled, setIsEnabled] = useState(status == '1' ? true : false);
  const [stat, setStat] = useState(status)

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    setStat(isEnabled ? '1' : '0')
    fetch('https://tubespamqrcode.herokuapp.com/api/kelas/status', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        status: stat == '1' ? '0' : '1'
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        setStat(responseJson.status.status)
      })
  };

  return (
    <View style={styles.modalBox}>
      <ImageBackground
        //ganti Mola sama gambar Qr Code
        source={{ uri: source }}
        style={styles.imageBox}></ImageBackground>
      <Switch
        trackColor={{ false: '#f58ca1', true: ColorPrimary }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={styles.textButton(isEnabled)}>
        {isEnabled ? 'QrCode Aktif' : 'QrCode Tidak Aktif'}
      </Text>
    </View>
  );
};

export default QrCode;

const styles = StyleSheet.create({
  modalBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageBox: {
    height: 250,
    width: 250,
    marginBottom: 20,
  },
  textButton: isEnabled => ({
    fontSize: 15,
    color: isEnabled ? ColorPrimary : '#f58ca1',
  }),
});
