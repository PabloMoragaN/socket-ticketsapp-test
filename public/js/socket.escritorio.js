//Comando para establecer la conexion

var socket = io();

var searchParams = new URLSearchParams(window.location.search); //Parametros de url

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

$('#h1Escri').text('Escritorio ' + escritorio);

let Ticket

$('#btnAtender').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets') {
            return alert('No hay mas tickets');
        }

        label.text('Ticket ' + resp.numero);
    });

});