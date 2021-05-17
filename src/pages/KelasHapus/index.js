import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { ButtonCustom } from '../../components';

class KelasHapus extends Component {
  state = {
    userValues: [],
    selectedValue: '',
  };

  // ini example
  GetFakeData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          userValues: json,
        });
      });
  };

  componentDidMount() {
    this.GetFakeData();
  }

  render() {


    let myUsers = this.state.userValues.map((myValue, myIndex) => {
      return (
        <Picker.Item
          label={myValue.name + ' - ' + myValue.username}
          value={myIndex}
          key={myIndex}
        />
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Hapus Pertemuan Kelas</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.boxShadow}></View>
          <ScrollView>
            <View style={styles.footerBox}>
              <View style={styles.picker}>
                <Text style={styles.title}>Mata Pelajaran</Text>
                <Picker>
                  <Picker.Item label="mtk" />
                  <Picker.Item label="kimia" />
                  <Picker.Item label="fisik" />
                </Picker>
              </View>
              <View style={styles.picker}>
                <Text style={styles.title}>Pertemuan</Text>
                <Picker>
                  <Picker.Item label="mtk" />
                  <Picker.Item label="kimia" />
                  <Picker.Item label="fisik" />
                </Picker>
              </View>
              <Text style={styles.respon}>
                Hubungi Sumiartuti untuk menghapus pertemuan
              </Text>
              <TouchableHighlight >
                <ButtonCustom title="Hapus" type="hapus" />
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default KelasHapus;

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
  footerBox: {
    paddingTop: 30,
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
  picker: {
    // paddingTop: 30,
    marginBottom: 30,
    // marginTop: 30,
    borderBottomWidth: 2,
    borderBottomColor: ColorPrimary,
  },
  title: {
    color: ColorPrimary,
    fontSize: 12,
  },
  respon: {
    marginTop: 30,
    padding: 5,
    // textAlign: 'center',
    color: '#f58ca1',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
