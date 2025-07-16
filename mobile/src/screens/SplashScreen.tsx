import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Animated, Easing, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '@/contexts/LanguageContext';

const SplashScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { t } = useLanguage();
  
  // للرسوم المتحركة
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  
  useEffect(() => {
    // تسلسل الرسوم المتحركة
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic)
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic)
      })
    ]).start();
    
    // التوجيه إلى الشاشة التالية بعد مهلة زمنية
    const timer = setTimeout(() => {
      // سيتم تحديد الوجهة تلقائياً بواسطة AppNavigator
      // بناءً على حالة التسجيل
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Animated.View style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }]
      }}>
        <Image 
          source={require('@/assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>{t('appName')}</Text>
        <Text style={styles.tagline}>{t('tagline')}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  }
});

export default SplashScreen;