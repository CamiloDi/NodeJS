const axios = require('axios');

const getLugarLAtLng = async(direccion) => {
    let encodeURL = encodeURI(direccion);
    let key = 'PEGA-AQUI-TU-KEY';
    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURL}&key=${key}`)
    if (resp.data.status === 'ZERO_RESULTS') throw new Error(`No hay resultados para la ciudad ${direccion}`)

    let location = resp.data.results[0];
    let coors = resp.data.results[0].geometry.location;

    // console.log(location.formatted_address)
    // console.log(coors.lat)
    // console.log(coors.lng)

    return {
        direccion: location.formatted_address,
        lat: coors.lat,
        lng: coors.lng
    }
}



module.exports = {
    getLugarLAtLng
}