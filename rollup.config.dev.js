import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";
import {terser} from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: ["src/components/youtube-card.component.ts"],
    output: {
        file: "dist/youtube-card.js",
        format: "es",
    },
    plugins: [
        resolve({ browser: true, module: true, preferBuiltins: true, jsnext: true }),
        typescript(),
        json(),
        commonjs({
            include: "node_modules/**",
        }),
        babel({
            exclude: "node_modules/**",
        }),
        terser(),
        serve({
            contentBase: "./dist",
            host: "0.0.0.0",
            port: 5000,
            allowCrossOrigin: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        }),
    ],
};
