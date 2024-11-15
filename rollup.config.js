import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';

const extensions = [".js", ".jsx", ".ts", ".tsx", ".json"];
const isProd = process.env.NODE_ENV === 'production'

export default [
	{
		input: "src/main.ts",
		output: {
			file: "dist/wati-capi.sdk.js",
			format: "umd",
		},
		plugins: [
			resolve({
				extensions,
			}),
			json(),
			commonjs(),
			esbuild({
				include: /\.[jt]sx?$/,
				exclude: /node_modules/,
				sourceMap: false, // default
				minify: isProd,
				target: "es2015",
				tsconfig: "tsconfig.json",
				loaders: {
					".json": "json",
				},
			}),
		],
	},
];
