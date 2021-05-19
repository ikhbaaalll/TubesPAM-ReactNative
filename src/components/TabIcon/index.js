import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  IconScan,
  IconScanActive,
  IconProfil,
  IconProfilActive,
  Iconclass,
  IconclassActive,
  Siswa,
  SiswaActive
} from '../../assets';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';

const TabIcon = ({ label, isFocused, onPress, onLongPress }) => {
  const Icon = () => {
    if (label == 'QrScan')
      return isFocused ? <IconScanActive /> : <IconScan />;
    if (label == 'Profil')
      return isFocused ? <IconProfilActive /> : <IconProfil />;
    if (label == 'Kelas')
      return isFocused ? <IconclassActive /> : <Iconclass />;
    if (label == 'Siswa')
      return isFocused ? <SiswaActive /> : <Siswa />;

    return Icon;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.icon}>
      <Icon style={styles.icon} />
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#C5F093'
  },
  text: (isFocused) => ({
    color: isFocused ? ColorPrimary : ColorSecondary,
    fontSize: 16,
    marginTop: 3,
    textAlign: 'center',
    justifyContent: 'center',
    // backgroundColor: '#C5F093'
  })
});
