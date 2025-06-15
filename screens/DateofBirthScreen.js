import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ActivityIndicator , TouchableOpacity,} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { MaterialIcons } from '@expo/vector-icons';
const COLORS = {
  primary: '#34e3b0',      // Green
  secondary: '#2563eb',
  accent: '#F472B6',
  background: '#f6fbfa',
  card: '#fff',
  text: '#23272F',
  muted: '#6b7280',
  shadow: '#e0e7ef',
  logoBlue: '#2563eb',
  logoGreen: '#34e3b0',
};

const { width } = Dimensions.get('window');

export default function DateOfBirthScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date(2003, 4, 6)); // May 6, 2003
  const navigation = useNavigation();

  // Load Poppins fonts
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_400Regular,
  });

  // Animation value for page transition
  const translateX = useSharedValue(0);

  // Animation style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: 1 - Math.abs(translateX.value) / width,
  }));

  // Format date as "May 6, 2003"
  const formatDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Handle Next button press
  const handleNext = () => {
    navigation.navigate('PersonalDetailsScreen');
  };

  // Handle Back button press
  const handleBack = () => {
    navigation.goBack();
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.secondary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={styles.title}>Date of Birth</Text>
        <Text style={styles.selectedDateText}>{formatDate(selectedDate)}</Text>
        <Text style={styles.subtitle}>
          Tell us your birth date to personalize your experience.
        </Text>
        <View style={styles.card}>
          <DateTimePicker
            mode="single"
            date={selectedDate}
            onChange={({ date }) => {
              if (date) setSelectedDate(date);
            }}
            locale="en"
            calendarTextStyle={{
              color: COLORS.text,
              fontFamily: 'Poppins_500Medium',
              fontWeight: '500',
            }}
            headerTextStyle={{
              color: COLORS.secondary,
              fontFamily: 'Poppins_700Bold',
              fontWeight: 'bold',
              fontSize: 20,
            }}
            selectedItemColor={COLORS.primary} // Green color for selected day/month/year
            selectedTextStyle={{
              color: COLORS.primary,
              fontFamily: 'Poppins_700Bold',
              fontWeight: 'bold',
            }}
            selectedItemBackgroundColor="transparent" // Only highlight text, not background
            todayTextStyle={{
              color: COLORS.primary,
              fontFamily: 'Poppins_700Bold',
              fontWeight: 'bold',
            }}
            dayContainerStyle={{
              borderRadius: 20,
            }}
            style={styles.datePickerStyle}
          />
        </View>
        <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation && navigation.goBack && navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={28} color={COLORS.secondary} />
                      </TouchableOpacity>
          <Pressable onPress={handleNext} style={styles.nextButton} android_ripple={{ color: COLORS.primary }}>
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 70,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: COLORS.text,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  selectedDateText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.secondary,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 30,
    alignSelf: 'flex-start',
    lineHeight: 22,
    fontFamily: 'Poppins_600SemiBold',
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 40,
  },
  datePickerStyle: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding: 0,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
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
    borderRadius: 12,
    paddingHorizontal: 36,
    paddingVertical: 12,
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
