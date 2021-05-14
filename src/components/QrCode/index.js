import React, {useState} from 'react';
import {StyleSheet, Text, View, ImageBackground, Switch} from 'react-native';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';

const QrCode = ({source}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.modalBox}>
      <ImageBackground
        //ganti Mola sama gambar Qr Code
        source={source}
        style={styles.imageBox}></ImageBackground>
      <Switch
        trackColor={{false: '#f58ca1', true: ColorPrimary}}
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
