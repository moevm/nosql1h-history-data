geocoder = new google.maps.Geocoder();
address = 'Куимиха';

callback = function (result, status) {
    result.
    console.log(status)
};


function codeAddress() {
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location

            });

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
codeAddress();