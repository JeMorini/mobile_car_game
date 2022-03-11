import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import { Container, Button, TextButton } from "./styles";
import * as Font from "expo-font";

export default function ScoreModal({ points, restart }) {
  const [pointsStorage, setPointsStorage] = useState(0);
  const [start, setStart] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      "PressStart2P-Regular": require("../../assets/fonts/PressStart2P-Regular.ttf"),
    });
  }

  loadFonts();

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem("@storage_score");
      setPointsStorage(value);
    })();
  }, []);

  return (
    <Container>
      {points > 0 && (
        <>
          <Text
            style={{
              fontFamily: "PressStart2P-Regular",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            {`Sua pontuação: `}
          </Text>
          <Text
            style={{
              fontFamily: "PressStart2P-Regular",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            {points}
          </Text>
        </>
      )}

      <Text
        style={{
          fontFamily: "PressStart2P-Regular",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {`Seu recorde: `}
      </Text>
      <Text
        style={{
          fontFamily: "PressStart2P-Regular",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {pointsStorage}
      </Text>
      <Button
        onPress={() => {
          setStart(true);
          restart();
        }}
      >
        <Text
          style={{
            fontFamily: "PressStart2P-Regular",
            fontSize: 20,
            color: "#fff",
          }}
        >
          {points > 0 ? `Recomeçar` : `Começar`}
        </Text>
      </Button>
    </Container>
  );
}
