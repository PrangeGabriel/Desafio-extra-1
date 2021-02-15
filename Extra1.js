const inquirer = require("inquirer")
const {telaInicial, cadastrar, buscar } = require("./atendimento")

//metodo construtor
function Cadastro(identificador, nomePet, raca, nomeDono){
    this.identificador = identificador,
    this.nomePet = nomePet,
    this.raca = raca,
    this.nomeDono = nomeDono,
    this.viraJSON = () => JSON.stringify(this) 
}


//chama a pergunta inicial
inquirer.prompt(telaInicial).then((resposta) =>{
    let opcao = resposta.opcao
    //base de dados com alguns cadastros ja em formato JSON para conseguir pesquisar e mostra uma lista mais completa.
    let baseDados = ['{"nome":"Billy","raca":"beagle","nomeDono":"Bibi","identificador":0}',
    '{"nome":"Jurema","raca":"gato","nomeDono":"Bruney","identificador":1}','{"nome":"Lilith","raca":"gato","nomeDono":"Kikki","identificador":2}']

    //escolheu a acao: Cadastrar novo pet
    if (opcao === 0) {
        inquirer.prompt(cadastrar).then(infoCadastro => {
        infoCadastro.identificador = baseDados.length
        console.log(`As informacoes do cadastro são`, JSON.stringify(infoCadastro));
        baseDados.push(JSON.stringify(infoCadastro))
        console.log(baseDados)
        })
    }  
    
    //escolheu a acao: listar todos os pets
    if (opcao === 1) {
        console.log(baseDados);
    }

    //escolheu a acao: buscar pet por nome
    if (opcao === 2) {
        inquirer.prompt(buscar).then(pesquisa => {      

            //base de dados em formato JSON precisa virar objeto 
            for (hash in baseDados){
                let verificar = JSON.parse(baseDados[hash])

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
