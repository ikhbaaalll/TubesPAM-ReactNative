import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';
import Feather from 'react-native-vector-icons/Feather';
import {StatusKomponen} from '../../components';

const ItemSiswa = ({nama, status}) => {
  return (
    <View style={styles.hadirBox}>
      <Text style={styles.siswa}>{nama}</Text>
      {status == '3' ? (
        <View style={styles.aksi}>
          <StatusKomponen status="edit" />
          <StatusKomponen status="tidak" />
        </View>
      ) : (
        <StatusKomponen status={status == '1' ? 'hadir' : 'tidak'} />
      )}
    </View>
  );
};

export default ItemSiswa;

const styles = StyleSheet.create({
  hadirBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 15,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: ColorSecondary,
    // backgroundColor: ColorPrimary
  },
  siswa: {
    color: '#4d4d4d',
    fontSize: 17,
  },
  aksi:{
      flexDirection: 'row',
  }
});
