import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { getProfileData } from '../../utils/index'
import ProfileEditorScreen from '../../components/screens/ProfileEditorScreen';
import UserIcon from '../../assets/images/user.png';
import EthnicityIcon from '../../assets/images/ethnicity.png';
import GenderIcon from '../../assets/images/gender.png';
import DobIcon from '../../assets/images/dob.png';
import PhoneIcon from '../../assets/images/mobile.png';
import EmailIcon from '../../assets/images/email.png';
import AddressIcon from '../../assets/images/location.png';
import Loading from '../../components/loading/Loading'

export default function ProfileScreen() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(null);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        getProfileData().then((data) => {
            if (data.length > 0) {
                setProfile(data[0]);
            }
        });
    }, []);

    const handleSaveProfile = (updatedProfile) => {
        setProfile(updatedProfile);
        setIsEditing(false);
        // You can also save the updated profile data to a server or local storage here
    };

    if (!profile) {
        return (
            <SafeAreaView style={styles.container}>
                <Loading />
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Personal Information</Text>
            <TouchableOpacity onPress={handleEditProfile} style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>

            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Image source={UserIcon} style={styles.icon} />
                    <Text style={styles.infoText}>{profile.fullName}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Image source={EthnicityIcon} style={styles.icon} />
                    <Text style={styles.infoText}>{profile.ethnicity}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Image source={GenderIcon} style={styles.icon} />
                    <Text style={styles.infoText}>{profile.gender}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Image source={DobIcon} style={styles.icon} />
                    <Text style={styles.infoText}>{profile.dob.toLocaleDateString()}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Image source={PhoneIcon} style={styles.icon} />
                    <Text style={styles.infoText}>{profile.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Image source={EmailIcon} style={styles.icon} />
                    <Text style={styles.infoText}>{profile.email}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Image source={AddressIcon} style={styles.icon} />
                    <Text style={styles.infoText}>{profile.address}</Text>
                </View>
            </View>

            {/* Render editor screen */}
            {isEditing && (
                <ProfileEditorScreen
                    profile={profile}
                    onSave={handleSaveProfile}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    infoContainer: {
        width: '90%',
        marginHorizontal: 'auto',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
    },
    icon: {
        width: 15,
        height: 15,
        marginRight: 30,
        resizeMode: 'contain',
    },
    infoText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#000',
    },
    editProfileButton: {
        width: '100%',
        marginTop: 30,
        marginRight: 30,
        padding: 10,
    },
    editProfileText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'right',
        textDecorationLine: 'underline',
    },
});