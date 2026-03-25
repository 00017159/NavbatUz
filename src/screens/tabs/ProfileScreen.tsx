import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export default function ProfileScreen() {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>👤</Text>
          <Text style={styles.placeholderText}>My Profile</Text>
          <Text style={styles.placeholderSubtext}>Coming in Sprint 4</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
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
  logoutButton: {
    height: spacing.buttonHeight,
    backgroundColor: colors.error,
    borderRadius: spacing.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoutText: {
    ...typography.button,
    color: colors.textInverse,
  },
});
