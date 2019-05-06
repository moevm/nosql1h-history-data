address = []

var History = {
    ar: []
}
var markersArray = [];

var Locations = {
    loc: []
}

class history{
    constructor(ad, loc){
        this.ad = ad
        this.loc = loc
    }
}

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

    markersArray.push(marker)
}


function codeAddress(name, location) {

            let x = new history(name, location)

            History.ar.push(x)
            drawMarker( History.ar[ History.ar.length -  1].ad,  History.ar[ History.ar.length - 1].loc);


}


function show(filters) {

    $.get( "http://localhost:3001/", function( data ) {


        var obj = $.parseJSON(data)



       if(filters.length !== 0){
           for (let i = 0; i <obj.length ; i++) {
               for (let j = 0; j < filters.length; j++) {
                   if((obj[i].date <= filters[j])  && (obj[i].date >= (filters[j] -10)) )
                       codeAddress(obj[i].name + " ******* "+ obj[i].date, obj[i].loc)
               }

           }
       } else
       {
           for (let i = 0; i < obj.length; i++) {
               codeAddress(obj[i].name + "****"+ obj[i].address, obj[i].loc)
           }
       }

    });

}


function applyFilters() {
    var filterArray = []
    for (let i = 1; i <= 2 ; i++) {

        let name = "#check"+i
        if ($(name).prop("checked")){
            filterArray.push(parseInt($(name).val()))
        }
        clearOverlays()

    }

    show(filterArray)
}

function clearOverlays() {
    for (var i = 0; i < markersArray.length; i++ ) {
        markersArray[i].setMap(null);
        History.ar = []
    }
    markersArray.length = 0;
}