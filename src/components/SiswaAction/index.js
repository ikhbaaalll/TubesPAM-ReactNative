import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, ToastAndroid } from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const SiswaAction = ({ status, id, nama, email, kelas }) => {
    var [isPress, setIsPress] = useState(false);
    const navigation = useNavigation();

    var touchProps = {
        activeOpacity: 1,
        underlayColor: '#fff',
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        onPress: () => console.log('Button statuskomponen Pressed'),
    };

    const editSiswa = () => {
        navigation.navigate('UserEdit', { id: id, getNama: nama, getEmail: email, getKelas: kelas })
    }

    const hapusSiswa = () => {
        Alert.alert(
            "Peringatan",
            "Yakin ingin menghapus user?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    style: "cancel",
                    onPress: () => {
                        fetch('http://192.168.43.152:1010/api/user/destroy', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: id
                            }),
                        })
                            .then(response => response.json())
                            .then(responseJson => {
                                if (responseJson == 'Sukses') {
                                    ToastAndroid.show("Sukses menambah siswa", ToastAndroid.SHORT);
                                    navigation.navigate('Home')
                                }
                            })
                    },
                },
            ],
            {
                cancelable: true
            }
        );
    }

    return (
        <TouchableHighlight {...touchProps} onPress={status == 'edit' ? editSiswa : hapusSiswa}>
            <Feather
                name={status == "edit" ? "edit" : "x-circle"}
                style={styles.check(isPress, status)}
            />
        </TouchableHighlight>
    );
};

export default SiswaAction;

const styles = StyleSheet.create({
    check: (isPress, hadir) => ({
        borderRadius: 50,
        padding: isPress ? 5 : 6,
        marginRight: 10,
        color: hadir == "hadir" ? ColorPrimary : '#f58ca1',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        fontSize: 25,
        elevation: isPress ? 0 : 10,
        borderWidth: isPress ? 1 : 0,
        borderColor: hadir == "hadir" ? ColorPrimary : '#f58ca1',
    }),
});
