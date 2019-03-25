module.exports = {
    publicPath: './',
    outputDir: process.env.CORE_MIN === 'lib' ? 'lib' : 'dist',
    filenameHashing: true,
    chainWebpack (config) {
        if (process.env.NODE_ENV === 'production' && process.env.CORE_MIN === 'lib') {
            config.module
                .rule('fonts')
                .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
                .use('url-loader')
                .loader('url-loader')
                .options({
                    limit: 10000,
                    // use explicit fallback to avoid regression in url-loader>=1.1.0
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                            publicPath: './'
                        }
                    }
                })
            config
                .plugin('extract-css')
                .use(require('mini-css-extract-plugin'), [{
                    filename: '[name].min.css',
                    chunkFilename: '[name].min.css'
                }])
        }
    },
    configureWebpack: webpackConfig => {
        if (process.env.NODE_ENV === 'production' && process.env.CORE_MIN === 'lib') {
            webpackConfig.entry = {
                'zov': [
                    './core/index.js',
                    './core/index.scss'
                ]
            }
            webpackConfig.externals = {
                'vue': 'Vue'
            }
            webpackConfig.optimization.splitChunks = {}
            webpackConfig.output.filename = '[name].min.js'
        }
    }
}
