
angular.module('app', [])
    .service('MapService', function () {
        const map = L.map('mapid').setView([2.631, 112.975], 10);

        L.tileLayer('https://c.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            id: 'openstreetmap',
        }).addTo(map);

        let geotiffLayer;

        return {
            getMap: function () {return map},
            updateOpacity: function (opacity) {geotiffLayer.setOpacity(opacity)},
            updateGeotiffLayer: function (run) {
                if (geotiffLayer) {geotiffLayer.remove()}
                geotiffLayer = L.leafletGeotiff(`data/run_${run.id}_maxdepth.tiff`, {
                    renderer: L.LeafletGeotiff.plotty({
                        clampLow: false,
                        isplayMin: 0.1,
                        displayMax: 10,
                        colorScale: 'viridis'
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

