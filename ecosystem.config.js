module.exports = {

  apps : [

    {
      name : "node_demo",
      script : "./bin/www",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    }
  ],

  deploy : {
    production : {
      user : "root",
      host : "maijinta.cn", //115.159.190.30
      ref  : "origin/master",
      repo : "git@github.com:Barry215/node_demo.git",
      path : "/home/root/www/production",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }

  //pm2 deploy ecosystem.config.js production

};
