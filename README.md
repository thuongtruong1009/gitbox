[![CircleCI](https://circleci.com/gh/circleci/circleci-docs.svg?style=svg)](https://circleci.com/gh/circleci/circleci-docs)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a2df4efc50df4576abab67ff747ba0be)](https://app.codacy.com/gh/thuongtruong1009/searching-github-username?utm_source=github.com&utm_medium=referral&utm_content=thuongtruong1009/searching-github-username&utm_campaign=Badge_Grade_Settings)
![CI](https://github.com/thuongtruong1009/searching-github-username/actions/workflows/cicd.yml/badge.svg)
[![CodeFactor](https://www.codefactor.io/repository/github/thuongtruong1009/searching-github-username/badge)](https://www.codefactor.io/repository/github/thuongtruong1009/snake-game-oop)
![GitHub commit checks state](https://img.shields.io/github/checks-status/thuongtruong1009/searching-github-username/main)
<img src="https://img.shields.io/badge/License-MIT-pink" onclick="https://github.com/thuongtruong1009/searching-github-username/blob/main/LICENSE">
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/thuongtruong1009/searching-github-username?color=87CEFA)
![Lines of code](https://img.shields.io/tokei/lines/github/thuongtruong1009/searching-github-username?color=%236495ED)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7232c6c2-bf24-464c-b334-45e6e74842aa/deploy-status)](https://app.netlify.com/sites/gitonsearch/deploys)

<h1 align="center">
    <img src="./public/favicon.ico"/>
    SEARCHING GITHUB USERNAME
</h1>
<div align="center">
    <img src="./images reference/view_demo.jpeg" width="800"/>
</div>

<!-- https://hacktoberfest.digitalocean.com/_nuxt/img/logo-hacktoberfest-full2.aa1e9d9.svg -->

## 💻 We used
+ Using **VueJs 3** framwork in **ViteJs** module.
+ Get acquainted with **REST API GITHUB** and **Bulma**. Started at [here](https://docs.github.com/en/rest)
+ Using [axios](https://www.npmjs.com) HTTP Client library to fetch data links with support of [Postman](https://www.postman.com).
+ Combining v-binding, v-on, v-if, v-for, v-model, created functon, props, emit... technologies in [Vue 3](https://v3.vuejs.org)
+ Transporting data between components by [event bus](https://v3.vuejs.org/guide/migration/events-api.html#overview)  library in Javascript.
+ Get idea [Github](https://github.com/) and [Youtube](https://youtube.com/).
+ Fix-bugs reference at [Stack Overflow](https://stackoverflow.com), [W3schools](https://www.w3schools.com), [Vite](https://vitejs.dev/).

## 🚀 This project has the following changes
+ The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.
+ Explore and learn how the Java language works through libraries and methods.
+ Familiarize yourself with object oriented programming and its working principle.
+ Introduce the Java Swing and java.awt libraries through implementation and method inheritance its.
+ Improve your skills to resolve the problems in programming.
+ Practice and complete assignment Java OOP projects in a university lab.

## Let't start
#### 1. Project setup
```script
npm install
```
Compiles and hot-reloads for development
```script
npm run dev
```
Compiles and minifies for production
```script
npm run build
```
Lints and fixes files
```script
npm run lint
```
#### 2. Axios setup
run data API
```script
npm install axios
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```
#### 3. Karma setup
install karma global
```script
npm i mocha chai --save-dev
```
install karma library
```script
npm i karma karma-chrome-launcher karma-firefox-launcher karma-cli karma-mocha karma-sourcemap-loader karma-webpack puppeteer --save-dev
```
config to new webpack.config.js
```script
module.exports = {
  devtool: 'inline-source-map',
}
```
config to new karma.conf.js
```script
// Lấy lại cấu hình webpack thay vì viết mới
var webpackConfig = require('./webpack.config.js');

// Puppeteer cần tham số này để chạy
process.env.CHROME_BIN = require('puppeteer').executablePath()

// Cấu hình Karma
module.exports = function (config) {
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
```
add scripts in package.json
```script
"scripts": {
  "test": "karma start",
  "test-normal": "mocha --require @babel/register --exit test/**/*-Test.js"
}
```
run karma
```script
npm run test
```
#### 4. Debug Karma
update in karma.conf.js
```script
autoWatch: true,
singleRun: false
```
debug step
```script
• Open browser at address: http://localhost:9876/debug.html
• Press F12/Inspect to see DEV mode of browser.
• ^ + P: Input name file UT will be debuged
• Put Breakpoints in line want debug
• Refresh to reload UT
```
example

<img src="./images reference/debug_Karma.png" width="450" height="250" />

Customize configuration see [Configuration Reference](https://cli.vuejs.org/config/).

## 📂 How to contributing
+ Step 1: Star and fork this repository.
+ Step 2: Make new Pull Request on new branche at your forked repository.
+ Propose commit and wait a few times for me responsive an email for you.
+ Congratulate you added in contributor badge (check at [here](./allcontributors.json)).

## 🤝 Join with me
+ #### Code together in the development to build perfect products.
+ #### You can give a **star**/**fork**/**comment discuss**/**make issues**/**create Pull-Request** about source code to develop this me project. It can save it on release history.
+ #### Any problem, should contact me via [email](mailto:ititiu19228@student.hcmiu.edu.vn).
+ #### Following **ECL-2.0 LICENSE** about @Copyright of [@thuongtruong1009](https://github.com/thuongtruong1009), 2021.

## 🔧 Tools and references
+ Snake image at [here](https://i0.wp.com/petamind.com/wp-content/uploads/2019/10/snake_game.png?fit=400%2C267&ssl=1).
+ Recommended IDE setup: [Visual Studio Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar).
+ Extension: Vetur, Prettierrc
+ Get started at [ViteJs](https://vitejs.dev/).
+ Learning front-end full course at [front-end course](https://github.com/thuongtruong1009/challenge-resposive-web-design-in-300hrs).

### ❤️ Support me
[![MOMO](https://img.shields.io/badge/-MOMO-red?style=for-the-badge&labelColor=pink&logo=MOMO&logoColor=black)](https://nhantien.momo.vn/0917085937)
<a href="https://www.paypal.me/thuongtruong1009">
  <img height="25" marginTop="10" src="./images reference/paypal.png">
</a>
<a href='https://ko-fi.com/thuongtruong1009' target='_blank'><img height='25' style='border:0px;height:28px;color:blue' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' />
  
### 💝 Thank you!_________________________________________________________________________________
