const fs = require("fs");
const notesPath = 'notes.json';

const getNotes = function () {
    return "Your notes...";
}

const addNote = function (title,body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter( function (note) {
        return note.title === title;
    });

    if (duplicateNotes.length) console.log( "Note title taken!" );
    else {
        notes.push({
            title,
            body
        });
    
        saveNotes( notes );
        console.log( "New note was added!" );
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(notesPath, dataJSON);
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync(notesPath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes,
    addNote
}