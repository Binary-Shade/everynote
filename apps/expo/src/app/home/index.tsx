/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ImageSourcePropType } from "react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { format } from "date-fns";
import { Calendar, Plus, Search } from "lucide-react-native";

import TapTen from "../../components/ui/TapTen";

export default function Home() {
  const insets = useSafeAreaInsets();
  const [categories] = useState(["General", "Meeting", "To-Do"]);
  const [selectedCategory, setSelectedCategory] = useState("General");

  const userImage: ImageSourcePropType = require("../../../assets/images/user.png");
  const date = new Date();
  const formattedDate = format(date, "dd MMM, yyyy");
  return (
    <View
      className="flex-1 bg-[#0d0d0d]"
      style={{ paddingTop: insets.top + 16 }}
    >
      {/* Header with Search and Profile */}
      <View className="flex-row items-center justify-between px-2 py-6">
        {/* Search Bar */}
        <View className="mr-4 h-12 flex-1 flex-row items-center rounded-full bg-[#1a1a1a] px-4 py-2">
          <Search size={18} color="#6b7280" />
          <TextInput
            className="ml-3 flex-1 items-center justify-center text-sm text-white"
            placeholder="Search your note"
            placeholderTextColor="#6b7280"
            style={{ height: 40 }} // explicitly controls height
          />
        </View>

        {/* Calendar & Profile */}
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity className="p-2">
            <Calendar size={24} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="p-2">
            <View className="h-8 w-8 overflow-hidden rounded-full bg-gray-500">
              <Image
                source={userImage}
                className="h-8 w-8"
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Selectors */}
      <View className="px-3 py-4">
        <ScrollView
          horizontal
          scrollEnabled={categories.length > 4}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                onLongPress={() => router.push("/debug")}
                className={`mr-2 rounded-full px-2 py-2 ${
                  isSelected ? "bg-white" : "border border-[#333] bg-[#1a1a1a]"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    isSelected ? "text-black" : "text-gray-300"
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Add New Category */}
          <TouchableOpacity className="py-02 flex-row items-center rounded-full px-4">
            <Plus size={16} color="#9ca3af" />
            <Text className="ml-2 text-sm text-gray-400">Create Category</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Text className="ml-4 mt-8 font-normal text-white">{formattedDate}</Text>
      <TapTen />
    </View>
  );
}
