import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import {
  CoreBridge,
  RichText,
  TenTapStartKit,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from "@10play/tentap-editor";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/playfair-display";

import { darkEditorCss } from "../../utils/theme";

const TapTen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [saveInProgress, setSaveInProgress] = useState(false);
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold_Italic,
  });
  const db = useSQLiteContext();

  const editor = useEditorBridge({
    autofocus: false,
    initialContent: "",
    bridgeExtensions: [
      ...TenTapStartKit,
      CoreBridge.configureCSS(darkEditorCss),
    ],
  });

  // Get content in all formats
  const htmlContent = useEditorContent(editor, { type: "html" });
  const textContent = useEditorContent(editor, { type: "text" });
  const jsonContent = useEditorContent(editor, { type: "json" });

  const saveContent = useCallback(
    async (html: string, text: string, json: string): Promise<void> => {
      try {
        await db.runAsync(
          `INSERT INTO editor_contents (html_content, text_content, json_content) VALUES (?, ?, ?);`,
          [html, text, json],
        );
      } catch (error) {
        console.error("Error saving content:", error);
        throw error;
      }
    },
    [db],
  );

  const loadAllContents = async () => {
    try {
      const contents = await db.getAllAsync(
        "SELECT id, substr(text_content, 1, 100) as preview, created_at FROM editor_contents ORDER BY created_at DESC",
      );
      console.log(contents);
    } catch (error) {
      console.error("Error loading contents:", error);
    }
  };

  useEffect(() => {
    const autoSave = async () => {
      if (!htmlContent || !textContent || !jsonContent) return;

      try {
        await saveContent(
          htmlContent,
          textContent,
          JSON.stringify(jsonContent),
        );
        console.log("Content auto-saved");
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    };

    const timeoutId = setTimeout(autoSave, 10000); // Debounce for 10 seconds
    return () => clearTimeout(timeoutId);
  }, [htmlContent, textContent, jsonContent, saveContent]);

  // Manual save function
  const handleSave = useCallback(async () => {
    if (saveInProgress) return;

    setSaveInProgress(true);
    try {
      const [html, text, json] = await Promise.all([
        editor.getHTML(),
        editor.getText(),
        editor.getJSON(),
      ]);
      console.log(editor.getText());
      const result = await saveContent(html, text, JSON.stringify(json));
      console.log(result);

      Alert.alert("Success", "Your content has been saved locally");
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", "Failed to save content");
    } finally {
      setSaveInProgress(false);
    }
  }, [editor, saveContent, saveInProgress]);

  if (!fontsLoaded || isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0d0d0d",
        }}
      >
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={{ color: "#ffffff", marginTop: 16 }}>
          {fontsLoaded ? "Loading your content..." : "Loading fonts..."}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#0d0d0d", paddingHorizontal: 16 }}
    >
      <RichText
        editor={editor}
        style={{
          flex: 1,
          backgroundColor: "#0d0d0d",
          paddingBottom: 60,
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 100 })}
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          backgroundColor: "#0d0d0d",
        }}
      >
        <Toolbar editor={editor} />
        {/* save content */}
        {/* <TouchableOpacity
          onPress={handleSave}
          style={{
            padding: 16,
            borderRadius: 8,
            marginVertical: 8,
            alignItems: "center",
          }}
        >
          {saveInProgress ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
              Save Content
            </Text>
          )}
        </TouchableOpacity> */}

        {/* show content */}
        <TouchableOpacity
          onPress={loadAllContents}
          style={{
            padding: 16,
            borderRadius: 8,
            marginVertical: 8,
            alignItems: "center",
          }}
        >
          {saveInProgress ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
              show Content
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TapTen;
