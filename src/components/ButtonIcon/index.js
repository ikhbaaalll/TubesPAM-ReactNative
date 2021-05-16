import React from 'react';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { IconBlackboard } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const ButtonIcon = ({ title, value, source, type, userKelas }) => {
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
    navigation.navigate('KelasPertemuan', { kelas: value, userKelas: userKelas });
  };

  const viewSiswa = () => {
    navigation.navigate('UserList', { kelas: value, userKelas: userKelas });
  }

  const addSiswa = () => {
    navigation.navigate('UserTambah', { userKelas: userKelas });
  }

  return (
    <TouchableHighlight {...touchProps} onPress={type == 'kelas' ? viewSiswa : type == 'tambahsiswa' ? addSiswa : viewKelas}>
      <View style={styles.container(isPress)}>
        {type == 'menu' ? (
          <Feather
            name={source}
            style={styles.icon}
          />
        ) : (
          <IconBlackboard />
        )}
        <Text style={styles.text(isPress)}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  container: isPress => ({
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: isPress ? 5 : 1,
    backgroundColor: '#fff',
    borderColor: ColorPrimary,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 40,
    marginHorizontal: 10,
    width: 140,
    height: 140,
    shadowColor: isPress ? null : '#000',
    elevation: isPress ? 0 : 10,
  }),
  text: isPress => ({
    fontWeight: 'bold',
    color: ColorPrimary,
    fontSize: isPress ? 17 : 20,
  }),
  icon: {
    color: ColorPrimary,
    fontSize: 50,
    // backgroundColor: ColorPrimary,
  }
});
