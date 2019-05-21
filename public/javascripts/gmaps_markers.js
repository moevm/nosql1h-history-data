var address = []
var circles_info = []
var circles = []
var History = {
    ar: []
}
var markersArray = [];

class history {
    constructor(ad, loc, year) {
        this.ad = ad
        this.loc = loc
        this.year = year;
    }
}

var colors = ["fc0d00", "fc9700", "fcde00", "96fc00", "00f9fc", "003efc", "d500fc", "fc66b0", "ffffff", "000000", "fff4af", "ffcfc2", "400701"] //red, orange, yellow, green, light-blue, dark-blue, purple, pink, white, black, lemon, peach, dark-red
var infowindow = new google.maps.InfoWindow();
var streets = {}

function getIcon(color) {
    return (
        new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color,
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34)))
}


function drawMarker(ad, loc, color) {
    var marker = new google.maps.Marker({
        map: map,
        position: loc,
        icon: getIcon(color)
    });

    map.setCenter(loc)
    marker.addListener('click', function () {
        map.center = marker.position
        map.setZoom(16)
        infowindow.setContent(ad)
        infowindow.open(map, marker)
    })

    markersArray.push(marker)
}


function codeAddress(name, location, year, color) {
    let x = new history(name, location, year)
    History.ar.push(x)
    drawMarker(History.ar[History.ar.length - 1].ad, History.ar[History.ar.length - 1].loc, color);


}


function show(filters) {

    $.get("http://localhost:3001/", function (data) {
        streets = {}
        console.log(filters)


        var obj = $.parseJSON(data);

        var _filter = localStorage.foo ? JSON.parse(localStorage.foo) : [1500, 2019];

        var is_circles = false

        if ($("#cirlce_mode").prop("checked")) {
            is_circles = true
        }

        if (filters.length !== 0) {

            for (let j = 0; j < filters.length; j++) {

                var minLat = 0.0
                var maxLat = 0.0
                var minLon = 0.0
                var maxLon = 0.0


                for (let i = 0; i < obj.length; i++) {

                    if ((obj[i].date < filters[j][1]) && (obj[i].date >= (filters[j][0])) && (obj[i].date >= _filter[0]) && (obj[i].date <= _filter[1])) {

                        var flag = false;
                    if(is_circles){
                        if (obj[i].loc['lat'] > maxLat)
                            maxLat = obj[i].loc['lat']

                        if (minLat === 0.0)
                            minLat = obj[i].loc['lat']
                        else if (obj[i].loc['lat'] < minLat)
                            minLat = obj[i].loc['lat']

                        if (obj[i].loc['lng'] > maxLon)
                            maxLon = obj[i].loc['lng']

                        if (minLon === 0.0)
                            minLon = obj[i].loc['lng']
                        else if (obj[i].loc['lng'] < minLon)
                            minLon = obj[i].loc['lng']
                    }



                        for (let k = 0; k < History.ar.length; k++) {
                            if (History.ar[k].ad === obj[i].name + " ******* " + obj[i].date &&
                                History.ar[k].loc === obj[i].loc &&
                                History.ar[k].year === obj[i].date)
                                flag = true
                        }

                        if (!flag) {
                            codeAddress(obj[i].name + " ******* " + obj[i].date, obj[i].loc, obj[i].date, colors[j])
                            street_statistics(obj[i].address)
                        }


                    }
                }

                if (is_circles){
                    circles_info[j] = {
                        center: {lat: ((maxLat + minLat) / 2), lng: ((maxLon + minLon) / 2)},
                        rad: 46500* Math.sqrt(((maxLat - minLat) * (maxLat - minLat)) / 2 + ((maxLon - minLon) * (maxLon - minLon)) / 2)
                    }




                    var Circle = new google.maps.Circle({
                        strokeColor: '#' + colors[j],
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#' + colors[j],
                        fillOpacity: 0.35,
                        map: map,
                        center: circles_info[j].center,
                        radius: circles_info[j].rad
                    });


                    circles.push(Circle)
                }


                minLat = 0.0
                maxLat = 0.0
                minLon = 0.0
                maxLon = 0.0
            }
        } else {
            for (let i = 0; i < obj.length; i++) {
                if ((obj[i].date >= _filter[0]) && (obj[i].date <= _filter[1])) {
                    codeAddress(obj[i].name + "****" + obj[i].date, obj[i].loc, obj[i].date, "fc0d00")
                    street_statistics(obj[i].address)
                }
            }
        }
        $("#markers_count").html("Total markers: " + markersArray.length)
    });

}


$('input[type=checkbox]').change(function () {
    if ($(this).is(':checked')) {
        applyFilters()
    } else {

        applyFilters()
    }
});


function applyFilters() {
    var filterArray = []
    var count = 0;
    for (let i = 1; i <= 13;  i++) {

        let name = "#check" + i
        if ($(name).prop("checked")) {

            str = $(name).val()

            from = parseInt(str.substring(0, 4))
            to = parseInt(str.substring(5, 9))
            filterArray.push([from, to])
            $("#lab" + i).css({color: "#" + colors[count++]})
        } else {
            $("#lab" + i).css({color: "#000000"})
        }
        clearOverlays()

    }
    show(filterArray)
}

function clearOverlays() {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
        History.ar = []
    }
    markersArray.length = 0;


    for (let i = 0; i < circles.length; i++) {
        circles[i].setMap(null)
        circles_info = []
    }
    circles.length = 0
}

function clust() {
    var _filter = localStorage.foo ? JSON.parse(localStorage.foo) : [1500, 2019];
    var filterArray = []
    for (let i = 1; i <= 13; i++) {
        let name = "#check" + i
        str = $(name).val()
        from = parseInt(str.substring(0, 4))
        to = parseInt(str.substring(5, 9))
        filterArray.push([from, to])
    }

    $.get("http://localhost:3001/", function (data) {
        var obj = $.parseJSON(data);
        var count = 0;
        for (let i = 0; i < filterArray.length; i++) {
            for (let j = 0; j < obj.length; j++) {
                if ((obj[j].date < filterArray[i][1]) && (obj[j].date >= (filterArray[i][0])) && (obj[j].date >= _filter[0]) && (obj[j].date <= _filter[1])) {
                    count++
                }
            }

            str = $("#lab" + (i + 1)).html();
            console.log(str)
            $("#lab" + (i + 1)).html(str + "  (" + count + ")")
            count = 0;
        }
    });
}

clust();

function show_streets_statistics() {
    x = Object.keys(streets).map(function (key) {
        return [key, streets[key]];
    });
    x.sort(function (a, b) {
        if (a[1] > b[1]) {
            return -1;
        } else if (a[1] < b[1]) {
            return 1;
        } else {
            return 0;
        }
    })

    if (x[0] === undefined)
        str = "not found any streets"
    else if (x[1] === undefined)
        str = x[0]
    else if (x[2] === undefined)
        str = x[0] + '\n' + x[1]
    else
        str = x[0] + '\n' + x[1] + '\n' + x[2]

    alert(str)

}

function street_statistics(address) {
    reg1 = /[^,]*/
    reg2 = /ул.|пр.|пер./

    str = address.substring(16, address.length)

    x = str.match(reg1)

    y = x[0].match(reg2)
    street = ""
    if (y !== null) {
        street = x[0]

    } else return

    if (!isNaN(streets[street]))
        streets[street] = streets[street] + 1
    else
        streets[street] = 1

}