const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

// command line related
// const [ , , cmd, ...params] = process.argv;

// if (cmd === "add") {
//     console.log( "Adding notes!" );
// } else if (cmd === "remove") {
//     console.log( "Removing note!" );
// } else console.log( "Unknown command." );

// customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note content",
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.addNote( argv.title, argv.body );
    }
});

yargs.command({
    command: "remove",
    describe: "Remove a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.removeNote( argv.title );
    }
})

yargs.command({
    command: "list",
    describe: "List notes",
    handler () {
        notes.listNotes();
    }
})

yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.readNote( argv.title );
    }
})


yargs.parse();

// console.log( yargs.argv );