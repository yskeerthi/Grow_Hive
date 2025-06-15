import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

const COLORS = {
  primary: '#34e3b0',
  secondary: '#2563eb',
  accent: '#F472B6',
  background: '#f6fbfa',
  card: '#fff',
  text: '#23272F',
  muted: '#6b7280',
  shadow: '#e0e7ef',
};

export default function PersonalDetailsScreen({ navigation }) {
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [university, setUniversity] = useState('');
  const [location, setLocation] = useState('');

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 36 }} />
          <Text style={styles.title}>Personal Details</Text>
          <Text style={styles.subtitle}>
            Provide your personal details to enhance your Skill Swap experience.
          </Text>

          {/* Gender */}
          <View style={styles.inputSection}>
            <View style={styles.inputLabelRow}>
              <MaterialIcons name="person" size={22} color={COLORS.secondary} />
              <Text style={styles.inputLabel}>Gender</Text>
            </View>
            <View style={styles.genderRow}>
              <TouchableOpacity
                style={styles.radioRow}
                onPress={() => setGender('Male')}
              >
                <View style={[styles.radioCircle, gender === 'Male' && styles.radioCircleSelected]}>
                  {gender === 'Male' && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.radioLabel}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioRow}
                onPress={() => setGender('Female')}
              >
                <View style={[styles.radioCircle, gender === 'Female' && styles.radioCircleSelected]}>
                  {gender === 'Female' && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.radioLabel}>Female</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Education */}
          <View style={styles.inputSection}>
            <View style={styles.inputLabelRow}>
              <MaterialIcons name="school" size={22} color={COLORS.secondary} />
              <Text style={styles.inputLabel}>Education</Text>
            </View>
            <TextInput
              style={styles.inputBox}
              placeholder="Eg: B.Tech Computer Science"
              placeholderTextColor={COLORS.muted}
              value={education}
              onChangeText={setEducation}
              returnKeyType="next"
            />
          </View>

          {/* University */}
          <View style={styles.inputSection}>
            <View style={styles.inputLabelRow}>
              <MaterialIcons name="location-city" size={22} color={COLORS.primary} />
              <Text style={styles.inputLabel}>University</Text>
            </View>
            <TextInput
              style={styles.inputBox}
              placeholder="Eg: IIT Madras"
              placeholderTextColor={COLORS.muted}
              value={university}
              onChangeText={setUniversity}
              returnKeyType="next"
            />
          </View>

          {/* Location */}
          <View style={styles.inputSection}>
            <View style={styles.inputLabelRow}>
              <MaterialIcons name="location-on" size={22} color={COLORS.accent} />
              <Text style={styles.inputLabel}>Location</Text>
            </View>
            <TextInput
              style={styles.inputBox}
              placeholder="Eg: Mumbai, India"
              placeholderTextColor={COLORS.muted}
              value={location}
              onChangeText={setLocation}
              returnKeyType="done"
            />
          </View>

          {/* Navigation Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation && navigation.goBack && navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={28} color={COLORS.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation && navigation.navigate && navigation.navigate('SkillsPage')}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 26,
    paddingTop: 38,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    color: COLORS.text,
    marginBottom: 5,
    fontFamily: 'Poppins_700Bold',
    marginTop:20,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 22,
    lineHeight: 22,
    fontFamily: 'Poppins_400Regular',
  },
  inputSection: {
    marginBottom: 18,
  },
  inputLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  inputLabel: {
    marginLeft: 8,
    fontSize: 15,
    color: COLORS.text,
    fontFamily: 'Poppins_700Bold',
  },
  inputBox: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.shadow,
    padding: 10,
    minHeight: 44,
    color: COLORS.text,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    textAlignVertical: 'top',
  },
  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  radioCircleSelected: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  radioLabel: {
    fontFamily: 'Poppins_400Regular',
    color: COLORS.text,
    fontSize: 15,
    marginRight: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 8,
  },
  backButton: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.shadow,
    elevation: 1,
  },
  nextButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  nextButtonText: {
    color: COLORS.card,
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});
