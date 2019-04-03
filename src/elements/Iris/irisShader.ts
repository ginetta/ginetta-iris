import Phenomenon from "phenomenon/src/index.js";
import raw from "raw.macro";
import { pointFromVector, radiansToDegrees } from "@popmotion/popcorn";

const multiplier = 6;
const begin = 0.4;
const duration = 0.6;

function h2r(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
  return p;
}

function getHSL(h, s, l) {
  h = ((h % 1) + 1) % 1;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  if (s === 0) return [l, l, l];
  const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
  const q = 2 * l - p;
  return [h2r(q, p, h + 1 / 3), h2r(q, p, h), h2r(q, p, h - 1 / 3)];
}

function getRandom(value) {
  const floor = -value;
  return floor + Math.random() * value * 2;
}

const attributes = [
  {
    name: "aPositionStart",
    data: (index, total) => {
      return [0, -1, 0];
    },
    size: 3
  },
  {
    name: "aControlPointOne",
    data: (index, total) => {
      const angle = index * ((2 * Math.PI) / total);
      return [
        Math.cos(angle) * 1.5 + getRandom(0.5),
        1.5 + getRandom(0.5),
        Math.sin(angle) * 1.5
      ];
    },
    size: 3
  },
  {
    name: "aControlPointTwo",
    data: (index, total) => {
      const angle = index * ((2 * Math.PI) / total);
      return [
        Math.cos(angle) + getRandom(1),
        1 + getRandom(0.5),
        Math.sin(angle) + getRandom(1)
      ];
    },
    size: 3
  },
  {
    name: "aPositionEnd",
    data: (index, total) => {
      const angle = index * ((2 * Math.PI) / total);
      return [Math.cos(angle) + getRandom(2), -2, 0];
    },
    size: 3
  },
  {
    name: "aColor",
    data: (index, total) => {
      return getHSL(
        begin + (index / total) * 0.2,
        0.6 + getRandom(0.1),
        0.6 + getRandom(0.1)
      );
    },
    size: 3
  },
  {
    name: "aOff",
    data: (index, total) => {
      const angle = radiansToDegrees(
        index * ((2 * Math.PI) / total) + Math.PI / 2
      );

      const pt = pointFromVector({ x: 0, y: 0 }, angle, 1);

      const pts = [[-1, -1], [-1, 1], [1, 1], [1, 1], [1, -1], [-1, -1]];

      return pts[index];
    },
    size: 2
  },
  // {
  //   name: "aOff",
  //   data: (index, total) => {
  //     const angle = radiansToDegrees(
  //       index * ((2 * Math.PI) / total) + Math.PI / 2
  //     );

  //     const pt = pointFromVector({ x: 0, y: 0 }, angle, 1);

  //     return [pt.x, pt.y];
  //   },
  //   size: 2
  // },
  {
    name: "aOffset",
    data: i => [i * ((1 - duration) / (multiplier - 1))],
    size: 1
  },
  {
    name: "aRes",
    data: () => [devicePixelRatio * 200],
    size: 1
  }
];

const resolution = (devicePixelRatio * 200).toFixed(1);

const uniforms = {
  uProgress: {
    type: "float",
    value: 0.0
  },
  uTime: {
    type: "float",
    value: 0.0
  }
};

const glsl = x => x;

const vertex = raw("./vertex.glsl");
const fragment = raw("./fragment.glsl");

const drawShader = (canvas: HTMLCanvasElement) => {
  const renderer = new Phenomenon({
    canvas,
    settings: {
      clearColor: [239 / 255, 239 / 255, 239 / 255, 1],
      position: { x: 0, y: 0, z: 1.0 },
      shouldRender: true
    }
  });

  renderer.add("starling", {
    uniforms,
    attributes,
    vertex,
    multiplier,
    fragment,
    onRender: instance => {
      const { value } = instance.uniforms.uProgress;
      const dir = 1;
      instance.mode = 4;
      // instance.mode = 0;
      // if (value > 1 / 3) instance.mode = 1;
      // if (value > 2 / 3) instance.mode = 4;
      if (instance.uniforms.uProgress.value >= 1) {
        // instance.uniforms.uProgress.value = 0;
        const dir = -1;
      }

      instance.uniforms.uProgress.value += 0.004 * dir;
      instance.uniforms.uTime.value += 1;
    }
  });
};

export default drawShader;
