let banco = require('../bancodedados.js');
const { format } = require('date-fns')

const deposito = async (req, res) => {
    const { numero_conta, valor } = req.body
    try {
        if (valor <= 0) {
            return res.status(401).json({ message: "Só serão aceitos valores acima de 0." })

        }
        const conta = banco.contas.find(conta => conta.numero === numero_conta);
        conta.saldo += valor;
        const data = new Date();
        const deposito = {
            data: format(data, 'yyyy-MM-dd H:mm:ss'),
            numero_conta,
            valor
        }
        banco.depositos.push(deposito);
        res.status(201).send();
    } catch {
        return res.status(500).json({ message: "Ops, algo deu errado! Tente novamente." })
    }
}

const saque = async (req, res) => {
    const { numero_conta, valor, senha } = req.body
    try {
        const conta = banco.contas.find(conta => conta.numero === numero_conta);
        if (!senha) {
            return res.status(400).json({ message: "A senha é obrigatória!" })
        }
        if (senha !== conta.usuario.senha) {
            return res.status(401).json({ message: "A senha está incorreta!" })
        }
        if (conta.saldo < valor) {
            return res.status(403).json({ message: "Saldo insuficiente!" })
        }


        conta.saldo -= valor;
        const data = new Date();
        const saque = {
            data: format(data, 'yyyy-MM-dd H:mm:ss'),
            numero_conta,
            valor
        }
        banco.saques.push(saque);
        res.status(201).send();
    } catch {
        return res.status(500).json({ message: "Ops, algo deu errado! Tente novamente." })
    }
}

const transferencia = async (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem) {
        return res.status(400).json({ message: "Informe a conta de origem" });
    }
    if (!numero_conta_destino) {
        return res.status(400).json({ message: "Informe a conta de destino" });
    }
    if (!valor) {
        return res.status(400).json({ message: "Informe o valor a ser transferido" });
    }
    if (valor <= 0) {
        return res.status(401).json({ message: "Só serão aceitos valores acima de 0." })
    }
    if (!senha) {
        return res.status(400).json({ message: "A senha é obrigatória!" });
    }
    try {
        const contaOrigem = banco.contas.find(conta => conta.numero === numero_conta_origem);
        const contaDestino = banco.contas.find(conta => conta.numero === numero_conta_destino);
        if (!contaOrigem) {
            return res.status(404).json({ message: "Conta origem inexistente!" });
        }
        if (!contaDestino) {
            return res.status(404).json({ message: "Conta destino inexistente!" });
        }

        if (senha !== contaOrigem.usuario.senha) {
            return res.status(401).json({ message: "A senha está incorreta!" })
        }
        if (contaOrigem.saldo < valor) {
            return res.status(403).json({ message: "Saldo insuficiente!" })
        }


        contaOrigem.saldo -= valor;
        contaDestino.saldo += valor;
        const data = new Date();
        const transferencia = {
            data: format(data, 'yyyy-MM-dd H:mm:ss'),
            numero_conta_origem,
            numero_conta_destino,
            valor
        }
        banco.transferencias.push(transferencia);
        res.status(201).send();
    } catch {
        return res.status(500).json({ message: "Ops, algo deu errado! Tente novamente." })
    }
}

module.exports = {
    deposito,
    saque,
    transferencia
}
