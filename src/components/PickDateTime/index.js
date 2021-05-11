import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PickDateTime = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [tanggal, setTanggal] = useState({
    isi: 'Pilih Tanggal',
    sudah_memilih: false,
  });
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setTanggal({
      ...tanggal,
      isi: selectedDate,
      sudah_memilih: true,
    });
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.title}>Tanggal</Text>
          <View style={styles.showButton}>
            <Text style={styles.textButton}>Pilih tanggal</Text>
            {/* <Text style={styles.textButton}>{tanggal.isi[]}</Text> */}
            <Feather name="calendar" color={ColorPrimary} size={25} />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={showTimepicker}>
          <Text style={styles.title}>Waktu</Text>
          <View style={styles.showButton}>
            <Text style={styles.textButton}>Pilih Waktu</Text>
            <Feather name="clock" color={ColorPrimary} size={25} />
          </View>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default PickDateTime;

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
