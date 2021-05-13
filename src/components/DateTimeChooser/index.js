import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'

const DateTimeChooser = ({mode,title}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tanggal, setTanggal] = useState('Tanggal Pertemuan'); //tanggal
  const [jam, setJam] = useState('Jam Pertemuan'); //tanggal

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const jadwal = date.toGMTString();
    const tahun = date.getFullYear();
    // const waktu = date.getFullHour();
    console.warn('tanggal: ', jadwal);
    // console.warn('tahun: ', tahun);
    const bulan = date.getMonth();
    // console.warn('bulan: ', bulan);
    const bulan2 = bulan > 10 ? bulan : '0' + bulan;
    // console.warn('bulan2: ', bulan);
    const tanggal = date.getDate();
    // console.warn('tanggal: ', tanggal);
    const tanggal2 = tanggal > 10 ? tanggal : '0' + tanggal;
    // console.warn('tanggal2: ', tanggal2);
    setTanggal(tahun + '-' + bulan2 + '-' + tanggal2);
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatePicker}>
        <Text>{title}</Text>
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

const styles = StyleSheet.create({});
