module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : “Node_demo”,
      script    : "./bin/www",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : “root”,
      host : “maijinta.cn”,
      ref  : "origin/master",
      repo : "git@github.com:Barry215/node_demo.git",
      path : "/home/root/www/production",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env production"
    }
  }
}
