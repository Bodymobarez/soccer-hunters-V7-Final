import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Searchbar, Title, Card, Paragraph, Chip, Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { useLanguage } from '@/contexts/LanguageContext';
import api from '@/api/authApi';

interface SearchResult {
  id: number;
  name: string;
  type: 'player' | 'coach' | 'club' | 'agent' | 'doctor';
  position?: string;
  description: string;
  imageUrl: string;
  rating?: number;
}

const SearchScreen = () => {
  const { t, isRTL } = useLanguage();
  const theme = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [error, setError] = useState('');

  const filters = [
    { id: 'player', label: t('players') },
    { id: 'coach', label: t('coaches') },
    { id: 'club', label: t('clubs') },
    { id: 'agent', label: t('agents') },
    { id: 'doctor', label: t('doctors') },
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const queryParam = `q=${searchQuery}${activeFilter ? `&type=${activeFilter}` : ''}`;
      const response = await api.get(`/search?${queryParam}`);
      
      setSearchResults(response.data || []);
    } catch (err) {
      console.error('Search error:', err);
      setError(t('networkError') || 'خطأ في الشبكة');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (filterId: string) => {
    if (activeFilter === filterId) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterId);
    }
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={styles.resultCard}>
      <Card style={{ backgroundColor: theme.colors.surface }}>
        <Card.Cover source={{ uri: item.imageUrl }} style={styles.cardImage} />
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={[styles.cardTitle, { color: theme.colors.text }]}>{item.name}</Title>
            <Chip
              style={{ backgroundColor: theme.colors.primary + '20' }}
              textStyle={{ color: theme.colors.primary, fontWeight: '500' }}
            >
              {t(item.type)}
            </Chip>
          </View>
          
          {item.position && (
            <Text style={{ color: theme.colors.primary, marginBottom: 5 }}>
              {item.position}
            </Text>
          )}
          
          <Paragraph numberOfLines={3} style={{ color: theme.colors.text }}>
            {item.description}
          </Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder={t('search')}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}
          iconColor={theme.colors.primary}
          inputStyle={{ textAlign: isRTL ? 'right' : 'left' }}
        />
      </View>
      
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {filters.map((filter) => (
            <Chip
              key={filter.id}
              selected={activeFilter === filter.id}
              onPress={() => toggleFilter(filter.id)}
              style={[styles.filterChip, {
                backgroundColor: activeFilter === filter.id 
                  ? theme.colors.primary 
                  : theme.colors.surface
              }]}
              textStyle={{
                color: activeFilter === filter.id 
                  ? 'white' 
                  : theme.colors.text
              }}
            >
              {filter.label}
            </Chip>
          ))}
        </ScrollView>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <Text style={{ color: theme.colors.error, textAlign: 'center', margin: 20 }}>
            {error}
          </Text>
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.resultsContainer}
        />
      ) : searchQuery ? (
        <View style={styles.centerContent}>
          <Text style={{ color: theme.colors.text, textAlign: 'center', margin: 20 }}>
            {t('noResultsFound') || 'لا توجد نتائج مطابقة'}
          </Text>
        </View>
      ) : (
        <View style={styles.centerContent}>
          <Text style={{ color: theme.colors.text, textAlign: 'center', margin: 20 }}>
            {t('searchPrompt') || 'ابحث عن لاعبين، مدربين، أندية، أطباء أو وكلاء'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 15,
  },
  searchBar: {
    elevation: 3,
    borderRadius: 10,
  },
  filtersContainer: {
    paddingHorizontal: 10,
  },
  filters: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  filterChip: {
    marginHorizontal: 5,
    height: 36,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContainer: {
    padding: 10,
  },
  resultCard: {
    marginBottom: 15,
  },
  cardImage: {
    height: 200,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    flex: 1,
  },
});

export default SearchScreen;