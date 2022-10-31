const socket = io()

// Elements
const $messageInput = document.querySelector('#message-input')
const $messageBtn = document.querySelector('#message-submit')
const $sharelocBtn = document.querySelector('#sharelocation')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})

const autoscroll = () => {
    // New message content
    const $newMessage =  $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible Height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight - 5 <= scrollOffset) { // used John's fix (5 as tolerance)
        $messages.scrollTop = $messages.scrollHeight
    }
}

// ---------------------------------------------
// ---------------------------------------------
// Chatting Related
// ---------------------------------------------

socket.on('message', (message) => {
    console.log(message)

    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
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
        username: msg.username,
        url: msg.url,
        createdAt: moment(msg.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
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

//-----------------------------------------

socket.emit('join', {username, room}, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })

    document.querySelector('#sidebar').innerHTML = html
})