var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodetesteandre');

var userSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    data_nascimento: String,
    rg: String,
    cpf: String,
    data_criacao: String
},
{collection: 'usercollection'}
);

module.exports = {Mongoose:mongoose, UserSchema: userSchema}
