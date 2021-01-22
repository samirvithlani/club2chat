const socket = io()

socket.on('message',(message)=>{
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit',(e)=>{

    
    e.preventDefault()
    const message = e.target.message.value
    socket.emit('sendMessage',message)
})

document.querySelector('#send-location').addEventListener('click',()=>{

    if(!navigator.geolocation){
        return alert('location is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((position)=>{

      socket.emit('sendLocation',{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
      })
    })
})



/* socket.on('countUpdated', (count) => {

    console.log("count updated...", count)
})

/* document.querySelector("#increment").addEventListener('click', () => {
    socket.emit('increment')
}) */
/* document.querySelector("#increment").addEventListener('click', () => {
    socket.emit('increment')
})  */





