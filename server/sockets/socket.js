const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();



io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();


        callback(siguiente);
    });


    //Carga de el ticket actual en el label de nuevo-ticket.hmtl
    client.emit('estadoActual', {
        actualTicket: ticketControl.getUltimoTicket(), //retorna this.ultimo
        ultimos4: ticketControl.getUltimos4()
    });

    //Atender ticket
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'Escritorio es necesario'

            });
        }


        let ticketAtendido = ticketControl.atenderTicket(data.escritorio);

        callback(ticketAtendido);

        client.broadcast.emit('ultimos4', {

            ultimos4: ticketControl.getUltimos4()
        });



    });



});


// client.emit('enviarMensaje', {
//     usuario: 'Administrador',
//     mensaje: 'Bienvenido a esta aplicación'
// });



// client.on('disconnect', () => {
//     console.log('Usuario desconectado');
// });

// // Escuchar el cliente
// client.on('enviarMensaje', (data, callback) => {

//     console.log(data);

//     client.broadcast.emit('enviarMensaje', data);


//     // if (mensaje.usuario) {
//     //     callback({
//     //         resp: 'TODO SALIO BIEN!'
//     //     });

//     // } else {
//     //     callback({
//     //         resp: 'TODO SALIO MAL!!!!!!!!'
//     //     });
//     // }



// });