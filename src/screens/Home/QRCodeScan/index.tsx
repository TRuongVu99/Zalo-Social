import StatusBar, {Constants} from '@components/StatusBar';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import * as React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import IconEntypo from 'react-native-vector-icons/Entypo';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    {checkInverted: true},
  );

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    console.log(barcodes);
  }, [barcodes]);

  return device != null && hasPermission && isFocused ? (
    <>
      <StatusBar mode={Constants.statusBar.dark} navigation={navigation} />

      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
      <TouchableOpacity
        style={{position: 'absolute', top: 16, left: 16, zIndex: 99}}
        onPress={() => navigation.goBack()}>
        <IconEntypo name="chevron-thin-left" size={20} color={'white'} />
      </TouchableOpacity>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0.2, 0.2, 0.2, 0.2)',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            width: 300,
            height: 300,
            backgroundColor: 'transparent',
            borderColor: 'white',
            borderWidth: 1,
          }}
        />
      </View>
    </>
  ) : (
    <View>
      <Text>kaka</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
