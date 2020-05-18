class API {
    async obtenerDatos() {

        const total = 100;
        // Obtener datos desde API
        const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);

        // retorar JSON
        const respuesta = await datos.json();
        
        return {
            respuesta
        }
    }
}