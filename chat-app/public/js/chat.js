const socket = io()

// Elements
const $messageInput = document.querySelector('#message-input')
const $messageBtn = document.querySelector('#message-submit')
const $sharelocBtn = document.querySelector('#sharelocation')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

// ---------------------------------------------
// ---------------------------------------------
// Chatting Related
// ---------------------------------------------

socket.on('message', (message) => {
    console.log(message)

    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageBtn.addEventListener('click', (e) => {
    e.preventDefault()

    // disable button
    $messageBtn.setAttribute('disabled', 'disabled')

    socket.emit('sendMessage', $messageInput.value, (cb_error) => {
        // enable button
        $messageBtn.removeAttribute('disabled')

        if (cb_error) return console.log(cb_error)

        console.log('Message delivered!')
        $messageInput.value=''
        $messageInput.focus()
    })
})

socket.on('sendMessage', msg => {
    console.log(msg)
})

// ---------------------------------------------
// ---------------------------------------------
// Location Related
// ---------------------------------------------

socket.on('locationMessage', (msg) => {
    console.log(msg)

    const html = Mustache.render(locationTemplate, {
        url: msg.url,
        createdAt: moment(msg.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$sharelocBtn.addEventListener('click', (e) => {
    if (!navigator.geolocation) return alert('Geolocation is not supported by your browser...')

    // disable button
    $sharelocBtn.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)

        const loc = {
            lat: position.coords.latitude, 
            long: position.coords.longitude
        }
        socket.emit('sendLocation', loc, () => {
            // enable button
            $sharelocBtn.removeAttribute('disabled')
            
            console.log('Location shared successfully!')
        })
    })
})