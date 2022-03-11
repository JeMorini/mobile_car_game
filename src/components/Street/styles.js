import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: green;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const StreetLane = styled.TouchableOpacity`
  background-color: #474a51;
  width: 29%;
  height: 100%;
  align-items: center;
  /* border-right-width: 2;
  border-right-color: white; */
  ${(props) =>
    props.first &&
    `
  width: 27%;
    border-left-width: 0;
    border-left-color: green;
  `}
  ${(props) =>
    props.last &&
    `
  width: 27%;
    border-right-width: 0;
    border-right-color: green;
  `}
  border-style: dashed;
`;

export const Line = styled.TouchableOpacity`
  height: 10%;
  width: 4px;
  background-color: ${(props) => props.backgroundColor};
`;
