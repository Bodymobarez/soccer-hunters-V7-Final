import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const RegisterScreen = () => {
  const { t, isRTL } = useLanguage();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { register, error } = useAuth();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError(t('passwordMismatch') || 'كلمات المرور غير متطابقة');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      return;
    }
    
    if (!validatePassword()) {
      return;
    }
    
    setLoading(true);
    
    const userData = {
      username,
      email,
      password,
      fullName,
      phoneNumber,
      role,
    };
    
    const success = await register(userData);
    setLoading(false);
    
    if (success) {
      // التنقل سيتم تلقائيًا بواسطة AppNavigator
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={[styles.formContainer, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {t('register')}
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
            label={t('email')}
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            label={t('fullName')}
            value={fullName}
            onChangeText={setFullName}
            mode="outlined"
            style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
          />
          
          <TextInput
            label={t('phoneNumber')}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            mode="outlined"
            style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
            keyboardType="phone-pad"
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
          
          <TextInput
            label={t('confirmPassword') || 'تأكيد كلمة المرور'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            mode="outlined"
            style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
            error={!!passwordError}
          />
          
          {passwordError ? (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {passwordError}
            </Text>
          ) : null}
          
          <Button 
            mode="contained" 
            onPress={handleRegister}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            loading={loading}
            disabled={loading}
          >
            {t('register')}
          </Button>
          
          <View style={styles.loginContainer}>
            <Text style={{ color: theme.colors.text }}>{t('haveAccount')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.loginText, { color: theme.colors.primary }]}>
                {t('login')}
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
    paddingVertical: 30,
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
  button: {
    marginVertical: 15,
    paddingVertical: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flexWrap: 'wrap',
  },
  loginText: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default RegisterScreen;