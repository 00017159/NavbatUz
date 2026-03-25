import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { MORNING_SLOTS, AFTERNOON_SLOTS } from '../../utils/constants';

const MOCK_DOCTOR = {
  name: 'Dr. Sarah Wilson',
  specialty: 'Cardiology',
  rating: 4.9,
  reviews: 127,
  clinic: 'Heart Center Clinic',
  price: 50,
  avatar: '👩‍⚕️',
};

const DATES = [
  { day: 'Mon', date: 28, month: 'Mar', available: true },
  { day: 'Tue', date: 29, month: 'Mar', available: true },
  { day: 'Wed', date: 30, month: 'Mar', available: false },
  { day: 'Thu', date: 31, month: 'Mar', available: true },
  { day: 'Fri', date: 1, month: 'Apr', available: true },
  { day: 'Sat', date: 2, month: 'Apr', available: true },
  { day: 'Sun', date: 3, month: 'Apr', available: false },
];

export default function BookAppointmentScreen() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select a date and time slot');
      return;
    }
    Alert.alert(
      '✓ Appointment Booked!',
      `${MOCK_DOCTOR.name}\n${DATES[selectedDate]?.day}, ${DATES[selectedDate]?.month} ${DATES[selectedDate]?.date}\n${selectedTime}\n\nYou will receive a confirmation on Telegram.`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Doctor Info */}
        <View style={styles.doctorInfo}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 40 }}>{MOCK_DOCTOR.avatar}</Text>
          </View>
          <View style={styles.docDetails}>
            <Text style={styles.docName}>{MOCK_DOCTOR.name}</Text>
            <Text style={styles.docSpecialty}>{MOCK_DOCTOR.specialty}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.rating}>⭐ {MOCK_DOCTOR.rating}</Text>
              <Text style={styles.reviews}>({MOCK_DOCTOR.reviews} reviews)</Text>
            </View>
            <Text style={styles.clinic}>📍 {MOCK_DOCTOR.clinic}</Text>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DATES.map((d, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dateCard,
                  !d.available && styles.dateDisabled,
                  selectedDate === i && styles.dateSelected,
                ]}
                disabled={!d.available}
                onPress={() => setSelectedDate(i)}
              >
                <Text style={[
                  styles.dateDay,
                  selectedDate === i && styles.dateTextSelected,
                  !d.available && styles.dateTextDisabled,
                ]}>
                  {d.day}
                </Text>
                <Text style={[
                  styles.dateNum,
                  selectedDate === i && styles.dateTextSelected,
                  !d.available && styles.dateTextDisabled,
                ]}>
                  {d.date}
                </Text>
                <Text style={[
                  styles.dateMonth,
                  selectedDate === i && styles.dateTextSelected,
                  !d.available && styles.dateTextDisabled,
                ]}>
                  {d.month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Morning</Text>
          <View style={styles.timeGrid}>
            {MORNING_SLOTS.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.timeSlot,
                  selectedTime === slot && styles.timeSlotSelected,
                ]}
                onPress={() => setSelectedTime(slot)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === slot && styles.timeTextSelected,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { marginTop: spacing.md }]}>Afternoon</Text>
          <View style={styles.timeGrid}>
            {AFTERNOON_SLOTS.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.timeSlot,
                  selectedTime === slot && styles.timeSlotSelected,
                ]}
                onPress={() => setSelectedTime(slot)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === slot && styles.timeTextSelected,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Reason */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reason for Visit</Text>
          <TextInput
            style={styles.reasonInput}
            placeholder="Describe your symptoms..."
            placeholderTextColor={colors.textLight}
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Booking Summary */}
        {selectedDate !== null && selectedTime && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Doctor</Text>
              <Text style={styles.summaryValue}>{MOCK_DOCTOR.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>
                {DATES[selectedDate]?.day}, {DATES[selectedDate]?.month} {DATES[selectedDate]?.date}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Time</Text>
              <Text style={styles.summaryValue}>{selectedTime}</Text>
            </View>
            <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.summaryLabel}>Price</Text>
              <Text style={[styles.summaryValue, { color: colors.primary, fontWeight: '700' }]}>
                ${MOCK_DOCTOR.price}
              </Text>
            </View>
          </View>
        )}

        {/* Confirm Button */}
        <View style={styles.bottomPad}>
          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
            <Text style={styles.confirmText}>✓ Confirm Appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  doctorInfo: {
    flexDirection: 'row',
    padding: spacing.screenPadding,
    backgroundColor: colors.surface,
    gap: spacing.md,
    ...spacing.shadow.small,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  docDetails: { flex: 1 },
  docName: { ...typography.h3, color: colors.text },
  docSpecialty: { ...typography.bodySmall, color: colors.textSecondary },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  rating: { ...typography.caption, fontWeight: '600', color: colors.warning },
  reviews: { ...typography.caption, color: colors.textSecondary },
  clinic: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  section: { padding: spacing.screenPadding, paddingBottom: 0 },
  sectionTitle: { ...typography.bodyMedium, color: colors.text, marginBottom: spacing.sm },
  dateCard: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
    minWidth: 64,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateDisabled: { opacity: 0.4 },
  dateSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  dateDay: { ...typography.caption, color: colors.textSecondary },
  dateNum: { ...typography.h3, color: colors.text, marginVertical: 2 },
  dateMonth: { ...typography.caption, color: colors.textSecondary },
  dateTextSelected: { color: colors.textInverse },
  dateTextDisabled: { color: colors.textLight },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  timeSlot: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.borderRadius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeSlotSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  timeText: { ...typography.bodySmall, color: colors.text },
  timeTextSelected: { color: colors.textInverse, fontWeight: '600' },
  reasonInput: {
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius.sm,
    padding: spacing.md,
    ...typography.body,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    height: 80,
    textAlignVertical: 'top',
  },
  summaryCard: {
    margin: spacing.screenPadding,
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    ...spacing.shadow.medium,
  },
  summaryTitle: { ...typography.bodyMedium, color: colors.text, marginBottom: spacing.sm },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  summaryLabel: { ...typography.bodySmall, color: colors.textSecondary },
  summaryValue: { ...typography.bodySmall, color: colors.text, fontWeight: '500' },
  bottomPad: { padding: spacing.screenPadding },
  confirmBtn: {
    height: spacing.buttonHeight,
    backgroundColor: colors.success,
    borderRadius: spacing.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    ...spacing.shadow.medium,
  },
  confirmText: { ...typography.button, color: colors.textInverse },
});
