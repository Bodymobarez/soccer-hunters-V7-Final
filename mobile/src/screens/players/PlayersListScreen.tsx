import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, RefreshControl, ScrollView } from 'react-native';
import { Searchbar, Card, Chip, Text, Button, ActivityIndicator, Divider, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '@/contexts/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '@/api/authApi';

interface PlayerItem {
  id: number;
  name: string;
  position?: string;
  imageUrl: string;
  team?: string;
  rating?: number;
  status?: 'available' | 'contracted';
  nationality?: string;
  age?: number;
}

const PlayersListScreen = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const { t, isRTL } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState<PlayerItem[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const positionFilters = [
    { id: 'all', label: t('allPositions') || 'كل المراكز' },
    { id: 'goalkeeper', label: t('goalkeepers') || 'حراس المرمى' },
    { id: 'defender', label: t('defenders') || 'مدافعين' },
    { id: 'midfielder', label: t('midfielders') || 'لاعبي وسط' },
    { id: 'forward', label: t('forwards') || 'مهاجمين' },
  ];
  
  useEffect(() => {
    fetchPlayers();
  }, []);
  
  const fetchPlayers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get('/players');
      setPlayers(response.data);
      setFilteredPlayers(response.data);
    } catch (err) {
      console.error('Error fetching players:', err);
      setError(t('networkError') || 'خطأ في الشبكة');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  const onRefresh = () => {
    setRefreshing(true);
    fetchPlayers();
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim() && !activeFilter) {
      setFilteredPlayers(players);
      return;
    }
    
    let filtered = players;
    
    // تطبيق تصفية المركز
    if (activeFilter && activeFilter !== 'all') {
      filtered = filtered.filter(player => 
        player.position?.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }
    
    // تطبيق تصفية البحث
    if (query.trim()) {
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(query.toLowerCase()) || 
        player.team?.toLowerCase().includes(query.toLowerCase()) ||
        player.nationality?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredPlayers(filtered);
  };
  
  const handleFilterChange = (filterId: string) => {
    const newActiveFilter = filterId === activeFilter || filterId === 'all' ? null : filterId;
    setActiveFilter(newActiveFilter);
    handleSearch(searchQuery); // إعادة تطبيق البحث مع التصفية الجديدة
  };
  
  const navigateToAdvancedSearch = () => {
    navigation.navigate('AdvancedSearch');
  };
  
  const navigateToPlayerDetail = (playerId: number) => {
    navigation.navigate('PlayerDetails', { playerId });
  };
  
  const renderPlayerItem = ({ item }: { item: PlayerItem }) => (
    <TouchableOpacity onPress={() => navigateToPlayerDetail(item.id)}>
      <Card style={[styles.playerCard, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.cardContent}>
          <Image source={{ uri: item.imageUrl }} style={styles.playerImage} />
          
          <View style={styles.playerInfo}>
            <Text style={[styles.playerName, { color: theme.colors.text }]}>{item.name}</Text>
            
            <View style={styles.detailsRow}>
              {item.position && (
                <Chip 
                  style={[styles.positionChip, { backgroundColor: theme.colors.primary + '20' }]}
                  textStyle={{ color: theme.colors.primary, fontSize: 12 }}
                >
                  {item.position}
                </Chip>
              )}
              
              {item.age && (
                <Text style={[styles.playerDetail, { color: theme.colors.text }]}>
                  {item.age} {t('yearsOld')}
                </Text>
              )}
            </View>
            
            {item.team && (
              <Text style={[styles.playerTeam, { color: theme.colors.outline }]}>
                <Icon name="shield" size={14} color={theme.colors.outline} /> {item.team}
              </Text>
            )}
            
            {item.nationality && (
              <Text style={[styles.playerDetail, { color: theme.colors.outline }]}>
                <Icon name="flag" size={14} color={theme.colors.outline} /> {item.nationality}
              </Text>
            )}
          </View>
          
          <View style={styles.statusContainer}>
            {item.status && (
              <View 
                style={[styles.statusIndicator, { 
                  backgroundColor: item.status === 'available' ? '#4CAF50' : '#FF9800'
                }]}
              />
            )}
            
            {item.rating && (
              <View style={styles.ratingContainer}>
                <Text style={[styles.ratingText, { color: theme.colors.primary }]}>
                  {item.rating}
                </Text>
                <Icon name="star" size={14} color={theme.colors.primary} />
              </View>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder={t('searchPlayers')}
          onChangeText={handleSearch}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}
          iconColor={theme.colors.primary}
          clearIcon="close-circle"
          inputStyle={{ textAlign: isRTL ? 'right' : 'left' }}
        />
        
        <Button 
          icon="tune-vertical" 
          mode="text" 
          onPress={navigateToAdvancedSearch}
          style={styles.advancedSearchButton}
          labelStyle={{ color: theme.colors.primary }}
        >
          {t('advancedSearch')}
        </Button>
      </View>
      
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {positionFilters.map((filter) => (
            <Chip
              key={filter.id}
              selected={activeFilter === filter.id}
              onPress={() => handleFilterChange(filter.id)}
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
      
      <Divider />
      
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ marginTop: 10, color: theme.colors.text }}>{t('loading')}</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={50} color={theme.colors.error} />
          <Text style={{ marginTop: 10, color: theme.colors.error, textAlign: 'center' }}>{error}</Text>
          <Button mode="contained" onPress={fetchPlayers} style={{ marginTop: 20 }}>
            {t('tryAgain')}
          </Button>
        </View>
      ) : filteredPlayers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="account-search" size={50} color={theme.colors.surfaceVariant} />
          <Text style={{ marginTop: 10, color: theme.colors.text, textAlign: 'center' }}>
            {t('noPlayersFound')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredPlayers}
          renderItem={renderPlayerItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
        />
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
    elevation: 2,
    borderRadius: 8,
  },
  advancedSearchButton: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  filtersContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filtersScroll: {
    paddingHorizontal: 5,
  },
  filterChip: {
    marginHorizontal: 4,
    marginVertical: 5,
  },
  listContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  playerCard: {
    marginBottom: 10,
    elevation: 2,
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 10,
  },
  playerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  positionChip: {
    height: 24,
    marginRight: 10,
  },
  playerTeam: {
    fontSize: 13,
    marginBottom: 2,
  },
  playerDetail: {
    fontSize: 13,
  },
  statusContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  ratingText: {
    fontWeight: 'bold',
    marginRight: 2,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default PlayersListScreen;