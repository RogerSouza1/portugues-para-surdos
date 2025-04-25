import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const images = [
  require("../../assets/images/image1.jpg"),
  require("../../assets/images/image1.jpg"),
  require("../../assets/images/image1.jpg"),
];

const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item} style={styles.image} />
            </View>
          )}
          contentContainerStyle={styles.flatListContent}
        />

        <View style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    justifyContent: "center",
    alignItems: "center",
  },
  contentWrapper: {
    height: height * 0.55, // controla altura total do conteúdo (card + bullets)
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatListContent: {
    alignItems: "center",
  },
  card: {
    width: width * 0.8,
    height: height * 0.45,
    backgroundColor: "rgb(20, 65, 127)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: width * 0.1,
  },
  image: {
    width: "90%",
    height: "90%",
    resizeMode: "cover",
    borderRadius: 16,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  indicator: {
    width: 30,
    height: 7,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "rgb(20, 65, 127)",
  },
});

export default OnBoarding;
