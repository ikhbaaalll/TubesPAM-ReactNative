import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const ArrowBack = ({ user, status, type, id }) => {
  var [isPress, setIsPress] = React.useState(false);
  var [isPressHapus, setisPressHapus] = React.useState(false);
  const navigation = useNavigation();

  var touchProps = {
    activeOpacity: 1,
    underlayColor: ColorPrimary,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => navigation.goBack(),
  };

  const IconHeaderSiswa = ({ title, lambang, styleIcon, styleText }) => {
    return (
      <View style={styles.keteranganBox(isPressHapus)}>
        <Text style={status == 'selesai' ? styles.text : styles.textRed}>
          {title}
        </Text>
        <Feather
          name={lambang}
          style={status == 'selesai' ? styles.icon : styles.iconRed}
        />
      </View>
    );
  };

  const IconHeaderGuru = ({
    title,
    lambang,
    styleIcon,
    styleText,
    isPressHapus,
  }) => {

    var touchPropsHapus = {
      activeOpacity: 1,
      underlayColor: ColorPrimary,
      onHideUnderlay: () => setisPressHapus(false),
      onShowUnderlay: () => setisPressHapus(true),
      onPress: () => console.log(isPressHapus),
    };

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
                  id: id,
                }),
              })
                .then(response => response.json())
                .then(responseJson => {
                  if (responseJson == 'Sukses') {
                    ToastAndroid.show("Sukses menghapus kelas", ToastAndroid.SHORT);
                    navigation.navigate("Kelas")
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
      <TouchableHighlight {...touchPropsHapus} onPress={user == 'guru' && status == 'belum' ? deleteKelas : null}>
        <View style={styles.keteranganBox(isPressHapus)}>
          <Text style={status == 'selesai' ? styles.text : styles.textRed}>
            {title}
          </Text>
          <Feather
            name={lambang}
            style={status == 'selesai' ? styles.icon : styles.iconRed}
          />
        </View>
      </TouchableHighlight>
    );
  };

  const Guru = () => {
    return status == 'selesai' ? (
      <IconHeaderGuru title="Selesai" lambang="check-circle" status="selesai" />
    ) : (
      <IconHeaderGuru title="Hapus Kelas" lambang="x-circle" status="belum" />
    );
  };

  const Siswa = () => {
    return status == 'selesai' ? (
      <IconHeaderSiswa title="Hadir" lambang="check-circle" status="selesai" />
    ) : (
      <IconHeaderSiswa title="Tidak Hadir" lambang="clock" status="belum" />
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
  keteranganBox: isPressHapus => ({
    flexDirection: 'row',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: isPressHapus ? ColorPrimary : '#fff',
    borderWidth: isPressHapus ? 3 : 0,
    borderColor: isPressHapus ? '#f58ca1' : null,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: isPressHapus ? 0 : 15,
  }),
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
