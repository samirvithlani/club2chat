const socket = io()

//elements

const $messasgeForm = document.querySelector('#message-form')
const $messasgeFormInput = document.querySelector('input')
const $messasgeFormButton = document.querySelector('button')
const $messages = document.querySelector('#messages')
const messagTemplate = document.querySelector('#messags-template').innerHTML
socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messagTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforebegin', html)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {


    e.preventDefault()
    //disable
    $messasgeFormButton.setAttribute('disabled', 'disabled')
    const message = e.target.message.value
    socket.emit('sendMessage', message, () => {

        $messasgeFormButton.removeAttribute('disabled')
        $messasgeFormInput.value = ''
        $messasgeFormInput.focus()
        console.log('message deliverd..')
    })

})

document.querySelector('#send-location').addEventListener('click', () => {

    if (!navigator.geolocation) {
        return alert('location is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
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





