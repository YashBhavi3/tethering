/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Hotspot from '@react-native-tethering/hotspot';
import { PermissionsAndroid, Platform } from 'react-native';
console.log('Hotspot: ', Hotspot);
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

async function requestLocationPermissions() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      return (
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn('Error requesting location permissions:', err);
      return false;
    }
  }

  return true; // Permissions not needed on non-Android platforms
}


async function disableHotspot() {
  if (Platform.OS !== 'android') {
    console.log('This functionality is only supported on Android.');
    return;
  }

  try {
    // Step 1: Disable hotspot programmatically
    const isHotspotDisabled = await Hotspot.setLocalHotspotEnabled(false);
    console.log('Hotspot disabled:', isHotspotDisabled);
  } catch (error) {
    console.warn('Failed to disable hotspot programmatically:', error);
    console.log('Please disable the hotspot manually in the tethering settings.');
  }
}

async function manageHotspot() {
  if (Platform.OS !== 'android') {
    console.log('This functionality is only supported on Android.');
    return;
  }

  try {
    // Step 1: Request location permissions
    const permissionsGranted = await requestLocationPermissions();
    if (!permissionsGranted) {
      console.log('Location permissions are required to enable the hotspot.');
      return;
    }

    // Step 2: Navigate to tethering settings
    // console.log('Navigating to tethering settings...');
    // await Hotspot.navigateToTethering();

    // Step 3: Enable hotspot programmatically
    try {
      const isHotspotEnabled = await Hotspot.setLocalHotspotEnabled(true);
      console.log('Hotspot enabled:', isHotspotEnabled);
    } catch (error) {
      console.warn('Failed to enable hotspot programmatically:', error);
      // Alert.alert("Please enable hotspot manually")
      console.log('Please enable the hotspot manually in the tethering settings.');
    }
  } catch (error) {
    console.error('Error managing hotspot:', error);
  }
}




// async function manageHotspot() {
//   console.log("INSIDE MANAGE HOTSPOT------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
//   Hotspot.navigateToTethering()
// }
function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={{alignItems: 'center', justifyContent:'center', margin: 50}}>
        <Text style={{fontSize: 22, color:"#1B62AB"}}>Hello</Text>        
      </View>
      <View style={{alignItems: 'center', margin:20}}>
        <Button onPress={manageHotspot} title='Enable Hotspot'>
        </Button>
      </View>
      <View style={{alignItems: 'center', margin:20}}>
        <Button onPress={disableHotspot} title='Disable Hotspot'>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
