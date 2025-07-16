import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Card, Title, Text, Button, Divider, List, Switch, useTheme } from 'react-native-paper';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  const { t, currentLanguage, changeLanguage, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const theme = useTheme();
  
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // هنا يمكن إضافة منطق تبديل سمة التطبيق
    // باستخدام سياق السمة (Theme Context)
  };

  const handleSignOut = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerSection}>
        <Avatar.Image 
          source={{ uri: user?.avatarUrl || 'https://ui-avatars.com/api/?name=' + (user?.fullName || user?.username) }}
          size={100} 
          style={styles.avatar}
        />
        <Title style={[styles.userName, { color: theme.colors.text }]}>
          {user?.fullName || user?.username}
        </Title>
        <Text style={{ color: theme.colors.text }}>{user?.email}</Text>
        {user?.phoneNumber && (
          <Text style={{ color: theme.colors.text, marginTop: 5 }}>
            {user.phoneNumber}
          </Text>
        )}
        <Button 
          mode="outlined" 
          style={styles.editButton}
          icon="pencil"
          onPress={() => {/* انتقل إلى صفحة تحرير الملف الشخصي */}}
        >
          {t('edit')}
        </Button>
      </View>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <List.Section>
            <List.Subheader style={{ color: theme.colors.primary }}>{t('personalInfo')}</List.Subheader>
            
            {/* الوضع المظلم */}
            <List.Item
              title={t('darkMode')}
              left={props => <List.Icon {...props} icon="weather-night" color={theme.colors.primary} />}
              right={props => <Switch value={darkMode} onValueChange={toggleDarkMode} color={theme.colors.primary} />}
            />
            
            {/* تغيير اللغة */}
            <TouchableOpacity>
              <List.Item
                title={t('changeLanguage')}
                description={currentLanguage ? t('languageName') : null}
                left={props => <List.Icon {...props} icon="translate" color={theme.colors.primary} />}
                right={props => <Icon name="chevron-right" size={24} color={theme.colors.text} />}
                onPress={() => {/* فتح قائمة اللغات */}}
              />
            </TouchableOpacity>
            
            <Divider style={styles.divider} />
            
            {/* تفضيلات التطبيق */}
            <List.Subheader style={{ color: theme.colors.primary }}>{t('appPreferences') || 'تفضيلات التطبيق'}</List.Subheader>
            
            <TouchableOpacity>
              <List.Item
                title={t('notifications')}
                left={props => <List.Icon {...props} icon="bell" color={theme.colors.primary} />}
                right={props => <Icon name="chevron-right" size={24} color={theme.colors.text} />}
              />
            </TouchableOpacity>
            
            <TouchableOpacity>
              <List.Item
                title={t('favorites')}
                left={props => <List.Icon {...props} icon="heart" color={theme.colors.primary} />}
                right={props => <Icon name="chevron-right" size={24} color={theme.colors.text} />}
              />
            </TouchableOpacity>
            
            <Divider style={styles.divider} />
            
            {/* معلومات عن التطبيق */}
            <List.Subheader style={{ color: theme.colors.primary }}>{t('aboutApp')}</List.Subheader>
            
            <TouchableOpacity>
              <List.Item
                title={t('contactUs')}
                left={props => <List.Icon {...props} icon="email" color={theme.colors.primary} />}
                right={props => <Icon name="chevron-right" size={24} color={theme.colors.text} />}
              />
            </TouchableOpacity>
            
            <TouchableOpacity>
              <List.Item
                title={t('privacyPolicy')}
                left={props => <List.Icon {...props} icon="shield-account" color={theme.colors.primary} />}
                right={props => <Icon name="chevron-right" size={24} color={theme.colors.text} />}
              />
            </TouchableOpacity>
            
            <TouchableOpacity>
              <List.Item
                title={t('termsOfService')}
                left={props => <List.Icon {...props} icon="file-document" color={theme.colors.primary} />}
                right={props => <Icon name="chevron-right" size={24} color={theme.colors.text} />}
              />
            </TouchableOpacity>
            
            <TouchableOpacity>
              <List.Item
                title={t('rateApp')}
                left={props => <List.Icon {...props} icon="star" color={theme.colors.primary} />}
                right={props => <Icon name="chevron-right" size={24} color={theme.colors.text} />}
              />
            </TouchableOpacity>
            
            <TouchableOpacity>
              <List.Item
                title={t('shareApp')}
                left={props => <List.Icon {...props} icon="share-variant" color={theme.colors.primary} />}
                right={props => <Icon name="chevron-right" size={24} color={theme.colors.text} />}
              />
            </TouchableOpacity>
          </List.Section>
        </Card.Content>
      </Card>
      
      <Button 
        mode="contained" 
        style={[styles.signOutButton, { backgroundColor: theme.colors.error }]}
        icon="logout"
        loading={loading}
        disabled={loading}
        onPress={handleSignOut}
      >
        {t('logout')}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editButton: {
    marginTop: 15,
    borderRadius: 20,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  divider: {
    marginVertical: 10,
  },
  signOutButton: {
    margin: 20,
    marginBottom: 30,
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export default ProfileScreen;