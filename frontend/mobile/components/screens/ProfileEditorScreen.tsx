import React, { FC, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated';
import DropDownPicker from 'react-native-dropdown-picker';
import { Profile } from '../../utils/index';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

type Props = {
    profile: Profile;
    onSave: (updatedProfile: Profile) => void;
    onClose: () => void;
};

const ProfileEditorScreen: FC<Props> = ({ profile, onSave, onClose }) => {
    const [fullName, setFullName] = useState(profile.fullName);
    const [ethnicity, setEthnicity] = useState(profile.ethnicity);
    const [gender, setGender] = useState(profile.gender);
    const [dobDay, setDobDay] = useState(profile.dob.getDate().toString().padStart(2, '0'));
    const [dobMonth, setDobMonth] = useState((profile.dob.getMonth() + 1).toString().padStart(2, '0'));
    const [dobYear, setDobYear] = useState(profile.dob.getFullYear().toString());
    const [phone, setPhone] = useState(profile.phone.toString());
    const [email, setEmail] = useState(profile.email);
    const [address, setAddress] = useState(profile.address);
    const [ethnicityOpen, setEthnicityOpen] = useState(false);
    const [genderOpen, setGenderOpen] = useState(false);
    const [dayOpen, setDayOpen] = useState(false);
    const [monthOpen, setMonthOpen] = useState(false);
    const [yearOpen, setYearOpen] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const ethnicityItems = [
        { label: 'Maori', value: 'Maori' },
        { label: 'Pacific Islander', value: 'Pacific Islander' },
        { label: 'Asian', value: 'Asian' },
        { label: 'European', value: 'European' },
        { label: 'American', value: 'American' },
        { label: 'African', value: 'African' },
        { label: 'Other', value: 'Other' },
    ];

    const genderItems = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Prefer not to say', value: 'Prefer not to say' },
    ];

    const days = Array.from({ length: 31 }, (_, i) => ({ label: (i + 1).toString().padStart(2, '0'), value: (i + 1).toString().padStart(2, '0') }));
    const months = [
        { label: 'January', value: '01' },
        { label: 'February', value: '02' },
        { label: 'March', value: '03' },
        { label: 'April', value: '04' },
        { label: 'May', value: '05' },
        { label: 'June', value: '06' },
        { label: 'July', value: '07' },
        { label: 'August', value: '08' },
        { label: 'September', value: '09' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },
    ];
    const years = Array.from({ length: 100 }, (_, i) => ({
        label: (new Date().getFullYear() - i).toString(),
        value: (new Date().getFullYear() - i).toString(),
    }));

    const handleFocus = (input: string) => {
        if (input === 'ethnicity') {
            setGenderOpen(false);
            setDayOpen(false);
            setMonthOpen(false);
            setYearOpen(false);
            setFocusedInput(null);
        } else if (input === 'gender') {
            setEthnicityOpen(false);
            setDayOpen(false);
            setMonthOpen(false);
            setYearOpen(false);
            setFocusedInput(null);
        } else if (input === 'day') {
            setEthnicityOpen(false);
            setGenderOpen(false);
            setMonthOpen(false);
            setYearOpen(false);
            setFocusedInput('day');
        } else if (input === 'month') {
            setEthnicityOpen(false);
            setGenderOpen(false);
            setDayOpen(false);
            setYearOpen(false);
            setFocusedInput('month');
        } else if (input === 'year') {
            setEthnicityOpen(false);
            setGenderOpen(false);
            setDayOpen(false);
            setMonthOpen(false);
            setFocusedInput('year');

        } else {
            setFocusedInput(input);
            setGenderOpen(false);
            setEthnicityOpen(false);
            setDayOpen(false);
            setMonthOpen(false);
            setYearOpen(false);
        }
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

    const handlePressOutside = () => {
        setEthnicityOpen(false);
        setGenderOpen(false);
        setDayOpen(false);
        setMonthOpen(false);
        setYearOpen(false);
        Keyboard.dismiss();
    };

    const handleSave = () => {
        const updatedProfile: Profile = {
            fullName,
            ethnicity,
            gender,
            dob: new Date(`${dobYear}-${dobMonth}-${dobDay}`),
            phone: parseInt(phone, 10),
            email,
            address,
        };
        onSave(updatedProfile);
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <Animated.View
                entering={SlideInRight}
                exiting={SlideOutRight}
                style={styles.container}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                    <View style={styles.titleCover}>
                        <Text style={styles.text}>Edit Profile</Text>
                    </View>
                </View>

                <TextInput
                    style={[
                        styles.input,
                        focusedInput === 'fullName' && styles.focusedInput
                    ]}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder='Full Name'
                    onFocus={() => handleFocus('fullName')}
                    onBlur={handleBlur}
                />

                <View style={{ zIndex: ethnicityOpen ? 5000 : 1, width: '100%' }}>
                    <DropDownPicker
                        open={ethnicityOpen}
                        value={ethnicity}
                        items={ethnicityItems}
                        setOpen={setEthnicityOpen}
                        setValue={setEthnicity}
                        setItems={() => { }}
                        placeholder='Select Ethnicity'
                        style={[
                            styles.input,
                            focusedInput === 'ethnicity' && styles.focusedInput
                        ]}
                        dropDownContainerStyle={styles.dropdown}
                        onOpen={() => handleFocus('ethnicity')}
                        onClose={() => setFocusedInput(null)}
                    />
                </View>

                <View style={{ zIndex: genderOpen ? 5000 : 1, width: '100%' }}>
                    <DropDownPicker
                        open={genderOpen}
                        value={gender}
                        items={genderItems}
                        setOpen={setGenderOpen}
                        setValue={setGender}
                        setItems={() => { }}
                        placeholder='Select Gender'
                        style={[
                            styles.input,
                            focusedInput === 'gender' && styles.focusedInput
                        ]}
                        dropDownContainerStyle={styles.dropdown}
                        onOpen={() => handleFocus('gender')}
                        onClose={() => setFocusedInput(null)}
                    />
                </View>

                <View style={[styles.datePickerContainer, { zIndex: dayOpen || monthOpen || yearOpen ? 5000 : 1 }]}>
                    <View style={{ width: '30%', zIndex: dayOpen ? 6000 : 1 }}>
                        <DropDownPicker
                            open={dayOpen}
                            value={dobDay}
                            items={days}
                            setOpen={setDayOpen}
                            setValue={setDobDay}
                            placeholder='DD'
                            style={styles.dobDropdown}
                            dropDownContainerStyle={styles.dropdown}
                            onOpen={() => handleFocus('day')}
                            onClose={handleBlur}
                        />
                    </View>
                    <View style={{ width: '40%', zIndex: monthOpen ? 6000 : 1 }}>
                        <DropDownPicker
                            open={monthOpen}
                            value={dobMonth}
                            items={months}
                            setOpen={setMonthOpen}
                            setValue={setDobMonth}
                            placeholder='MM'
                            style={styles.dobDropdown}
                            dropDownContainerStyle={styles.dropdown}
                            onOpen={() => handleFocus('month')}
                            onClose={handleBlur}
                        />
                    </View>
                    <View style={{ width: '30%', zIndex: yearOpen ? 6000 : 1 }}>
                        <DropDownPicker
                            open={yearOpen}
                            value={dobYear}
                            items={years}
                            setOpen={setYearOpen}
                            setValue={setDobYear}
                            placeholder='YYYY'
                            style={styles.dobDropdown}
                            dropDownContainerStyle={styles.dropdown}
                            onOpen={() => handleFocus('year')}
                            onClose={handleBlur}
                        />
                    </View>
                </View>

                <TextInput
                    style={[
                        styles.input,
                        focusedInput === 'phone' && styles.focusedInput
                    ]}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder='Phone'
                    keyboardType='phone-pad'
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                />

                <TextInput
                    style={[
                        styles.input,
                        focusedInput === 'email' && styles.focusedInput
                    ]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder='Email'
                    keyboardType='email-address'
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                />

                <TextInput
                    style={[
                        styles.input,
                        focusedInput === 'address' && styles.focusedInput
                    ]}
                    value={address}
                    onChangeText={setAddress}
                    placeholder='Address'
                    onFocus={() => handleFocus('address')}
                    onBlur={handleBlur}
                />

                <View style={styles.buttonWrap}>
                    <TouchableOpacity onPress={() => {
                        setFullName('');
                        setEthnicity('');
                        setGender('');
                        setDobDay('');
                        setDobMonth('');
                        setDobYear('');
                        setPhone('');
                        setEmail('');
                        setAddress('');
                    }} style={styles.buttonReset}>
                        <Text style={styles.resetText}>Reset all</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave} style={styles.buttonSave}>
                        <Text style={styles.saveText}>Save profile</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default ProfileEditorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 40,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    header: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        padding: 10,
        zIndex: 10,
    },
    closeText: {
        fontSize: 14,
        color: '#002020',
    },
    titleCover: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginRight: 34,
    },
    input: {
        width: '100%',
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#E2EAF0',
        borderWidth: 1 / 3,
        borderColor: '#CFCFCF',
    },
    focusedInput: {
        shadowColor: '#757575',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderColor: '#CFCFCF',
        backgroundColor: '#F5F8FB',
    },
    dropdown: {
        borderColor: '#CFCFCF',
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        borderWidth: 1 / 3,
        backgroundColor: '#E2EAF0',
        borderColor: '#CFCFCF',
        borderRadius: 10,
    },
    dobDropdown: {
        width: '100%',
        height: 60,
        paddingHorizontal: 10,
        borderWidth: 0,
        backgroundColor: '#E2EAF0',
    },
    buttonWrap: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 30,
        marginHorizontal: 'auto',
    },
    buttonSave: {
        width: 150,
        height: 70,
        backgroundColor: '#60969A',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
    },
    buttonReset: {
        width: 150,
        height: 70,
        backgroundColor: '#CFCFCF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',
    },
    saveText: {
        color: '#EBF1F6',
        fontSize: 16,
        fontWeight: '500',
    },
    resetText: {
        color: '#757575',
        fontSize: 16,
        fontWeight: '500',
    },
    listView: {
        zIndex: 3,
    },
});