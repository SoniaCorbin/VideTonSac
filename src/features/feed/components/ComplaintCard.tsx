import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export interface Complaint {
  id: string;
  category: string;
  intensityEmoji: string;
  intensityLabel: string;
  content: string;
  aiTitle?: string;
  timeAgo: string;
  supportCount: number;
}

interface ComplaintCardProps {
  complaint: Complaint;
  onPressSupport?: () => void;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({
  complaint,
  onPressSupport,
}) => {
  const [hasSupported, setHasSupported] = useState(false);
  const [supportCount, setSupportCount] = useState(complaint.supportCount);

  const handleSupportToggle = () => {
    if (hasSupported) {
      setSupportCount((prev) => prev - 1);
      setHasSupported(false);
    } else {
      setSupportCount((prev) => prev + 1);
      setHasSupported(true);
    }
    if (onPressSupport) onPressSupport();
  };

  return (
    <View style={styles.card}>

      {/* En-tête : Catégorie + Intensité & Temps */}
      <View style={styles.cardHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{complaint.category.toUpperCase()}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.intensityEmoji}>{complaint.intensityEmoji}</Text>
          <Text style={styles.timeAgoText}>{complaint.timeAgo}</Text>
        </View>
      </View>

      {/* Titre Dramatique par l'IA (si disponible) */}
      {complaint.aiTitle && (
        <Text style={styles.aiTitle}>"{complaint.aiTitle}"</Text>
      )}

      {/* Contenu / Texte de la plainte */}
      <Text style={styles.contentText}>{complaint.content}</Text>

      {/* Pied de carte : Actions & Soutien Communautaire */}
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[
            styles.supportButton,
            hasSupported && styles.supportButtonActive,
          ]}
          onPress={handleSupportToggle}
        >
          <Text style={styles.supportEmoji}>🤝</Text>
          <Text
            style={[
              styles.supportButtonText,
              hasSupported && styles.supportButtonTextActive,
            ]}
          >
            {hasSupported ? 'Soutenu' : 'Je comprends'} • {supportCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reactionButton}>
          <Text style={styles.reactionEmoji}>🔥</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reactionButton}>
          <Text style={styles.reactionEmoji}>☕</Text>
        </TouchableOpacity>
      </View>

    </View>
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
  card: {
    backgroundColor: PALETTE.bgCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#262933',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: PALETTE.bgChip,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#262933',
  },
  categoryText: {
    color: PALETTE.accentFluo,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  intensityEmoji: {
    fontSize: 16,
  },
  timeAgoText: {
    color: PALETTE.textSecondary,
    fontSize: 12,
  },
  aiTitle: {
    color: PALETTE.accentFluo,
    fontSize: 15,
    fontWeight: '800',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  contentText: {
    color: PALETTE.textPrimary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#20232D',
    paddingTop: 12,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.bgChip,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#262933',
    flex: 1,
  },
  supportButtonActive: {
    backgroundColor: '#1C2210',
    borderColor: PALETTE.accentFluo,
  },
  supportEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  supportButtonText: {
    color: PALETTE.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  supportButtonTextActive: {
    color: PALETTE.accentFluo,
  },
  reactionButton: {
    backgroundColor: PALETTE.bgChip,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#262933',
  },
  reactionEmoji: {
    fontSize: 14,
  },
});