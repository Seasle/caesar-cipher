module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/caesar-cipher/' : '/',
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Caesar Cipher';

            return args;
        });
    }
};
