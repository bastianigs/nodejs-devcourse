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
    handler: function (argv) {
        notes.addNote( argv.title, argv.body );
    }
});

yargs.command({
    command: "remove",
    describe: "Remove a new note",
    handler: function() {
        console.log( "Removing the note" )
    }
})

yargs.command({
    command: "list",
    describe: "List notes",
    handler: function () {
        console.log( "Listing all available notes:" );
    }
})

yargs.command({
    command: "read",
    describe: "Read a note",
    handler: function () {
        console.log( "Reading the note:" );
    }
})


yargs.parse();

// console.log( yargs.argv );