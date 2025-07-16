import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { Text, Button, Card, Chip, Avatar, Divider, Appbar, ActivityIndicator, useTheme } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useLanguage } from '@/contexts/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '@/api/authApi';

interface ClubDetails {
  id: number;
  name: string;
  logo: string;
  coverImage?: string;
  foundedYear?: number;
  stadium?: string;
  location?: string;
  website?: string;
  email?: string;
  phone?: string;
  bio?: string;
  achievements?: string[];
  socialLinks?: Record<string, string>;
}

interface ClubPlayer {
  id: number;
  name: string;
  position: string;
  imageUrl: string;
  nationality?: string;
  jerseyNumber?: number;
}

const ClubDetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const { t, isRTL } = useLanguage();
  
  const clubId = route.params?.clubId;
  
  const [club, setClub] = useState<ClubDetails | null>(null);
  const [players, setPlayers] = useState<ClubPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info');
  
  useEffect(() => {
    fetchClubDetails();
  }, [clubId]);
  
  const fetchClubDetails = async () => {
    if (!clubId) return;
    
    try {
      setLoading(true);
      setError('');
      
      // جلب بيانات النادي
      const clubRes = await api.get(`/clubs/${clubId}`);
      setClub(clubRes.data);
      
      // جلب قائمة اللاعبين
      const playersRes = await api.get(`/clubs/${clubId}/players`);
      setPlayers(playersRes.data);
      
    } catch (err) {
      console.error('Error fetching club details:', err);
      setError(t('networkError') || 'خطأ في الشبكة');
    } finally {
      setLoading(false);
    }
  };
  
  const handleWebsitePress = () => {
    if (club?.website) {
      Linking.openURL(club.website);
    }
  };
  
  const handleEmailPress = () => {
    if (club?.email) {
      Linking.openURL(`mailto:${club.email}`);
    }
  };
  
  const handlePhonePress = () => {
    if (club?.phone) {
      Linking.openURL(`tel:${club.phone}`);
    }
  };
  
  const handlePlayerPress = (playerId: number) => {
    navigation.navigate('PlayerDetails', { playerId });
  };
  
  const handleSocialPress = (url: string) => {
    Linking.openURL(url);
  };
  
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.error, marginBottom: 20 }}>{error}</Text>
        <Button mode="contained" onPress={fetchClubDetails}>
          {t('tryAgain')}
        </Button>
      </View>
    );
  }
  
  if (!club) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.error, marginBottom: 20 }}>
          {t('clubNotFound') || 'لم يتم العثور على النادي'}
        </Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>
          {t('goBack')}
        </Button>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title={club.name} color="white" />
        <Appbar.Action icon="share" onPress={() => {}} color="white" />
      </Appbar.Header>
      
      <ScrollView>
        {/* صورة الغلاف والشعار */}
        <View style={styles.headerSection}>
          <Image 
            source={{ uri: club.coverImage || 'https://via.placeholder.com/1000x300' }} 
            style={styles.coverImage}
            resizeMode="cover"
          />
          
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: club.logo }} 
              style={styles.logo} 
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.clubInfo}>
            <Text style={[styles.clubName, { color: theme.colors.text }]}>{club.name}</Text>
            {club.foundedYear && (
              <Chip style={styles.foundedChip} textStyle={{ color: theme.colors.primary }}>
                {t('foundedIn') || 'تأسس عام'} {club.foundedYear}
              </Chip>
            )}
            {club.location && (
              <Text style={[styles.location, { color: theme.colors.outline }]}>
                <Icon name="map-marker" size={16} /> {club.location}
              </Text>
            )}
          </View>
        </View>
        
        {/* تبويبات */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'info' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab('info')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'info' ? theme.colors.primary : theme.colors.text }]}>
              {t('info')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'players' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab('players')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'players' ? theme.colors.primary : theme.colors.text }]}>
              {t('players')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'achievements' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab('achievements')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'achievements' ? theme.colors.primary : theme.colors.text }]}>
              {t('achievements')}
            </Text>
          </TouchableOpacity>
        </View>
        
        <Divider />
        
        {/* محتوى التبويب */}
        <View style={styles.tabContent}>
          {activeTab === 'info' && (
            <View>
              {/* نبذة عن النادي */}
              {club.bio && (
                <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                  <Card.Content>
                    <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                      {t('about')}
                    </Text>
                    <Text style={{ lineHeight: 22, color: theme.colors.text }}>
                      {club.bio}
                    </Text>
                  </Card.Content>
                </Card>
              )}
              
              {/* معلومات التواصل */}
              <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                <Card.Content>
                  <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                    {t('contactInfo')}
                  </Text>
                  
                  {club.stadium && (
                    <View style={styles.contactItem}>
                      <Icon name="stadium" size={20} color={theme.colors.primary} />
                      <Text style={[styles.contactText, { color: theme.colors.text }]}>
                        {club.stadium}
                      </Text>
                    </View>
                  )}
                  
                  {club.website && (
                    <TouchableOpacity style={styles.contactItem} onPress={handleWebsitePress}>
                      <Icon name="web" size={20} color={theme.colors.primary} />
                      <Text style={[styles.contactText, { color: theme.colors.primary }]}>
                        {club.website}
                      </Text>
                    </TouchableOpacity>
                  )}
                  
                  {club.email && (
                    <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
                      <Icon name="email" size={20} color={theme.colors.primary} />
                      <Text style={[styles.contactText, { color: theme.colors.primary }]}>
                        {club.email}
                      </Text>
                    </TouchableOpacity>
                  )}
                  
                  {club.phone && (
                    <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
                      <Icon name="phone" size={20} color={theme.colors.primary} />
                      <Text style={[styles.contactText, { color: theme.colors.primary }]}>
                        {club.phone}
                      </Text>
                    </TouchableOpacity>
                  )}
                </Card.Content>
              </Card>
              
              {/* وسائل التواصل الاجتماعي */}
              {club.socialLinks && Object.keys(club.socialLinks).length > 0 && (
                <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                  <Card.Content>
                    <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                      {t('socialMedia')}
                    </Text>
                    
                    <View style={styles.socialLinks}>
                      {Object.entries(club.socialLinks).map(([platform, url]) => {
                        let iconName = 'link';
                        switch (platform.toLowerCase()) {
                          case 'facebook': iconName = 'facebook'; break;
                          case 'twitter': iconName = 'twitter'; break;
                          case 'instagram': iconName = 'instagram'; break;
                          case 'youtube': iconName = 'youtube'; break;
                          case 'linkedin': iconName = 'linkedin'; break;
                        }
                        
                        return (
                          <TouchableOpacity 
                            key={platform}
                            style={styles.socialButton}
                            onPress={() => handleSocialPress(url)}
                          >
                            <Icon name={iconName} size={24} color="white" />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </Card.Content>
                </Card>
              )}
            </View>
          )}
          
          {activeTab === 'players' && (
            <View>
              {players.length > 0 ? (
                players.map((player) => (
                  <TouchableOpacity key={player.id} onPress={() => handlePlayerPress(player.id)}>
                    <Card style={[styles.playerCard, { backgroundColor: theme.colors.surface }]}>
                      <Card.Content style={styles.playerCardContent}>
                        <Avatar.Image 
                          source={{ uri: player.imageUrl }} 
                          size={60} 
                        />
                        
                        <View style={styles.playerInfo}>
                          <Text style={[styles.playerName, { color: theme.colors.text }]}>
                            {player.jerseyNumber && <Text style={{ color: theme.colors.primary }}>{player.jerseyNumber}</Text>} {player.name}
                          </Text>
                          
                          <View style={styles.playerDetails}>
                            <Chip 
                              style={styles.positionChip} 
                              textStyle={{ fontSize: 12, color: theme.colors.primary }}
                            >
                              {player.position}
                            </Chip>
                            
                            {player.nationality && (
                              <Text style={{ color: theme.colors.outline, fontSize: 13 }}>
                                <Icon name="flag" size={13} color={theme.colors.outline} /> {player.nationality}
                              </Text>
                            )}
                          </View>
                        </View>
                        
                        <Icon name="chevron-right" size={24} color={theme.colors.outline} />
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Icon name="account-group" size={50} color={theme.colors.surfaceVariant} />
                  <Text style={{ color: theme.colors.text, marginTop: 10, textAlign: 'center' }}>
                    {t('noPlayersFound') || 'لم يتم العثور على لاعبين'}
                  </Text>
                </View>
              )}
            </View>
          )}
          
          {activeTab === 'achievements' && (
            <View>
              {club.achievements && club.achievements.length > 0 ? (
                <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                  <Card.Content>
                    <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                      {t('clubAchievements')}
                    </Text>
                    
                    {club.achievements.map((achievement, index) => (
                      <View key={index} style={styles.achievementItem}>
                        <Icon name="trophy" size={20} color={theme.colors.primary} style={styles.trophyIcon} />
                        <Text style={{ color: theme.colors.text }}>{achievement}</Text>
                      </View>
                    ))}
                  </Card.Content>
                </Card>
              ) : (
                <View style={styles.emptyState}>
                  <Icon name="trophy" size={50} color={theme.colors.surfaceVariant} />
                  <Text style={{ color: theme.colors.text, marginTop: 10, textAlign: 'center' }}>
                    {t('noAchievements') || 'لم يتم العثور على إنجازات'}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerSection: {
    position: 'relative',
    paddingBottom: 15,
  },
  coverImage: {
    width: '100%',
    height: 180,
  },
  logoContainer: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  clubInfo: {
    marginLeft: 120,
    paddingRight: 20,
    paddingTop: 10,
  },
  clubName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  foundedChip: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontWeight: '500',
  },
  tabContent: {
    padding: 15,
  },
  card: {
    marginBottom: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    marginLeft: 10,
  },
  socialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  socialButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    marginRight: 10,
    marginBottom: 10,
  },
  playerCard: {
    marginBottom: 10,
  },
  playerCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  playerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  positionChip: {
    height: 24,
    marginRight: 10,
  },
  emptyState: {
    padding: 30,
    alignItems: 'center',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  trophyIcon: {
    marginRight: 10,
  },
});

export default ClubDetailsScreen;