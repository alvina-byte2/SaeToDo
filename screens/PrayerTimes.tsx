import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'; // ✅ Get user location
import { useNavigation } from '@react-navigation/native'; // ✅ Import navigation hook
import { StackNavigationProp } from '@react-navigation/stack'; // ✅ Import correct type

// ✅ Define navigation type
type RootStackParamList = {
    List: undefined;
    PrayerTimes: undefined;
};

// ✅ Correctly type the navigation prop
type NavigationProp = StackNavigationProp<RootStackParamList, 'PrayerTimes'>;

const PrayerTimes = () => {
    const navigation = useNavigation<NavigationProp>(); // ✅ Use correct type

    const [prayerTimes, setPrayerTimes] = useState<{ [key: string]: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ✅ Fetch user's location and get prayer times
    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                // ✅ Request location permissions
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setError('Location permission denied');
                    setLoading(false);
                    return;
                }

                // ✅ Get user's coordinates
                let location = await Location.getCurrentPositionAsync({});
                let { latitude, longitude } = location.coords;

                // ✅ Fetch prayer times from Aladhan API
                let response = await fetch(
                    `http://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
                );
                let data = await response.json();

                if (data.code === 200) {
                    setPrayerTimes(data.data.timings); // ✅ Store prayer times in state
                } else {
                    setError('Failed to fetch prayer times');
                }
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchPrayerTimes();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Prayer Times</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#244823" />
            ) : error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <View style={styles.prayerList}>
                    <Text style={styles.prayerText}>🕌 Fajr: {prayerTimes?.Fajr}</Text>
                    <Text style={styles.prayerText}>🌅 Dhuhr: {prayerTimes?.Dhuhr}</Text>
                    <Text style={styles.prayerText}>🌇 Asr: {prayerTimes?.Asr}</Text>
                    <Text style={styles.prayerText}>🌆 Maghrib: {prayerTimes?.Maghrib}</Text>
                    <Text style={styles.prayerText}>🌙 Isha: {prayerTimes?.Isha}</Text>
                </View>
            )}

            {/* ✅ Fixed navigation issue */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

// ✅ Styles for a clean UI
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8EBB8C',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#244823',
        marginBottom: 30,
    },
    prayerList: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    prayerText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#244823',
        paddingVertical: 10,
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
        width: '80%',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    backButton: {
        backgroundColor: '#244823',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default PrayerTimes;
