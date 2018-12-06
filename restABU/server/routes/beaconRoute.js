const express = require('express');
const app = express();
const Beacon = require('../models/beaconModel');

app.get('/beacon', function(req, res) {

    Beacon.find()
        .exec((err, beacons) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                beacons,
            });


        });
});

app.post('/beacon', function(req, res) {

    let body = req.body;
    let beacon = new Beacon({
        nombre: body.nombre,
        id: body.id,
        fecha: body.fecha
    });
    beacon.save((err, beaconBD) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            message: `beacon ${beaconBD.nombre} guardado!`
        });
    });




});

app.post('/beacons', function(req, res) {

    let body = req.body;
    let beaconsJson = body.beacons;
    let cantidad = parseInt(body.cantidad);
    let beaconsGuardados = [];


    for (let i = 0; i < cantidad; i++) {

        let beacon = new Beacon({
            nombre: beaconsJson[i].nombre,
            id: beaconsJson[i].id,
            fecha: beaconsJson[i].fecha
        });
        beacon.save((err, beaconBD) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                beaconsGuardados.push(beaconBD);
            }
            if (beaconsGuardados.length == cantidad) {

                res.json({
                    ok: true,
                    message: `Se han Guardado ${beaconsGuardados.length} beacons.`,
                    beaconsGuardados: beaconsGuardados.length
                });
            }
        });

    }

});



module.exports = app;