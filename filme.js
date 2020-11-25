class Filme {
    constructor() {
        this.filmes = localStorage.getItem('tbFilmes') === null
        ? []
        : JSON.parse(localStorage.getItem('tbFilmes'))
    }

    salva(filme){

    if(document.getElementById('codigo').getAttribute('disabled')==='disabled'){
        this.apaga(filme.codigo)
    }
        this.filmes.push(filme) 
        localStorage.setItem('tbFilmes', JSON.stringify(this.filmes))
        alert('Filme salvo com sucesso!')

        this.atualiza()
    }

    apaga(codigo){
        let index = this.filmes.findIndex(filme => filme.codigo == codigo)
        this.filmes.splice(index, 1)

        localStorage.setItem('tbFilmes',JSON.stringify(this.filmes))
        filme.atualiza()
    }

    edita(filme){
        document.getElementById('codigo').setAttribute('disabled','disabled')
        document.getElementById('codigo').value = filme.codigo
        document.getElementById('nome').value = filme.nome
        document.getElementById('genero').value = filme.genero
        document.getElementById('lancamento').value = filme.lancamento
        document.getElementById('descricao').value = filme.descricao
    }
    
    lista(){
        const listagem = this.filmes.map((filme) => (
            `<tr>
            <td>${filme.codigo}</td>
            <td>${filme.nome}</td>
            <td>${filme.genero}</td>
            <td>${filme.lancamento}</td>
            <td>${filme.descricao}</td>
            <td>
                <button id='apagar' onClick='filme.apaga(${filme.codigo})'>
                🗑️Apagar</button>
                <button id='editar' onClick='filme.edita(${JSON.stringify(filme)})'>
                ✏️Editar</button>
            </td>
            </tr>
            `
        ))
        return (`<table border='1' class='darkTable'>
        <caption>Relação dos Filmes</caption>
        <thead>
            <th>Código</th>  
            <th>Nome</th> 
            <th>Gênero</th> 
            <th>Ano de Lançamento</th> 
            <th>Descrição</th>
        </thead>
        <tbody>${listagem}</tbody>      
        </table>
        `)
    }

    atualiza(){
        document.getElementById('listagem').innerHTML = filme.lista()
    }
}

const filme = new Filme()

document.getElementById('salvar').onclick = function ()  {
    const registro = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        genero: document.getElementById('genero').value,
        lancamento: document.getElementById('lancamento').value,
        descricao: document.getElementById('descricao').value
    } 
    filme.salva(registro)
}

window.onload = function(){
    filme.atualiza()
}