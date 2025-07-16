import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '@/styles/theme';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import AppNavigator from '@/navigation/AppNavigator';

// إنشاء عميل الاستعلامات
const queryClient = new QueryClient({});

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <LanguageProvider>
            <AuthProvider>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </AuthProvider>
          </LanguageProvider>
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;