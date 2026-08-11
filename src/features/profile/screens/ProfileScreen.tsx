import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0E11" />
      <ScrollView contentContainerStyle={styles.content}>

        {/* Header Profil */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>MON BILAN</Text>
          <Text style={styles.title}>Stats Cathartiques 📊</Text>
        </View>

        {/* Grille de statistiques principales */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>14</Text>
            <Text style={styles.statLabel}>Sacs Vidés</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>🔥</Text>
            <Text style={styles.statLabel}>Mode Préféré</Text>
            <Text style={styles.statSubLabel}>Feu (57%)</Text>
          </View>
        </View>

        {/* Graphique / Top agacement */}
        <Text style={styles.sectionTitle}>TOP SOURCES D'AGACEMENT</Text>

        <View style={styles.infoCard}>
          <View style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <Text style={styles.categoryName}>💼 Boulot</Text>
              <Text style={styles.categoryPercent}>65%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '65%' }]} />
            </View>
          </View>

          <View style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <Text style={styles.categoryName}>🚌 Transport</Text>
              <Text style={styles.categoryPercent}>20%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '20%' }]} />
            </View>
          </View>

          <View style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <Text style={styles.categoryName}>💻 Techno</Text>
              <Text style={styles.categoryPercent}>15%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '15%' }]} />
            </View>
          </View>
        </View>

        {/* Niveau de Soulagement */}
        <Text style={styles.sectionTitle}>INDICE DE SOULAGEMENT</Text>
        <View style={styles.reliefCard}>
          <Text style={styles.reliefEmoji}>🧘‍♂️</Text>
          <View style={styles.reliefTextContainer}>
            <Text style={styles.reliefTitle}>Niveau : Zen partiel</Text>
            <Text style={styles.reliefDescription}>
              Tu as libéré environ 3 400 mots de frustration ce mois-ci. Continue à vider ton sac !
            </Text>
          </View>
        </View>

        {/* Bouton de Réinitialisation / Export */}
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>EXPORTER MES DONNÉES PRIVÉES</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

// 🎨 PALETTE STYLE MINIMALISTE / CYBER-ACCENT
const PALETTE = {
  bgBackground: '#0D0E11',
  bgCard: '#16181E',
  bgChip: '#1F222A',
  accentFluo: '#CCFF00',
  textPrimary: '#FFFFFF',
  textSecondary: '#8A8F9E',
  textDark: '#0D0E11',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.bgBackground,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  subtitle: {
    color: PALETTE.accentFluo,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  title: {
    color: PALETTE.textPrimary,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: PALETTE.bgCard,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262933',
  },
  statNumber: {
    color: PALETTE.accentFluo,
    fontSize: 32,
    fontWeight: '900',
  },
  statLabel: {
    color: PALETTE.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  statSubLabel: {
    color: PALETTE.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  sectionTitle: {
    color: PALETTE.textSecondary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: PALETTE.bgCard,
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#262933',
    marginBottom: 24,
    gap: 14,
  },
  progressRow: {},
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  categoryName: {
    color: PALETTE.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  categoryPercent: {
    color: PALETTE.accentFluo,
    fontSize: 13,
    fontWeight: '800',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: PALETTE.bgChip,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: PALETTE.accentFluo,
    borderRadius: 4,
  },
  reliefCard: {
    backgroundColor: PALETTE.bgCard,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262933',
    marginBottom: 24,
  },
  reliefEmoji: {
    fontSize: 32,
    marginRight: 14,
  },
  reliefTextContainer: {
    flex: 1,
  },
  reliefTitle: {
    color: PALETTE.accentFluo,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  reliefDescription: {
    color: PALETTE.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  secondaryButton: {
    backgroundColor: PALETTE.bgChip,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262933',
  },
  secondaryButtonText: {
    color: PALETTE.textSecondary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
});