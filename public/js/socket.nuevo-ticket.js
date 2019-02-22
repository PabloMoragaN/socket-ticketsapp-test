//logica de nuevo-ticket.html


//Comando para establecer la conexion

var socket = io();

var label = $('#lblNuevoTicket');



socket.on('connect', function() {
    console.log('Usuario conectado');
});

socket.on('disconnect', function() {
    console.log('Usuario desconectado');
});



//socket de nuevo-ticket a la escucha de que se emita una señal 'estadoActual' si la recibe escribe el ticket acutal en label
socket.on('estadoActual', function(resp) {

    label.text(resp.actualTicket);
});



$('#btnChat').on('click', function() {
    socket.emit('chatea', null, function(mensaje) {
        //var inputValue = $('#inputChat');

        var inputValue = document.getElementById('#inputChat').value;
        console.log(inputValue);



    });

});


//JQuery de todos lo botones en nuevo-ticket.html
$('#btnTicket').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);


    });
})