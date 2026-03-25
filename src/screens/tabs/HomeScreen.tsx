import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { getGreeting } from '../../utils/formatters';
import { SPECIALTIES } from '../../utils/constants';

const UPCOMING_MOCK = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Wilson',
    specialty: 'Cardiology',
    date: 'Mar 28, 2026',
    time: '10:30 AM',
    status: 'CONFIRMED',
    avatar: '👩‍⚕️',
  },
  {
    id: '2',
    doctorName: 'Dr. James Chen',
    specialty: 'Neurology',
    date: 'Apr 2, 2026',
    time: '02:00 PM',
    status: 'PENDING',
    avatar: '👨‍⚕️',
  },
];

const TOP_DOCTORS = [
  { id: '1', name: 'Dr. Sarah Wilson', specialty: 'Cardiology', rating: 4.9, reviews: 127, avatar: '👩‍⚕️', price: 50 },
  { id: '2', name: 'Dr. James Chen', specialty: 'Neurology', rating: 4.8, reviews: 98, avatar: '👨‍⚕️', price: 65 },
  { id: '3', name: 'Dr. Maria Lopez', specialty: 'Pediatrics', rating: 4.9, reviews: 156, avatar: '👩‍⚕️', price: 45 },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.name}>Alex Thompson</Text>
          </View>
          <TouchableOpacity style={styles.notifBadge}>
            <Text style={{ fontSize: 22 }}>🔔</Text>
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 18 }}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search doctors, specialties...</Text>
        </TouchableOpacity>

        {/* Specialties */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Specialties</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SPECIALTIES.map((s) => (
              <TouchableOpacity key={s.key} style={styles.specialtyCard}>
                <Text style={styles.specialtyIcon}>{s.icon}</Text>
                <Text style={styles.specialtyLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          {UPCOMING_MOCK.map((apt) => (
            <View key={apt.id} style={styles.appointmentCard}>
              <View style={styles.aptRow}>
                <View style={styles.aptAvatar}>
                  <Text style={{ fontSize: 28 }}>{apt.avatar}</Text>
                </View>
                <View style={styles.aptInfo}>
                  <Text style={styles.aptDoctor}>{apt.doctorName}</Text>
                  <Text style={styles.aptSpecialty}>{apt.specialty}</Text>
                  <View style={styles.aptTimeRow}>
                    <Text style={styles.aptDate}>📅 {apt.date}</Text>
                    <Text style={styles.aptTime}>🕐 {apt.time}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.statusBadge, {
                backgroundColor: apt.status === 'CONFIRMED' ? '#DCFCE7' : '#FEF9C3',
              }]}>
                <Text style={[styles.statusText, {
                  color: apt.status === 'CONFIRMED' ? '#16A34A' : '#CA8A04',
                }]}>
                  {apt.status === 'CONFIRMED' ? '✓ Confirmed' : '⏳ Pending'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Top Doctors */}
        <View style={[styles.section, { marginBottom: spacing.xxl }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Doctors</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {TOP_DOCTORS.map((doc) => (
              <TouchableOpacity key={doc.id} style={styles.doctorCard}>
                <View style={styles.docAvatar}>
                  <Text style={{ fontSize: 36 }}>{doc.avatar}</Text>
                </View>
                <Text style={styles.docName}>{doc.name}</Text>
                <Text style={styles.docSpecialty}>{doc.specialty}</Text>
                <View style={styles.docRating}>
                  <Text style={styles.docStar}>⭐ {doc.rating}</Text>
                  <Text style={styles.docReviews}>({doc.reviews})</Text>
                </View>
                <Text style={styles.docPrice}>${doc.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.screenPadding,
    paddingTop: spacing.lg,
  },
  greeting: { ...typography.bodySmall, color: colors.textSecondary },
  name: { ...typography.h2, color: colors.text },
  notifBadge: { position: 'relative', padding: spacing.sm },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.error,
    borderWidth: 2,
    borderColor: colors.background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.screenPadding,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderRadius: spacing.borderRadius.md,
    gap: spacing.sm,
    ...spacing.shadow.small,
  },
  searchPlaceholder: { ...typography.body, color: colors.textLight, flex: 1 },
  section: { marginTop: spacing.lg, paddingHorizontal: spacing.screenPadding },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: { ...typography.h3, color: colors.text },
  seeAll: { ...typography.bodySmall, color: colors.primary, fontWeight: '600' },
  specialtyCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.borderRadius.md,
    marginRight: spacing.sm,
    minWidth: 90,
    ...spacing.shadow.small,
  },
  specialtyIcon: { fontSize: 28, marginBottom: spacing.xs },
  specialtyLabel: { ...typography.caption, color: colors.text, fontWeight: '500' },
  appointmentCard: {
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...spacing.shadow.small,
  },
  aptRow: { flexDirection: 'row', gap: spacing.md },
  aptAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aptInfo: { flex: 1 },
  aptDoctor: { ...typography.bodyMedium, color: colors.text },
  aptSpecialty: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.xs },
  aptTimeRow: { flexDirection: 'row', gap: spacing.md },
  aptDate: { ...typography.caption, color: colors.textSecondary },
  aptTime: { ...typography.caption, color: colors.textSecondary },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: spacing.borderRadius.full,
    marginTop: spacing.sm,
  },
  statusText: { ...typography.caption, fontWeight: '600' },
  doctorCard: {
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    marginRight: spacing.sm,
    width: 160,
    alignItems: 'center',
    ...spacing.shadow.small,
  },
  docAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  docName: { ...typography.bodySmall, fontWeight: '600', color: colors.text, textAlign: 'center' },
  docSpecialty: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.xs },
  docRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  docStar: { ...typography.caption, fontWeight: '600', color: colors.warning },
  docReviews: { ...typography.caption, color: colors.textSecondary },
  docPrice: { ...typography.bodyMedium, color: colors.primary, marginTop: spacing.xs },
});
