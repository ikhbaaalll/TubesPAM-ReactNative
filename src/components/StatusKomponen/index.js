import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';
import Feather from 'react-native-vector-icons/Feather';

const StatusKomponen = ({status}) => {
  var [isPress, setIsPress] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: '#fff',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('Button statuskomponen Pressed'),
  };

  return (
    <TouchableHighlight {...touchProps}>
      <Feather
        name={status == "hadir" ? "check-circle" : "x-circle"}
        style={styles.check(isPress,status)}
      />
    </TouchableHighlight>
  );
};

export default StatusKomponen;

const styles = StyleSheet.create({
  check: (isPress,status) => ({
    borderRadius: 50,
    padding: isPress ? 5 : 6,
    marginRight: 10,
    color: status == "hadir" ? ColorPrimary : '#f58ca1',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    fontSize: 25,
    elevation: isPress ? 0 : 10,
    borderWidth: isPress ? 1 : 0,
    borderColor: status == "hadir" ? ColorPrimary : '#f58ca1',
  }),
});
