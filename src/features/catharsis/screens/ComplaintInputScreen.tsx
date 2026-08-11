import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Types pour la catégorie et l'intensité
type Category = 'Boulot' | 'Famille' | 'Transport' | 'Météo' | 'Techno' | 'Amour' | 'Société' | 'Aléatoire';

interface IntensityLevel {
  level: number;
  label: string;
  emoji: string;
}

const INTENSITY_LEVELS: IntensityLevel[] = [
  { level: 1, label: 'Légère grogne', emoji: '😒' },
  { level: 2, label: 'Agacement réel', emoji: '😤' },
  { level: 3, label: 'Vraiment pas content(e)', emoji: '😠' },
  { level: 4, label: 'Bord du gouffre', emoji: '🤬' },
  { level: 5, label: 'Rage cosmique', emoji: '🌋' },
];

const CATEGORIES: Category[] = [
  'Boulot',
  'Famille',
  'Transport',
  'Météo',
  'Techno',
  'Amour',
  'Société',
  'Aléatoire',
];

export const ComplaintInputScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Boulot');
  const [intensity, setIntensity] = useState<number>(2);
  const [text, setText] = useState<string>('');

  const currentIntensity = INTENSITY_LEVELS[intensity];

  const handleNextStep = () => {
    if (!text.trim()) {
      alert('Vide ton sac avant de continuer !');
      return;
    }
    console.log({
      category: selectedCategory,
      intensity: currentIntensity.label,
      content: text,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0E11" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.stepTitle}>Étape 1/4</Text>
          <Text style={styles.mainTitle}>Lâche tout 🔓</Text>
        </View>

        {/* Sélection des Catégories */}
        <Text style={styles.sectionLabel}>CATÉGORIE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                selectedCategory === cat && styles.activeChip,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === cat && styles.activeChipText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Zone de Saisie */}
        <Text style={styles.sectionLabel}>TA PLAINTE</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={6}
          placeholder="Écris tout ici... Pas de filtre, pas de jugement !"
          placeholderTextColor="#555A64"
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
        />

        {/* Curseur d'Intensité */}
        <Text style={styles.sectionLabel}>INTENSITÉ ÉMOTIONNELLE</Text>
        <View style={styles.intensityCard}>
          <Text style={styles.intensityEmoji}>{currentIntensity.emoji}</Text>
          <Text style={styles.intensityLabel}>{currentIntensity.label}</Text>

          <View style={styles.intensitySelector}>
            {INTENSITY_LEVELS.map((item, index) => (
              <TouchableOpacity
                key={item.level}
                style={[
                  styles.intensityDot,
                  intensity === index && styles.activeDot,
                ]}
                onPress={() => setIntensity(index)}
              />
            ))}
          </View>
        </View>

        {/* Bouton d'Action Fluo */}
        <TouchableOpacity style={styles.submitButton} onPress={handleNextStep}>
          <Text style={styles.submitButtonText}>LÂCHE TOUT ➔</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

// 🎨 PALETTE STYLE MINIMALISTE / CYBER-ACCENT
const PALETTE = {
  bgBackground: '#0D0E11',   // Noir Mat absolu
  bgCard: '#16181E',         // Anthracite sombre
  bgChip: '#1F222A',         // Gris neutre
  accentFluo: '#CCFF00',     // Vert / Jaune Néon hyper percutant
  textPrimary: '#FFFFFF',    // Blanc pur
  textSecondary: '#8A8F9E',  // Gris moyen
  textDark: '#0D0E11',       // Pour écrire sur du Fluo
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.bgBackground,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  stepTitle: {
    color: PALETTE.accentFluo,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  mainTitle: {
    color: PALETTE.textPrimary,
    fontSize: 32,
    fontWeight: '900',
    marginTop: 4,
  },
  sectionLabel: {
    color: PALETTE.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginTop: 20,
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8, // Style plus carré/moderne que les grosses pilules
    backgroundColor: PALETTE.bgChip,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#262933',
  },
  activeChip: {
    backgroundColor: PALETTE.accentFluo,
    borderColor: PALETTE.accentFluo,
  },
  chipText: {
    color: PALETTE.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  activeChipText: {
    color: PALETTE.textDark,
    fontWeight: '800',
  },
  textInput: {
    backgroundColor: PALETTE.bgCard,
    color: PALETTE.textPrimary,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 140,
    borderWidth: 1,
    borderColor: '#262933',
  },
  intensityCard: {
    backgroundColor: PALETTE.bgCard,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262933',
  },
  intensityEmoji: {
    fontSize: 44,
  },
  intensityLabel: {
    color: PALETTE.accentFluo,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 18,
    textTransform: 'uppercase',
  },
  intensitySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
  },
  intensityDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#262933',
  },
  activeDot: {
    backgroundColor: PALETTE.accentFluo,
    transform: [{ scale: 1.25 }],
  },
  submitButton: {
    backgroundColor: PALETTE.accentFluo,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: PALETTE.textDark,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
});