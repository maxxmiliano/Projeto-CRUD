'use scrict'
// trabalhando com local storage
// trabalhando com modal
const openModal = () => document.getElementById('modal')
  .classList.add('active')

 const closeModal = () =>{
  document.getElementById('modal').classList.remove('active')
  clearFields()
 } 
   



 // criando funcoes 
 const getLocalstorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
 const setLocalstorage = (dbClient) => localStorage.setItem("db_client" , JSON.stringify(dbClient))
  //inicio dos eventos

 

 const createClient = (client) => { //create
   const dbClient = getLocalstorage()
   dbClient.push (client)
   setLocalstorage(dbClient)
 }

 const updateClient = (index, client) => {
  const dbClient = readClient()
  dbClient[index] = client
  setLocalstorage(dbClient)
 }

 const deleteClient = (index) => {
  const dbClient = readClient()
  dbClient.splice(index, 1)
  setLocalstorage(dbClient)
 }

 const readClient = () => getLocalstorage()
 
 const isValidFields = () => {
    return document.getElementById('form').reportValidity()
 }

 const clearFields = () => {
  const fields = document.querySelectorAll('.modal-field')
  fields.forEach(field => field.value = "")
  document.getElementById('nome').dataset.index = 'new'
  document.querySelector(".modal-header>h2").textContent = 'novo cliente'
 }

 const saveClient = () => {
  if (isValidFields()) {
    const client = {
      nome:document.getElementById('nome').value,
      email: document.getElementById('email').value,
      celular: document.getElementById('celular').value,
      cep: document.getElementById('cep').value
     }
     const index = document.getElementById('nome').dataset.index
      if (index == 'new') {
        createClient(client)
        updateTable()
        closeModal()
      }
      else{
        updateClient(index, client)
        updateTable()
        closeModal()
      }
     
     
  }
}

const createRow = (client, index) => {
  const newRow = document.createElement('tr')

  newRow.innerHTML = `

       <td>${client.nome}</td>
       <td>${client.email}</td>
       <td>${client.celular}</td>
       <td>${client.cep}</td>

       <td>
          <button type="button" class="button green" id="edit-${index}" >editar</button>
          <button type="button" class="button red" id="delete-${index}" >excluir</button>
       </td>
  `
    document.querySelector('#tableC>tbody').appendChild(newRow)
}


   const editClient = (index) => {
      const client = readClient()[index]
      client.index = index
      fillFields(client)
      document.querySelector(".modal-header>h2").textContent = `editando ${client.nome}`
      openModal()
   }

   const clearTable = () => {
    const rows = document.querySelectorAll('#tableC tr')
    rows.forEach(row => row.parentNode.removeChild(row))
  }

 const updateTable = () => {
   const dbClient = readClient()
   clearFields()
   dbClient.forEach(createRow)
}

   const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cep').value = client.cep
    document.getElementById('nome').dataset.index = client.index
   }

 const editDelete = (event) => {

    if (event.target.type == 'button') {

          const [action, index] = event.target.id.split('-')

         if (action == 'editar') {
          editClient(index)
         }
         else{
          const client = readClient()[index]
          const response = confirm(`realmente deletar ${client.nome}`)
            if (response) {
              deleteClient(index)
              updateTable()
            }
          
         }
    }
 }

 

  

updateTable()


  document.querySelector('#tableC>tbody')
  .addEventListener('click', editDelete)

  document.getElementById('cadastrocliente') 
  .addEventListener('click', openModal)

  document.getElementById('modalClose') 
  .addEventListener('click', closeModal) 
 

  document.getElementById('salvar')
  .addEventListener('click', saveClient)

  document.getElementById('cancelar')
    .addEventListener('click', closeModal)