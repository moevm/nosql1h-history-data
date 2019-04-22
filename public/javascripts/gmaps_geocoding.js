geocoder = new google.maps.Geocoder();
address = 'Куимиха';

callback = function (result, status) {
    result.
    console.log(status)
};

var infowindow = new google.maps.InfoWindow();

function codeAddress() {
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location

            });

            marker.addListener( 'click', function () {
                map.setZoom(16)
               infowindow.setContent("Home.. Sweet home..")
               infowindow.open(map, marker)
            })

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}






codeAddress();