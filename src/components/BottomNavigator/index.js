import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import TabIcon from '../TabIcon';

const BottomNavigator = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            // <View style={styles.row}>
            <TabIcon
              key={index}
              label={label}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.TebIcon}
            />
            // </View>
          );
        })}
      </View>
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    // paddingVertical: 15,
    // margin: 20,
    backgroundColor: '#ffffff',
  },
  box: {
    margin: 20,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
});
