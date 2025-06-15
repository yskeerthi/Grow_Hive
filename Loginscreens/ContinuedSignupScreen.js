import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#34e3b0',
  background: '#f6fbfa',
  secondary: '#2563eb',
  text: '#23272F',
  shadow: '#e0e7ef',
};

const DOMAIN_OPTIONS = [
  'Select',
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Cybersecurity',
  'Web Development',
  'Mobile Development',
  'Blockchain',
  'Game Development',
  'UI/UX Design',
  'Cloud Computing',
];

export default function ContinuedSignupScreen() {
  const navigation = useNavigation();

  const [selectedDomain, setSelectedDomain] = useState('');
  const [skills, setSkills] = useState('');
  const [proficiency, setProficiency] = useState('');

  return (
    <View style={styles.container}>
      {/* 🌊 Layered Waves */}
      <View style={styles.waveContainer}>
        <Svg height="340" width="100%" viewBox="0 0 1440 400">
          <Path
            fill={COLORS.secondary}
            fillOpacity="0.3"
            d="M0,180L48,190C96,200,192,220,288,220C384,220,480,200,576,198C672,200,768,220,864,255C960,290,1056,330,1152,315C1248,300,1344,220,1392,185L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
          <Path
            fill={COLORS.secondary}
            fillOpacity="0.5"
            d="M0,130L60,165C120,200,240,270,360,268C480,270,600,200,720,158C840,115,960,100,1080,130C1200,160,1320,235,1380,270L1440,300L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
          <Path
            fill={COLORS.secondary}
            fillOpacity="0.2"
            d="M0,180L80,220C160,260,320,330,480,340C640,350,800,290,960,240C1120,190,1280,140,1360,120L1440,100L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </Svg>
      </View>

      {/* Main form */}
      <ScrollView contentContainerStyle={styles.contentWrapper} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Sign Up</Text>

        <Text style={styles.label}>Select Domain</Text>
       <View style={styles.pickerWrapper}>
  <Picker
    selectedValue={selectedDomain}
    onValueChange={(itemValue) => setSelectedDomain(itemValue)}
    style={styles.picker}
    dropdownIconColor={COLORS.secondary}
  >
    {DOMAIN_OPTIONS.map((domain, i) => (
      <Picker.Item key={i} label={domain} value={domain} />
    ))}
  </Picker>
</View>


        <Text style={styles.label}>Skill</Text>
       <TextInput
  placeholder="Enter your skill"
  placeholderTextColor={COLORS.muted}
  style={styles.input}
  value={skills}
  onChangeText={setSkills}
/>


        <Text style={styles.label}>Proficiency</Text>
        <View style={styles.pickerWrapper}>
  <Picker
    selectedValue={proficiency}
    onValueChange={(itemValue) => setProficiency(itemValue)}
    style={styles.picker}
    dropdownIconColor={COLORS.secondary}
  >
    <Picker.Item label="-- Select proficiency --" value="" />
    <Picker.Item label="Beginner" value="Beginner" />
    <Picker.Item label="Intermediate" value="Intermediate" />
    <Picker.Item label="Expert" value="Expert" />
  </Picker>
</View>


        <TouchableOpacity style={styles.buttonContainer} onPress={() => alert('Sign Up pressed!')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Back Button outside ScrollView */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>
       <View style={styles.loginWrapper}>
  <Text style={styles.loginText}>
    Already have an account?
    <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}> Login</Text>
  </Text>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    
  },
  waveContainer: {
     position: 'absolute',
    top: -80,
    width: '100%',
  },
  contentWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
    zIndex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    color: COLORS.text,
    textAlign: 'center',
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    color: COLORS.text,
    fontWeight: '500',
  },
  // 🧠 Replace your pickerWrapper, picker, and inputFull with:

  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.muted,
    width: '100%',
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
    color: COLORS.text,
  },
  pickerWrapper: {
     borderBottomWidth: 1,
  borderBottomColor: COLORS.muted,
  width: '100%',
  marginBottom: 20,
  justifyContent: 'center',
  },
  picker: {
    height: 55,         
  color: COLORS.text,
  fontSize: 16,
  width: '100%',
  },

  buttonContainer: {
  marginTop: 30,
  alignItems: 'flex-start',
  marginLeft: 80,
},

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    bottom:180,
    left: 30,
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 50,
    elevation: 4,
    zIndex: 10,
  },
   loginWrapper: {
  position: 'absolute',
  bottom: 130,
  alignSelf: 'center',
},
loginText: {
  fontSize: 14,
  color: COLORS.text,
},
loginLink: {
  color: COLORS.secondary,
  fontWeight: 'bold',
},

});
