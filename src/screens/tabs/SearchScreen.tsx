import React, { useState } from 'react';
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
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { SPECIALTIES } from '../../utils/constants';

const MOCK_DOCTORS = [
  { id: '1', name: 'Dr. Sarah Wilson', specialty: 'CARDIOLOGY', rating: 4.9, reviews: 127, avatar: '👩‍⚕️', price: 50, experience: 12, clinic: 'Heart Center' },
  { id: '2', name: 'Dr. James Chen', specialty: 'NEUROLOGY', rating: 4.8, reviews: 98, avatar: '👨‍⚕️', price: 65, experience: 15, clinic: 'Neuro Clinic' },
  { id: '3', name: 'Dr. Maria Lopez', specialty: 'PEDIATRICS', rating: 4.9, reviews: 156, avatar: '👩‍⚕️', price: 45, experience: 8, clinic: 'Kids Health' },
  { id: '4', name: 'Dr. Robert Kim', specialty: 'ORTHOPEDIC', rating: 4.7, reviews: 89, avatar: '👨‍⚕️', price: 70, experience: 20, clinic: 'Bone Care Plus' },
  { id: '5', name: 'Dr. Emily Davis', specialty: 'DERMATOLOGY', rating: 4.8, reviews: 142, avatar: '👩‍⚕️', price: 55, experience: 10, clinic: 'Skin Solutions' },
  { id: '6', name: 'Dr. Ahmad Raze', specialty: 'GENERAL', rating: 4.6, reviews: 210, avatar: '👨‍⚕️', price: 35, experience: 18, clinic: 'Family Health' },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  const filtered = MOCK_DOCTORS.filter((doc) => {
    const matchesSearch =
      !searchQuery ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      !selectedSpecialty || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <Text style={styles.title}>Find a Doctor</Text>
        <View style={styles.searchInputWrap}>
          <Text style={{ fontSize: 18 }}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, specialty..."
            placeholderTextColor={colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={{ fontSize: 16, color: colors.textSecondary }}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Specialty Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipRow}
        contentContainerStyle={{ paddingHorizontal: spacing.screenPadding }}
      >
        <TouchableOpacity
          style={[
            styles.chip,
            !selectedSpecialty && styles.chipActive,
          ]}
          onPress={() => setSelectedSpecialty(null)}
        >
          <Text
            style={[
              styles.chipText,
              !selectedSpecialty && styles.chipTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {SPECIALTIES.map((s) => (
          <TouchableOpacity
            key={s.key}
            style={[
              styles.chip,
              selectedSpecialty === s.key && styles.chipActive,
            ]}
            onPress={() =>
              setSelectedSpecialty(selectedSpecialty === s.key ? null : s.key)
            }
          >
            <Text
              style={[
                styles.chipText,
                selectedSpecialty === s.key && styles.chipTextActive,
              ]}
            >
              {s.icon} {s.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Doctor Cards */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.doctorCard} activeOpacity={0.7}>
            <View style={styles.cardRow}>
              <View style={styles.avatar}>
                <Text style={{ fontSize: 32 }}>{item.avatar}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.docName}>{item.name}</Text>
                <Text style={styles.docSpecialty}>
                  {SPECIALTIES.find((s) => s.key === item.specialty)?.icon}{' '}
                  {SPECIALTIES.find((s) => s.key === item.specialty)?.label}
                </Text>
                <Text style={styles.docClinic}>📍 {item.clinic}</Text>
                <View style={styles.statsRow}>
                  <Text style={styles.docRating}>⭐ {item.rating}</Text>
                  <Text style={styles.docReviews}>({item.reviews})</Text>
                  <Text style={styles.dotSep}>•</Text>
                  <Text style={styles.docExp}>{item.experience} yrs</Text>
                </View>
              </View>
              <View style={styles.priceCol}>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.price}>${item.price}</Text>
                <TouchableOpacity style={styles.bookBtn}>
                  <Text style={styles.bookBtnText}>Book</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontSize: 48 }}>🔍</Text>
            <Text style={styles.emptyText}>No doctors found</Text>
            <Text style={styles.emptySubtext}>
              Try a different specialty or search term
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchHeader: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    ...spacing.shadow.small,
  },
  title: { ...typography.h2, color: colors.text, marginBottom: spacing.md },
  searchInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: spacing.borderRadius.sm,
    paddingHorizontal: spacing.md,
    height: spacing.inputHeight,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.text,
  },
  chipRow: { marginTop: spacing.md, maxHeight: 52 },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.borderRadius.full,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: { ...typography.bodySmall, color: colors.text },
  chipTextActive: { color: colors.textInverse },
  resultsHeader: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  resultsCount: { ...typography.bodySmall, color: colors.textSecondary },
  listContent: { paddingHorizontal: spacing.screenPadding, paddingBottom: spacing.xxl },
  doctorCard: {
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...spacing.shadow.small,
  },
  cardRow: { flexDirection: 'row', gap: spacing.md },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: { flex: 1 },
  docName: { ...typography.bodyMedium, color: colors.text },
  docSpecialty: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  docClinic: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  docRating: { ...typography.caption, fontWeight: '600', color: colors.warning },
  docReviews: { ...typography.caption, color: colors.textSecondary },
  dotSep: { color: colors.textLight },
  docExp: { ...typography.caption, color: colors.textSecondary },
  priceCol: { alignItems: 'center', justifyContent: 'center' },
  priceLabel: { ...typography.caption, color: colors.textSecondary },
  price: { ...typography.h3, color: colors.primary },
  bookBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: spacing.borderRadius.full,
    marginTop: spacing.xs,
  },
  bookBtnText: { ...typography.caption, color: colors.textInverse, fontWeight: '600' },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyText: { ...typography.h3, color: colors.text, marginTop: spacing.md },
  emptySubtext: { ...typography.bodySmall, color: colors.textSecondary, marginTop: spacing.xs },
});
