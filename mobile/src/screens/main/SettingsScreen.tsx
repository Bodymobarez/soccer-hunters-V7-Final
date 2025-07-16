import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { List, Text, Switch, Button, Dialog, Portal, Paragraph, useTheme } from 'react-native-paper';
import { useLanguage } from '@/contexts/LanguageContext';
import { LANGUAGE_NAMES, Language } from '@/localization/translations';

const SettingsScreen = () => {
  const { t, currentLanguage, changeLanguage, isRTL } = useLanguage();
  const theme = useTheme();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [fontScale, setFontScale] = useState('medium');
  const [autoPlay, setAutoPlay] = useState(true);
  const [dataUsage, setDataUsage] = useState('wifi');
  const [languageDialogVisible, setLanguageDialogVisible] = useState(false);
  
  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
  const toggleHighContrast = () => setHighContrastMode(!highContrastMode);
  const toggleAutoPlay = () => setAutoPlay(!autoPlay);

  const handleFontScaleChange = (scale: string) => {
    setFontScale(scale);
    // هنا يمكن تطبيق تغييرات حجم الخط على مستوى التطبيق
  };

  const handleDataUsageChange = (option: string) => {
    setDataUsage(option);
    // هنا يمكن تطبيق تغييرات استخدام البيانات
  };

  const handleLanguageSelect = (language: Language) => {
    changeLanguage(language);
    setLanguageDialogVisible(false);
  };

  const clearCache = () => {
    Alert.alert(
      t('clearCacheTitle') || 'مسح ذاكرة التخزين المؤقتة',
      t('clearCacheConfirm') || 'هل أنت متأكد من رغبتك في مسح ذاكرة التخزين المؤقتة؟',
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('confirm'), 
          onPress: () => {
            // منطق مسح ذاكرة التخزين المؤقتة
          } 
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          {t('appSettings') || 'إعدادات التطبيق'}
        </Text>
        
        <List.Item
          title={t('language')}
          description={LANGUAGE_NAMES[currentLanguage]}
          left={props => <List.Icon {...props} icon="translate" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => setLanguageDialogVisible(true)}
          style={styles.listItem}
        />
        
        <List.Item
          title={t('notifications')}
          description={notificationsEnabled ? t('enabled') : t('disabled')}
          left={props => <List.Icon {...props} icon="bell" />}
          right={props => (
            <Switch 
              value={notificationsEnabled} 
              onValueChange={toggleNotifications} 
              color={theme.colors.primary}
            />
          )}
          style={styles.listItem}
        />
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          {t('accessibility') || 'إمكانية الوصول'}
        </Text>
        
        <List.Item
          title={t('highContrastMode') || 'وضع التباين العالي'}
          description={highContrastMode ? t('enabled') : t('disabled')}
          left={props => <List.Icon {...props} icon="eye" />}
          right={props => (
            <Switch 
              value={highContrastMode} 
              onValueChange={toggleHighContrast} 
              color={theme.colors.primary}
            />
          )}
          style={styles.listItem}
        />
        
        <List.Item
          title={t('fontSize') || 'حجم الخط'}
          description={t(fontScale)}
          left={props => <List.Icon {...props} icon="format-size" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {
            // فتح قائمة اختيار حجم الخط
          }}
          style={styles.listItem}
        />
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          {t('contentSettings') || 'إعدادات المحتوى'}
        </Text>
        
        <List.Item
          title={t('autoPlayVideos') || 'تشغيل الفيديوهات تلقائيًا'}
          description={autoPlay ? t('enabled') : t('disabled')}
          left={props => <List.Icon {...props} icon="play-circle" />}
          right={props => (
            <Switch 
              value={autoPlay} 
              onValueChange={toggleAutoPlay} 
              color={theme.colors.primary}
            />
          )}
          style={styles.listItem}
        />
        
        <List.Item
          title={t('dataUsage') || 'استخدام البيانات'}
          description={t(dataUsage)}
          left={props => <List.Icon {...props} icon="wifi" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {
            // فتح قائمة اختيارات استخدام البيانات
          }}
          style={styles.listItem}
        />
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          {t('storage') || 'التخزين'}
        </Text>
        
        <List.Item
          title={t('clearCache') || 'مسح ذاكرة التخزين المؤقتة'}
          description={t('clearCacheDescription') || 'إزالة البيانات المخزنة مؤقتًا'}
          left={props => <List.Icon {...props} icon="trash-can" />}
          onPress={clearCache}
          style={styles.listItem}
        />
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          {t('aboutApp')}
        </Text>
        
        <List.Item
          title={t('appVersion') || 'إصدار التطبيق'}
          description="1.0.0"
          left={props => <List.Icon {...props} icon="information" />}
          style={styles.listItem}
        />
      </View>
      
      <Portal>
        <Dialog 
          visible={languageDialogVisible} 
          onDismiss={() => setLanguageDialogVisible(false)}
          style={{ backgroundColor: theme.colors.surface }}
        >
          <Dialog.Title style={{ color: theme.colors.text }}>{t('changeLanguage')}</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={styles.languageList}>
              {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
                <List.Item
                  key={code}
                  title={name}
                  onPress={() => handleLanguageSelect(code as Language)}
                  right={props => 
                    currentLanguage === code ? (
                      <List.Icon {...props} icon="check" color={theme.colors.primary} />
                    ) : null
                  }
                  style={{
                    backgroundColor: currentLanguage === code 
                      ? theme.colors.primary + '20' 
                      : undefined
                  }}
                />
              ))}
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setLanguageDialogVisible(false)}>{t('cancel')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 8,
  },
  listItem: {
    paddingVertical: 8,
  },
  languageList: {
    maxHeight: 300,
  },
});

export default SettingsScreen;