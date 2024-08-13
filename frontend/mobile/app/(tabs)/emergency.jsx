import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import EmergencyCard from '../../components/cards/EmergencyCard';
import { getEmergencyData } from '../../utils/index';

export default function EmergencyScreen() {
  const [emergencyData, setEmergencyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmergencyData();
      setEmergencyData(data);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Emergency Call</Text>
      <View style={styles.gridContainer}>
        {emergencyData.map(item => (
          <View key={item.id} style={styles.gridItem}>
            <EmergencyCard data={item} />
          </View>
        ))}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 100,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  gridItem: {
    width: '48%',
    marginBottom: 5,
  },
});