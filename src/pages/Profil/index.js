import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const Profil = ({ navigation }) => {

    const logout = async () => {
        await AsyncStorage.clear()
        navigation.navigate("Login")
    }

    useEffect(() => {
        const _getUser = async () => {
            const user = await AsyncStorage.getItem('id')
            if (!user) {
                navigation.replace('Login')
            }
            console.log(user)
        }
        _getUser()

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
