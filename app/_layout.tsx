import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import Constants from 'expo-constants';
import React from 'react';
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  if (
    Constants.expoConfig?.extra?.storybookEnabled === 'true' ||
    process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true'
  ) {
    try {
      const StorybookUIRoot = require('../.storybook').default;

      // Ensure StorybookUIRoot is a valid React component
      if (React.isValidElement(<StorybookUIRoot />)) {
        return <StorybookUIRoot />;
      } else {
        console.error('StorybookUIRoot is not a valid React component.');
        return null;
      }
    } catch (error) {
      console.error('Error loading StorybookUIRoot:', error);
      return null;
    }
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
