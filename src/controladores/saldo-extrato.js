let banco = require('../bancodedados.js');

const saldo = async (req, res) => {
    const { numero_conta, senha } = req.query;
    try {
        const conta = banco.contas.find(conta => conta.numero === numero_conta);
        res.json({ saldo: conta.saldo })
    } catch {
        return res.status(500).json({ message: "Ops, algo deu errado! Tente novamente." })
    }
}


const extrato = async (req, res) => {
    const { numero_conta } = req.query;
    try {
        const despositos = banco.depositos.filter(dep => dep.numero_conta === numero_conta);
        const saques = banco.saques.filter(saque => saque.numero_conta === numero_conta);
        const transferenciasEnviadas = banco.transferencias.filter(transf => transf.numero_conta_origem === numero_conta);
        const transferenciasRecebidas = banco.transferencias.filter(transf => transf.numero_conta_destino === numero_conta);

        const extrato = {
            despositos,
            saques,
            transferenciasEnviadas,
            transferenciasRecebidas
        }

        res.json(extrato)
    } catch {
        return res.status(500).json({ message: "Ops, algo deu errado! Tente novamente." })
    }
}

module.exports = {
    saldo,
    extrato
}