import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';
import {ButtonIcon} from '../../components';

const Kelas = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Jangan Semangat,</Text>
        <Text style={styles.text_footer}>Tetap Menyerah</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.box}>
          <ButtonIcon />
          <ButtonIcon />
        </View>
      </View>
    </View>
  );
};

export default Kelas;

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
    color: '#fff',
    fontSize: 18,
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
    fontSize: 15,
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: ColorPrimary,
    marginTop: -12,
    marginLeft: 15,
    marginRight: 5,
    color: ColorPrimary,
    fontSize: 20,
  },
  box: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
