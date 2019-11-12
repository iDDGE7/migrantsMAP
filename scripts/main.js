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

function styleLayer(img) {
    var styleLayer = new ol.style.Style({
        image: new ol.style.Icon({
            opacity: 1,
            src: '../' + img,
            scale: 0.7
        })
    });

    return styleLayer;
}

function typeDeath(type, img, text) {
    var points = [];
    var pointsFeatures = [];

    $.getJSON('../data/data.json', function (data) {
        var jsonData = data.DataMigrants;


        jsonData.forEach((element) => {
            if (element.causedeath == type) {
                var point = new ol.geom.Point(
                    ol.proj.transform([element.Latitud, element.Longitud], 'EPSG:4326', 'EPSG:3857')
                );

                points.push(point);

                var pointFeature = new ol.Feature(point);

                pointsFeatures.push(pointFeature);
            }
        });

        var vectorSource = new ol.source.Vector({
            projection: 'EPSG:4326'
        });

        vectorSource.addFeatures(pointsFeatures);

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: styleLayer(img)
        });
        map.addLayer(vectorLayer);
    });
}



function clearLayers() {
    var layers = [];
    var i = 0;
    map.getLayers().forEach(layer => {
        if (layer && layer.get('name') != 'mapa') {
            layers[i] = layer;
        }
        i++;
    });
    for (var i = 0; i < layers.length; i++) {
        map.removeLayer(layers[i]);
    }
}

$('#button-Enviar').click(function () {
    clearLayers();
    if ($('#drowing-check').is(":checked")) {
        typeDeath('Drowning', 'drowning.png', 'DROWNING');
    }
    if ($('#sickness-check').is(":checked")) {
        typeDeath('Sickness-medicines', 'nomedicines.png', 'SICKNESS');
    }
    if ($('#vehicle-check').is(":checked")) {
        typeDeath('Vehicle Accident', 'accidenteV.png', 'Vehicle Accident');
    }
    if ($('#presumed-drowning-check').is(":checked")) {
        typeDeath('presumedDrowning', 'presumed_drowning.png', 'Presumed drowning');
    }
    if ($('#shot-check').is(":checked")) {
        typeDeath('Shot', 'gun.png', 'Shot');
    }
    if ($('#dehydration-check').is(":checked")) {
        typeDeath('Dehydration', 'Dehydration.png', 'Dehydration');
    }
    if ($('#starvation-check').is(":checked")) {
        typeDeath('Starvation', 'Starvation.png', 'Starvation');
    }
    if ($('#hypothermia-check').is(":checked")) {
        typeDeath('Hypothermia', 'Hypothermia.png', 'Hypothermia');
    }
    if ($('#shot_or_stabbed-check').is(":checked")) {
        typeDeath('Shot or stabbed', 'Shot_or_stabbed.png', 'Shot or stabbed');
    }
    if ($('#starvation_dehydration-check').is(":checked")) {
        typeDeath('Starvation, Dehydration', 'Starvation-Dehydration.png', 'Starvation, Dehydration');
    }
});



$('.label-checkbox').click(function () {
    var index = $('.label-checkbox').index(this);
    var element = $('.filters')[index];
    if (element.style.background == 'rgb(54, 148, 235)') {
        element.style.background = 'initial';
        element.style.color = 'rgb(49, 49, 49)'
    } else {
        element.style.background = 'rgb(54, 148, 235)';
        element.style.color = 'white'
    }
})

var buttonS = 0;
$('#button-map').click(function () {
    if (buttonS == 0) {
        $('.toggle-button')[1].style.transform = 'translateY(0%)';
        $('.toggle-button')[0].style.transform = 'translateY(100%)';
        $('#menu').css({
            'width': '400px',
            'height': '500px',
            'bottom': '160px',
            'border-radius': '10px'
        });
        buttonS = 1;
    } else {
        $('.toggle-button')[1].style.transform = 'translateY(-100%)';
        $('.toggle-button')[0].style.transform = 'translateY(0%)';
        buttonS = 0;
        $('#menu').css({
            'width': '75px',
            'height': '75px',
            'bottom': '50px',
            'border-radius': '100%'
        });
    }
});

