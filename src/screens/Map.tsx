import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { buscarUsuarios } from "../services/supabaseQueries";

const Map = ({ navigation }: any) => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsuarios() {
      try {
        const data = await buscarUsuarios();
        setUsuarios(data);
      } catch (error: any) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    }
    loadUsuarios();
  }, []);

  const handleNavigateToLevels = () => {
    navigation.navigate("Niveis"); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tela de Mapa</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={usuarios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ alignItems: "center", marginBottom: 10 }}>
                <Image source={{ uri: item.avatar_url }} style={{ width: 50, height: 50, borderRadius: 25, marginBottom: 5 }} />
                <Text style={styles.userItem}>
                  {item.full_name}: {item.username} - {item.website}
                </Text>
              </View>
              
            )}
            contentContainerStyle={styles.listContainer}
          />
        )}

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
  listContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%"
  },
  userItem: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    textAlign: "center"
  },
});

export default Map;