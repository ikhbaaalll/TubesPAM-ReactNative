import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const ArrowBack = ({ user, status, type }) => {
  var [isPress, setIsPress] = React.useState(false);
  const navigation = useNavigation();

  var touchProps = {
    activeOpacity: 1,
    underlayColor: ColorPrimary,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => navigation.goBack(),
  };

  const IconHeader = ({ title, lambang, styleIcon, styleText }) => {
    return (
      <View style={styles.keteranganBox}>
        <Text style={status == 'selesai' ? styles.text : styles.textRed}>
          {title}
        </Text>
        <Feather name={lambang} style={status == 'selesai' ? styles.icon : styles.iconRed} />
      </View>
    );
  };

  const Guru = () => {
    return status == 'selesai' ? (
      <IconHeader title="Selesai" lambang="check-circle" status="selesai" />
    ) : (
      <IconHeader title="Belum Mulai" lambang="clock" status="belum" />
    );
  };

  const Siswa = () => {
    return status == 'selesai' ? (
      <IconHeader title="Hadir" lambang="check-circle" status="selesai" />
    ) : (
      <IconHeader title="Tidak Hadir" lambang="clock" status="belum" />
    );
  };

  return (
    <View style={styles.headerArrow}>
      <TouchableHighlight {...touchProps}>
        <Feather
          name="arrow-left"
          style={isPress ? styles.arrowBaru : styles.arrow}
        />
      </TouchableHighlight>
      {type == 'detail' ? user == 'guru' ? <Guru /> : <Siswa /> : null}
    </View>
  );
};

export default ArrowBack;

const styles = StyleSheet.create({
  headerArrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrow: {
    borderRadius: 50,
    padding: 10,
    color: ColorPrimary,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 20,
    fontSize: 30,
  },
  arrowBaru: {
    borderRadius: 50,
    padding: 10,
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: ColorPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
  keteranganBox: {
    flexDirection: 'row',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: ColorPrimary,
    fontSize: 20,
    marginRight: 10,
    fontWeight: 'bold',
  },
  textRed: {
    color: '#f58ca1',
    fontSize: 20,
    marginRight: 10,
    fontWeight: 'bold',
  },
  icon: {
    color: ColorPrimary,
    fontSize: 30,
  },
  iconRed: {
    color: '#f58ca1',
    fontSize: 30,
  },
});
