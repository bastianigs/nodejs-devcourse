const socket = io()
const messageInput = document.querySelector('#message-input')
const messageBtn = document.querySelector('#message-submit')
const sharelocBtn = document.querySelector('#sharelocation')

socket.on('message', (msg) => {
    console.log(msg)
})

messageBtn.addEventListener('click', (e) => {
    e.preventDefault()
    socket.emit('sendMessage', messageInput.value, (cb_error) => {
        if (cb_error) return console.log(cb_error)

        console.log('Message delivered!')
    })
    messageInput.value=''
})

socket.on('sendMessage', msg => {
    console.log(msg)
})

sharelocBtn.addEventListener('click', (e) => {
    if (!navigator.geolocation) return alert('Geolocation is not supported by your browser...')

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)

        const loc = {
            lat: position.coords.latitude, 
            long: position.coords.longitude
        }
        socket.emit('sendLocation', loc, () => {
            console.log('Location shared successfully!')
        })
    })
})