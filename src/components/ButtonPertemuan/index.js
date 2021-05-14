import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { Qrcode, QrcodeActive } from '../../assets';
import { useNavigation } from '@react-navigation/native';

const ButtonPertemuan = ({ topik, id }) => {
  var [isPress, setIsPress] = React.useState(false);
  const navigation = useNavigation();

  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'white',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('Button Icon Pressed'),
  };
  var [isQrPress, setIsQrPress] = React.useState(false);

  const KelasDetail = () => {
    navigation.navigate('KelasDetail', { kelasId: id })
  }

  var qrProps = {
    activeOpacity: 1,
    underlayColor: 'white',
    onHideUnderlay: () => setIsQrPress(false),
    onShowUnderlay: () => setIsQrPress(true),
  };
  return (
    <TouchableHighlight {...touchProps} onPress={KelasDetail}>
      <View style={isPress ? styles.containerBaru : styles.container}>
        <View style={styles.containerDalam}>
          <Text style={styles.title}>{topik}</Text>
          <Text style={styles.topik}>{topik}</Text>
        </View>
        <TouchableHighlight {...qrProps}>
          <View style={isQrPress ? styles.boxIconBaru : styles.boxIcon}>
            {isQrPress ? <QrcodeActive /> : <Qrcode />}
          </View>
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
};

export default ButtonPertemuan;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: ColorPrimary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 15,
    marginHorizontal: 10,
    elevation: 10,
  },
  containerBaru: {
    flexDirection: 'row',
    borderWidth: 3,
    backgroundColor: '#fff',
    borderColor: ColorPrimary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 13,
    marginHorizontal: 10,
  },
  containerDalam: {
    // backgroundColor: '#31ec92',
    flex: 7,
    // paddingRight: 10,
  },
  boxIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPrimary,
    padding: 10,
    borderRadius: 20,
    flex: 2,
    marginLeft: 20,
    elevation: 5,
  },
  boxIconBaru: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    flex: 2,
    marginLeft: 20,
    borderColor: ColorPrimary,
    borderWidth: 2,
    // elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    color: ColorPrimary,
    fontSize: 25,
  },
  topik: {
    color: '#000',
    fontSize: 15,
  },
});
