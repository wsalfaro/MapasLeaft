class UI {
    constructor() {

        // Instanciar la API
        this.api = new API();

        // Crear los pines con layerGroup
        this.markers = new L.LayerGroup();

        // Iniciar el mapa
        this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
        // Inicializar y obtener la propiedad del mapa
        const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + enlaceMapa + ' Contributors',
            maxZoom: 18,
        }).addTo(map);
        return map;

    }

    mostrarEstablecimientos() {
        this.api.obtenerDatos()
            .then(res => {
                const resultado = res.respuesta.results;

                // Ejecutar funcion para mostrar los pines
                this.mostrarPines(resultado)
            })
            .catch(err => console.log(err))
    }

    mostrarPines(resultado) {
        // Limpiar los markers
        this.markers.clearLayers();
        // Recorrer los establecimientos
        resultado.forEach(element => {
            // Destructuring
            const { latitude, longitude, calle, regular, premium } = element;

            // Crear Popup
            const opcionesPopUp = L.popup()
                .setContent(`
                    <p>Calle: ${calle}</p>
                    <p><b>Regular:</b> $${regular}</p>
                    <p><b>Premium:</b> $${premium}</p>
                `);

            // Agregar el pin
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopUp);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);
    }
}