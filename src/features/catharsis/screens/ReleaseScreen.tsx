import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

interface ReleaseScreenProps {
  complaintText: string;
  onFinishFlow: () => void;
}

export const ReleaseScreen: React.FC<ReleaseScreenProps> = ({
  complaintText = "Mon boss m'a encore envoyé un courriel à 17h un vendredi...",
  onFinishFlow,
}) => {
  const [movieTitle, setMovieTitle] = useState<string | null>(null);
  const [isLoadingTitle, setIsLoadingTitle] = useState<boolean>(true);

  // Simulation de l'appel API OpenAI pour la génération du Titre de Film
  useEffect(() => {
    const generateAiTitle = async () => {
      setIsLoadingTitle(true);
      // Simule un délai réseau pour le call IA
      setTimeout(() => {
        const mockTitles = [
          "Le Train de 17h00 : Saga Inutile",
          "La Vengeance du Photocopieur",
          "Courriel Fatale : L'Heure Suprême",
          "Vendredi Noir au Bureau",
        ];
        const randomTitle = mockTitles[Math.floor(Math.random() * mockTitles.length)];
        setMovieTitle(randomTitle);
        setIsLoadingTitle(false);
      }, 1500);
    };

    generateAiTitle();
  }, [complaintText]);

  const handleAction = (type: 'ARCHIVE' | 'DELETE' | 'PUBLISH') => {
    if (type === 'DELETE') {
      alert('Plainte détruite à jamais. Tu es plus léger(ère) !');
    } else if (type === 'ARCHIVE') {
      alert('Plainte sauvegardée dans ton Journal Privé.');
    } else {
      alert('Plainte partagée avec la communauté !');
    }

    if (onFinishFlow) {
      onFinishFlow();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0E11" />
      <View style={styles.content}>

        {/* Header Étape 4 */}
        <View style={styles.header}>
          <Text style={styles.stepTitle}>Étape 4/4</Text>
          <Text style={styles.mainTitle}>Tu peux lâcher prise 🌿</Text>
        </View>

        {/* Transformation par l'IA */}
        <View style={styles.aiCard}>
          <Text style={styles.aiBadge}>🤖 TITRE DE FILM PAR L'IA</Text>

          {isLoadingTitle ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#CCFF00" size="small" />
              <Text style={styles.loadingText}>L'IA prépare ton titre dramatique...</Text>
            </View>
          ) : (
            <Text style={styles.movieTitle}>"{movieTitle}"</Text>
          )}
        </View>

        {/* 3 Options de Lâcher Prise */}
        <Text style={styles.sectionLabel}>QUE VEUX-TU FAIRE DE CETTE FRUSTRATION ?</Text>

        <View style={styles.optionsContainer}>

          {/* Option 1 : Transformer & Publier */}
          <TouchableOpacity
            style={[styles.actionCard, styles.publishCard]}
            onPress={() => handleAction('PUBLISH')}
          >
            <Text style={styles.actionEmoji}>🌐</Text>
            <View style={styles.actionTextContainer}>
              <Text style={styles.publishTitle}>Partager avec la communauté</Text>
              <Text style={styles.actionDescription}>
                Transforme ton sac vidé en rire collectif et reçois du soutien.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Option 2 : Journal Privé */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => handleAction('ARCHIVE')}
          >
            <Text style={styles.actionEmoji}>🔒</Text>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Garder dans mon Journal Privé</Text>
              <Text style={styles.actionDescription}>
                Reste uniquement sur ton téléphone, 100% confidentiel.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Option 3 : Supprimer Définitivement */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => handleAction('DELETE')}
          >
            <Text style={styles.actionEmoji}>🔥</Text>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Détruire définitivement</Text>
              <Text style={styles.actionDescription}>
                Efface tout sans laisser de trace. C'est du passé.
              </Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>
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
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 10,
  },
  stepTitle: {
    color: PALETTE.accentFluo,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  mainTitle: {
    color: PALETTE.textPrimary,
    fontSize: 30,
    fontWeight: '900',
    marginTop: 4,
  },
  aiCard: {
    backgroundColor: PALETTE.bgCard,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#262933',
    alignItems: 'center',
    marginVertical: 15,
  },
  aiBadge: {
    color: PALETTE.accentFluo,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  loadingText: {
    color: PALETTE.textSecondary,
    fontSize: 14,
    marginLeft: 10,
  },
  movieTitle: {
    color: PALETTE.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  sectionLabel: {
    color: PALETTE.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 10,
  },
  actionCard: {
    backgroundColor: PALETTE.bgCard,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262933',
  },
  publishCard: {
    borderColor: PALETTE.accentFluo,
    backgroundColor: '#161B12',
  },
  actionEmoji: {
    fontSize: 28,
    marginRight: 14,
  },
  actionTextContainer: {
    flex: 1,
  },
  publishTitle: {
    color: PALETTE.accentFluo,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2,
  },
  actionTitle: {
    color: PALETTE.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  actionDescription: {
    color: PALETTE.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
});