import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

import {ColorPrimary, ColorSecondary} from '../../utils/constanta';

const InputText = ({Title, Icon}) => {
  const judul = 'Masukkan ' + Title;
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: false,
  });

  const textInputChange = (val) => {
    if (val.length > 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

    const updatesecureTextEntry = () => {
      setData({
        ...data,
        secureTextEntry: !secureTextEntry,
      });

    }

  return (
    <View style={{marginBottom: 20}}>
      <Text style={styles.title}>{Title}</Text>
      <View style={styles.container}>
        <FontAwesome name={Icon} color={ColorPrimary} size={25} />
        <TextInput
          style={styles.textInput}
          placeholder={judul}
          secureTextEntry={Title == 'Password' ? true : false}
          onChangeText={val => textInputChange(val)}
        />
        {/* {Title == 'Password' ? (
          <TouchableOpacity onPress={updatesecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color={ColorPrimary} size={25} />
            ) : (
              <Feather name="eye" color={ColorPrimary} size={25} />
            )}
          </TouchableOpacity>
        ) : (
          <Feather name="check-circle" color={ColorPrimary} size={25} />
        )} */}
      </View>
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  title: {
    color: '#05375a',
    fontSize: 15,
  },
});
