function abrirModal(){
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
    const criarTarefa = document.getElementById("criarTarefa");
    criarTarefa.classList.add("active");
}


function fecharModal(){
     const overlay = document.getElementById("overlay");
    overlay.classList.remove("active");
    const criarTarefa = document.getElementById("criarTarefa");
    criarTarefa.classList.remove("active");
}

function buscarTarefas(){
    fetch("http://localhost:3000/tarefas")
    .then(res => res.json())
    .then(res =>{
        inserirTarefas(res)
    })
}buscarTarefas();

function inserirTarefas(listaDeTarefas){
    if(listaDeTarefas.length > 0){
        lista.innerHTML = ""
        listaDeTarefas.map( tarefa => {
            lista.innerHTML += ` <li>
                    <h5>${tarefa.titulo}</h5>
                    <p>${tarefa.descricao}</p>

                    <div class="delete">
                        <img src="icon/trash-can.png" alt="delete" onclick="deletarTarefa(${tarefa.id})">
                    </div>

                </li>`
            

        })
    }
}

function novaTarefa() {
    event.preventDefault();
    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value    
    };

    fetch("http://localhost:3000/tarefas/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tarefa)
    })
    .then(res => res.json())
    .then(res => {
        fecharModal()
        buscarTarefas(); 
        let form = document.querySelector("#criarTarefas form");
        form.reset();
    });

}

function deletarTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(res => {
        buscarTarefas()
    })
}

function pesquisarTarefa() {
    const busca = document.getElementById("busca");
    const termo = busca.value.toLowerCase();
    const lis = document.querySelectorAll("#lista li");

    lis.forEach(li => {
        const titulo = li.querySelector("h5").innerText.toLowerCase();

        if (titulo.includes(termo)) {
            li.style.display = ""; // mostra
        } else {
            li.style.display = "none"; // esconde
        }
    });
}

