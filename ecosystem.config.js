module.exports = {
    apps : [{
        name: 'expressServer',
        script: './expressServer.js',

        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        },
        env_staging: {
            NODE_ENV: 'staging'
        }
    }],

    deploy : {
        production : {
            user : 'testSiteApp',
            host : 'localhost',
            ref  : 'origin/master',
            repo : '.',
            path : '/home/testSiteApp/get-tested-covid19',
            'post-deploy' : 'npm run server:build && pm2 startOrRestart ecosystem.config.js --env production && pm2 save'
        },
        staging : {
            user : 'testSiteApp',
            host : 'localhost',
            ref  : 'staging',
            repo : '.',
            path : '/home/testSiteApp/get-tested-covid19',
            'post-deploy' : 'npm run server:build && pm2 startOrRestart ecosystem.config.js --env staging && pm2 save'
        }
    }
};
