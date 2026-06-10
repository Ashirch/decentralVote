module.exports = {
    DB: {
        DB_URL: process.env.DB_URL
    },
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.BASE_URL,
    PORT: {
        EXPRESS: process.env.EXPRESS_APP_PORT,
        HTTP: process.env.HTTP_SERVER_PORT
    },
    AWS: {
        ACCESS_KEY: process.env.AWS_ACCESS_KEY,
        SECRET_KEY: process.env.AWS_SECRET_KEY,
        REGION:process.env.AWS_REGION,
        BUCKET_NAME: "dapp1"
    }
};
