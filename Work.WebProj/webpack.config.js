﻿var path = require('path');
var webpack = require('webpack');
//var node_modules_dir = path.resolve(__dirname, 'node_modules');
module.exports = {
    entry: {
        //基礎功能
        m_menu: path.resolve(__dirname, 'Scripts/src/tsx/m-menu.js'),
        m_menu_set: path.resolve(__dirname, 'Scripts/src/tsx/m-menu_set.js'),
        m_login: path.resolve(__dirname, 'Scripts/src/tsx/m-login.js'),
        m_roles: path.resolve(__dirname, 'Scripts/src/tsx/m-roles.js'),
        m_change_password: path.resolve(__dirname, 'Scripts/src/tsx/m-change_password.js'),
        m_users: path.resolve(__dirname, 'Scripts/src/tsx/m-users.js'),
        //後台 管理者
        m_resident: path.resolve(__dirname, 'Scripts/src/resident/app.js'),
        m_news: path.resolve(__dirname, 'Scripts/src/news/app.js'),
        m_editor: path.resolve(__dirname, 'Scripts/src/editor/app.js'),
        m_editorl2: path.resolve(__dirname, 'Scripts/src/editorl2/app.js'),
        m_editordetail: path.resolve(__dirname, 'Scripts/src/editordetail/app.js'),
        //community: path.resolve(__dirname, 'Scripts/src/community/index.js'),

        vendors: ['jquery', 'react', 'react-dom', 'react-addons-update', 'react-bootstrap', 'redux', 'react-redux', 'redux-thunk', 'moment'],
        //wwwcomm: ['jquery', 'react']
    },
    output: {
        path: path.resolve(__dirname, 'Scripts/build/app'),
        filename: '[name].js'
    },
    module: {
        loaders: [
          { test: /\.jsx$/, exclude: [/node_modules/, /app_modules/], loader: 'babel', query: { presets: ['es2015', 'react'] } },
          { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    resolve: {
        alias: {
            moment: "moment/moment.js"
        },
        modulesDirectories: ["app_modules", "node_modules"],
        extensions: ['', '.js', 'jsx', '.json']
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.js', minChunks: Infinity }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-tw/),
      //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ]
};