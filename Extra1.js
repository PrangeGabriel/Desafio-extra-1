const inquirer = require("inquirer")
const {telaInicial, cadastrar, buscar } = require("./atendimento")
const fs = require('fs')

//metodo construtor
function Cadastro(nomePet, raca, nomeDono, identificador){
    this.nome = nomePet,
    this.raca = raca,
    this.nomeDono = nomeDono,
    this.identificador = identificador  //identificador baseado no length da base de dados
}


//chama a pergunta inicial
inquirer.prompt(telaInicial).then((resposta) =>{
    let opcao = resposta.opcao
    
    //armazena a base de dados para poder trabalhar
    let baseVinda = []
    baseVinda = JSON.parse(fs.readFileSync('Data_Base.json','utf-8'));

    //escolheu a acao: Cadastrar novo pet
    if (opcao === 0) {
        inquirer.prompt(cadastrar).then(infoCadastro => {
        let novoPet = new Cadastro(infoCadastro.nome, infoCadastro.raca, infoCadastro.nomeDono, baseVinda.length)
        baseVinda.push(novoPet)
        fs.writeFileSync('Data_Base.json', JSON.stringify(baseVinda), 'utf-8')
        console.log(`Dados cadastrados com sucesso!`)  //eu deveria printar Cadastro(?)
        console.log(novoPet)
        })
    }  
    
    //escolheu a acao: listar todos os pets
    if (opcao === 1) {
        const data = fs.readFileSync('Data_Base.json','utf-8');
        console.log(data)
    }

    //escolheu a acao: buscar pet por nome
    if (opcao === 2) {
        inquirer.prompt(buscar).then(pesquisa => {      

            //base de dados em formato JSON precisa virar objeto 
            for (hash in baseVinda){
                let verificar = baseVinda[hash]

                //verificando se o nome da pesquisa bate com o nome do cadastro
                if (verificar.nome == pesquisa.nomeBusca){
                    console.log(`achei o pet ${pesquisa.nomeBusca}!`)

                    //printar todos os dados do pet
                    console.log(`O nome do pet é ${verificar.nome}`)
                    console.log(`A raça do pet é ${verificar.raca}`)
                    console.log(`O nome do dono do pet é ${verificar.nomeDono}`)
                    console.log(`O identificador único do pet é ${verificar.identificador}`)
                }
            }

        })
    }
    
})
