

module.exports = {
    development: {
        db: 'mongodb://localhost/chat',
        port: process.env.PORT || 8081
    },
    production: {
        db: '',
        port: process.env.PORT || 80
    }
}

 