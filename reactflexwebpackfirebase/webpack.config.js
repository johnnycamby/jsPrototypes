var path = require('path');
var webpack = require('webpack');

module.exports = {
    // configure how webpack bundles and executes code
    devtool: 'eval-source-map',
    entry: {
        main: [
            
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './src/main.js'
        ]
    } ,
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'public'),
        publicPath: '/public/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    
    // transformation pipeline
    module: {
        loaders: [
            {
    // ============================= configure babel pipeline =============================================
    // used by webpack to confirm if the file required through CommonJS Pattern module syntax should go through this pipeline
                test: /\.jsx?$/, 
                include: path.join(__dirname, 'src'),
                loader: 'react-hot!babel'
            },
            {
                test:/\.scss$/,
                include: path.join(__dirname, 'src'),
                loader: 'style!css!sass'
            }
            
        ]
    }
    
}