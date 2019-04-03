import React, { Component } from "react";
import "./App.css";
import Iris from "./elements/Iris/Iris";
import Gradient, { colors } from "./elements/Gradient/Gradient";
import { pointFromVector } from "@popmotion/popcorn";
import styled from "styled-components";
import Container from "./elements/Container/Container";

const [_, ...colorKeys] = Object.keys(colors);

const center = { x: -0, y: 0 };
const scale = 1;

const mapGradient = fn => (color: string, i: number) => {
  const angle = ((i / colorKeys.length) * 360 - 45 * 3) * -1;
  const angleShift = pointFromVector(center, angle, 25);

  return fn(color, angleShift);
};

class App extends Component {
  render() {
    return (
      <Container>
        <header className="App-header">
          <Gradient
            size={"40vw"}
            color={"darkBlue"}
            style={{
              transform: `translate3d(${center.x}%, ${center.y}%, 1px)`,
              mixBlendMode: "normal"
            }}
          />

          {colorKeys.map(
            mapGradient((color, { x, y }) => (
              <Gradient
                size={"40vw"}
                color={color}
                style={{
                  transform: `translate3d(${x}%, ${y}%, 1px)`,
                  mixBlendMode: "normal"
                }}
              />
            ))
          )}
          <Gradient
            size={"40vw"}
            color={"darkBlue"}
            style={{
              transform: `translate3d(${center.x}%, ${center.y}%, 1px)`
            }}
          />

          {colorKeys.map(
            mapGradient((color, { x, y }) => (
              <Gradient
                size={"40vw"}
                color={color}
                style={{ transform: `translate3d(${x}%, ${y}%, 1px)` }}
              />
            ))
          )}
        </header>
      </Container>
    );
  }
}

export default App;
