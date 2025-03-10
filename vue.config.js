// Copyright (c) [2023] [Malo LM]
// This software is released under the Apache 2.0 License
// https://www.apache.org/licenses/LICENSE-2.0.html


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
