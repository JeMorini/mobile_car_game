import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Container } from "./styles";

export default function BotCar({ botHeight }) {
  return <Container style={{ marginTop: botHeight }}></Container>;
}
