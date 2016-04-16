var data = {"AggregateResults": null, "Total": 52, "Errors": null, "Data": [{"Longitude": 23.615109, "Latitude": 46.777037, "StationName": "Biblioteca Centrala"}, {"Longitude": 23.629864, "Latitude": 46.767918, "StationName": "Piata Detunata"}, {"Longitude": 23.545946, "Latitude": 46.75762, "StationName": "Calea Floresti"}, {"Longitude": 23.595671, "Latitude": 46.779954, "StationName": "Piata Abator"}, {"Longitude": 23.561371, "Latitude": 46.77678, "StationName": "Taietura Turcului"}, {"Longitude": 23.550334, "Latitude": 46.766268, "StationName": "Str Miraslau"}, {"Longitude": 0, "Latitude": 0, "StationName": "Emil Isac"}, {"Longitude": 23.636194, "Latitude": 46.795884, "StationName": "B-Dul Muncii"}, {"Longitude": 23.615914, "Latitude": 46.778815, "StationName": "Aurel Vlaicu"}, {"Longitude": 23.502312, "Latitude": 46.742789, "StationName": "Floresti Taiut"}, {"Longitude": 23.567052, "Latitude": 46.770733, "StationName": "Piata 14 iulie"}, {"Longitude": 23.743112, "Latitude": 46.7923, "StationName": "Apahida"}, {"Longitude": 23.594869, "Latitude": 46.755642, "StationName": "Observatorului LDL"}, {"Longitude": 23.621839, "Latitude": 46.782735, "StationName": "Str Fabricii de zahar"}, {"Longitude": 23.597431, "Latitude": 46.769608, "StationName": "Stefan cel Mare"}, {"Longitude": 23.497829, "Latitude": 46.7474, "StationName": "Floresti/Somesului"}, {"Longitude": 23.557079, "Latitude": 46.755111, "StationName": "Str Islazului"}, {"Longitude": 23.587104, "Latitude": 46.775865, "StationName": "Str Horea(roth)"}, {"Longitude": 23.704142, "Latitude": 46.780511, "StationName": "Apahida 2"}, {"Longitude": 23.534431, "Latitude": 46.753985, "StationName": "Floresti"}, {"Longitude": 23.582917, "Latitude": 46.769608, "StationName": "Iuliu Hossu"}, {"Longitude": 23.601352, "Latitude": 46.767507, "StationName": "Constantin Brancusi"}, {"Longitude": 23.606223, "Latitude": 46.762024, "StationName": "Piata Ion Agarbiceanu"}, {"Longitude": 23.57755, "Latitude": 46.75259, "StationName": "Observatorului"}, {"Longitude": 23.574624, "Latitude": 46.764446, "StationName": "Calea Motilor"}, {"Longitude": 23.591146, "Latitude": 46.767485, "StationName": "Babes B"}, {"Longitude": 23.594083, "Latitude": 46.767837, "StationName": "Kogalniceanu"}, {"Longitude": 23.567645, "Latitude": 46.767023, "StationName": "Independentei"}, {"Longitude": 23.588062, "Latitude": 46.774025, "StationName": "Str Horea"}, {"Longitude": 23.617327, "Latitude": 46.769232, "StationName": "Titulescu"}, {"Longitude": 23.752302, "Latitude": 46.804635, "StationName": "Apahida (la primarie)"}, {"Longitude": 23.485727, "Latitude": 46.742305, "StationName": "Floresti Primarie"}, {"Longitude": 23.578261, "Latitude": 46.7628, "StationName": "Hasdeu"}, {"Longitude": 23.606762, "Latitude": 46.776449, "StationName": "21 decembrie BRD"}, {"Longitude": 23.583945, "Latitude": 46.758662, "StationName": "Pasteur"}, {"Longitude": 23.611837, "Latitude": 46.77797, "StationName": "21 decembrie"}, {"Longitude": 23.555266, "Latitude": 46.76948, "StationName": "Petuniei"}, {"Longitude": 23.544476, "Latitude": 46.751581, "StationName": "Gutenberg"}, {"Longitude": 23.587788, "Latitude": 46.783973, "StationName": "Horea"}, {"Longitude": 23.581734, "Latitude": 46.77234, "StationName": "Dragalina"}, {"Longitude": 23.583596, "Latitude": 46.790109, "StationName": "Maramuresului"}, {"Longitude": 23.588016, "Latitude": 46.768925, "StationName": "Ion Ratiu"}, {"Longitude": 23.613891, "Latitude": 46.781058, "StationName": "Fabricii"}, {"Longitude": 23.585543, "Latitude": 46.754602, "StationName": "Observatorului MOL"}, {"Longitude": 23.625588, "Latitude": 46.771519, "StationName": "Iulius Mall"}, {"Longitude": 23.567028, "Latitude": 46.766998, "StationName": "Splaiul Independetei"}, {"Longitude": 23.545428, "Latitude": 46.762822, "StationName": "1 decembrie 1918"}, {"Longitude": 23.574637, "Latitude": 46.76862, "StationName": "G.Cosbuc"}, {"Longitude": 23.584576, "Latitude": 46.768093, "StationName": "Motilor 7"}, {"Longitude": 0, "Latitude": 0, "StationName": "Statie Training 6"}, {"Longitude": 23.592638, "Latitude": 46.774363, "StationName": "Piata Mihai Viteazul"}, {"Longitude": 0, "Latitude": 0, "StationName": "Statie Virtuala"}]};

var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 46.769709, lng: 23.589826},
    zoom: 15
});
var geolocated = false;
var infowindow = new google.maps.InfoWindow();
var currentPositionImage = {
    url: 'new_blue_dot.svg',
    size: new google.maps.Size(33, 33),
    anchor: new google.maps.Point(16, 16)
};
var currentPositionMarker = new google.maps.Marker({
    map: map,
    icon: currentPositionImage
});
currentPositionMarker.addListener('click', function() {
    infowindow.setContent('Locația curentă');
    infowindow.open(map, this);
});
for (var i = 0; i < data['Data'].length; i++) {
    var marker = new google.maps.Marker({
        map: map,
        position: {lat: data['Data'][i]['Latitude'], lng: data['Data'][i]['Longitude']},
        title: data['Data'][i]['StationName']
    });
    marker.addListener('click', function() {
        infowindow.setContent(this.title);
        infowindow.open(map, this);
    });
}
function handleLocationError(browserHasGeolocation) {
    alert(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
}
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            currentPositionMarker.setPosition(pos);
            if (!geolocated) {
                map.setCenter(pos);
                geolocated = true;
            }
            setTimeout(geolocate, 5 * 1000);
        }, function() {
            handleLocationError(true);
        });
    } else {
        handleLocationError(false);
    }
}
geolocate();
