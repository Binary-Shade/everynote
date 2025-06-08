import "@bacons/text-decoder/install";
import "../styles.css";

import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold_Italic,
} from "@expo-google-fonts/playfair-display";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Playfair Display": PlayfairDisplay_400Regular,
    "Playfair Display Italic": PlayfairDisplay_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey="pk_test_bXVzaWNhbC1zcGlkZXItOTYuY2xlcmsuYWNjb3VudHMuZGV2JA"
      >
        <SQLiteProvider
          databaseName="editor.db"
          onInit={async (db) => {
            await db.execAsync(`
              PRAGMA journal_mode = WAL;
              CREATE TABLE IF NOT EXISTS editor_contents (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT DEFAULT 'Untitled',
                html_content TEXT NOT NULL,
                text_content TEXT NOT NULL,
                json_content TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
              );
            `);
          }}
          options={{
            useNewConnection: false,
          }}
        >
          <Slot />
        </SQLiteProvider>
      </ClerkProvider>
    </SafeAreaProvider>
  );
}
