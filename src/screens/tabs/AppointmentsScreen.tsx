import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export default function AppointmentsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>📅</Text>
          <Text style={styles.placeholderText}>My Appointments</Text>
          <Text style={styles.placeholderSubtext}>Coming in Sprint 3</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.screenPadding },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: { fontSize: 64, marginBottom: spacing.md },
  placeholderText: { ...typography.h3, color: colors.text },
  placeholderSubtext: { ...typography.bodySmall, color: colors.textSecondary, marginTop: spacing.xs },
});
