import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component{
  constructor(){
    super();
    this.state={
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    }
  }

  getCameraPermissions=async()=>{
    const {status}= await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      // status === 'granted'
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
    })
  }

  handleBarcodeScanned=async({type,data})=>{
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    })
  }

  render(){

    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if(buttonState === 'clicked' && hasCameraPermissions){
      return(
        <BarCodeScanner
          onBarcodeScanned = {scanned ? undefined : this.handleBarcodeScanned}
        />
      )
    }

    else if(buttonState === 'normal'){
      return (
        <View style={styles.container}>
          <Text> {hasCameraPermissions === true ? this.state.scannedData : 'Please give camera permissions'} </Text>
          <TouchableOpacity style = {{backgroundColor: 'yellow'}} onPress = {this.getCameraPermissions}>
            <Text>
              Scan QR Code
            </Text>
          </TouchableOpacity>
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
