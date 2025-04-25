import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import Auth from "../components/Auth";
import Account from "../components/Account";
import Home from "../components/Home";
import OnBoarding from "../components/OnBoarding";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Definição dos tipos de rotas
export type RootStackParamList = {
  Home: undefined;
  OnBoarding: undefined;
  Auth: undefined;
  Account: undefined;
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
    <NavigationContainer>
      <StatusBar backgroundColor="rgb(20, 65, 127)"/>
      <Stack.Navigator initialRouteName="Home">
        {/* Tela de autenticação ou conta */}
        {session && session.user ? (
          <Stack.Screen name="Account">
            {() => <Account key={session.user.id} session={session} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Auth" component={Auth} />
        )}

        {/* Telas principais */}
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
              backgroundColor: "rgb(20, 65, 127)",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            title: "OnBoarding",
            headerBackTitle: ""
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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