import React from 'react';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IconBlackboard} from '../../assets';

const ButtonIcon = () => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <IconBlackboard />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 20,
    backgroundColor: ColorSecondary,
    borderColor: ColorPrimary,
    // width: 20,
  },
});
