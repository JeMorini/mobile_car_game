import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Container } from "./styles";
import Car from "../Car";
import BotCar from "../BotCar";

export default function Street() {
  const [street, setStreet] = useState(0);
  const [carStreets, setCarStreets] = useState(0);
  const [botHeight, setBotHeight] = useState(0);
  const [visible, setVisible] = useState(false);
  const [points, setPoints] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [speedLevel, setSpeedLevel] = useState(1);

  const randomNumber = (Math.random() * (2 - 0) + 0).toFixed(0);

  useEffect(() => {
    if (botHeight < 700) {
      const botHeightId = setInterval(
        () => setBotHeight(botHeight + 50),
        speed
      );
      return () => clearInterval(botHeightId);
    } else {
      if (carStreets == 0 && (street === 0 || street === 2)) {
        setVisible(true);
      } else if (carStreets == 1 && (street === 0 || street === 1)) {
        setVisible(true);
      } else if (carStreets == 2 && (street === 1 || street === 2)) {
        setVisible(true);
      } else {
        setBotHeight(0);
        setCarStreets(randomNumber);
        if (points > 200) {
          setSpeed(70);
          setSpeedLevel(1);
        }
        if (points > 600) {
          setSpeed(50);
          setSpeedLevel(2);
        }
        if (points > 1000) {
          setSpeed(30);
          setSpeedLevel(3);
        }
        if (points > 2000) {
          setSpeed(10);
          setSpeedLevel(4);
        }
      }
    }
  });

  useEffect(() => {
    if (!visible) {
      const pointsId = setInterval(() => setPoints(points + 1), speed);
      return () => clearInterval(pointsId);
    }
  });

  function restart() {
    setBotHeight(0);
    setCarStreets(randomNumber);
    setVisible(false);
    setPoints(0);
    setSpeed(100);
  }

  return (
    <Container>
      <View
        style={{
          width: 200,
          position: "absolute",
          zIndex: 100,
          backgroundColor: "white",
          marginTop: -400,
        }}
      >
        <Text>Pontuação: {points}</Text>
        <Text>Velocidade: {speedLevel}</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          width: "33%",
          height: "100%",
          alignItems: "center",
        }}
        onPress={() => {
          if (street > 0) {
            setStreet(street - 1);
          }
        }}
      >
        {(carStreets == 0 || carStreets == 1) && (
          <BotCar botStreet={0} botHeight={botHeight} />
        )}
        {street === 0 && <Car />}
      </TouchableOpacity>
      {visible && (
        <TouchableOpacity
          onPress={restart}
          style={{
            width: 200,
            height: 200,
            position: "absolute",
            zIndex: 100,
            marginTop: 50,
            backgroundColor: "white",
          }}
        >
          <Text>Sua pontuação foi: {points}</Text>
        </TouchableOpacity>
      )}
      <View
        style={{
          backgroundColor: "blue",
          width: "33%",
          height: "100%",
          alignItems: "center",
        }}
      >
        {(carStreets == 1 || carStreets == 2) && (
          <BotCar botStreet={0} botHeight={botHeight} />
        )}
        {street === 1 && <Car />}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "green",
          width: "33%",
          height: "100%",
          alignItems: "center",
        }}
        onPress={() => {
          if (street < 2) {
            setStreet(street + 1);
          }
        }}
      >
        {(carStreets == 2 || carStreets == 0) && (
          <BotCar botStreet={0} botHeight={botHeight} />
        )}
        {street === 2 && <Car />}
      </TouchableOpacity>
    </Container>
  );
}
