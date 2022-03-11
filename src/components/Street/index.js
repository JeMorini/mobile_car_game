import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Container, StreetLane } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Car from "../Car";
import BotCar from "../BotCar";
import Line from "../Line";
import ScoreModal from "../ScoreModal";
import * as Font from "expo-font";

export default function Street() {
  const [street, setStreet] = useState(0);
  const [carStreets, setCarStreets] = useState(0);
  const [botHeight, setBotHeight] = useState(0);
  const [visible, setVisible] = useState(true);
  const [points, setPoints] = useState(false);
  const [block, setBlocks] = useState(400);
  const [pointsStorage, setPointsStorage] = useState(0);
  const [fontLoaded, setFontLoaded] = useState(false);

  const randomNumber = (Math.random() * (2 - 0) + 0).toFixed(0);

  async function loadFonts() {
    await Font.loadAsync({
      "PressStart2P-Regular": require("../../assets/fonts/PressStart2P-Regular.ttf"),
    });
    setFontLoaded(true);
  }

  loadFonts();

  function moviment() {
    setBotHeight(botHeight + block);
    setPoints(points + 1);
  }

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem("@storage_score");
      setPointsStorage(value);
    })();
  }, []);

  useEffect(() => {
    if (botHeight < 700 && !visible) {
      const botHeightId = setTimeout(moviment, 1);
      return () => clearTimeout(botHeightId);
    } else {
      if (carStreets == 0 && (street === 0 || street === 2)) {
        setVisible(true);
        if (points > pointsStorage) {
          AsyncStorage.setItem("@storage_score", points.toString());
        }
      } else if (carStreets == 1 && (street === 0 || street === 1)) {
        setVisible(true);
        if (points > pointsStorage) {
          AsyncStorage.setItem("@storage_score", points.toString());
        }
      } else if (carStreets == 2 && (street === 1 || street === 2)) {
        setVisible(true);
        if (points > pointsStorage) {
          AsyncStorage.setItem("@storage_score", points.toString());
        }
      } else {
        setBotHeight(0);
        setCarStreets(randomNumber);
        if (points > 150) {
          setBlocks(90);
        }
        if (points > 200) {
          setBlocks(130);
        }
        if (points > 240) {
          setBlocks(190);
        }
        if (points > 320) {
          setBlocks(220);
        }
        if (points > 400) {
          setBlocks(300);
        }
      }
    }
  });

  // useEffect(() => {
  //   if (!visible) {
  //     const pointsId = setInterval(() => setPoints(points + 1), 100);
  //     return () => clearInterval(pointsId);
  //   }
  // });

  function restart() {
    setBotHeight(0);
    setCarStreets(randomNumber);
    setVisible(false);
    setPoints(0);
    setBlocks(70);
  }

  return (
    <Container>
      {fontLoaded && (
        <>
          <Line points={points} color={"red"} />
          <StreetLane
            first
            onPress={() => {
              if (street > 0) {
                setStreet(street - 1);
              }
            }}
            activeOpacity={1}
          >
            {(carStreets == 0 || carStreets == 1) && (
              <BotCar botStreet={0} botHeight={botHeight} />
            )}
            {street === 0 && <Car />}
          </StreetLane>
          <Line points={points} color={"#474a51"} />
          {visible && <ScoreModal points={points} restart={restart} />}
          <StreetLane
            style={{
              backgroundColor: "#474a51",
              width: "33%",
              height: "100%",
              alignItems: "center",
            }}
            activeOpacity={1}
          >
            <Text
              style={{
                marginTop: 100,
                marginLeft: 10,
                fontFamily: "PressStart2P-Regular",
                position: "absolute",
                fontSize: 29,
                color: "#fff",
                zIndex: 100,
              }}
            >
              {points}
            </Text>
            {(carStreets == 1 || carStreets == 2) && (
              <BotCar botStreet={0} botHeight={botHeight} />
            )}
            {street === 1 && <Car />}
          </StreetLane>
          <Line points={points} color={"#474a51"} />
          <StreetLane
            last
            style={{
              backgroundColor: "#474a51",
              width: "33%",
              height: "100%",
              alignItems: "center",
            }}
            onPress={() => {
              if (street < 2) {
                setStreet(street + 1);
              }
            }}
            activeOpacity={1}
          >
            {(carStreets == 2 || carStreets == 0) && (
              <BotCar botStreet={0} botHeight={botHeight} />
            )}
            {street === 2 && <Car />}
          </StreetLane>
          <Line points={points} color={"red"} />
        </>
      )}
    </Container>
  );
}
