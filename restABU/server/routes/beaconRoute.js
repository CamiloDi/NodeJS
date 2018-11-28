const express = require('express');
const app = express();
const beacon = require('../models/beaconModel');

app.get('/usuario', function(req, res) {

    beacon.exec((err, beacons) => {
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


    })
});