import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View } from 'react-native';
import * as Battery from 'expo-battery';
import { useEffect, useState } from 'react';

// expo install expo-battery

export default function App() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [batteryInfo, setBatteryInfo] = useState(undefined);

  useEffect(() => {
    async function checkAvailability() {
      const isBatteryAvailable = await Battery.isAvailableAsync();
      setIsAvailable(isBatteryAvailable);
    }
    checkAvailability();
  }, []);

  const showBatteryInfo = () => {
    console.log(batteryInfo);
    return (
      <View>
        <Text>Low Power Mode: {batteryInfo.lowPowerMode ? "Yes" : "No"}</Text>
        <Text>Battery Level: {batteryInfo.batteryLevel * 100}%</Text>
        <Text>Battery State: {batteryInfo.batteryState}</Text>
      </View>
    );
  };

  const loadBatteryInfo = async () => {
    let batteryInfoLoaded = await Battery.getPowerStateAsync();
    setBatteryInfo(batteryInfoLoaded);
  };

  return (
    <View style={styles.container}>
      <Text>{isAvailable ? "Battery Details: " : "Battery info unavailable"}</Text>
      {batteryInfo ? showBatteryInfo() : <Text>Battery info not loaded</Text>}
      {isAvailable && <Button title="Load Battery Info" onPress={loadBatteryInfo} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
