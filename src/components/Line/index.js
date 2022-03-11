import React, { useState } from "react";
import { View } from "react-native";
import { StreetLine } from "./styles";

export default function Line({ points, color }) {
  return (
    <View
      style={{
        justifyContent: "space-between",
        backgroundColor: "#474a51",
        height: "100%",
      }}
    >
      <StreetLine backgroundColor={points % 2 ? "#fff" : color} />
      <StreetLine backgroundColor={points % 2 ? color : "#fff"} />
      <StreetLine backgroundColor={points % 2 ? "#fff" : color} />
      <StreetLine backgroundColor={points % 2 ? color : "#fff"} />
      <StreetLine backgroundColor={points % 2 ? "#fff" : color} />
      <StreetLine backgroundColor={points % 2 ? color : "#fff"} />
      <StreetLine backgroundColor={points % 2 ? "#fff" : color} />
      <StreetLine backgroundColor={points % 2 ? color : "#fff"} />
      <StreetLine backgroundColor={points % 2 ? "#fff" : color} />
      <StreetLine backgroundColor={points % 2 ? color : "#fff"} />
    </View>
  );
}
