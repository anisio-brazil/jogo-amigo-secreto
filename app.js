let nomes = []; // Lista de nomes adicionados
let sorteados = new Set(); // Conjunto de nomes já sorteados
let ultimoSorteado = ""; 


function adicionarNome() {
    let nome = document.getElementById("amigo").value.trim(); 
    let erroMsg = document.getElementById("erro"); 
    
    
    if (!nome || !isNaN(nome)) {
        erroMsg.innerText = "Nome inválido. Digite seu nome correto.";
        return;
    }
    
   
    if (!nomes.includes(nome)) {
        nomes.push(nome);
        document.getElementById("listaAmigos").innerHTML += `<li>${nome}</li>`; 
        document.getElementById("amigo").value = ""; 
        erroMsg.innerText = ""; 
    }
}


function sortear() {
    if (nomes.length < 2) { 
        alert("Adicione pelo menos 2 nomes para sortear!");
        return;
    }
    
    let disponiveis = nomes.filter(nome => !sorteados.has(nome)); 
    
   
    if (disponiveis.length === 0) {
        document.getElementById("resultado").innerText = "Sorteio finalizado! Todos foram sorteados.";
        return;
    }
    
    let sorteado;
    do {
        sorteado = disponiveis[Math.floor(Math.random() * disponiveis.length)]; 
    } while (sorteado === ultimoSorteado && disponiveis.length > 1); 
    
    ultimoSorteado = sorteado; 
    sorteados.add(sorteado); 
    document.getElementById("resultado").innerHTML += `<li>Sorteado: ${sorteado}</li>`; 
}


function sortearNovamente() {
    if (ultimoSorteado) { 
        sorteados.delete(ultimoSorteado); 
        ultimoSorteado = "";
        sortear(); 
    } else {
        alert("Nenhum sorteio foi realizado ainda.");
    }
}


function novoSorteio() {
    sorteados.clear(); 
    ultimoSorteado = ""; 
    document.getElementById("resultado").innerHTML = ""; 
    alert("Novo sorteio iniciado! Todos os participantes estão disponíveis novamente.");
}


function limparMensagem() {
    document.getElementById("resultado").innerHTML = ""; 
    document.getElementById("erro").innerText = ""; 
}
