const fs = require("fs");
const chalk = require("chalk");
const notesPath = 'notes.json';

const addNote = (title,body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find( note => note.title === title );

    debugger

    if (duplicateNote) console.log( chalk.red.inverse("Note title taken!") );
    else {
        notes.push({
            title,
            body
        });

        saveNotes( notes );
        console.log( chalk.green.inverse("New note was added!") );
    }
}

const listNotes = () => {
    const notes = loadNotes();

    console.log( chalk.black.bgWhite("Your notes...") );
    notes.forEach( (note, idx) => console.log( chalk.black.bgWhite(idx + "."), chalk.green.bold(note.title) + ": " + note.body ));
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find( note => note.title === title );

    if (note) console.log( chalk.green("Reading ") + chalk.black.bgWhite(title) + ": " + chalk.bold(note.body) );
    else console.log( chalk.red("Unknown note title.") );
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(notesPath, dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(notesPath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

const removeNote = noteTitle => {
    const notes = loadNotes();
    const notesToKeep = notes.filter( note => note.title !== noteTitle);

    if (notes.length === notesToKeep.length) console.log( chalk.bgRed("-- Unknown Note Title.") );
    else {
        console.log( chalk.bgGreen(">> Removed note with title: ") + chalk.black.bgWhite(noteTitle) );
        saveNotes(notesToKeep);
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}