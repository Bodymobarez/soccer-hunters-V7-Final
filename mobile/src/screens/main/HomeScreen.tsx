import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Card, Headline, Subheading, Title, Paragraph, Text, Button, ActivityIndicator, useTheme } from 'react-native-paper';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/api/authApi';

interface Service {
  id: number;
  name: string;
  position?: string;
  description: string;
  imageUrl: string;
  rating?: number;
  featured?: boolean;
}

const HomeScreen = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const theme = useTheme();
  
  const [featuredPlayers, setFeaturedPlayers] = useState<Service[]>([]);
  const [featuredCoaches, setFeaturedCoaches] = useState<Service[]>([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        
        // تحميل اللاعبين المميزين
        const playersResponse = await api.get('/services?type=player&featured=true');
        setFeaturedPlayers(playersResponse.data || []);
        
        // تحميل المدربين المميزين
        const coachesResponse = await api.get('/services?type=coach&featured=true');
        setFeaturedCoaches(coachesResponse.data || []);
        
        // تحميل الأخبار
        const newsResponse = await api.get('/news');
        setNews(newsResponse.data || []);
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError(t('networkError') || 'خطأ في الشبكة');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity style={styles.serviceCard}>
      <Card style={{ backgroundColor: theme.colors.surface }}>
        <Card.Cover source={{ uri: item.imageUrl }} style={styles.cardImage} />
        <Card.Content>
          <Title style={[styles.cardTitle, { color: theme.colors.text }]}>{item.name}</Title>
          {item.position && (
            <Subheading style={{ color: theme.colors.primary }}>{item.position}</Subheading>
          )}
          <Paragraph numberOfLines={2} style={{ color: theme.colors.text }}>
            {item.description}
          </Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 10, color: theme.colors.text }}>{t('loading')}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* قسم الترحيب */}
      <View style={styles.heroSection}>
        <Headline style={[styles.welcomeText, { color: theme.colors.primary }]}>
          {t('welcomeMessage')}
        </Headline>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          {user ? t('welcomeBackUser').replace('{name}', user.fullName || user.username) : t('searchForTalent')}
        </Text>
        
        <View style={styles.searchButtonContainer}>
          <Button 
            mode="contained" 
            icon="magnify"
            style={[styles.searchButton, { backgroundColor: theme.colors.primary }]}
            labelStyle={{ color: 'white' }}
          >
            {t('search')}
          </Button>
        </View>
      </View>

      {/* قسم اللاعبين المميزين */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Title style={{ color: theme.colors.text }}>{t('featuredPlayers')}</Title>
          <TouchableOpacity>
            <Text style={{ color: theme.colors.primary }}>{t('viewAll')}</Text>
          </TouchableOpacity>
        </View>
        
        {featuredPlayers.length > 0 ? (
          <FlatList
            data={featuredPlayers}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <Text style={{ padding: 10, textAlign: 'center', color: theme.colors.text }}>
            {error || 'لا يوجد لاعبين مميزين لعرضهم'}
          </Text>
        )}
      </View>

      {/* قسم المدربين المميزين */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Title style={{ color: theme.colors.text }}>{t('featuredCoaches')}</Title>
          <TouchableOpacity>
            <Text style={{ color: theme.colors.primary }}>{t('viewAll')}</Text>
          </TouchableOpacity>
        </View>
        
        {featuredCoaches.length > 0 ? (
          <FlatList
            data={featuredCoaches}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <Text style={{ padding: 10, textAlign: 'center', color: theme.colors.text }}>
            {error || 'لا يوجد مدربين مميزين لعرضهم'}
          </Text>
        )}
      </View>

      {/* قسم الأخبار */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Title style={{ color: theme.colors.text }}>{t('latestNews')}</Title>
          <TouchableOpacity>
            <Text style={{ color: theme.colors.primary }}>{t('viewAll')}</Text>
          </TouchableOpacity>
        </View>
        
        {news.length > 0 ? (
          <FlatList
            data={news}
            renderItem={({ item }: any) => (
              <TouchableOpacity style={styles.newsCard}>
                <Card style={{ backgroundColor: theme.colors.surface }}>
                  <Card.Cover source={{ uri: item.imageUrl }} style={styles.newsImage} />
                  <Card.Content>
                    <Title style={[styles.cardTitle, { color: theme.colors.text }]}>{item.title}</Title>
                    <Paragraph numberOfLines={2} style={{ color: theme.colors.text }}>
                      {item.summary}
                    </Paragraph>
                    <Text style={{ color: theme.colors.primary, marginTop: 5 }}>
                      {item.date}
                    </Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )}
            keyExtractor={(item: any) => item.id.toString()}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={styles.newsListContent}
          />
        ) : (
          <Text style={{ padding: 10, textAlign: 'center', color: theme.colors.text }}>
            {error || 'لا يوجد أخبار لعرضها'}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    padding: 20,
    paddingTop: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  searchButtonContainer: {
    width: '80%',
    marginVertical: 15,
  },
  searchButton: {
    borderRadius: 25,
    paddingVertical: 8,
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  listContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  serviceCard: {
    width: 260,
    marginRight: 15,
  },
  cardImage: {
    height: 150,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsListContent: {
    paddingVertical: 5,
  },
  newsCard: {
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  newsImage: {
    height: 180,
  },
});

export default HomeScreen;