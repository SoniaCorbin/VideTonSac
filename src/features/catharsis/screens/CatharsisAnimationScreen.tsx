import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';

type AnimationType = 'FIRE' | 'WATER' | 'PARTICLES' | 'ERASE';

interface CatharsisAnimationScreenProps {
  complaintText: string;
  category: string;
  onComplete: (action: 'archive' | 'delete' | 'publish') => void;
}

export const CatharsisAnimationScreen: React.FC<CatharsisAnimationScreenProps> = ({
  complaintText = "Mon boss m'a encore envoyé un courriel à 17h...",
  category = "Boulot",
  onComplete,
}) => {
  const [selectedAnim, setSelectedAnim] = useState<AnimationType>('FIRE');
  const [isAnimating, setIsAnimating] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

  const handleStartRelease = () => {
    setIsAnimating(true);

    // Animation de disparition du texte (Fade out)
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // Transition vers l'étape finale (Lâcher prise)
      if (onComplete) {
        onComplete('publish');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0E11" />
      <View style={styles.content}>

        {/* Header Étape 2 & 3 */}
        <View style={styles.header}>
          <Text style={styles.stepTitle}>Étape 2 & 3 / 4</Text>
          <Text style={styles.mainTitle}>
            {isAnimating ? 'Libération en cours... 🎆' : 'On te voit 👁️'}
          </Text>
        </View>

        {/* Étape 2 : Validation Communautaire */}
        {!isAnimating && (
          <View style={styles.validationCard}>
            <Text style={styles.validationBadge}>847 PERSONNES</Text>
            <Text style={styles.validationText}>
              ont vécu exactement la même galère dans la catégorie <Text style={styles.highlightText}>{category}</Text> aujourd'hui. T'es pas seul(e) !
            </Text>
          </View>
        )}

        {/* Zone de Texte en cours de catharsis */}
        <View style={styles.previewCard}>
          <Animated.Text style={[styles.previewText, { opacity: fadeAnim }]}>
            "{complaintText}"
          </Animated.Text>
        </View>

        {/* Étape 3 : Choix du Mode de Destruction/Animation */}
        {!isAnimating && (
          <>
            <Text style={styles.sectionLabel}>CHOISIS TON MODE DE LIBÉRATION</Text>
            <View style={styles.animSelectorContainer}>

              <TouchableOpacity
                style={[styles.animOption, selectedAnim === 'FIRE' && styles.activeAnimOption]}
                onPress={() => setSelectedAnim('FIRE')}
              >
                <Text style={styles.animEmoji}>🔥</Text>
                <Text style={styles.animLabel}>Brûler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.animOption, selectedAnim === 'WATER' && styles.activeAnimOption]}
                onPress={() => setSelectedAnim('WATER')}
              >
                <Text style={styles.animEmoji}>🌊</Text>
                <Text style={styles.animLabel}>Noyer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.animOption, selectedAnim === 'PARTICLES' && styles.activeAnimOption]}
                onPress={() => setSelectedAnim('PARTICLES')}
              >
                <Text style={styles.animEmoji}>✨</Text>
                <Text style={styles.animLabel}>Envol</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.animOption, selectedAnim === 'ERASE' && styles.activeAnimOption]}
                onPress={() => setSelectedAnim('ERASE')}
              >
                <Text style={styles.animEmoji}>🧹</Text>
                <Text style={styles.animLabel}>Effacer</Text>
              </TouchableOpacity>

            </View>

            {/* Bouton de Déclenchement */}
            <TouchableOpacity style={styles.releaseButton} onPress={handleStartRelease}>
              <Text style={styles.releaseButtonText}>LIBÉRER CE SAC ➔</Text>
            </TouchableOpacity>
          </>
        )}

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
  validationCard: {
    backgroundColor: PALETTE.bgCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#262933',
  },
  validationBadge: {
    color: PALETTE.accentFluo,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  validationText: {
    color: PALETTE.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  highlightText: {
    color: PALETTE.accentFluo,
    fontWeight: 'bold',
  },
  previewCard: {
    backgroundColor: PALETTE.bgCard,
    borderRadius: 12,
    padding: 20,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262933',
    marginVertical: 15,
  },
  previewText: {
    color: PALETTE.textPrimary,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  sectionLabel: {
    color: PALETTE.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  animSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  animOption: {
    backgroundColor: PALETTE.bgChip,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    width: '23%',
    borderWidth: 1,
    borderColor: '#262933',
  },
  activeAnimOption: {
    borderColor: PALETTE.accentFluo,
    backgroundColor: '#1C2210',
  },
  animEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  animLabel: {
    color: PALETTE.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  releaseButton: {
    backgroundColor: PALETTE.accentFluo,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  releaseButtonText: {
    color: PALETTE.textDark,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
});