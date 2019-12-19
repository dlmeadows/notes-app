const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title already taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    let matchNote;
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse("Note removed!"));
    } else {
        console.log(chalk.red.inverse("No note found!"));
    }

    saveNotes(notesToKeep);
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.JSON', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBufer = fs.readFileSync('notes.json')
        const dataJSON = dataBufer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
    
}

const listNotes = () => {
    console.log(chalk.inverse('Your Notes'))
    loadNotes().forEach(note => {
        console.log(chalk.green.inverse(note.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)
    if (foundNote) {
        console.log(chalk.inverse(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.red.inverse('No note found with that title'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}