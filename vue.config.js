module.exports = {
    publicPath: './',
    outputDir: process.env.CORE_MIN === 'lib' ? 'lib' : 'dist',
    filenameHashing: false,
    configureWebpack: webpackConfig => {
        if (process.env.NODE_ENV === 'production' && process.env.CORE_MIN === 'lib') {
            webpackConfig.entry = {
                'zov': [
                    './core/index.js',
                    './core/index.scss'
                ]
            }
            webpackConfig.optimization.splitChunks = {}
            webpackConfig.output.filename = '[name].min.js'
        }
    }
}
