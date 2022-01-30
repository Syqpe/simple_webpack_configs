import * as webpack from "webpack";
import "webpack-dev-server";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const styleLoader = (
    test: string | RegExp,
    loaders: webpack.RuleSetUseItem[] = []
) => {
    const config = {
        test,
        use: [
            stylesHandler,
            {
                loader: "css-loader",
                options: {
                    sourceMap: true,
                },
            },
            ...loaders,
        ],
    };

    return config;
};

const config: webpack.Configuration = {
    entry: "./src/index.js",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    devtool: "source-map",
    devServer: {
        open: true,
        host: "localhost",
        port: 3032,
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin()],
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new MiniCssExtractPlugin(),
        new ESLintPlugin({
            context: path.resolve(__dirname, "./src"),
            extensions: ["js", "jsx", "ts", "tsx"],
            fix: true,
        }),
        new CopyPlugin({
            patterns: [{ from: "./public/assets", to: "./assets" }],
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(ts|tsx)$/i,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            configFile: "tsconfig.json",
                        },
                    },
                ],
            },
            styleLoader(/\.css$/i),
            styleLoader(/\.less$/i, [
                {
                    loader: "less-loader",
                    options: {
                        sourceMap: true,
                    },
                },
            ]),
            styleLoader(/\.(sass|scss)$/i, [
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                    },
                },
            ]),
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
