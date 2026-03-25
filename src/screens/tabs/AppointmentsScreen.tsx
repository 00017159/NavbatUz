import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { APPOINTMENT_STATUS_COLORS } from '../../utils/constants';

const TABS = ['Upcoming', 'Past'];

const MOCK_APPOINTMENTS = [
  { id: '1', doctorName: 'Dr. Sarah Wilson', specialty: 'Cardiology', date: 'Mar 28, 2026', time: '10:30 AM', status: 'CONFIRMED', avatar: '👩‍⚕️', clinic: 'Heart Center' },
  { id: '2', doctorName: 'Dr. James Chen', specialty: 'Neurology', date: 'Apr 2, 2026', time: '02:00 PM', status: 'PENDING', avatar: '👨‍⚕️', clinic: 'Neuro Clinic' },
  { id: '3', doctorName: 'Dr. Maria Lopez', specialty: 'Pediatrics', date: 'Apr 10, 2026', time: '11:00 AM', status: 'CONFIRMED', avatar: '👩‍⚕️', clinic: 'Kids Health' },
];

const PAST_APPOINTMENTS = [
  { id: '4', doctorName: 'Dr. Robert Kim', specialty: 'Orthopedic', date: 'Mar 15, 2026', time: '09:00 AM', status: 'COMPLETED', avatar: '👨‍⚕️', clinic: 'Bone Care Plus' },
  { id: '5', doctorName: 'Dr. Emily Davis', specialty: 'Dermatology', date: 'Mar 10, 2026', time: '03:30 PM', status: 'CANCELLED', avatar: '👩‍⚕️', clinic: 'Skin Solutions' },
];

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const data = activeTab === 0 ? MOCK_APPOINTMENTS : PAST_APPOINTMENTS;

  const getStatusStyle = (status: string) => {
    const bg = status === 'CONFIRMED' ? '#DCFCE7'
      : status === 'PENDING' ? '#FEF9C3'
      : status === 'COMPLETED' ? '#F3F4F6'
      : '#FEE2E2';
    const text = APPOINTMENT_STATUS_COLORS[status as keyof typeof APPOINTMENT_STATUS_COLORS] || colors.textSecondary;
    return { bg, text };
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return '✓ Confirmed';
      case 'PENDING': return '⏳ Pending';
      case 'COMPLETED': return '✓ Completed';
      case 'CANCELLED': return '✕ Cancelled';
      default: return status;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab, i) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === i && styles.tabActive]}
            onPress={() => setActiveTab(i)}
          >
            <Text
              style={[styles.tabText, activeTab === i && styles.tabTextActive]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const { bg, text } = getStatusStyle(item.status);
          return (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.avatar}>
                  <Text style={{ fontSize: 28 }}>{item.avatar}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.docName}>{item.doctorName}</Text>
                  <Text style={styles.specialty}>{item.specialty}</Text>
                  <Text style={styles.clinic}>📍 {item.clinic}</Text>
                </View>
              </View>
              <View style={styles.cardBottom}>
                <View style={styles.dateRow}>
                  <Text style={styles.dateText}>📅 {item.date}</Text>
                  <Text style={styles.dateText}>🕐 {item.time}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: bg }]}>
                  <Text style={[styles.statusText, { color: text }]}>
                    {getStatusLabel(item.status)}
                  </Text>
                </View>
              </View>
              {activeTab === 0 && item.status !== 'CANCELLED' && (
                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.cancelBtn}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rescheduleBtn}>
                    <Text style={styles.rescheduleBtnText}>Reschedule</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontSize: 48 }}>📅</Text>
            <Text style={styles.emptyText}>No appointments</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.screenPadding, paddingBottom: 0 },
  title: { ...typography.h2, color: colors.text },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius.sm,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: spacing.borderRadius.sm,
  },
  tabActive: { backgroundColor: colors.primary },
  tabText: { ...typography.bodySmall, color: colors.textSecondary, fontWeight: '600' },
  tabTextActive: { color: colors.textInverse },
  listContent: { padding: spacing.screenPadding, paddingBottom: spacing.xxl },
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...spacing.shadow.small,
  },
  cardTop: { flexDirection: 'row', gap: spacing.md },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { flex: 1 },
  docName: { ...typography.bodyMedium, color: colors.text },
  specialty: { ...typography.caption, color: colors.textSecondary },
  clinic: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  dateRow: { flexDirection: 'row', gap: spacing.md },
  dateText: { ...typography.caption, color: colors.textSecondary },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: spacing.borderRadius.full,
  },
  statusText: { ...typography.caption, fontWeight: '600' },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: spacing.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.error,
    alignItems: 'center',
  },
  cancelBtnText: { ...typography.buttonSmall, color: colors.error },
  rescheduleBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: spacing.borderRadius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  rescheduleBtnText: { ...typography.buttonSmall, color: colors.textInverse },
  empty: { alignItems: 'center', paddingVertical: spacing.xxl * 2 },
  emptyText: { ...typography.h3, color: colors.text, marginTop: spacing.md },
});
