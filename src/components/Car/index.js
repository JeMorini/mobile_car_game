import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { CarImage } from "./styles";

export default function Car() {
  return (
    <CarImage
      source={{
        uri: "https://cdn.pixabay.com/photo/2014/04/02/10/24/racing-car-303766_960_720.png",
      }}
    />
  );
}
