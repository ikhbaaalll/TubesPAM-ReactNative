import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { Qrcode, QrcodeActive, Mola } from '../../assets';
import { ButtonCustom, QrCode } from '../../components';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const ButtonPertemuan = ({ topik, id, status, pelajaran, role, qr }) => {
  var [isPress, setIsPress] = React.useState(false);
  const navigation = useNavigation();
  var [isQrPress, setIsQrPress] = React.useState(false);
  var [isModalPress, setIsModalPress] = React.useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState()

  useEffect(() => {
    const _getUser = async () => {
      const id = await AsyncStorage.getItem('id')
      setUser(id)
    }
    _getUser()
  }, [])

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'white',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('Button Icon Pressed'),
  };

  const KelasDetail = () => {
    navigation.navigate('KelasDetail', { kelasId: id, roleUser: role, userId: user })
  }

  var qrProps = {
    activeOpacity: 1,
    underlayColor: 'white',
    onHideUnderlay: () => setIsQrPress(false),
    onShowUnderlay: () => setIsQrPress(true),
  };

  var modalProps = {
    activeOpacity: 1,
    underlayColor: 'white',
    onHideUnderlay: () => setIsModalPress(false),
    onShowUnderlay: () => setIsModalPress(true),
    onPress: () => console.log('Button modal Pressed'),
    // setModalVisible(!isModalVisible);
  };


  return (
    <TouchableHighlight {...touchProps} onPress={KelasDetail}>
      <View style={isPress ? styles.containerBaru : styles.container}>
        <View style={styles.containerDalam}>
          <Text style={styles.title}>{topik}</Text>
          <Text style={styles.topik}>{topik}</Text>
        </View>
        {
          role == '1' ?
            <TouchableHighlight {...qrProps} onPress={toggleModal}>
              <View style={isQrPress ? styles.boxIconBaru : styles.boxIcon}>
                {isQrPress ? <QrcodeActive /> : <Qrcode />}
              </View>
            </TouchableHighlight> :
            null
        }

        <Modal isVisible={isModalVisible}>
          <ScrollView style={styles.modal}>
            {/* Ganti gambar di bagian source */}
            <QrCode source={qr} status={status} id={id} />
            <Text style={styles.nip}>Pelajaran</Text>
            <Text style={styles.nama}>
              {pelajaran}
            </Text>
            <Text style={styles.nip}>Topik</Text>
            <Text style={styles.nama}>
              {topik}
            </Text>
            <TouchableHighlight {...modalProps} onPress={toggleModal} style={{ marginBottom: 50 }}>
              <ButtonCustom title="Tutup" isPress={isModalPress} />
            </TouchableHighlight>
          </ScrollView>
        </Modal>
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
    flex: 7,
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
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingBottom: 100,
  },
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
  buttonBox: {
    backgroundColor: '#31ec92',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textButton: isEnabled => ({
    fontSize: 15,
    color: isEnabled ? ColorPrimary : '#f58ca1',
  }),
  nama: {
    color: '#4d4d4d',
    fontWeight: 'bold',
    fontSize: 18,
  },
  nip: {
    color: ColorPrimary,
    fontSize: 15,
    marginTop: 15,
  },
});
