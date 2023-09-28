const express =  require('express');
const { listarContas, criarContas, atualizarConta, deletarConta } = require('./controladores/contas.js');
const { verificarDadosUsuario, verificarNumeroDeConta, verificarDadosUsuarioRepetidos, verificarContaEValor, verificarContaESenha } = require('./intermediarios.js');
const { deposito, saque, transferencia } = require('./controladores/transacoes.js');
const { saldo, extrato } = require('./controladores/saldo-extrato.js');


const rotas = express();

rotas.get('/contas', listarContas);
rotas.post('/contas', verificarDadosUsuario,verificarDadosUsuarioRepetidos, criarContas);
rotas.put('/contas/:numeroConta/usuario', verificarNumeroDeConta, verificarDadosUsuario, atualizarConta );
rotas.delete('/contas/:numeroConta', verificarNumeroDeConta, deletarConta );

rotas.post('/transacoes/depositar', verificarContaEValor, deposito );
rotas.post('/transacoes/sacar', verificarContaEValor, saque);
rotas.post('/transacoes/transferir', transferencia );

rotas.get('/contas/saldo', verificarContaESenha, saldo );
rotas.get('/contas/extrato', verificarContaESenha, extrato );



module.exports = rotas;