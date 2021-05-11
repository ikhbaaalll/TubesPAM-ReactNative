import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';
import {
  ButtonIcon,
  MyDatePicker,
  PickDateTime,
  ButtonCustom,
} from '../../components';
import Feather from 'react-native-vector-icons/Feather';

const KelasTambah = () => {
  var [isPress, setIsPress] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'white',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true)
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Tambah Kelas</Text>
        </View>
        <View style={styles.footer}>
          {/* <Text style={styles.text_footer}>Data Kelas</Text> */}
          <View style={styles.box}>
            <View style={styles.picker}>
              <Text style={styles.title}>Mata Pelajaran</Text>
              <Picker
                selectedValue={'Pilih Pelajaran'}
                //   style={styles.picker}
                //   onValueChange={(itemValue, itemIndex) =>
                //     setSelectedValue(itemValue)
                //   }
              >
                <Picker.Item label="Pilih Mata Pelajaran" value=" " />
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
                  value="Matematika"
                />
              </Picker>
            </View>
            <Text style={styles.title}>Topik</Text>
            <View style={styles.containerInput}>
              <View>
                <TextInput
                  label="Topik"
                  // returnKeyType="next"
                  // value={email.value}
                  // onChangeText={text => setEmail({value: text, error: ''})}
                  // error={!!email.error}
                  // errorText={email.error}
                  autoCapitalize="none"
                  // autoCompleteType="email"
                  // textContentType="emailAddress"
                  // keyboardType="email-address"
                  style={styles.textInput}
                  placeholder="Topik Bahasan"
                />
              </View>
              <Feather
                name="tag"
                color={ColorPrimary}
                size={25}
                style={{marginBottom: 5}}
              />
            </View>
            <PickDateTime />
            <TouchableHighlight {...touchProps}>
              <ButtonCustom title="Tambah" isPress={isPress} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </ScrollView>
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
    justifyContent: 'flex-end',
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  box: {
    marginTop: 50,
    marginHorizontal: 30,
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
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: ColorPrimary,
  },
});
