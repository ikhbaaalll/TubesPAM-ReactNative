import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { PickDateTime, ButtonCustom, ArrowBack, DateTimeChooser } from '../../components';
import Feather from 'react-native-vector-icons/Feather';

const KelasTambah = () => {
  const [isPress, setIsPress] = React.useState(false);
  const [pelajaran, setPelajaran] = useState('pilih');
  const [judul, setJudul] = useState(null);
  const [tanggal, setTanggal] = useState(null);
  const [waktu, setWaktu] = useState(null);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: 'white',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('Button Custom Pressed'),
  };

  const onPressAddKelas = () => {
    if (judul && tanggal && waktu) {
      fetch('http://192.168.43.152:1010/api/kelas', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {

        });
    }
    alert(tanggal + ' ' + waktu)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowBack />
        <Text style={styles.text_header}>Tambah Kelas</Text>
      </View>
      <View style={styles.footer}>
        {/* <Text style={styles.text_footer}>Data Kelas</Text> */}
        <View style={styles.box}>
          <View style={styles.boxShadow}></View>

          <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.picker}>
              <Text style={styles.title}>Mata Pelajaran</Text>
              <Picker
                selectedValue={pelajaran}
                onValueChange={(itemValue, itemIndex) =>
                  setPelajaran(itemValue)
                }>
                <Picker.Item label="Pilih Mata Pelajaran" value="pilih" />
                <Picker.Item label="Matematika" value="Matematika" />
                <Picker.Item label="Bahasa Inggris" value="Bahasa Inggris" />
                <Picker.Item
                  label="Bahasa Indonesia"
                  value="Bahasa Indonesia"
                />
                <Picker.Item
                  label="Ilmu Pengetahuan Alam"
                  value="Ilmu Pengetahuan Alam"
                />
                <Picker.Item
                  label="Ilmu Pengetahuan Sosial"
                  value="Ilmu Pengetahuan Sosial"
                />
                <Picker.Item label="Seni Budaya" value="Seni Budaya" />
                <Picker.Item
                  label="Pendidikan Pancasila dan Kewarganegaraan"
                  value="Pendidikan Pancasila dan Kewarganegaraan"
                />
                <Picker.Item
                  label="Pendidikan Jasmani, Olahraga, dan Kesehatan"
                  value="Pendidikan Jasmani, Olahraga, dan Kesehatan"
                />
              </Picker>
            </View>
            <Text style={styles.title}>Topik</Text>
            <View style={styles.containerInput}>
              <View>
                <TextInput
                  value={judul}
                  onChangeText={text => setJudul(text)}
                  label="Topik"
                  autoCapitalize="none"
                  style={styles.textInput}
                  placeholder="Topik Bahasan"
                />
              </View>
              <Feather
                name="tag"
                color={ColorPrimary}
                size={25}
                style={{ marginBottom: 5 }}
              />
            </View>
            <PickDateTime getWaktu={setWaktu} getTanggal={setTanggal} />
            <TouchableHighlight {...touchProps} onPress={onPressAddKelas}>
              <ButtonCustom title="Tambah" isPress={isPress} />
            </TouchableHighlight>
            {/* <DateTimeChooser mode="date" title="Pilih tanggal"/> */}
            <DateTimeChooser mode="time" title="Pilih tanggal" />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default KelasTambah;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPrimary,
  },
  header: {
    flex: 1,
    // flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  boxShadow: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: ColorPrimary,
    shadowColor: '#005343',
    elevation: 15,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
  },
  text_footer: {
    textAlign: 'center',
    color: ColorPrimary,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
  },
  text_button: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  signIn: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    color: '#05375a',
    fontSize: 12,
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    // marginLeft: 15,
    marginRight: 5,
    color: '#fff',
    fontSize: 16,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: ColorPrimary,
  },
  title: {
    color: ColorPrimary,
    fontSize: 12,
  },
  picker: {
    paddingTop: 30,
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: ColorPrimary,
  },
});
