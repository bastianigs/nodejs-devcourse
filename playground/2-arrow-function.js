// arrow functions
// => will inherit the "this" from the context they are created in

const event = {
    name: "Birthday Party",
    guestList: ["Sebastian","Ioan","Igescu"],
    printGuestList() { // this shorthand is for a normal = function() {}
        // arrow function wouldn't work here because "this" won't be the object scope, but the outter scope
        console.log( "Guest List for " + this.name );

        this.guestList.forEach( guest => {
            console.log( guest + " is attending " + this.name );
        })
    }
}

event.printGuestList();