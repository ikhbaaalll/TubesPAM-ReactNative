import React from 'react';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {
  Mtk,
  Bind,
  Bing,
  Ipa,
  Ips,
  Pjok,
  Pkn,
  Seni,
  IconBlackboard,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
const {width} = Dimensions.get('screen');

const ButtonIcon = ({title, value, source, type, userKelas}) => {
  var [isPress, setIsPress] = React.useState(false);
  const navigation = useNavigation();

  const Icon = () => {
    if (title == 'MTK') return <Mtk />;
    if (title == 'B.Ing') return <Bing />;
    if (title == 'B.Ind') return <Bind />;
    if (title == 'IPA') return <Ipa />;
    if (title == 'IPS') return <Ips />;
    if (title == 'PKN') return <Pkn />;
    if (title == 'Seni') return <Seni />;
    if (title == 'PJOK') return <Pjok />;

    return <IconBlackboard />;
  };

  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'white',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('Button Icon Pressed'),
  };

  const viewKelas = () => {
    navigation.navigate('KelasPertemuan', {kelas: value, userKelas: userKelas});
  };

  const viewSiswa = () => {
    navigation.navigate('UserList', {kelas: value, userKelas: userKelas});
  };

  const addSiswa = () => {
    navigation.navigate('UserTambah', {userKelas: userKelas});
  };

  const addKelas = () => {
    navigation.navigate('KelasTambah');
  };

  return (
    <TouchableHighlight
      {...touchProps}
      onPress={
        type == 'kelas'
          ? viewSiswa
          : type == 'tambahsiswa'
          ? addSiswa
          : type == 'tambahkelas'
          ? addKelas
          : viewKelas
      }>
      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          borderWidth: isPress ? 5 : 1,
          backgroundColor: '#fff',
          borderColor: ColorPrimary,
          borderRadius: 20,
          paddingVertical: 20,
          paddingHorizontal: 20,
          marginBottom: 30,
          marginHorizontal: 10,
          width: width / 2 - 50,
          height: width / 2 - 50,
          shadowColor: isPress ? null : '#000',
          elevation: isPress ? 0 : 10,
        }}>
        {type == 'tambahsiswa' || type == 'tambahkelas' ? (
          <Feather name={source} style={styles.icon} />
        ) : (
          <Icon />
        )}
        <Text style={styles.text(isPress)}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  // container: isPress => ({
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // borderWidth: isPress ? 5 : 1,
    // backgroundColor: '#fff',
    // borderColor: ColorPrimary,
    // borderRadius: 20,
    // paddingVertical: 20,
    // paddingHorizontal: 30,
    // marginBottom: 40,
    // marginHorizontal: 10,
    // // width: 140,
    // // height: 140
    // shadowColor: isPress ? null : '#000',
    // elevation: isPress ? 0 : 10,
  // }),
  text: isPress => ({
    marginTop: 5,
    fontWeight: 'bold',
    color: ColorPrimary,
    fontSize: isPress ? 17 : 20,
  }),
  icon: {
    color: ColorPrimary,
    fontSize: 50,
    // backgroundColor: ColorPrimary,
  },
});
