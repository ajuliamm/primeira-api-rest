let banco = require('../bancodedados.js');


const listarContas = async (req, res) => {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(400).json({ message: "Senha não informada" })
    }
    if (senha_banco !== 'Cubos123Bank') {
        return res.status(401).json({ message: "A senha do banco informada é inválida!" })
    }
    return res.json(banco.contas)

}

const criarContas = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    let numeroConta = 1;

    try {
        if (banco.contas.length > 0) {
            maiorNumero = banco.contas.reduce((acc, cur) => {
                return Number(acc.numero) > Number(cur.numero) ? acc : cur;
            })
            numeroConta = Number(maiorNumero.numero) + 1;
        }

        contaNovoUsuario = {
            numero: numeroConta.toString(),
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }
        banco.contas.push(contaNovoUsuario)


        return res.status(201).send()
    } catch {
        return res.status(500).json({ message: "Ops, algo deu errado!Tente novamente." })
    }

}

const atualizarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const numeroConta = req.params.numeroConta;

    try {
        const contaASerAtualizada = banco.contas.find(conta => conta.numero === numeroConta);
        const contasDiferentesDaEscolhida = banco.contas.filter(conta => conta !== contaASerAtualizada)
        const verificarCpfRepetido = contasDiferentesDaEscolhida.some(conta => conta.usuario.cpf === cpf);
        const verificarEmailRepetido = contasDiferentesDaEscolhida.some(conta => conta.usuario.email === email);

        if (verificarCpfRepetido) {
            return res.status(400).json({ message: "O CPF informado já existe cadastrado!" })
        }
        if (verificarEmailRepetido) {
            return res.status(400).json({ message: "O email informado já existe cadastrado!" })
        }

        contaASerAtualizada.usuario.nome = nome;
        contaASerAtualizada.usuario.cpf = cpf;
        contaASerAtualizada.usuario.data_nascimento = data_nascimento;
        contaASerAtualizada.usuario.telefone = telefone;
        contaASerAtualizada.usuario.email = email;
        contaASerAtualizada.usuario.senha = senha;

        return res.status(201).send()
    } catch {
        return res.status(500).json({ message: "Ops, algo deu errado!Tente novamente." })
    }

}

const deletarConta = async (req, res) => {
    const numeroConta = req.params.numeroConta;
    try {
        const contaASerDeletada = banco.contas.find(conta => conta.numero === numeroConta);

        if (contaASerDeletada.saldo > 0) {
            return res.status(401).json({ message: "A conta só pode ser removida se o saldo for zero!" })
        }
        const indexConta = banco.contas.findIndex(conta => conta === contaASerDeletada);

        banco.contas.splice(indexConta, 1);

        return res.status(200).send()
    }
    catch {
        return res.status(500).json({ message: "Ops, algo deu errado!Tente novamente." })
    }

}

module.exports = {
    listarContas,
    criarContas,
    atualizarConta,
    deletarConta
}