const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(path.resolve(__dirname, 'assets'));

module.exports = {
    entry: './src/index.ts',
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, '.', 'index.html'), // Path to your template file
          filename: 'index.html' // Output file
        })
        
      ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]'
                }
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
            
        ]
        
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        static:  path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
      }
};
