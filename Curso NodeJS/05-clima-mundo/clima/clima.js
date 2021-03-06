const axios = require('axios');
const getClima = async(lat, lng) => {

    let encodeLat = encodeURI(lat);
    let encodeLng = encodeURI(lng);
    let key = 'PEGA-AQUI-TU-KEY';
    let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${encodeLat}&lon=${encodeLng}&units=metric&appid=${key}`);

    if (resp.data.cod !== 200) throw new Error(`Hubo un error al obtener el clima:  ${resp.message}`)
        //console.log(resp.data.main);
    let clima = resp.data.main.temp;
    return clima;
}

module.exports = {
    getClima
}