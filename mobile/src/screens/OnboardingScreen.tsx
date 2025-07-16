import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '@/contexts/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { t, isRTL } = useLanguage();
  const flatListRef = useRef<FlatList>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // بيانات شاشات الترحيب
  const slides = [
    {
      id: '1',
      image: require('@/assets/onboarding1.png'),
      title: t('onboardingTitle1') || 'اكتشف المواهب',
      description: t('onboardingDesc1') || 'استعرض أفضل اللاعبين والمدربين من مختلف أنحاء العالم',
    },
    {
      id: '2',
      image: require('@/assets/onboarding2.png'),
      title: t('onboardingTitle2') || 'تواصل مباشرة',
      description: t('onboardingDesc2') || 'تواصل مع اللاعبين والمدربين والأندية عبر محادثات مباشرة',
    },
    {
      id: '3',
      image: require('@/assets/onboarding3.png'),
      title: t('onboardingTitle3') || 'مكالمات فيديو',
      description: t('onboardingDesc3') || 'أجرِ مكالمات فيديو مباشرة وتابع العروض والتقييمات',
    },
    {
      id: '4',
      image: require('@/assets/onboarding4.png'),
      title: t('onboardingTitle4') || 'التعاقدات والعقود',
      description: t('onboardingDesc4') || 'أكمل إجراءات التعاقد وادارة العقود من خلال التطبيق',
    },
  ];
  
  // الانتقال إلى الشريحة التالية
  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      completeOnboarding();
    }
  };
  
  // إكمال الترحيب والانتقال إلى شاشة تسجيل الدخول
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error saving onboarding status', error);
    }
  };
  
  // عرض عنصر الشريحة
  const renderItem = ({ item }: { item: typeof slides[0] }) => (
    <View style={[styles.slide, { backgroundColor: theme.colors.background }]}>
      <View style={styles.imageContainer}>
        <Image 
          source={item.image} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          {item.title}
        </Text>
        <Text style={[styles.description, { color: theme.colors.text }]}>
          {item.description}
        </Text>
      </View>
    </View>
  );
  
  // عرض مؤشرات الصفحات
  const renderDots = () => {
    return slides.map((_, index) => (
      <TouchableOpacity 
        key={index}
        style={[
          styles.dot, 
          { 
            backgroundColor: index === currentIndex 
              ? theme.colors.primary 
              : theme.colors.surfaceVariant
          }
        ]}
        onPress={() => {
          flatListRef.current?.scrollToIndex({
            index,
            animated: true,
          });
          setCurrentIndex(index);
        }}
      />
    ));
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
      />
      
      <View style={styles.bottomContainer}>
        <View style={styles.dotsContainer}>
          {renderDots()}
        </View>
        
        <View style={styles.buttonsContainer}>
          {currentIndex < slides.length - 1 ? (
            <Button 
              mode="contained" 
              onPress={goToNextSlide}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
            >
              {t('next') || 'التالي'}
            </Button>
          ) : (
            <Button 
              mode="contained" 
              onPress={completeOnboarding}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
            >
              {t('getStarted') || 'ابدأ الآن'}
            </Button>
          )}
          
          {currentIndex < slides.length - 1 && (
            <Button 
              mode="text" 
              onPress={completeOnboarding}
              style={styles.skipButton}
              labelStyle={{ color: theme.colors.primary }}
            >
              {t('skip') || 'تخطي'}
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
  },
  textContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 120,
  },
  skipButton: {
    minWidth: 80,
  },
});

export default OnboardingScreen;