function mensagens() {
    let titulo = document.getElementById("titulo").value;
    let mensagem = document.getElementById("mensagem").value;
    document.getElementById('limparmensagens').addEventListener('click', limparmensagens);

    let msg = {
        titulo: titulo,
        mensagem: mensagem
    };

    let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    mensagens.push(msg);
    localStorage.setItem("mensagens", JSON.stringify(mensagens));

    exibirMensagens(); // Chama a função para exibir as mensagens
}

function exibirMensagens() {
    let mensagensContainer = document.getElementById("mensagens");
    mensagensContainer.innerHTML = "";

    let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    
    // Agrupar mensagens por título
    let mensagensAgrupadas = mensagens.reduce((groups, msg) => {
        if (!groups[msg.titulo]) {
            groups[msg.titulo] = [];
        }
        groups[msg.titulo].push(msg.mensagem);
        return groups;
    }, {});

    // Exibir mensagens agrupadas por título
    for (let titulo in mensagensAgrupadas) {
        let bloco = document.createElement("div");
        bloco.className = "mensagem-bloco";

        let tituloElemento = document.createElement("h3");
        tituloElemento.innerText = titulo;
        bloco.appendChild(tituloElemento);

        mensagensAgrupadas[titulo].forEach(function(mensagem) {
            let mensagemDiv = document.createElement("p");
            mensagemDiv.innerText = mensagem;
            bloco.appendChild(mensagemDiv);
        });

        mensagensContainer.appendChild(bloco);
    }
}

document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    mensagens();
});

exibirMensagens();

function limparmensagens() {
    localStorage.removeItem("mensagens");
    exibirMensagens();
}


