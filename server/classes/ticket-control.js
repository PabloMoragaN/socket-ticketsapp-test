const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;
    }

}





//Elementos Emascript 6 
class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');


        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarConteo();
        }
    }


    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;

    }


    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {

        return this.ultimos4;
    }


    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;

        this.tickets.shift(); //elimina el primer elemento del array

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //Los ultimos4 valen para la pantalla de escritorios
        this.ultimos4.unshift(atenderTicket); //agrega al inicio del arreglo

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo elemento

        }

        console.log('Ultimos 4:');
        console.log(this.ultimos4);
        this.grabarArchivo();

        return atenderTicket;

    }


    //Cada nuevo dia, se reinicia proceso
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();

    }


    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);


    }

}

module.exports = {

    TicketControl

}