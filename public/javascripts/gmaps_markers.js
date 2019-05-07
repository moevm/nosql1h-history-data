address = []

var History = {
    ar: []
}
var markersArray = [];

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
        console.log(filters)

        var obj = $.parseJSON(data);

        var _filter = localStorage.foo ? JSON.parse(localStorage.foo) : [1500, 2019];

       if(filters.length !== 0){
           for (let i = 0; i <obj.length ; i++) {
               for (let j = 0; j < filters.length; j++) {
                   if((obj[i].date <= filters[j][1])  && (obj[i].date >= (filters[j][0])) && (obj[i].date >=_filter[0]) && (obj[i].date <= _filter[1]))
                       codeAddress(obj[i].name + " ******* "+ obj[i].date, obj[i].loc)
               }

           }
       } else
       {
           for (let i = 0; i < obj.length; i++) {
               if((obj[i].date >=_filter[0]) && (obj[i].date <= _filter[1]))
               codeAddress(obj[i].name + "****"+ obj[i].date, obj[i].loc)
           }
       }
        $("#markers_count").html("Total markers: " + markersArray.length)
    });

}



$('input[type=checkbox]').change(function(){
    if($(this).is(':checked')) {
        applyFilters()
    } else {
        applyFilters()
    }
});

function applyFilters() {
    var filterArray = []
    for (let i = 1; i <= 14 ; i++) {

        let name = "#check"+i
        if ($(name).prop("checked")){

            str = $(name).val()

            from = parseInt(str.substring(0,4))
            to = parseInt(str.substring(5,9))

            filterArray.push([from, to])
        }
        clearOverlays()

    }
    console.log(filterArray)
    show(filterArray)
}

function clearOverlays() {
    for (var i = 0; i < markersArray.length; i++ ) {
        markersArray[i].setMap(null);
        History.ar = []
    }
    markersArray.length = 0;
}

function clust() {
    $.get("http://localhost:3001/", function (data) {
        var obj = $.parseJSON(data);
        var clusters = []

        for (let era = 170; era < 201; era++) {
            clusters.push({era: era, count: 0})
        }


        for (let i = 0; i < clusters.length; i++) {
            for (let j = 0; j < obj.length; j++) {
                let from = (170 + i) * 10
                let to = (170 + i + 1) * 10
                if (obj[j].date >= from && obj[j].date <= to)
                    clusters[i].count++

            }
        }


    console.log(clusters)

        for (let i = 0; i < clusters.length ; i++) {
            var newElems = $(" <input class='w3-check' id='check"+i+"' type='checkbox' value='"+(clusters[i].era+2)*10>+"'>").append(
                "<label>"+(clusters[i].era+1)*10+ "-"+(clusters[i].era+2)*10+"</label>"+
                "<br>"
            )
        }

        $('#Demo1').append(newElems)

    });
}