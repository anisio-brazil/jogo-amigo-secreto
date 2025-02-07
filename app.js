let nomes = []; // Lista de nomes adicionados
let sorteados = new Set(); // Conjunto de nomes já sorteados
let ultimoSorteado = ""; // Último nome sorteado

// Função para adicionar um nome à lista
function adicionarNome() {
    let nome = document.getElementById("amigo").value.trim(); // Obtém o nome do input e remove espaços
    let erroMsg = document.getElementById("erro"); // Referência ao elemento de erro
    
    // Verifica se o nome é válido (não vazio e não numérico)
    if (!nome || !isNaN(nome)) {
        erroMsg.innerText = "Nome inválido. Digite seu nome correto.";
        return;
    }
    
    // Adiciona o nome à lista caso ainda não esteja presente
    if (!nomes.includes(nome)) {
        nomes.push(nome);
        document.getElementById("listaAmigos").innerHTML += `<li>${nome}</li>`; // Adiciona o nome à lista na interface
        document.getElementById("amigo").value = ""; // Limpa o campo de input
        erroMsg.innerText = ""; // Remove mensagens de erro
    }
}

// Função para sortear um nome aleatoriamente
function sortear() {
    if (nomes.length < 2) { // Verifica se há pelo menos 2 nomes na lista
        alert("Adicione pelo menos 2 nomes para sortear!");
        return;
    }
    
    let disponiveis = nomes.filter(nome => !sorteados.has(nome)); // Filtra os nomes ainda não sorteados
    
    // Se todos os nomes já foram sorteados, exibe mensagem de finalização
    if (disponiveis.length === 0) {
        document.getElementById("resultado").innerText = "Sorteio finalizado! Todos foram sorteados.";
        return;
    }
    
    let sorteado;
    do {
        sorteado = disponiveis[Math.floor(Math.random() * disponiveis.length)]; // Sorteia um nome aleatório
    } while (sorteado === ultimoSorteado && disponiveis.length > 1); // Evita repetir o último sorteado
    
    ultimoSorteado = sorteado; // Atualiza o último sorteado
    sorteados.add(sorteado); // Adiciona o nome ao conjunto de sorteados
    document.getElementById("resultado").innerHTML += `<li>Sorteado: ${sorteado}</li>`; // Exibe o sorteado na interface
}

// Função para sortear novamente caso a pessoa tenha tirado a si mesma
function sortearNovamente() {
    if (ultimoSorteado) { // Verifica se há um sorteio anterior
        sorteados.delete(ultimoSorteado); // Remove o último sorteado da lista de sorteados
        ultimoSorteado = "";
        sortear(); // Refaz o sorteio
    } else {
        alert("Nenhum sorteio foi realizado ainda.");
    }
}

// Função para reiniciar completamente o sorteio
function novoSorteio() {
    sorteados.clear(); // Limpa a lista de sorteados
    ultimoSorteado = ""; // Reseta o último sorteado
    document.getElementById("resultado").innerHTML = ""; // Limpa os resultados na interface
    alert("Novo sorteio iniciado! Todos os participantes estão disponíveis novamente.");
}

// Função para limpar mensagens de erro e resultado
function limparMensagem() {
    document.getElementById("resultado").innerHTML = ""; // Limpa a lista de sorteados na interface
    document.getElementById("erro").innerText = ""; // Remove mensagens de erro
}
