const mongoose = require('mongoose');

const url = 'mongodb+srv://ingresso:ingresso123@clusterxis-6owt6.mongodb.net/nodejs?retryWrites=true';
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(url, options);

mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Conexão encerrada com o banco de dados!');
});

mongoose.connection.on('connected', () => {
    console.log('Conexão estabelicida com o banco de dados!');
});

module.exports = () => mongoose;