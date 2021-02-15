
const telaInicial = [
{
    type: 'list',
    name: 'opcao',
    message: 'O que você quer fazer?',
    required: true,
    choices: [
    {
        name: 'Cadastrar novo pet',
        value: 0,
    },
    {
        name: 'Listar todos os pets cadastrados',
        value: 1,
    },        
    {
        name: 'Buscar pet por nome',
        value: 2,
    }       
    ]
}
]

const cadastrar = [
{
    type: 'input',
    name: 'nome',
    message: 'Qual o nome do pet',
},
{
    type: 'input',
    name: 'raca',
    message: 'Qual a raça do pet?',
},
{
    type: 'input',
    name: 'nomeDono',
    message: 'Qual o nome do dono?',
}
]

const buscar = [
{
    type: 'input',
    name: 'nomeBusca',
    message: 'Qual é o nome do pet que deseja buscar?',
}
]

module.exports = {
telaInicial,
cadastrar,
buscar,
}
