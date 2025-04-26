import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, Image } from "react-native";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import Auth from "../components/Auth";
import Account from "../components/Account";
import Home from "../screens/Home";
import OnBoarding from "../screens/OnBoarding";
import Niveis from "../screens/Niveis";
import Exercicios from "../screens/Exercicios";
import PreExercicio from "../screens/PreExercicio";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import Map from "../screens/Map";

export type RootStackParamList = {
  Home: undefined;
  OnBoarding: undefined;
  Auth: undefined;
  Account: undefined;
  Map: undefined;
  Niveis: undefined;
  Exercicios: undefined;
  PreExercicio: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#013974" barStyle="light-content" />
        <Stack.Navigator initialRouteName="Home">
          {session && session.user ? (
            <Stack.Screen name="Account">
              {() => <Account key={session.user.id} session={session} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Auth" component={Auth} />
          )}

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{
              headerStyle: {
                backgroundColor: "#013974",
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerRight: () => (
                <Image
                  source={require("../../assets/images/logo.png")}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    marginRight: 10,
                    marginTop: 5,
                  }}
                />
              ),
              headerTitle: "Boas Vindas",
              headerBackTitle: "",
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              headerStyle: {
                backgroundColor: "#013974",
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerRight: () => (
                <Image
                  source={require("../../assets/images/logo.png")}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    marginRight: 10,
                    marginTop: 5,
                  }}
                />
              ),
              headerTitle: "Módulos",
              headerBackTitle: "",
            }}
          />
          <Stack.Screen
            name="Niveis"
            component={Niveis}
            options={{
              headerStyle: {
                backgroundColor: "#013974",
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerRight: () => (
                <Image
                  source={require("../../assets/images/logo.png")}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    marginRight: 10,
                    marginTop: 5,
                  }}
                />
              ),
              headerTitle: "Níveis",
              headerBackTitle: "",
            }}
          />
          <Stack.Screen
            name="Exercicios"
            component={Exercicios}
            options={{
              headerStyle: {
                backgroundColor: "#013974",
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerRight: () => (
                <Image
                  source={require("../../assets/images/logo.png")}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    marginRight: 10,
                    marginTop: 5,
                  }}
                />
              ),
              headerTitle: "Exercícios",
              headerBackTitle: "",
            }}
          />
          <Stack.Screen
            name="PreExercicio"
            component={PreExercicio}
            options={{
              headerStyle: {
                backgroundColor: "#013974",
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerRight: () => (
                <Image
                  source={require("../../assets/images/logo.png")}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    marginRight: 10,
                    marginTop: 5,
                  }}
                />
              ),
              headerTitle: "Explicação",
              headerBackTitle: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  text: {
    fontSize: 20,
    color: "#FFF",
  },
});
