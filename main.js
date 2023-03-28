'use scrict'
// trabalhando com local storage
// trabalhando com modal
const openModal = () => document.getElementById('modal')
  .classList.add('active')

 const closeModal = () => document.getElementById('modal')
  .classList.remove('active')

 const tempClient = {
   nome:"miliano",
   email:"miliano@gmail.com",
   celular:"67999566889",
   cep:"79985200"
}

 // criando funcoes 
 const getLocalstorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
 const setLocalstorage = (dbClient) => localStorage.setItem("db_client" , JSON.stringify(dbClient))
  //inicio dos eventos

 const readClient = () => getLocalstorage()

 const createClient = (client) => { //create
   const dbClient = getLocalstorage()
   dbClient.push (client)
   setLocalstorage(dbClient)
 }

 const updateClient = (index,client) => {
  const dbClient = readClient()
  dbClient[index] = client
  setLocalstorage(dbClient)
 }

 const deleteClient = (index) => {
  const dbClient = readClient()
  dbClient.splice(index,1)
  setLocalstorage(dbClient)
 }
 
 const isValidFields =() => {
  
 }

 const saveclient = () => {
  if (isValidFields()) {
     console.log ("cadastro cliente")
  }
}

document.getElementById('cadastrocliente') 
  .addEventListener('click', openModal)

 document.getElementById('modalClose') 
  .addEventListener('click', closeModal) 
  // interacao com html,css

  document.getElementById('salvar')
  add.addEventListener('click', saveclient)