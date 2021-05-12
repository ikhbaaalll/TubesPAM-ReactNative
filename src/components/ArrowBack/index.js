import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';
import Feather from 'react-native-vector-icons/Feather';

const ButtonPertemuan = ({topik}) => {
  var [isPress, setIsPress] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: ColorPrimary,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('Button Icon Pressed'),
  };
  return (
    <View style={styles.headerArrow}>
      <TouchableHighlight {...touchProps}>
        <Feather
          name="arrow-left"
          style={isPress ? styles.arrowBaru : styles.arrow}
        />
      </TouchableHighlight>
    </View>
  );
};

export default ButtonPertemuan;

const styles = StyleSheet.create({
  headerArrow: {
    flexDirection: 'row',
  },
  arrow: {
    borderRadius: 50,
    padding: 10,
    color: ColorPrimary,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    fontSize: 30,
    elevation: 10,
  },
  arrowBaru: {
    borderRadius: 50,
    padding: 10,
    color: '#fff',
    borderColor: '#fff',
    borderWidth:1,
    backgroundColor: ColorPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    fontSize: 30,
  },
});
