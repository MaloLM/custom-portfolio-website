// Copyright (c) [2023] [Malo Le Mestre]
// This software is released under the MIT License
// https://opensource.org/licenses/MIT

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
   }
  },
  
},

 )
