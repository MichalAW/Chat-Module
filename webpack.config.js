const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const plugins = [new HtmlWebpackPlugin({
    template: 'client/index.html',
    filename: 'index.html',
    inject: 'body'
})];

module.exports = function (env) {
    if (env.production) { {
        plugins.push(
            new OptimizeJsPlugin({
                sourceMap: false
            })
        )
    }
    return {
        mode: env.production ? 'production' : 'development',
        entry: './client/index.js',
            output: {
               path: path.resolve(__dirname, 'public'),
               filename: 'app.bundle.js'
            },
        optimization: {
            minimizer: env.production ? [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                    terserOptions: {}
                }),
            ] : [],
        },
        module: {
            rules: [{
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                        plugins: !env.production ? ["react-hot-loader/babel"] : []
                    }
                },
                {
                    test: /\.css$/,
                    use: [{
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        }
                    ]
                }
            ]
        },
        devServer: {
            proxy: {
                '/socket.io': {
                    target: 'http://localhost:3000',
                    ws: true
                }
            }
        },
        plugins: plugins
    }
}};
