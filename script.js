const input = document.querySelector("#item-input");
const addBtn = document.querySelector("#add-btn");
const itemList = document.querySelector("#item-list");

let lista = JSON.parse(localStorage.getItem("compras")) || [];

// Atualiza a lista na tela
function renderLista() {
  itemList.innerHTML = "";

  lista.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.nome;

    if (item.comprado) {
      li.classList.add("comprado");
    }

    li.addEventListener("click", () => {
      lista[index].comprado = !lista[index].comprado;
      salvarLista();
      renderLista();
    });

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita conflito com o clique no li
      lista.splice(index, 1);
      salvarLista();
      renderLista();
    });

    li.appendChild(btnRemover);
    itemList.appendChild(li);
  });
}

function salvarLista() {
  localStorage.setItem("compras", JSON.stringify(lista));
}

addBtn.addEventListener("click", () => {
  const nomeItem = input.value.trim();
  if (nomeItem) {
    lista.push({ nome: nomeItem, comprado: false });
    input.value = "";
    salvarLista();
    renderLista();
  }
});

// Renderiza ao carregar a página
renderLista();
