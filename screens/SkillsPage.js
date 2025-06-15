import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';
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

const PROFICIENCY_OPTIONS = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
];

export default function SkillsPage({ navigation }) {
  const [skillsOwned, setSkillsOwned] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [showProficiency, setShowProficiency] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [skillToLearn, setSkillToLearn] = useState('');
  const [skillsToLearnList, setSkillsToLearnList] = useState([]);
  const [newSkillToLearn, setNewSkillToLearn] = useState('');

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  // Add new skill owned
  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setShowProficiency(true);
    }
  };

  // Save proficiency for new skill owned
  const handleSaveProficiency = () => {
    if (newSkill.trim() && proficiency.trim()) {
      setSkillsOwned([
        ...skillsOwned,
        { skill: newSkill.trim(), proficiency: proficiency.trim() },
      ]);
      setNewSkill('');
      setProficiency('');
      setShowProficiency(false);
    }
  };

  // Edit skill owned proficiency
  const handleEditSkill = (index) => {
    setEditingIndex(index);
    setProficiency(skillsOwned[index].proficiency);
  };

  // Save edited proficiency
  const handleSaveEditedProficiency = () => {
    if (proficiency.trim()) {
      const updated = [...skillsOwned];
      updated[editingIndex].proficiency = proficiency.trim();
      setSkillsOwned(updated);
      setEditingIndex(null);
      setProficiency('');
    }
  };

  // Remove a skill owned
  const handleRemoveSkill = (index) => {
    setSkillsOwned(skillsOwned.filter((_, i) => i !== index));
  };

  // Add skill to learn
  const handleAddSkillToLearn = () => {
    if (newSkillToLearn.trim() !== '') {
      setSkillsToLearnList([...skillsToLearnList, newSkillToLearn.trim()]);
      setNewSkillToLearn('');
    }
  };

  // Remove skill to learn
  const handleRemoveSkillToLearn = (index) => {
    setSkillsToLearnList(skillsToLearnList.filter((_, i) => i !== index));
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 36 }} />
      <Text style={styles.title}>Skills</Text>
      <Text style={styles.subtitle}>
        Add your skills and skills you want to learn for a better Skill Swap experience.
      </Text>

      {/* Skills Owned */}
      <View style={styles.inputSection}>
        <View style={styles.inputLabelRow}>
          <MaterialIcons name="star" size={22} color={COLORS.accent} />
          <Text style={styles.inputLabel}>Skills Owned</Text>
        </View>
        {/* Add new skill */}
        {editingIndex === null && !showProficiency && (
          <View style={styles.skillAddRow}>
            <TextInput
              style={[styles.inputBox, { flex: 1, marginRight: 8 }]}
              placeholder="Add a skill"
              placeholderTextColor={COLORS.muted}
              value={newSkill}
              onChangeText={setNewSkill}
              onSubmitEditing={handleAddSkill}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={styles.addBtn}
              onPress={handleAddSkill}
              disabled={!newSkill.trim()}
            >
              <Icon name="plus-circle" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        )}
        {/* Proficiency dropdown for new skill */}
        {showProficiency && (
          <View style={styles.proficiencyRow}>
            <Text style={styles.proficiencyLabel}>
              Proficiency for "{newSkill}":
            </Text>
            <View style={styles.dropdownContainer}>
              {PROFICIENCY_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.dropdownOption,
                    proficiency === option && styles.dropdownOptionSelected,
                  ]}
                  onPress={() => setProficiency(option)}
                >
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      proficiency === option && styles.dropdownOptionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSaveProficiency}
              disabled={!proficiency.trim()}
            >
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Edit proficiency for existing skill */}
        {editingIndex !== null && (
          <View style={styles.proficiencyRow}>
            <Text style={styles.proficiencyLabel}>
              Edit proficiency for "{skillsOwned[editingIndex].skill}":
            </Text>
            <View style={styles.dropdownContainer}>
              {PROFICIENCY_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.dropdownOption,
                    proficiency === option && styles.dropdownOptionSelected,
                  ]}
                  onPress={() => setProficiency(option)}
                >
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      proficiency === option && styles.dropdownOptionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSaveEditedProficiency}
              disabled={!proficiency.trim()}
            >
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* List of skills owned */}
        <View style={{ marginTop: 8 }}>
          {skillsOwned.map((item, idx) => (
            <View key={idx} style={styles.skillItemRow}>
              <MaterialIcons name="check-circle" size={20} color={COLORS.primary} />
              <Text style={styles.skillText}>
                {item.skill} <Text style={styles.skillProficiency}>({item.proficiency})</Text>
              </Text>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => handleEditSkill(idx)}
              >
                <Icon name="edit-2" size={18} color={COLORS.secondary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => handleRemoveSkill(idx)}
              >
                <MaterialIcons name="close" size={20} color={COLORS.accent} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Skills to Learn */}
      <View style={styles.inputSection}>
        <View style={styles.inputLabelRow}>
          <MaterialIcons name="lightbulb-outline" size={22} color={COLORS.primary} />
          <Text style={styles.inputLabel}>Skills to Learn</Text>
        </View>
        {/* Add new skill to learn */}
        <View style={styles.skillAddRow}>
          <TextInput
            style={[styles.inputBox, { flex: 1, marginRight: 8 }]}
            placeholder="Add a skill to learn"
            placeholderTextColor={COLORS.muted}
            value={newSkillToLearn}
            onChangeText={setNewSkillToLearn}
            onSubmitEditing={handleAddSkillToLearn}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleAddSkillToLearn}
            disabled={!newSkillToLearn.trim()}
          >
            <Icon name="plus-circle" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        {/* List of skills to learn */}
        <View style={{ marginTop: 8 }}>
          {skillsToLearnList.map((skill, idx) => (
            <View key={idx} style={styles.skillItemRow}>
              <MaterialIcons name="lightbulb-outline" size={20} color={COLORS.secondary} />
              <Text style={styles.skillText}>{skill}</Text>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => handleRemoveSkillToLearn(idx)}
              >
                <MaterialIcons name="close" size={20} color={COLORS.accent} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation && navigation.goBack && navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color={COLORS.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation && navigation.navigate && navigation.navigate('UploadCertificatesScreen')}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
  skillAddRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addBtn: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proficiencyRow: {
    marginTop: 8,
    marginBottom: 8,
  },
  proficiencyLabel: {
    fontSize: 14,
    color: COLORS.muted,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 4,
  },
  dropdownContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  dropdownOption: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.shadow,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
    marginBottom: 6,
  },
  dropdownOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dropdownOptionText: {
    color: COLORS.text,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
  },
  dropdownOptionTextSelected: {
    color: COLORS.card,
    fontFamily: 'Poppins_700Bold',
  },
  saveBtn: {
    marginTop: 4,
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: 80,
    alignSelf: 'flex-end',
  },
  saveBtnText: {
    color: COLORS.card,
    fontFamily: 'Poppins_700Bold',
    fontSize: 15,
  },
  skillItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.shadow,
  },
  skillText: {
    marginLeft: 8,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.text,
    fontSize: 15,
    flex: 1,
  },
  skillProficiency: {
    color: COLORS.muted,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },
  editBtn: {
    marginLeft: 8,
    padding: 4,
  },
  removeBtn: {
    marginLeft: 4,
    padding: 4,
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
