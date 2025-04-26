import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Map = ({ navigation }: any) => {
  const handleNavigateToLevels = () => {
    navigation.navigate("Niveis"); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tela de Mapa</Text>

        <TouchableOpacity style={styles.rectangle} onPress={handleNavigateToLevels}>
          <Text style={styles.rectangleText}>Ir para Níveis</Text>
        </TouchableOpacity>
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
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#013974",
    marginBottom: 20,
  },
  rectangle: {
    width: 200,
    height: 60,
    backgroundColor: "#013974",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  rectangleText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Map;