import React, { useState } from "react";
import styled from "styled-components";

const positions = [
  [0, 80, 2], // Human
  [0, 0, 1], // center
  [70, -70, 2], // Active
  [-80, 50, 2.5], // Brave
  [-50, -90, 2.5] // Active
];

const getPosition = props => {
  const [x, y, s] = positions[props.position];

  return `translate(${x}%, ${y}%) scale(${s})`;
};

const ContainerStyle = styled.div`
  position: relative;
  transform-origin: center center;
  transform: ${getPosition};
  transition: 0.6s transform cubic-bezier(0.49, 0.15, 0.35, 1);
  will-change: transform;
  cursor: pointer;
`;

const Container = props => {
  const [index, setIndex] = useState(0);

  const cycle = () => {
    setIndex((index + 1) % positions.length);
  };

  return <ContainerStyle position={index} onClick={cycle} {...props} />;
};

export default Container;
