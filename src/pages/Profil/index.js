import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, BackHandler } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

const Profil = ({ navigation }) => {
    const [idUser, setIdUser] = useState('1')
    const [kelas, setKelas] = useState('1')

    const logout = async () => {
        await AsyncStorage.clear()
        navigation.navigate("Login")
    }

    const checkConnection = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      BackHandler.exitApp();
    }
  });

  useEffect(() => {
    checkConnection();

        const _getUser = async () => {
            const user = await AsyncStorage.getItem('id')
            const getKelas = await AsyncStorage.getItem('kelas')
            if (!user) {
                navigation.replace('Login')
            }
            setIdUser(user)
            setKelas(getKelas)
        }
        _getUser()

        fetch('https://tubespamqrcode.herokuapp.com/api/kelas/show', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: JSON.stringify(kelasId).replace(/\"/g, ""),
        id: idUser,
        kelas: kelas
      }),
    })
      .then(response => response.json())
      .then((responseJson) => { console.log(responseJson) })
      
    }, [])

    return (
        <View>
            <Text>Profil Page</Text>
            <Button onPress={logout} title="Logout"></Button>
        </View>
    )
}

export default Profil

const styles = StyleSheet.create({})
