import type { ImageSourcePropType } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import { router, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useAuth, useOAuth } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Constants
const SCHEME = "expo";

interface AuthError {
  message: string;
  code?: string;
}
// browser warmup
export const useWarmUpBrowser = () => {
  useEffect(() => {
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const illustration: ImageSourcePropType = require("../../assets/images/hand-drawn-flat-design-poetry-illustration.png");

  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/home");
    }
  }, [isSignedIn, router]);

  // login handling
  const handleGoogleLogin = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/", { scheme: SCHEME }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/home");
      } else {
        throw new Error("Authentication failed: No session created");
      }
    } catch (err) {
      const authError = err as AuthError;
      console.error("Authentication error:", authError);
      setError(authError.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  }, [startOAuthFlow, router]);

  // render login screen
  return (
    <SafeAreaView
      className="h-full flex-1"
      style={{ backgroundColor: "#0d0d0d", padding: 20 }}
    >
      <View className="my-8">
        <Text className="text-[28px] font-semibold text-white">EveryNote</Text>
        <Text className="mt-2 text-sm leading-relaxed text-gray-400">
          Capture your thoughts, your way.{"\n"}
          Text, voice, or media —{" "}
          <Text style={{ fontFamily: "playFair-italic" }}>EveryNote</Text> makes
          it effortless to record your day and reflect with AI-powered clarity.
        </Text>
      </View>

      <View className="mb-8 size-96">
        <Image
          source={illustration}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      <View className="flex gap-8 space-y-4">
        <TouchableOpacity
          className="flex-row items-center justify-center rounded-full bg-white py-3"
          onPress={handleGoogleLogin}
          disabled={loading}
          accessibilityLabel="Sign in with Google"
        >
          {loading ? (
            <ActivityIndicator color="#000" className="mr-3" />
          ) : (
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
              }}
              className="mr-3 h-5 w-5"
            />
          )}
          <Text className="text-sm font-medium text-gray-900">
            Log In with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-center gap-4 rounded-full bg-[#1a1a1a] py-3">
          <FontAwesome name="apple" size={20} color="white" />
          <Text className="text-sm font-medium text-white">
            Log In with Apple
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-10 mt-8">
        <Text className="text-center text-xs leading-snug text-gray-500">
          By continuing, you agree to our Terms of Service{"\n"}and Privacy
          Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
