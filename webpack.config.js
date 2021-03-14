const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports ={ 
    entry:'./src/scripts/index.js',
    mode: 'development',
    output:{
        filename:'all.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase:'./dist',
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader', 'css-loader']
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        template:'./src/index.html'
    })],
} 