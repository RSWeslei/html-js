const formulario = document.getElementById('formulario')
const pessoaCadastradas = document.getElementById('pessoasCadastradas')
const tableName = 'pessoas'

popularTabelaAoRecarregar()

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    let pessoa = arrayToObject($('#formulario').serializeArray())
    adicionarPessoaNaTabela(pessoa)

    let pessoas = JSON.parse(localStorage.getItem(tableName)) || []
    pessoas.push(JSON.stringify(pessoa))
    localStorage.setItem(tableName, JSON.stringify(pessoas))
})

function popularTabelaAoRecarregar() {
    let pessoasLocalStorage = JSON.parse(localStorage.getItem(tableName)) || []
    pessoasLocalStorage.forEach(pessoa => {
        pessoa = JSON.parse(pessoa)
        adicionarPessoaNaTabela(pessoa)
    })
}

function adicionarPessoaNaTabela(pessoa) {
    let tr = document.createElement('tr')
    tr.innerHTML = `
        <tr>
            <td>${pessoa.nome}</td>
            <td>${pessoa.email}</td>
            <td>${pessoa.senha}</td>
            <td ${mudarCorRegiao(pessoa.regiao)}>${pessoa.regiao}</td>
        </tr>
    `
    pessoaCadastradas.appendChild(tr)
}

function mudarCorRegiao(regiao)
{
    corRegiao = {
        "Sul": 'blue',
        "Sudeste": 'red',
        "Nordeste": 'black',
        "Norte": 'green',
        "Centro-Oeste" : 'gray'
    }
    return `Style="color: ${corRegiao[regiao]}"` 
}

// o parametro "array" deve ser gerado a partir da funcao 
// .serializeArray() do jQuery para funcionar corretamente
function arrayToObject(array) {
    let object = {}
    array.forEach(campo => {
        object[campo.name] = campo.value
    });
    return object
}