import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const LoginScreen = () => {
  const { t, isRTL } = useLanguage();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { login, error } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      return;
    }
    
    setLoading(true);
    const success = await login(username, password);
    setLoading(false);
    
    if (success) {
      // طريقة react-navigation ستقوم بالتنقل تلقائيًا بناءً على حالة المصادقة
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={[styles.appName, { color: theme.colors.primary }]}>
            {t('appName')}
          </Text>
          <Text style={styles.tagline}>{t('tagline')}</Text>
        </View>
        
        <View style={[styles.formContainer, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {t('login')}
          </Text>
          
          {error && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {error}
            </Text>
          )}
          
          <TextInput
            label={t('username')}
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
            autoCapitalize="none"
          />
          
          <TextInput
            label={t('password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            mode="outlined"
            style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
            right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
          />
          
          <TouchableOpacity>
            <Text style={[styles.forgotPassword, { color: theme.colors.primary }]}>
              {t('forgotPassword')}
            </Text>
          </TouchableOpacity>
          
          <Button 
            mode="contained" 
            onPress={handleLogin}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            loading={loading}
            disabled={loading}
          >
            {t('login')}
          </Button>
          
          <View style={styles.registerContainer}>
            <Text style={{ color: theme.colors.text }}>{t('haveAccount')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.registerText, { color: theme.colors.primary }]}>
                {t('createAccount')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  formContainer: {
    borderRadius: 10,
    padding: 20,
    margin: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  forgotPassword: {
    textAlign: 'right',
    marginBottom: 20,
  },
  button: {
    marginVertical: 15,
    paddingVertical: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flexWrap: 'wrap',
  },
  registerText: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default LoginScreen;