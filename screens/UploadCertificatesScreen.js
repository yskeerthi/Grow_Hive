import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,navigation,navigate
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { COLORS } from './constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function UploadCertificatesScreen({ navigation }) {
  const [certificate, setCertificate] = useState(null);
  const [workLinks, setWorkLinks] = useState('');
  const [achievements, setAchievements] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (!fontsLoaded) return null;

  const pickCertificate = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
      
      if (result.canceled === false && result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0];
        
        Alert.alert(
          "Are you sure?",
          `Do you want to upload "${selectedFile.name}"?`,
          [
            {
              text: "No",
              style: "cancel",
              onPress: () => setCertificate(null)
            },
            {
              text: "Yes",
              onPress: () => setCertificate(selectedFile)
            }
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log('Error picking document:', error);
      Alert.alert('Error', 'There was an error selecting the document.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: keyboardVisible ? 200 : 40 }}
      >
        {/* Heading */}
        <Text style={styles.heading}>Upload Certificates</Text>
         <Text style={styles.catchyTag}>Showcase your skills and achievements—upload your certificates now!</Text>

        {/* Upload Box */}
        <TouchableOpacity style={styles.uploadBox} onPress={pickCertificate}>
          <MaterialIcons name="file-upload" size={36} color={COLORS.primary} />
          <Text style={styles.uploadText}>
            {certificate ? certificate.name : 'Please upload in .pdf'}
          </Text>
        </TouchableOpacity>

        {/* Work Links */}
        <Text style={styles.label}>Work Links</Text>
        <TextInput
          style={styles.input}
          placeholder="Paste your work links here"
          placeholderTextColor={COLORS.muted}
          value={workLinks}
          onChangeText={setWorkLinks}
        />

        {/* Achievements */}
        <Text style={styles.label}>Achievements</Text>
        <TextInput
          style={[styles.input, styles.achievementsInput]}
          placeholder="Enter your achievements"
          placeholderTextColor={COLORS.muted}
          value={achievements}
          onChangeText={setAchievements}
          multiline
          textAlignVertical="top"
        />

        {/* Navigation Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation && navigation.goBack && navigation.goBack()}>
                       <MaterialIcons name="arrow-back" size={28} color={COLORS.secondary} />
                     </TouchableOpacity>
         <TouchableOpacity style={styles.nextButton} onPress={() => navigation && navigation.navigate && navigation.navigate('MainTabs')}>
  <Text style={styles.buttonText}>Next</Text>
</TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  heading: {
    fontSize: 26,
    color: COLORS.text,
    marginBottom: 8,
    fontFamily: 'Poppins_700Bold',
    marginTop: 50, // Increased margin top
  },
  tagline: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 20,
    fontFamily: 'Poppins_400Regular',
  },
  uploadBox: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'column',
    gap: 8,
  },
  uploadText: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginTop: 8,
  },
  catchyTag: {
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.secondary,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 18,
  },
  label: {
    color: COLORS.text,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 6,
    marginTop: 12,
    fontSize: 16,
  },
  input: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.shadow,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: COLORS.text,
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
  },
  achievementsInput: {
    height: 120,
    paddingTop: 12,
    paddingBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
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
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.card,
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
  },
});
