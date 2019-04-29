geocoder = new google.maps.Geocoder();
address = ['1-я Красноармейская ул., 11, лит. А, Б', 'Адмиралтейская наб. - левый берег р. Большая Нева, от Дворцового моста до Декабристов пл.', '1-я Красноармейская ул., 22', '11-я Красноармейская ул., 28'];


var Markers = {
    ar: []
}

class history{
    constructor(ad, loc){
        this.ad = ad
        this.loc = loc
    }
}



callback = function (result, status) {
    result.
    console.log(status)
};

var infowindow = new google.maps.InfoWindow();
function drawMarker(ad, loc) {
    var marker = new google.maps.Marker({
        map: map,
        position: loc

    });
    map.setCenter(loc)
    marker.addListener( 'click', function () {
        map.center = marker.position
        map.setZoom(16)
        infowindow.setContent(ad)
        infowindow.open(map, marker)
    })
}
function codeAddress(address) {
   //if (ar.find(x => x.ad === address) === undefined)
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status === 'OK') {
            let x = new history(address, results[0].geometry.location)
            console.log(x)
            Markers.ar.push(x)
            drawMarker( Markers.ar[ Markers.ar.length -  1].ad,  Markers.ar[ Markers.ar.length - 1].loc);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
function find(address){
    map.center = Markers.ar.find(x=> x.ad ===address).loc
    map.setZoom(16)
}


for (let i = 0; i < address.length; i++) {
    codeAddress(address[i])
}

$('#button_setting').click(function () {

});

$('#find_button').click(function () {
    text = $('#find_input').val();
    find(text)


})
