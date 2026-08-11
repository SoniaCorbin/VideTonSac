import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native';

const MOCK_PRIVATE_LOGS = [
  { id: '1', date: 'Hier, 18:30', category: 'Boulot', text: 'Encore un courriel de dernière minute...' },
  { id: '2', date: '08 août', category: 'Météo', text: 'Pluie torrentielle sur le chemin du retour.' },
];

export const JournalScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0E11" />
      <View style={styles.content}>
        <Text style={styles.subtitle}>ESPACE CONFIDENTIEL</Text>
        <Text style={styles.title}>Mon Journal Privé 🔒</Text>

        <FlatList
          data={MOCK_PRIVATE_LOGS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.category}>{item.category.toUpperCase()}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text style={styles.cardText}>{item.text}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const PALETTE = {
  bgBackground: '#0D0E11',
  bgCard: '#16181E',
  accentFluo: '#CCFF00',
  textPrimary: '#FFFFFF',
  textSecondary: '#8A8F9E',
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PALETTE.bgBackground },
  content: { padding: 20, flex: 1 },
  subtitle: { color: PALETTE.accentFluo, fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  title: { color: PALETTE.textPrimary, fontSize: 26, fontWeight: '900', marginTop: 2 },
  card: { backgroundColor: PALETTE.bgCard, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#262933' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  category: { color: PALETTE.accentFluo, fontSize: 10, fontWeight: '800' },
  date: { color: PALETTE.textSecondary, fontSize: 12 },
  cardText: { color: PALETTE.textPrimary, fontSize: 14, lineHeight: 20 },
});