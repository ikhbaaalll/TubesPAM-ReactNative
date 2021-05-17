import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {ColorPrimary, ColorSecondary} from '../../utils/constanta';
import QRCodeScanner from 'react-native-qrcode-scanner';
const {width} = Dimensions.get('screen');

export default class QrScan extends Component {
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
    alert("nais");
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <QRCodeScanner
          onRead={this.onSuccess}
          flashMode={RNCamera.Constants.FlashMode.torch}
          // topContent={
          //   <Text style={styles.centerText}>
          //     Go to{' '}
          //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
          //     your computer and scan the QR code.
          //   </Text>
          // }
          // bottomContent={
          //   <TouchableOpacity style={styles.buttonTouchable}>
          //     <Text style={styles.buttonText}>OK. Got it!</Text>
          //   </TouchableOpacity>
          // }
        />
        {/* <RNCamera style={{...StyleSheet.absoluteFill}} /> */}
        <View
          style={{
            ...StyleSheet.absoluteFill,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: width / 1.5,
              height: width / 1.5,
              // backgroundColor: ColorPrimary,
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={styles.boxTopLeft} />
              <View style={styles.boxFlex} />
              <View style={styles.boxTopRight} />
            </View>
            <View style={styles.boxFlex}></View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={styles.boxBottomLeft} />
              <View style={styles.boxFlex} />
              <View style={styles.boxBottomRight} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  boxFlex: {
    flex: 1,
  },
  boxTopLeft: {
    flex: 1,
    borderColor: '#000',
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  boxTopRight: {
    flex: 1,
    borderColor: '#000',
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  boxBottomLeft: {
    flex: 1,
    borderColor: '#000',
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  boxBottomRight: {
    flex: 1,
    borderColor: '#000',
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
});
