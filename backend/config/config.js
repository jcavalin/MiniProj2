module.exports = {
    mongodb: {
        // Obrigatório, ex.: mongodb://localhost:27017/test
        uri: process.env.MONGODB_URI,
        collections: {
            animal: 'animals',
            question: 'questions',
            quiz: 'quizzes',
            user: 'users',
            user_levels: "user_levels",
            sponsor: 'sponsors',
            expert: 'experts'
        }
    },
    auth: {
        expiration_time: 15000,
        issuer: "FCA"
    },
    sanitize: {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ\\ ",
        numerical: "0123456789"
    },
    email: {
        // Opcional: só é preciso para enviar emails (rota /emails)
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }
}