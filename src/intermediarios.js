
let banco = require('./bancodedados.js');



const verificarDadosUsuario = async (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {
        if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" })
        }

        next()

    } catch {
        return res.status(500).json({ message: "Ops, algo deu errado!Tente novamente." })
    }

}

const verificarDadosUsuarioRepetidos = async (req, res, next) => {
    const { cpf, email } = req.body;
    let cpfUnico = true;
    let emailUnico = true;
    try {
        if (banco.contas.length > 0) {
            cpfUnico = banco.contas.every(conta => conta.usuario.cpf !== cpf);
            emailUnico = banco.contas.every(conta => conta.usuario.email !== email);
        }
        if (!cpfUnico) {
            return res.status(400).json({ message: "Já existe uma conta com o cpf informado!" })
        } if (!emailUnico) {
            return res.status(400).json({ message: "Já existe uma conta com o e-mail informado!" })
        }
        next()

    } catch {
        return res.status(500).json({ message: "Ops, algo deu errado!Tente novamente." })
    }

}


const verificarNumeroDeConta = async (req, res, next) => {
    const numeroConta = req.params.numeroConta;
    let conta = null;
    if (banco.contas.length > 0) {
        conta = banco.contas.find(conta => conta.numero === numeroConta)
    }
    if (!conta) {
        return res.status(400).json({ message: "Numero de conta inválido!" })
    }
    next();
}

const verificarContaEValor = async (req, res, next) => {
    const { numero_conta, valor } = req.body

    if (!numero_conta || !valor) {
        return res.status(400).json({ message: "O número da conta e o valor são obrigatórios!" })
    }
    let conta = null;

    if (banco.contas.length > 0) {
        conta = banco.contas.find(conta => conta.numero === numero_conta)
    }
    if (!conta) {
        return res.status(400).json({ message: "Numero de conta inválido!" })
    }
    next();
}

const verificarContaESenha = async (req, res, next) =>{
    const {numero_conta, senha} = req.query;
    if(!numero_conta){
        return res.status(400).json({ message: "Informe o número da conta para prosseguir!" });
    }
    if(!senha){
        return res.status(400).json({ message: "Informe a senha da conta para prosseguir!" });
    }
    const conta = banco.contas.find(conta=> conta.numero === numero_conta);
    if(!conta){
        return res.status(400).json({ message: "Conta bancária não encontada!" });
    }
    if(conta.usuario.senha !== senha){
        return res.status(400).json({ message: "Senha incorreta!" });
    }
    next();

}



module.exports = {
    verificarDadosUsuario,
    verificarNumeroDeConta,
    verificarDadosUsuarioRepetidos,
    verificarContaEValor,
    verificarContaESenha
}