import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment'

const DateTimeChooser = ({ mode, title, getTanggal, getWaktu }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [tanggal, setTanggal] = useState('Tanggal Pertemuan'); //tanggal
  // const [jam, setJam] = useState('Jam Pertemuan'); //tanggal
  const [tanggal, setTanggal] = useState(null);
  const [waktu, setWaktu] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // const jadwal = date.toUTCstring();
    const tahun = date.getFullYear();
    const bulan = date.getMonth();
    const bulan2 = bulan > 10 ? bulan : '0' + bulan;
    const tang = date.getDate();
    const tang2 = tang > 10 ? tang : '0' + tang;

    const jam = date.getHours()
    const jam2 = jam > 10 ? jam : '0' + jam;
    const menit = date.getMinutes()
    const menit2 = menit > 10 ? menit : '0' + menit;
    setTanggal(tahun + '-' + bulan2 + '-' + tang2)
    setWaktu(jam2 + ':' + menit2)
    getTanggal(tanggal)
    getWaktu(waktu)
    // console.warn(getTanggal + '-' + getWaktu)
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatePicker}>
        <Text style={styles.title}>Pilih Tanggal</Text>
        <View style={styles.showButton}>
          <Text style={styles.textButton}>{title}</Text>
          {/* <Text style={styles.textButton}>{tanggal.isi[]}</Text> */}
          <Feather name="calendar" color={ColorPrimary} size={25} />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}

        mode={'datetime'}
        display={'spinner'}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour={true}
      />
    </View>
  );
};

export default DateTimeChooser;

const styles = StyleSheet.create({
  showButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: ColorPrimary,
    marginBottom: 30,
  },
  textButton: {
    marginLeft: 5,
    fontSize: 16,
    marginBottom: 12,
  },
  title: {
    color: ColorPrimary,
    fontSize: 12,
    marginBottom: 3,
  },
});
