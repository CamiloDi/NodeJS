APP del Clima NodeJS
====================

```
npm instal axios --save
```

Cambio de Keys
---------------

Para el uso de la aplicacion, primero se deben obtener las Keys de los siguientes sitios:

*Para la Key de geolocalizacion de Google se puede obtener desde la siguiente ruta:

    https://developers.google.com/maps/documentation/geocoding/start
     
Luego de  obtener la Key esta debe ser remplazada en el archivo "lugar.js" de la siguiente manera:

Ejemplo:
        ```
        let encodeURL = encodeURI(direccion);
        let key = 'PEGA-AQUI-TU-KEY';
        let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURL}&key=${key}`)
        ```

*Para la Key de informacion del clima de OpenWeatherMap primero debes crearte una cuenta desde la siguiente ruta:

    https://openweathermap.org/

Luego de obtener la Key esta debe ser remplazada en el archivo "clima.js" de la siguiente manera:
Ejemplo:
        ```
        let encodeLat = encodeURI(lat);
        let encodeLng = encodeURI(lng);
        let key = 'PEGA-AQUI-TU-KEY';
        let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${encodeLat}&lon=${encodeLng}&units=metric&appid=${key}`);

        ```
