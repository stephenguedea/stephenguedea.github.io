"use strict";
$(document).ready(function() {
    var mapPosition = {
        lat: 29.4221,
        lon: -98.4836
    };

    // MAP DISPLAYING
    // Set our map options
    function mapMarker() {
        var mapOptions = {
            // Set the zoom level
            zoom: 10,

            // This sets the center of the map at our location
            center: {
                lat: mapPosition.lat,
                lng: mapPosition.lon
            }
        };

        // Render the map
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);


        // ADD MARKER
        var marker = new google.maps.Marker({
            position: {lat: 29.4221, lng: -98.4836},
            map: map,
            draggable: true
        });

        marker.addListener('dragend', function (event) {
            mapPosition.lat = this.getPosition().lat();
            mapPosition.lon = this.getPosition().lng();
            mapData();

        });
    }
    mapMarker();





    // WEATHER INFO AND DISPLAY
    function buildHTML(data) {
        var innerHTML = '';


        for (var i = 0; i < data.list.length - 16; i += 8) {
            console.log(data.list[i]);

            innerHTML += '<div id="day"><h5>' + data.list[i].main.temp_max.toFixed(0) + ' / ' + data.list[i].main.temp_min.toFixed(0) + '</h5>';
            // innerHTML += '<div id="day"><h5>Min: ' + data.list[i].main.temp_min + ' ';
            // innerHTML += '<' + data.list[i].main.temp_max + '</h5>';
            innerHTML += '<h5>' + data.list[i].weather[0].main + '</h5>';
            innerHTML += '<img src="http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png">';

            innerHTML += '<h5>Clouds: ' + data.list[i].weather[0].description + '</h5>';
            innerHTML += '<h5>Humidity: ' + data.list[i].main.humidity + '</h5>';
            innerHTML += '<h5>Wind: ' + data.list[i].wind.speed + '</h5>';
            innerHTML += '<h5>Pressure: ' + data.list[i].main.pressure + '</h5></div>';

        }

        return innerHTML;
    }

    // MAP INFORMATION
    function mapData() {
        $.get("http://api.openweathermap.org/data/2.5/forecast", {
            APPID: "7f8e3aa0aad113510e0c1eaafd1c17b8",
            // lat: 29.423017,
            // lon: -98.48527,
            lat: mapPosition.lat,
            lon: mapPosition.lon,
            // id: 4726206,
            // q:     "San Antonio, US",
            units: 'imperial'
        }).done(function(data) {
            $("#mapMarker").html(data.city.name);
            // $("#weather-cards").html(createCards(data))
            $('#weather').html(buildHTML(data));

        });
    }


    mapData();


});