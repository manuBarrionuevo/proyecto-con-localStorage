//Variables
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')


let tweets = []

//Event Listeners
eventListener()

function eventListener() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet)

    //Cuando el documento está listo

    document.addEventListener('DOMContentLoaded',()=>{
        tweets=JSON.parse(localStorage.getItem('tweets')) || [] //esto es porque en caso de que no haya nada le agrega un array vacio


        
        crearHTML()
    })
}



//Funciones
function agregarTweet(e) {
    e.preventDefault()

    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value

    //Validacion 
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacío')
        return //evita que se ejecuten mas lineas de codigo
    }

    const tweetObjet = {
        id: Date.now(),
        tweet //es iguala tweet: tweet
    }

    //Añadir el arreglo de twwets
    tweets = [...tweets, tweetObjet]
    //una vez agregad creo el HTML
    crearHTML()

    //Reiniciar el formulario
    formulario.reset()
}

//mostrar msj de error
function mostrarError(error) {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error
    mensajeError.classList.add('error')
    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError)

    //Elminar la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove()
    }, 3000)
}

//Muestra un estado de los teewts
function crearHTML() {


    limpiarHTML()

    if (tweets.length > 0) {
        tweets.forEach(tweet => {

            //Agregar un boton de elminiar

            const btnEliminar=document.createElement('a')
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.textContent='X'

            //Añadir la funcion de eliminar
            btnEliminar.onclick=()=>{
                borrarTweet(tweet.id)
            }

            //crear el HTML
            const li = document.createElement('li')

            //Añadir el texto
            li.textContent = tweet.tweet

            //Asignar el boton
            li.appendChild(btnEliminar)

            //Insertar en el HTML
            listaTweets.appendChild(li)
        })
    }

    sincronizarStorage()
}


//Agregar los tweets actuales a localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets))
}

//Elimina un tweet
function borrarTweet(id){
    tweets= tweets.filter(tweet=>tweet.id!==id)

    crearHTML()
}

//Limpiar HTML
function limpiarHTML() {

    //borra el primer hijo
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}


