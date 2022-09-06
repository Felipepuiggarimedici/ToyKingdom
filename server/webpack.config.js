const path = require( 'path' );
const nodeExternals = require("webpack-node-externals");

module.exports = {

    // bundling mode
    mode: 'production',

    // entry files
    entry: './src/index.ts',

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'build' ),
        filename: 'bundle.js',
    },

    externals: [nodeExternals()],

    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ]
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env', '@babel/preset-typescript'],
                      
                    }
                  }
            }
        ]
    },
    node: {
        __dirname: false
    }
};