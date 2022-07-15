module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 300,
            aggregateTimeout: 300,
            ignored: /node_modules/
        };
        return config;
    }
}