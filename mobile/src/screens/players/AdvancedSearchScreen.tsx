import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput, Divider, Chip, Switch, useTheme, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '@/contexts/LanguageContext';
import RangeSlider from '@/components/RangeSlider'; // لنموذج المكون الذي سنقوم بإنشائه لاحقًا

const AdvancedSearchScreen = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const { t, isRTL } = useLanguage();
  
  // معايير البحث
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [nationality, setNationality] = useState('');
  const [position, setPosition] = useState<string | null>(null);
  const [ageRange, setAgeRange] = useState([16, 40]);
  const [heightRange, setHeightRange] = useState([160, 200]);
  const [weightRange, setWeightRange] = useState([60, 100]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [minRating, setMinRating] = useState(0);
  
  // خيارات المركز
  const positions = [
    { id: 'goalkeeper', label: t('goalkeepers') || 'حراس المرمى' },
    { id: 'defender', label: t('defenders') || 'مدافعين' },
    { id: 'midfielder', label: t('midfielders') || 'لاعبي وسط' },
    { id: 'forward', label: t('forwards') || 'مهاجمين' },
  ];
  
  // خيارات التقييم
  const ratings = [1, 2, 3, 4, 5];
  
  const handlePositionSelect = (posId: string) => {
    setPosition(position === posId ? null : posId);
  };
  
  const handleRatingSelect = (rating: number) => {
    setMinRating(rating === minRating ? 0 : rating);
  };
  
  const handleSearch = () => {
    // بناء معايير البحث
    const searchCriteria = {
      name: name.trim() || undefined,
      team: team.trim() || undefined,
      nationality: nationality.trim() || undefined,
      position: position || undefined,
      ageMin: ageRange[0],
      ageMax: ageRange[1],
      heightMin: heightRange[0],
      heightMax: heightRange[1],
      weightMin: weightRange[0],
      weightMax: weightRange[1],
      available: onlyAvailable || undefined,
      minRating: minRating || undefined,
    };
    
    // التنقل إلى صفحة النتائج مع تمرير معايير البحث
    navigation.navigate('SearchResults', { searchCriteria });
  };
  
  const resetFilters = () => {
    setName('');
    setTeam('');
    setNationality('');
    setPosition(null);
    setAgeRange([16, 40]);
    setHeightRange([160, 200]);
    setWeightRange([60, 100]);
    setOnlyAvailable(false);
    setMinRating(0);
  };
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Title style={[styles.screenTitle, { color: theme.colors.primary }]}>
        {t('advancedSearch')}
      </Title>
      
      <View style={styles.searchSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          {t('basicInfo')}
        </Text>
        
        <TextInput
          label={t('playerName')}
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          textAlign={isRTL ? 'right' : 'left'}
        />
        
        <TextInput
          label={t('team')}
          value={team}
          onChangeText={setTeam}
          mode="outlined"
          style={styles.input}
          textAlign={isRTL ? 'right' : 'left'}
        />
        
        <TextInput
          label={t('nationality')}
          value={nationality}
          onChangeText={setNationality}
          mode="outlined"
          style={styles.input}
          textAlign={isRTL ? 'right' : 'left'}
        />
      </View>
      
      <Divider style={styles.divider} />
      
      <View style={styles.searchSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          {t('position')}
        </Text>
        
        <View style={styles.chipsContainer}>
          {positions.map((pos) => (
            <Chip
              key={pos.id}
              selected={position === pos.id}
              onPress={() => handlePositionSelect(pos.id)}
              style={[styles.chip, {
                backgroundColor: position === pos.id 
                  ? theme.colors.primary 
                  : theme.colors.surface
              }]}
              textStyle={{
                color: position === pos.id 
                  ? 'white' 
                  : theme.colors.text
              }}
            >
              {pos.label}
            </Chip>
          ))}
        </View>
      </View>
      
      <Divider style={styles.divider} />
      
      <View style={styles.searchSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          {t('physicalAttributes')}
        </Text>
        
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>{t('age')}: {ageRange[0]} - {ageRange[1]}</Text>
          <RangeSlider
            min={15}
            max={45}
            values={ageRange}
            onValuesChange={setAgeRange}
            step={1}
            markerColor={theme.colors.primary}
            trackColor={theme.colors.primary + '40'}
            selectedTrackColor={theme.colors.primary}
          />
        </View>
        
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>{t('height')}: {heightRange[0]} - {heightRange[1]} cm</Text>
          <RangeSlider
            min={150}
            max={220}
            values={heightRange}
            onValuesChange={setHeightRange}
            step={1}
            markerColor={theme.colors.primary}
            trackColor={theme.colors.primary + '40'}
            selectedTrackColor={theme.colors.primary}
          />
        </View>
        
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>{t('weight')}: {weightRange[0]} - {weightRange[1]} kg</Text>
          <RangeSlider
            min={50}
            max={120}
            values={weightRange}
            onValuesChange={setWeightRange}
            step={1}
            markerColor={theme.colors.primary}
            trackColor={theme.colors.primary + '40'}
            selectedTrackColor={theme.colors.primary}
          />
        </View>
      </View>
      
      <Divider style={styles.divider} />
      
      <View style={styles.searchSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          {t('additionalFilters')}
        </Text>
        
        <View style={styles.switchContainer}>
          <Text style={{ color: theme.colors.text }}>{t('onlyAvailable')}</Text>
          <Switch
            value={onlyAvailable}
            onValueChange={setOnlyAvailable}
            color={theme.colors.primary}
          />
        </View>
        
        <Text style={[styles.ratingLabel, { color: theme.colors.text }]}>
          {t('minRating')}
        </Text>
        
        <View style={styles.ratingContainer}>
          {ratings.map((rating) => (
            <TouchableOpacity 
              key={rating}
              style={[styles.ratingButton, { 
                backgroundColor: rating <= minRating ? theme.colors.primary : theme.colors.surface,
                borderColor: theme.colors.primary
              }]}
              onPress={() => handleRatingSelect(rating)}
            >
              <Text style={{ 
                color: rating <= minRating ? 'white' : theme.colors.text 
              }}>
                {rating}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.buttonsContainer}>
        <Button 
          mode="outlined" 
          onPress={resetFilters}
          style={[styles.button, styles.resetButton]}
          labelStyle={{ color: theme.colors.error }}
        >
          {t('resetFilters')}
        </Button>
        
        <Button 
          mode="contained" 
          onPress={handleSearch}
          style={[styles.button, styles.searchButton, { backgroundColor: theme.colors.primary }]}
        >
          {t('search')}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  screenTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  searchSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    marginBottom: 12,
  },
  divider: {
    marginVertical: 15,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingLabel: {
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  ratingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  resetButton: {
    borderColor: 'red',
  },
  searchButton: {},
});

export default AdvancedSearchScreen;