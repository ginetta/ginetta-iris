import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

export const colors = {
  darkBlue: `0,0,137`,
  lightBlue: `77,212,224`,
  brightGreen: `0,250,184`,
  brightPurple: `113,12,254`,
  brightPink: `255,0,104`,
  lightPink: `255,180,176`
};
export const otherColors = {
  black: `0,0,0`,
  white: `255,255,255`
};

const animation = keyframes`
  0% {transform: rotate(360deg);}
  100% {transform: rotate(0deg);}
`;

const Rotate = styled.div`
  transform: translateY(5%);
  animation: ${animation} 1s infinite;
`;

const Circle = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ size }) =>
    Number.isFinite(size) ? `${size}px` : `calc(${size} + 10rem)`};
  height: ${({ size }) =>
    Number.isFinite(size) ? `${size}px` : `calc(${size} + 10rem)`};
  max-width: 70vw;
  max-height: 70vw;

  mix-blend-mode: multiply;
  background: radial-gradient(
    ellipse at center,
    rgba(${props => colors[props.color] || otherColors[props.color]}, 1) 0%,
    rgba(${props => colors[props.color] || otherColors[props.color]}, 0.5) 40%,
    rgba(${props => colors[props.color] || otherColors[props.color]}, 0) 70%
  );
`;

const Gradient = props => {
  return <Circle color={"pink"} {...props} />;
};

export default Gradient;
