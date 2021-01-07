import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/proxy.ts",
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [typescript()],
};
