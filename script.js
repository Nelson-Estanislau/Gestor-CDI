// Função para adicionar uma nova linha à tabela
function adicionarLinha(descricao) {
    const table = document.getElementById('consumoTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const descricaoCell = newRow.insertCell(0);
    descricaoCell.classList.add('editable'); // Adicionando a classe 'editable'
    descricaoCell.innerText = descricao; // Preenche a descrição diretamente

    for (let i = 1; i <= 31; i++) {
        const cell = newRow.insertCell(i);
        cell.classList.add('editable'); // Adicionando a classe 'editable'
        cell.setAttribute('contenteditable', 'true'); // Permite edição das células
        cell.addEventListener('input', function() {
            atualizarTotal(newRow); // Atualiza o total assim que a célula é editada
        });
    }

    const totalCell = newRow.insertCell(32);
    totalCell.innerText = '0';

    const acoesCell = newRow.insertCell(33);
    const removerButton = document.createElement('button');
    removerButton.innerText = 'Remover';
    removerButton.onclick = function() {
        table.deleteRow(newRow.rowIndex - 1);
    };
    acoesCell.appendChild(removerButton);

    atualizarTotal(newRow); // Atualiza o total assim que a linha é adicionada
}

// Função para atualizar o total da linha
function atualizarTotal(row) {
    let total = 0;
    for (let i = 1; i <= 31; i++) {
        const value = parseInt(row.cells[i].innerText) || 0;
        total += value;
    }
    row.cells[32].innerText = total;
}

// Função para preencher todos os dias com a quantidade inserida
function preencherTodosOsDias() {
    const quantidade = document.getElementById("quantidadeTodosDias").value;

    if (!quantidade) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    // Preenche a quantidade para todos os dias na linha recém-adicionada
    const table = document.getElementById('consumoTable').getElementsByTagName('tbody')[0];
    const lastRow = table.rows[table.rows.length - 1];

    for (let i = 1; i <= 31; i++) {
        lastRow.cells[i].innerText = quantidade; // Define a quantidade para todos os dias
    }

    // Atualiza o total da linha com a nova quantidade
    atualizarTotal(lastRow);
}

// Função para processar o arquivo CSV e preencher a lista suspensa
function processFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const csvData = e.target.result;
        const rows = csvData.split('\n');
        const dropdown = document.getElementById("dropdown");

        // Limpar o dropdown antes de adicionar novos itens
        dropdown.innerHTML = '<option value="">Selecione um item</option>';

        // Adicionar itens ao dropdown a partir do CSV
        rows.forEach(row => {
            const cols = row.split(',');
            cols.forEach(col => {
                const option = document.createElement("option");
                option.value = col.trim();
                option.textContent = col.trim();
                dropdown.appendChild(option);
            });
        });
    };

    // Ler o arquivo CSV como texto
    reader.readAsText(file);
}

// Função para preencher automaticamente a descrição do consumo na tabela
document.getElementById('dropdown').addEventListener('change', function() {
    const descricao = this.value; // Obter o valor selecionado

    if (descricao) {
        // Se um medicamento for selecionado, insere a linha automaticamente
        adicionarLinha(descricao);
    }
});

// Função para imprimir a tabela
function imprimirTabela() {
    window.print();
}

// Função para voltar à página principal
function voltarPaginaPrincipal() {
    window.location.href = 'index.html'; // Nome do arquivo HTML da página principal
}

// Função para formatar o campo "Data Inicial" automaticamente com barras
document.getElementById('dataInicial').addEventListener('input', function(event) {
    let value = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    // Formatação da primeira data (DD/MM/AAAA)
    if (value.length <= 2) {
        value = value.replace(/(\d{2})/, '$1'); // Coloca a barra após o dia (DD)
    } else if (value.length <= 4) {
        value = value.replace(/(\d{2})(\d{2})/, '$1/$2'); // Coloca a barra após o mês (MM)
    } else if (value.length <= 8) {
        value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); // Coloca a barra após o ano (AAAA)
    } else if (value.length > 10) {
        value = value.slice(0, 10); // Limita a 10 caracteres (DD/MM/AAAA)
    }

    event.target.value = value; // Atualiza o valor do campo com as barras inseridas
});

// Função para formatar o campo "Data Final" automaticamente com barras
document.getElementById('dataFinal').addEventListener('input', function(event) {
    let value = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    
    // Formatação da segunda data (DD/MM/AAAA)
    if (value.length <= 2) {
        value = value.replace(/(\d{2})/, '$1'); // Coloca a barra após o dia (DD)
    } else if (value.length <= 4) {
        value = value.replace(/(\d{2})(\d{2})/, '$1/$2'); // Coloca a barra após o mês (MM)
    } else if (value.length <= 8) {
        value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); // Coloca a barra após o ano (AAAA)
    } else if (value.length > 10) {
        value = value.slice(0, 10); // Limita a 10 caracteres (DD/MM/AAAA)
    }

    event.target.value = value; // Atualiza o valor do campo com as barras inseridas
});
