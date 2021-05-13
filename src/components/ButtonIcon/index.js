import React from 'react';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { IconBlackboard } from '../../assets';
import { useNavigation } from '@react-navigation/native';

const ButtonIcon = ({ title, value }) => {
  var [isPress, setIsPress] = React.useState(false);
  const navigation = useNavigation();

  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'white',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('Button Icon Pressed'),
  };

  const viewKelas = () => {
    navigation.navigate('KelasPertemuan', { kelas: value })
  }

  return (
    <TouchableHighlight {...touchProps} onPress={viewKelas}>
      <View style={isPress ? styles.containerBaru : styles.container}>
        <IconBlackboard />
        <Text style={styles.text(isPress)}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: ColorPrimary,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 40,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 10,
  },
  containerBaru: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: ColorPrimary,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 35,
    marginHorizontal: 15,
  },
  text: isPress => ({
    fontWeight: 'bold',
    color: ColorPrimary,
    fontSize: isPress ? 17 : 20,
  }),
});
