// Lấy lại cấu hình webpack thay vì viết mới
var webpackConfig = require('./webpack.config.js');

// Puppeteer cần tham số này để chạy
process.env.CHROME_BIN = require('puppeteer').executablePath()

// Cấu hình Karma
module.exports = function(config) {
    config.set({
        // Framework sử dụng ở bài này là mocha, nếu bạn sử dụng fw khác, có thể thêm vào
        frameworks: ['mocha'],

        port: 9876, // Port chạy debug
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false, // True nghĩa là tự lắng nghe các file thay đổi để chạy lại
        // browsers: ['Chrome', 'Firefox'],
        // Bạn muốn hiểu Headless là gì thì có thể đọc ở đây: https://developers.google.com/web/updates/2017/04/headless-chrome
        browsers: ['ChromeHeadless', 'FirefoxHeadless'],
        singleRun: false, // Chạy một lần rồi thoát luôn hay chờ thay đổi để chạy lại. Ở mode PRO bạn cần đặt nó là true
        autoWatchBatchDelay: 300,

        // Danh sách các file được load vào Browser trong quá trình chạy test
        // Bạn xem tài liệu http://karma-runner.github.io/4.0/config/configuration-file.html phần File Patterns để biết cú pháp tìm files
        files: [
            'test/suites/test-suite.js',
            // 'test/**/*-Test.js',
        ],

        // Tiền xử lý trước khi chạy
        preprocessors: {
            'test/suites/test-suite.js': ['webpack', 'sourcemap']
                // 'test/**/*-Test.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],

        // Cấu hình webpack
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        }
    });
};