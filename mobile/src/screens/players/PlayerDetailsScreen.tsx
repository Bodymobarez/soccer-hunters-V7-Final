import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Share } from 'react-native';
import { Text, Button, Chip, Divider, IconButton, Card, Avatar, ActivityIndicator, useTheme } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useLanguage } from '@/contexts/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '@/api/authApi';

const { width } = Dimensions.get('window');

interface PlayerStats {
  goals?: number;
  assists?: number;
  matches?: number;
  yellowCards?: number;
  redCards?: number;
  minutesPlayed?: number;
  position?: string;
  height?: string;
  weight?: string;
  age?: number;
  foot?: 'left' | 'right' | 'both';
  nationality?: string;
  currentTeam?: string;
}

interface PlayerMedia {
  id: number;
  type: 'image' | 'video' | 'document';
  url: string;
  title?: string;
  fileType?: string;
  thumbnailUrl?: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating?: number;
  avatarUrl?: string;
  date?: string;
}

const PlayerDetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const theme = useTheme();
  const { t, isRTL } = useLanguage();
  
  const playerId = route.params?.playerId;
  
  const [player, setPlayer] = useState<any>(null);
  const [stats, setStats] = useState<PlayerStats>({});
  const [media, setMedia] = useState<PlayerMedia[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  
  useEffect(() => {
    const fetchPlayerDetails = async () => {
      if (!playerId) return;
      
      try {
        setLoading(true);
        setError('');
        
        // جلب بيانات اللاعب
        const playerRes = await api.get(`/players/${playerId}`);
        setPlayer(playerRes.data);
        
        // جلب الإحصائيات
        const statsRes = await api.get(`/players/${playerId}/stats`);
        setStats(statsRes.data);
        
        // جلب الوسائط
        const mediaRes = await api.get(`/players/${playerId}/media`);
        setMedia(mediaRes.data);
        
        // جلب الشهادات
        const testimonialsRes = await api.get(`/players/${playerId}/testimonials`);
        setTestimonials(testimonialsRes.data);
        
      } catch (err) {
        console.error('Error fetching player details:', err);
        setError(t('networkError') || 'خطأ في الشبكة');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlayerDetails();
  }, [playerId]);
  
  const handleShare = async () => {
    if (!player) return;
    
    try {
      await Share.share({
        message: `${t('checkOutPlayer')}: ${player.name} ${player.position ? `- ${player.position}` : ''} | Soccer Hunter`,
        url: `https://soccerhunter.com/players/${playerId}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };
  
  const handleContact = () => {
    // الانتقال إلى شاشة المحادثة أو بدء محادثة جديدة
    navigation.navigate('Chat', { recipientId: playerId, recipientName: player?.name });
  };
  
  const handleVideoCall = () => {
    // بدء مكالمة فيديو أو جدولة مكالمة
    navigation.navigate('ScheduleCall', { recipientId: playerId, recipientName: player?.name });
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
        <Button mode="contained" onPress={() => navigation.goBack()}>
          {t('goBack')}
        </Button>
      </View>
    );
  }
  
  if (!player) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.error, marginBottom: 20 }}>
          {t('playerNotFound') || 'لم يتم العثور على اللاعب'}
        </Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>
          {t('goBack')}
        </Button>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        {/* قسم الصورة الرئيسية */}
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: player.imageUrl }} 
            style={styles.heroImage} 
            resizeMode="cover"
          />
          
          <View style={[styles.profileInfo, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.nameContainer}>
              <View>
                <Text style={[styles.playerName, { color: theme.colors.text }]}>
                  {player.name}
                </Text>
                {player.position && (
                  <Chip style={styles.positionChip} textStyle={{ color: theme.colors.primary }}>
                    {player.position}
                  </Chip>
                )}
              </View>
              
              {player.rating && (
                <View style={styles.ratingContainer}>
                  <Text style={[styles.ratingText, { color: theme.colors.primary }]}>
                    {player.rating}
                  </Text>
                  <Icon name="star" size={16} color={theme.colors.primary} />
                </View>
              )}
            </View>
            
            {player.status && (
              <View style={[styles.statusBadge, { backgroundColor: player.status === 'available' ? '#4CAF50' : '#FF9800' }]}>
                <Text style={styles.statusText}>
                  {player.status === 'available' ? t('available') : t('contracted')}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        {/* أزرار الإجراءات */}
        <View style={styles.actionsContainer}>
          <Button 
            mode="contained" 
            icon="message-text"
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleContact}
          >
            {t('contact')}
          </Button>
          
          <Button 
            mode="contained" 
            icon="video"
            style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
            onPress={handleVideoCall}
          >
            {t('videoCall')}
          </Button>
          
          <IconButton 
            icon="share-variant" 
            size={24}
            style={styles.shareButton}
            iconColor={theme.colors.primary}
            onPress={handleShare}
          />
        </View>
        
        {/* علامات تبويب المحتوى */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'profile' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab('profile')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'profile' ? theme.colors.primary : theme.colors.text }]}>
              {t('profile')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'stats' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab('stats')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'stats' ? theme.colors.primary : theme.colors.text }]}>
              {t('stats')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'media' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab('media')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'media' ? theme.colors.primary : theme.colors.text }]}>
              {t('media')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'reviews' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'reviews' ? theme.colors.primary : theme.colors.text }]}>
              {t('reviews')}
            </Text>
          </TouchableOpacity>
        </View>
        
        <Divider />
        
        {/* محتوى علامة التبويب النشطة */}
        <View style={styles.tabContent}>
          {activeTab === 'profile' && (
            <View>
              {/* المعلومات الشخصية */}
              <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                <Card.Title title={t('personalInfo')} />
                <Card.Content>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>{t('age')}:</Text>
                    <Text>{stats.age || '-'}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>{t('height')}:</Text>
                    <Text>{stats.height || '-'}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>{t('weight')}:</Text>
                    <Text>{stats.weight || '-'}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>{t('foot')}:</Text>
                    <Text>{stats.foot ? t(stats.foot) : '-'}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>{t('nationality')}:</Text>
                    <Text>{stats.nationality || '-'}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>{t('currentTeam')}:</Text>
                    <Text>{stats.currentTeam || '-'}</Text>
                  </View>
                </Card.Content>
              </Card>
              
              {/* الوصف */}
              <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                <Card.Title title={t('about')} />
                <Card.Content>
                  <Text style={{ lineHeight: 22 }}>{player.description || t('noDescriptionAvailable')}</Text>
                </Card.Content>
              </Card>
            </View>
          )}
          
          {activeTab === 'stats' && (
            <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
              <Card.Title title={t('playerStats')} />
              <Card.Content>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <View style={[styles.statCircle, { borderColor: theme.colors.primary }]}>
                      <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                        {stats.matches || '0'}
                      </Text>
                    </View>
                    <Text style={styles.statLabel}>{t('matches')}</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <View style={[styles.statCircle, { borderColor: theme.colors.primary }]}>
                      <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                        {stats.goals || '0'}
                      </Text>
                    </View>
                    <Text style={styles.statLabel}>{t('goals')}</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <View style={[styles.statCircle, { borderColor: theme.colors.primary }]}>
                      <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                        {stats.assists || '0'}
                      </Text>
                    </View>
                    <Text style={styles.statLabel}>{t('assists')}</Text>
                  </View>
                </View>
                
                <Divider style={styles.divider} />
                
                <View style={styles.moreStatsContainer}>
                  <View style={styles.statRow}>
                    <Text style={styles.statRowLabel}>{t('minutesPlayed')}:</Text>
                    <Text style={styles.statRowValue}>{stats.minutesPlayed || '0'}</Text>
                  </View>
                  
                  <View style={styles.statRow}>
                    <Text style={styles.statRowLabel}>{t('yellowCards')}:</Text>
                    <Text style={styles.statRowValue}>{stats.yellowCards || '0'}</Text>
                  </View>
                  
                  <View style={styles.statRow}>
                    <Text style={styles.statRowLabel}>{t('redCards')}:</Text>
                    <Text style={styles.statRowValue}>{stats.redCards || '0'}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          )}
          
          {activeTab === 'media' && (
            <View>
              {media.length > 0 ? (
                media.map((item) => (
                  <Card key={item.id} style={[styles.mediaCard, { backgroundColor: theme.colors.surface }]}>
                    {item.type === 'image' ? (
                      <Card.Cover source={{ uri: item.url }} />
                    ) : item.type === 'video' ? (
                      <TouchableOpacity 
                        style={styles.videoContainer}
                        onPress={() => {
                          // تشغيل الفيديو
                        }}
                      >
                        <Image 
                          source={{ uri: item.thumbnailUrl || item.url }} 
                          style={styles.videoThumbnail} 
                        />
                        <View style={styles.playButton}>
                          <Icon name="play" size={30} color="white" />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity 
                        style={styles.documentContainer}
                        onPress={() => {
                          // فتح المستند
                        }}
                      >
                        <Icon name="file-document" size={40} color={theme.colors.primary} />
                        <Text style={{ marginTop: 8 }}>{item.title || item.fileType}</Text>
                      </TouchableOpacity>
                    )}
                    
                    {item.title && (
                      <Card.Title 
                        title={item.title} 
                        right={(props) => (
                          <IconButton 
                            {...props} 
                            icon="download" 
                            onPress={() => {
                              // تنزيل الملف
                            }} 
                          />
                        )}
                      />
                    )}
                  </Card>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Icon name="image-off" size={50} color={theme.colors.surfaceVariant} />
                  <Text style={{ marginTop: 10, color: theme.colors.text }}>
                    {t('noMediaAvailable') || 'لا توجد وسائط متاحة'}
                  </Text>
                </View>
              )}
            </View>
          )}
          
          {activeTab === 'reviews' && (
            <View>
              {testimonials.length > 0 ? (
                testimonials.map((testimonial) => (
                  <Card key={testimonial.id} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                    <Card.Content>
                      <View style={styles.testimonialHeader}>
                        <View style={styles.testimonialAuthor}>
                          <Avatar.Image 
                            size={40} 
                            source={{ uri: testimonial.avatarUrl || 'https://ui-avatars.com/api/?name=' + testimonial.name }}
                          />
                          <View style={styles.authorInfo}>
                            <Text style={{ fontWeight: 'bold' }}>{testimonial.name}</Text>
                            <Text style={{ fontSize: 12, color: theme.colors.outline }}>{testimonial.role}</Text>
                          </View>
                        </View>
                        
                        {testimonial.rating && (
                          <View style={styles.testimonialRating}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Icon 
                                key={star} 
                                name={star <= testimonial.rating! ? "star" : "star-outline"} 
                                size={16} 
                                color={star <= testimonial.rating! ? theme.colors.primary : theme.colors.outline} 
                                style={{ marginLeft: 2 }}
                              />
                            ))}
                          </View>
                        )}
                      </View>
                      
                      <Text style={styles.testimonialContent}>
                        "{testimonial.content}"
                      </Text>
                      
                      {testimonial.date && (
                        <Text style={styles.testimonialDate}>
                          {testimonial.date}
                        </Text>
                      )}
                    </Card.Content>
                  </Card>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Icon name="comment-off" size={50} color={theme.colors.surfaceVariant} />
                  <Text style={{ marginTop: 10, color: theme.colors.text }}>
                    {t('noReviewsAvailable') || 'لا توجد مراجعات متاحة'}
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
  heroSection: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 250,
  },
  profileInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  positionChip: {
    alignSelf: 'flex-start',
    height: 26,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontWeight: 'bold',
    marginRight: 2,
  },
  statusBadge: {
    position: 'absolute',
    top: -15,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  shareButton: {
    marginLeft: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
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
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  infoLabel: {
    fontWeight: '500',
  },
  divider: {
    marginVertical: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
  },
  moreStatsContainer: {
    marginTop: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  statRowLabel: {
    fontWeight: '500',
  },
  statRowValue: {
    fontWeight: 'bold',
  },
  mediaCard: {
    marginBottom: 15,
  },
  videoContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyState: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testimonialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorInfo: {
    marginLeft: 10,
  },
  testimonialRating: {
    flexDirection: 'row',
  },
  testimonialContent: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  testimonialDate: {
    fontSize: 12,
    textAlign: 'right',
    opacity: 0.7,
  },
});

export default PlayerDetailsScreen;