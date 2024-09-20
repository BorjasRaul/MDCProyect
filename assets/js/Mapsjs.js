let lat, long
function getGeo() {

    if (navigator && navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(geoOk, geoError)

    }

}
function geoOk(position) {

    console.log(position);
    showLatLogn(position.coords.latitude, position.coords.longitude)
    initMap2(position.coords.latitude, position.coords.longitude)
}

function geoError(error) {

    if (error.code == 1) {
        console.log("El usuario nego el permiso")
        alert("El usuario nego el permiso")
    } else if (error.code == 2) {
        console.log("No se puede recuperar la Ubicacion")
        alert("No se puede recuperar la ubicacion")
    } else if (error.code == 3) {
        console.log("Expiro el tiempo de respuesta")
        alert("Expiro el tiempo de respuesta")
    } else {
        console.log("Error: " + error.code)
        alert("Error: " + error.code)
    }
    // <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyCWeeateTaYGqsHhNcmoDfT7Us-vLDZVPs&amp;sensor=false&amp;language=en"></script>
}

function showLatLogn(lat, long) {
    lat = 19.9267768;
    long = -96.8538481;
    var geocoder = new google.maps.Geocoder()// esto servira para serializar las coordenadas
    var milocalizacion = new google.maps.LatLng(lat, long);// convierte mis coordenadas en el formato para el mapa de googlle
    console.log(milocalizacion)
    //Generamos la direccion
    geocoder.geocode({ 'latLng': milocalizacion }, processGeocoder)

}
function processGeocoder(result, status) {

    console.log(result);
    console.log(status);
    if (status == google.maps.GeocoderStatus.OK) {
        //esperemos los resutlados de google para aobtnerr una direcion real en lugar de solo coordenadas
        if (result[0]) {
            var direccion = result[0].formatted_address;
            //buscamos (usando jquery) el elemento # direccion y colocamos la direcion que nos respondio google
            $("#direccion").html(direccion);
        } else {
            error("Google no retorno ningun resultado")
        }
    } else {
        error("Google marco un error")
    }
}
let map;
async function initMap() {

    const { map } = await google.maps.importLibrary("maps");

}
function initMap2(lat, long) {
    lat = 19.9267768;
    long = -96.8538481;
    //genero la informacion para obtner un mapa desde google
    var miscoordenadas = new google.maps.LatLng(lat, long);
    //configuro las opciones para mi mapa
    var mapoptions = {
        zoom: 15,
        center: miscoordenadas,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    //imprimo el mapa en pantalla
    var map = new google.maps.Map(document.getElementById("map"), mapoptions);
    //configuro un marcador de posicion para mi mapa
    new google.maps.Marker({
        position: miscoordenadas,
        map,
        title: "Hello World"
    })
    //con jquery asignna un tamaño al espacio del streeviw
    $("#street").css("height", 300);
    //creo y configuro el streetview
    var panorama = new google.maps.StreetViewPanorama(document.getElementById("street"), {
        position: miscoordenadas, setpov: { heading: 90, Spitch: 5 }
    })
    //muestro el streetview
    map.setStreetView(panorama)
    //recargo el mapa por la ultima ocasion
    window.initMap = initMap;


}