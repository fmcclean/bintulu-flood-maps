
angular.module('app', [])
    .service('MapService', function () {
        const map = L.map('mapid').setView([3.0792, 113.3956], 11);

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

            return div;
        };

        legend.addTo(map);

        geotiffLayer = L.leafletGeotiff(`data/return_periods.tif`, {
                    renderer: L.LeafletGeotiff.plotty({
                        clampLow: false,
                        displayMin: displayMin,
                        displayMax: displayMax,
                        colorScale: 'return-periods'
                    })
                }).addTo(map);


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

