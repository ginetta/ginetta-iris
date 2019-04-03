import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import drawShader from "./irisShader";

const Canvas = styled.canvas`
  width: 100vw;
  height: 100vh;
`;

const Iris = () => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    drawShader(node);
  }, []);

  return <Canvas ref={ref} />;
};

export default Iris;
