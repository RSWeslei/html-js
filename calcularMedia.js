const titulo = document.querySelector('#titulo')

const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    let aluno = prompt('Qual o nome do aluno?')
    if (!aluno) {
        return alert('Precisa informar o nome do aluno')
    }
    let media
    let peso, somaPesos = 0
    let nota, somaNotas = 0

    while (confirm('Deseja lançar uma nova nota?')) {
        nota = Number(prompt('Informe a nota:'))
        peso = Number(prompt('Informe o peso:'))
        somaNotas += nota * peso
        somaPesos += peso
    }

    if (somaPesos > 0){
        media = somaNotas / somaPesos
        alert(`A média do aluno ${aluno} foi ${media.toFixed(2)}`)
    }
    else {
        alert('Nenhuma nota informada!')
    }
})