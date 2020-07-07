
angular.module('app', [])
    .service('MapService', function () {
        const map = L.map('mapid').setView([3.0792, 113.3956], 10);

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


        return {
            getMap: function () {return map},
            updateOpacity: function (opacity) {geotiffLayer.setOpacity(opacity)},
            updateGeotiffLayer: function (run) {
                if (geotiffLayer) {geotiffLayer.remove()}
                geotiffLayer = L.leafletGeotiff(`data/return_periods.tif`, {
                    renderer: L.LeafletGeotiff.plotty({
                        clampLow: false,
                        displayMin: displayMin,
                        displayMax: displayMax,
                        colorScale: 'return-periods'
                    })
                }).addTo(map);
                geotiffLayer.setOpacity(0.5)
            }

        }
    })

    .controller('RunController', function(MapService, $scope){

        this.runs = [
            {id: 755, returnPeriod: 10, duration: 1}
            ];

        this.durations = [1];
        this.returnPeriods = [10];
        this.returnPeriod = 0
        this.duration = 0

        this.updateRun = function () {

            this.returnPeriod = this.returnPeriods.indexOf(this.run.returnPeriod);
            this.duration = this.durations.indexOf(this.run.duration);

        };


        this.findRun = function () {
            let returnPeriod = this.returnPeriods[this.returnPeriod];
            let duration = this.durations[this.duration];
            for (let i=0; i < this.runs.length; i++) {
                let run = this.runs[i];
                if (run.returnPeriod === returnPeriod && run.duration === duration) {
                    this.run = run;
                    break
                }
            }

            MapService.updateGeotiffLayer(this.run)
        };

        this.findRun()

        this.updateOpacity = function () {
            MapService.updateOpacity(this.opacity)
        }

        this.opacity = 0.5
        this.updateOpacity()


    });

