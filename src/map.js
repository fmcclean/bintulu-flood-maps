
angular.module('app', [])
    .service('MapService', function () {
        const map = L.map('mapid').setView([2.895, 113.255], 10);

        L.tileLayer('https://c.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            id: 'openstreetmap',
        }).addTo(map);

        let geotiffLayer;
        const displayMin = 1
        const displayMax = 5
        const normalize = function(val) { return (val - displayMin) / (displayMax - displayMin); }

        const colours = ["#2b83ba", "#2b4Dba", "#0000ff", "#000072", "#000000"]
        const labels = [10, 100, 200, 1000, 10000]
        plotty.addColorScale("return-periods", colours,
            [1, 2, 3, 4, 5].map(normalize));

        const legend = L.control({position: 'topleft'});

        legend.onAdd = function (map) {

            let div = L.DomUtil.create('div', 'info legend')
            div.innerHTML += '<h5>Return Period (yrs)</h5>'

            // loop through our density intervals and generate a label with a colored square for each interval
            for (let i = 0; i < labels.length; i++) {
                div.innerHTML += '<i style="background-color:' + colours[i] + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i> ' + labels[i] + '<br>';
            }

            div.innerHTML += '<br><i class="circle" style="background:white"></i> Villages<br>';

            return div;
        };

        legend.addTo(map);

        geotiffLayer = L.leafletGeotiff('data/return_periods.tif', {
                    renderer: L.LeafletGeotiff.plotty({
                        clampLow: false,
                        displayMin: displayMin,
                        displayMax: displayMax,
                        colorScale: 'return-periods'
                    })
                }).addTo(map);

        L.geoJSON({
            "type": "FeatureCollection",
            "name": "bintulu-villages",
            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
            "features": [
                { "type": "Feature", "properties": { "name": "Rh Mikai" }, "geometry": { "type": "Point", "coordinates": [ 113.470833333333331, 3.011388888888889 ] } },
                { "type": "Feature", "properties": { "name": "Rh Gemong (Rh Peter), Sg Binyo" }, "geometry": { "type": "Point", "coordinates": [ 113.476388888888891, 2.959722222222222 ] } },
                { "type": "Feature", "properties": { "name": "Rh Gasing (Rh Irai), Sg Binyo" }, "geometry": { "type": "Point", "coordinates": [ 113.4725, 2.952222222222222 ] } },
                { "type": "Feature", "properties": { "name": "Rh Binit, Sg Penyilam, Binyo" }, "geometry": { "type": "Point", "coordinates": [ 113.449444444444438, 2.941944444444444 ] } },
                { "type": "Feature", "properties": { "name": "Rh Nyipa, Lbk Bungai, Sg Binyo" }, "geometry": { "type": "Point", "coordinates": [ 113.43472222222222, 2.846666666666667 ] } },
                { "type": "Feature", "properties": { "name": "Rh Sigi, Sg Luap" }, "geometry": { "type": "Point", "coordinates": [ 113.43694444444445, 2.869722222222222 ] } },
                { "type": "Feature", "properties": { "name": "Rh Gudang (Rh Pantang), Sg Binyo" }, "geometry": { "type": "Point", "coordinates": [ 113.43472222222222, 2.863888888888889 ] } },
                { "type": "Feature", "properties": { "name": "Rh Lembang (Rh Joseph), Sg Binyo" }, "geometry": { "type": "Point", "coordinates": [ 113.43138888888889, 2.930555555555555 ] } },
                { "type": "Feature", "properties": { "name": "Rh Edau, Sg Binyo" }, "geometry": { "type": "Point", "coordinates": [ 113.43472222222222, 2.846666666666667 ] } },
                { "type": "Feature", "properties": { "name": "Rh Janting (Rh Serang), Sg Smayong, Binyo" }, "geometry": { "type": "Point", "coordinates": [ 113.435833333333335, 2.884166666666667 ] } },
                { "type": "Feature", "properties": { "name": "Rh George, Tg Mawang, Binyo" }, "geometry": { "type": "Point", "coordinates": [ 113.426388888888894, 2.829166666666667 ] } },
                { "type": "Feature", "properties": { "name": "Rh Bampi" }, "geometry": { "type": "Point", "coordinates": [ 113.439166666666665, 2.872777777777778 ] } },
                { "type": "Feature", "properties": { "name": "Rh Ulu" }, "geometry": { "type": "Point", "coordinates": [ 113.439166666666665, 2.922777777777778 ] } },
                { "type": "Feature", "properties": { "name": "Rh Malo, Ng Penyarai" }, "geometry": { "type": "Point", "coordinates": [ 113.15125, 2.634527777777778 ] } },
                { "type": "Feature", "properties": { "name": "Rh Segaya, Sg Penyarai" }, "geometry": { "type": "Point", "coordinates": [ 113.164083333333338, 2.592805555555556 ] } },
                { "type": "Feature", "properties": { "name": "Rh Wot\/Rh Oat (Rh Samun) Sg Penyarai" }, "geometry": { "type": "Point", "coordinates": [ 113.164166666666674, 2.604166666666667 ] } },
                { "type": "Feature", "properties": { "name": "Rh Kanyan, Sg Penyarai" }, "geometry": { "type": "Point", "coordinates": [ 113.168611111111105, 2.594166666666667 ] } },
                { "type": "Feature", "properties": { "name": "Rh Patong (Rh Nyuan), Sg Penyarai" }, "geometry": { "type": "Point", "coordinates": [ 113.17305555555555, 2.596944444444444 ] } },
                { "type": "Feature", "properties": { "name": "Rh Billy, Sg Penyarai" }, "geometry": { "type": "Point", "coordinates": [ 113.17305555555555, 2.596944444444444 ] } },
                { "type": "Feature", "properties": { "name": "Rh Lasok, Sg Penyarai" }, "geometry": { "type": "Point", "coordinates": [ 113.172444444444452, 2.59275 ] } },
                { "type": "Feature", "properties": { "name": "Rh Geraman (Rh Layang), Lbk Ladong" }, "geometry": { "type": "Point", "coordinates": [ 113.165277777777774, 2.59275 ] } },
                { "type": "Feature", "properties": { "name": "Rh Ganyun (Rh Sylvester Bunsu Ak Ganyun), Ng Selitai" }, "geometry": { "type": "Point", "coordinates": [ 113.109722222222217, 2.668611111111111 ] } },
                { "type": "Feature", "properties": { "name": "Rh Rabong (Rh Sujang Ak Jemang), Ng Maing" }, "geometry": { "type": "Point", "coordinates": [ 113.089313888888896, 2.696111111111111 ] } },
                { "type": "Feature", "properties": { "name": "Rh Degom, Ng Puti " }, "geometry": { "type": "Point", "coordinates": [ 113.188333333333333, 2.656944444444445 ] } },
                { "type": "Feature", "properties": { "name": "Rh Edwin, Ng Belungai " }, "geometry": { "type": "Point", "coordinates": [ 113.207666666666668, 2.671277777777778 ] } },
                { "type": "Feature", "properties": { "name": "Rh Robert, Ng Segun" }, "geometry": { "type": "Point", "coordinates": [ 113.334416666666669, 2.639972222222222 ] } },
                { "type": "Feature", "properties": { "name": "Rh Ta'a, Ng Seda" }, "geometry": { "type": "Point", "coordinates": [ 113.29075, 2.655944444444445 ] } },
                { "type": "Feature", "properties": { "name": "Rh Linggi " }, "geometry": { "type": "Point", "coordinates": [ 113.325972222222219, 2.641833333333333 ] } },
                { "type": "Feature", "properties": { "name": "Rh Suat" }, "geometry": { "type": "Point", "coordinates": [ 112.956305555555559, 2.646805555555555 ] } },
                { "type": "Feature", "properties": { "name": "Rh Gerunsin, Sg Jambu" }, "geometry": { "type": "Point", "coordinates": [ 112.95686111111111, 2.645583333333333 ] } }
            ]
        }, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 4,
                    fillColor: "#ffffff",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });},
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.name);
            }
        }
    ).addTo(map);


        return {
            updateOpacity: function (opacity) {geotiffLayer.setOpacity(opacity)}
        }
    })

    .controller('RunController', function(MapService, $scope){

        this.updateOpacity = function () {
            MapService.updateOpacity(this.opacity)
        }

        this.opacity = 0.5
        this.updateOpacity()


    });

