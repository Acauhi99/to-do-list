document.addEventListener("DOMContentLoaded", () => {
  const newItemInput = document.getElementById("input-novo-item")
  const buttonAddItem = document.getElementsByClassName("botao-adicionar")[0]
  const listItens = document.getElementsByTagName("ul")[0]

  newItemInput.addEventListener("input", () => {
    if (newItemInput.value) {
      buttonAddItem.classList.remove("desativado")
      buttonAddItem.disabled = false
    } else {
      buttonAddItem.classList.add("desativado")
      buttonAddItem.disabled = true
    }
  });

  buttonAddItem.addEventListener("click", (evento) => {
    evento.preventDefault()
    addNewItem(newItemInput.value)
  });

  const newlistItens = listItens.getElementsByTagName("li")
  for (let item of newlistItens) {
    addEditListeners(item)
    addSaveListeners(item)
  }

  function addNewItem(texto) 
  {
    const item = document.createElement("li")
    const input = document.createElement("input")

    input.disabled = true
    input.value = texto

    const containerButtonsEditDelete = document.createElement("div")
    const buttonEdit = document.createElement("button")
    const buttonDelete = document.createElement("button")

    buttonEdit.innerHTML = "Editar"
    buttonDelete.innerHTML = "Apagar"

    buttonEdit.classList.add("botao-editar")
    buttonDelete.classList.add("botao-apagar")

    containerButtonsEditDelete.classList.add("container-botoes-editar-apagar")
    containerButtonsEditDelete.append(buttonEdit)
    containerButtonsEditDelete.append(buttonDelete)

    const containerButtonsSaveCancel = document.createElement("div")
    const buttonSave = document.createElement("button")
    const buttonCancel = document.createElement("button")

    buttonSave.innerText = "Salvar"
    buttonCancel.innerText = "Cancelar"

    buttonSave.classList.add("botao-salvar")
    buttonCancel.classList.add("botao-cancelar")

    containerButtonsSaveCancel.append(buttonSave)
    containerButtonsSaveCancel.append(buttonCancel)
    containerButtonsSaveCancel.classList.add("container-botoes-salvar-cancelar", "esconder-botoes")

    item.append(input)
    item.append(containerButtonsEditDelete)
    item.append(containerButtonsSaveCancel)
    listItens.append(item)

    newItemInput.value = ""
    buttonAddItem.classList.add("desativado")
    buttonAddItem.disabled = true

    addEditListeners(item)
    addSaveListeners(item)
  }

  function addEditListeners(item)
  {
    const buttonEdit = item.getElementsByClassName("botao-editar")[0]

    buttonEdit.addEventListener("click", () => {
      const input = buttonEdit.parentNode.parentNode.getElementsByTagName("input")[0]
      input.disabled = false

      const fimInput = input.value.length
      input.setSelectionRange(fimInput, fimInput)
      input.focus()

      const botoesSalvarCancelar = buttonEdit.parentNode.parentNode.getElementsByClassName("container-botoes-salvar-cancelar")[0]

      botoesSalvarCancelar.classList.remove("esconder-botoes")
      buttonEdit.parentNode.classList.add("esconder-botoes")

      const conteudoItem = input.value
      const botaoCancelar = botoesSalvarCancelar.getElementsByClassName("botao-cancelar")[0]

      botaoCancelar.addEventListener("click", () => {
        input.value = conteudoItem
        input.disabled = true

        botoesSalvarCancelar.classList.add("esconder-botoes")
        buttonEdit.parentNode.classList.remove("esconder-botoes")
      })
    })
  }

  function addSaveListeners(item)
  {
    const buttonSave = item.getElementsByClassName("botao-salvar")[0]

    buttonSave.addEventListener("click", () => {
      const input = buttonSave.parentNode.parentNode.getElementsByTagName("input")[0]
      input.disabled = true

      const botoesEditarApagar = buttonSave.parentNode.parentNode.getElementsByClassName("container-botoes-editar-apagar")[0]

      botoesEditarApagar.classList.remove("esconder-botoes")
      buttonSave.parentNode.classList.add("esconder-botoes")
    })
  }

  listItens.addEventListener("click", (evento) => {
    if (evento.target && evento.target.matches(".botao-apagar")) {
      evento.target.parentNode.parentNode.remove()
    }
  })

})