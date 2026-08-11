import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { ComplaintCard, Complaint } from '../components/ComplaintCard';

// Données fictives pour tester le Feed
const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: '1',
    category: 'Boulot',
    intensityEmoji: '🌋',
    intensityLabel: 'Rage cosmique',
    aiTitle: 'Le Train de 17h00 : Saga Inutile',
    content: "Mon boss vient encore de m'envoyer un courriel urgent à 17h00 un vendredi... juste avant de partir en week-end !",
    timeAgo: 'il y a 5 min',
    supportCount: 142,
  },
  {
    id: '2',
    category: 'Transport',
    intensityEmoji: '🤬',
    intensityLabel: 'Bord du gouffre',
    aiTitle: 'Chaud comme dans un Four',
    content: "La climatisation du métro est en panne et le conducteur roule à 10 km/h sans donner d'explications.",
    timeAgo: 'il y a 22 min',
    supportCount: 89,
  },
  {
    id: '3',
    category: 'Techno',
    intensityEmoji: '😤',
    intensityLabel: 'Agacement réel',
    aiTitle: 'Mise à Jour Fatale',
    content: "Mon ordinateur s'est relancé tout seul pour une mise à jour de 45 minutes pendant que je présentais en direct !",
    timeAgo: 'il y a 1h',
    supportCount: 215,
  },
  {
    id: '4',
    category: 'Météo',
    intensityEmoji: '😒',
    intensityLabel: 'Légère grogne',
    aiTitle: 'Averse Imprévue',
    content: "Il prévoyait du grand soleil toute la journée et il a commencé à pleuvoir la minute exacte où je suis sorti.",
    timeAgo: 'il y a 3h',
    supportCount: 45,
  },
];

const CATEGORIES = ['Toutes', 'Boulot', 'Transport', 'Techno', 'Météo', 'Famille', 'Amour'];

interface FeedScreenProps {
  onOpenCatharsisFlow?: () => void;
}

export const FeedScreen: React.FC<FeedScreenProps> = ({ onOpenCatharsisFlow }) => {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  const filteredComplaints = selectedCategory === 'Toutes'
    ? MOCK_COMPLAINTS
    : MOCK_COMPLAINTS.filter((c) => c.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0E11" />

      {/* Header du Feed */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>COMMUNAUTÉ</Text>
          <Text style={styles.headerTitle}>Défouloir collectif 🗣️</Text>
        </View>
      </View>

      {/* Barre de Filtres par Catégorie */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterChip,
                selectedCategory === cat && styles.activeFilterChip,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === cat && styles.activeFilterText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Liste des Plaintes */}
      <FlatList
        data={filteredComplaints}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ComplaintCard complaint={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Bouton Flottant (FAB) - Déclencheur Catharsis */}
      <TouchableOpacity style={styles.fabButton} onPress={onOpenCatharsisFlow}>
        <Text style={styles.fabIcon}>+</Text>
        <Text style={styles.fabText}>VIDER MON SAC</Text>
      </TouchableOpacity>

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
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerSubtitle: {
    color: PALETTE.accentFluo,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  headerTitle: {
    color: PALETTE.textPrimary,
    fontSize: 26,
    fontWeight: '900',
    marginTop: 2,
  },
  filterWrapper: {
    marginBottom: 10,
  },
  filterContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: PALETTE.bgChip,
    borderWidth: 1,
    borderColor: '#262933',
  },
  activeFilterChip: {
    backgroundColor: PALETTE.accentFluo,
    borderColor: PALETTE.accentFluo,
  },
  filterText: {
    color: PALETTE.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  activeFilterText: {
    color: PALETTE.textDark,
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Pour laisser de la place au FAB
  },
  fabButton: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    backgroundColor: PALETTE.accentFluo,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: PALETTE.accentFluo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    color: PALETTE.textDark,
    fontSize: 20,
    fontWeight: '900',
    marginRight: 8,
  },
  fabText: {
    color: PALETTE.textDark,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
});