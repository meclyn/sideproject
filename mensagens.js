function mensagens(){

    let titulo = document.getElementById("titulo").value;
    let mensagem = document.getElementById("mensagem").value;


    let msg = {
        titulo: titulo,
        mensagem: mensagem
    }

    let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    mensagens.push(msg)
    localStorage.setItem("mensagens", JSON.stringify(mensagens))
    
    exibirMensagens(); //Chama a função para a exibir as mensagens
    }

    function exibirMensagens(){
        let mensagensContainer = document.getElementById("mensagens");
        mensagensContainer.innerHTML = "";

        let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
        mensagens.forEach(function(msg) {
            let mensagemDiv = document.createElement("div");
            mensagemDiv.innerHTML = "<h3>" + msg.titulo + "</h3><p>" + msg.mensagem + "</p";
            mensagensContainer.appendChild(mensagemDiv);
        });
        


    }

    exibirMensagens();
    







