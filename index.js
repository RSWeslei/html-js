const formulario = document.getElementById('formulario')
const pessoasCadastradas = document.getElementById('pessoasCadastradas')
const tableName = 'pessoas'

popularTabelaAoRecarregar()
adicionarEventoNosBotoesDeExclusao()
preencherDados()

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    let pessoa = arrayToObject($('#formulario').serializeArray())
    
    let pessoasCadastradas = JSON.parse(localStorage.getItem(tableName)) || []

    let possuiCadastro = pessoasCadastradas
        .map(pessoaCadastrada => (JSON.parse(pessoaCadastrada)).email) 
        .includes(pessoa.email); 

    if (possuiCadastro){
        alert('Pessoa já cadastrada')
        return
    }

    pessoasCadastradas.push(JSON.stringify(pessoa))
    localStorage.setItem(tableName, JSON.stringify(pessoasCadastradas))
    adicionarPessoaNaTabela(pessoa)
    adicionarEventoNosBotoesDeExclusao()
    preencherDados()
})

function adicionarEventoNosBotoesDeExclusao()
{
    $(".exclusao").toArray().forEach(botaoExclusao =>{
        botaoExclusao.removeEventListener('click', (evento) => excluirPessoa(evento))
        console.log('excluiu');
    })

    $(".exclusao").toArray().forEach(botaoExclusao =>{
        botaoExclusao.addEventListener('click', (evento) => {
            excluirPessoa(evento)
        })
    }) 
}

function excluirPessoa(evento){

    let emailExcluir = evento.target.dataset.email
    if (!confirm(`Deseja excluir o email ${emailExcluir}?`)){
        return
    }

    let pessoasCadastradas = JSON.parse(localStorage.getItem(tableName)) || []
    pessoasCadastradas = pessoasCadastradas.map(pessoa => JSON.parse(pessoa))

    let indexExcluir = pessoasCadastradas.findIndex(pessoa => pessoa.email == emailExcluir)

    console.log(indexExcluir)

    pessoasCadastradas.splice(indexExcluir, 1)

    pessoasCadastradas = pessoasCadastradas.map(pessoa => JSON.stringify(pessoa))
    localStorage.setItem(tableName, JSON.stringify(pessoasCadastradas))
    document.location.reload()
}

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
            <td><button class="btn btn-outline-danger exclusao" data-email="${pessoa.email}">
                Excluir
            </button></td>
        </tr>
    `
    pessoasCadastradas.appendChild(tr)
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

function preencherDados(){
    let nome
    let email
    let senha
    
    nome = (Math.random() + 1).toString(36).substring(2)
    email = nome + '@gmail.com'
    senha = (Math.random() + 1).toString(36).substring(2)
    regiao = 3
    
    console.log(document.getElementById('nome').value);
    document.getElementById('nome').value = nome
    document.getElementById('email').value = email
    document.getElementById('senha').value = senha
    document.getElementById('senhaConfirmar').value = senha
    document.getElementById('regiao').value = 'Sul'
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