const express = require('express');
const app = express();
const Beacon = require('../models/beaconModel');

app.get('/beacon', function (req, res) {

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

app.post('/beacon', function (req, res) {

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
            message:`beacon ${beaconBD.nombre} guardado!`
        });
    });




});
module.exports = app;