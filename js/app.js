const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarEstablecimientos();
});

// Habilitar busqueda de establecimientos
const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {
    if (buscador.value.length > 5) {
        // buscar en la API
        ui.obtenerSugerencias(buscador.value)
    }
})