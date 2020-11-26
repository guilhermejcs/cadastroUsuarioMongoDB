var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. */
router.get('/userlist', function (req, res) {
  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  Users.find({}).lean().exec(
    function (e, docs) {
      res.render('userlist', { "userlist": docs })
    });
});

/* GET New User page. */
router.get('/newuser', function (req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {
  var db = require("../db");
  var userNome = req.body.nome;
  var userEmail = req.body.email;
  var userSenha = req.body.senha;
  var userDataNascimento = req.body.data_nascimento;
  var userRg = req.body.rg;
  var userCpf = req.body.cpf;
  var userDataCriacao = req.body.data_criacao;

  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  var user = new Users({
    nome: userNome,
    email: userEmail,
    senha: userSenha,
    data_nascimento: userDataNascimento,
    rg: userRg,
    cpf: userCpf,
    data_criacao: userDataCriacao
  });

  user.save(function (err) {
    if (err) {
      console.log("Error! " + err.message);
      return err;
    }
    else {
      console.log("Post saved");
      res.redirect("userlist");
    }
  });
});

module.exports = router;
