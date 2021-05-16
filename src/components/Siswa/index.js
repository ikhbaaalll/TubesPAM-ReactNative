import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { ColorPrimary, ColorSecondary } from '../../utils/constanta';
import Feather from 'react-native-vector-icons/Feather';
import { SiswaAction } from '../../components';

const Siswa = ({ nama, id, kelas, userKelas, email }) => {
    return (
        <View style={styles.hadirBox}>
            <View style={styles.userKelas}>
                <Text style={styles.siswa}>{nama}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
            { kelas == userKelas ?
                <View style={styles.aksi}>
                    <SiswaAction status="edit" id={id} nama={nama} email={email} kelas={kelas} />
                    <SiswaAction status="hapus" id={id} />
                </View> : null
            }
        </View>
    );
};

export default Siswa;

const styles = StyleSheet.create({
    hadirBox: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 15,
        marginTop: 20,
        borderBottomWidth: 2,
        borderBottomColor: ColorSecondary,
        // backgroundColor: ColorPrimary
    },
    userKelas: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    siswa: {
        color: '#4d4d4d',
        fontSize: 17,
    },
    email: {
        color: '#808080',
        fontSize: 15,
    },
    aksi: {
        flexDirection: 'row',
    }
});
