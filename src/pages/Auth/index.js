import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

export default function index({ navigation }) {
    useEffect(() => {
        const _session = async () => {
            const isLogin = await AsyncStorage.getItem('email')
            navigation.navigate(isLogin ? 'MainApp' : 'Login')
        }
        _session()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator />
        </View>
    )
}
