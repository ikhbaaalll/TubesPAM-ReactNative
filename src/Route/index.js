import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Kelas, Login, Profil, QrScan, SplashScreen, Auth, KelasTambah, KelasList, KelasPertemuan, KelasDetail, HomeGuru } from '../pages';
import { BottomNavigator } from '../components'
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  const [user, setUser] = useState('2');
  const navigation = useNavigation();

  useEffect(() => {
    if (user == null) {
      navigation.replace('Login')
    }
    const _getUser = async () => {
      const role = await AsyncStorage.getItem('role')
      if (!role) {
        navigation.replace('Login')
        setUser(null)
      }
      setUser(role)
    }
    _getUser()

  }, [])

  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />} initialRouteName="Kelas">
      <Tab.Screen name="Profil" component={Profil} style={styles.menu} />
      {user == '2' ? <Tab.Screen name="QrScan" component={QrScan} style={styles.menu} /> : <Tab.Screen name="Home" component={HomeGuru} style={styles.menu} />}
      <Tab.Screen name="Kelas" component={KelasList} style={styles.menu} />
    </Tab.Navigator>
  );
};

const Route = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false, headerLeft: null, gesturesEnabled: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="KelasPertemuan"
        component={KelasPertemuan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="KelasDetail"
        component={KelasDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="KelasTambah"
        component={KelasTambah}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Route;

const styles = StyleSheet.create({});
