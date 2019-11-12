var map = ol.Map;
var View = ol.View;
var Draw = ol.interaction.Draw;
var { Tile, Vector } = ol.layer;
var TileLayer = Tile;
var VectorLayer = Vector;
var { OSM, Vector } = ol.source;
// var VectorSource = Vector;
var Circle = ol.geom.Circle;
var LayerTile = ol.layer.Tile;
var MapQuest = ol.source.MapQuest;

var LayerOsm = new LayerTile({
    source: new ol.source.OSM()
});

LayerOsm.set('name', 'mapa');

var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: [LayerOsm],
    view: new ol.View({
        center: ol.proj.transform([-103.8046, 27.4696], 'EPSG:4326', 'EPSG:3857'),
        zoom: 3
    })
});


// Geometries
var point = new ol.geom.Point(
    ol.proj.transform([-50.8046, 27.4696], 'EPSG:4326', 'EPSG:3857')
);

var point2 = new ol.geom.Point(
    ol.proj.transform([-103.8046, 27.4696], 'EPSG:4326', 'EPSG:3857')
);

// Features
var pointFeature = new ol.Feature(point);

var pointFeature2 = new ol.Feature(point2);


// Source
var vectorSource = new ol.source.Vector({
    projection: 'EPSG:4326'
});

vectorSource.addFeatures([pointFeature, pointFeature2]);

// Vector layer
var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
        image: new ol.style.Icon({
            opacity: 1,
            src: '../drowning.svg',
            scale: 1
        }),
        text: new ol.style.Text({
            text: 'DROWNING',
            scale: 1.3,
            offsetY: '50',
            fill: new ol.style.Fill({
                color: '#fff'
            }),
            stroke: new ol.style.Stroke({
                color: '#e0458d;',
                width: 5,
                height: 10
            })
        })
    })
});

// Add Vector layer to map
map.addLayer(vectorLayer);

var start;

var select = new ol.interaction.Select({
    condition: ol.events.condition.pointerMove,
    style: function (feature) {
        var elapsed = new Date().getTime() - start;
        var opacity = Math.min(0.3 + elapsed / 10000, 0.8);
        selectedStyle.getFill().setColor('rgba(255,0,0,' + opacity + ')');
        feature.changed();
        return selectedStyle;
    }
});
select.on('select', function () { start = new Date().getTime(); });
map.addInteraction(select);

// $.getJSON('../data/data.json', function (data) {
//     // console.log(data);
//     var jsonData = data.DataMigrants;
//     jsonData.forEach(element => {
//         if(element.causedeath == 'Fall from train'){
//             // console.log(element);
//             // console.count();
//         }
//     });
// });

// $.getJSON('../data/data.json', function (data) {
//     var jsonData = data.DataMigrants;


//     jsonData.forEach((element, index) => {
//         if (element.causedeath == 'presumedDrowning') {
//             console.log(element.Latitud);
//         }
//     });
// });