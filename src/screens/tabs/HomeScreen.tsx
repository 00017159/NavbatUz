import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { getGreeting } from '../../utils/formatters';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.name}>Alex Thompson</Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>🏥</Text>
          <Text style={styles.placeholderText}>Home Screen</Text>
          <Text style={styles.placeholderSubtext}>Coming in Sprint 3</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.screenPadding },
  greeting: { ...typography.bodySmall, color: colors.textSecondary },
  name: { ...typography.h2, color: colors.text, marginBottom: spacing.lg },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: { fontSize: 64, marginBottom: spacing.md },
  placeholderText: { ...typography.h3, color: colors.text },
  placeholderSubtext: { ...typography.bodySmall, color: colors.textSecondary, marginTop: spacing.xs },
});
