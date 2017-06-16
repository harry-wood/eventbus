var map;
var group;

function init() {
  map = L.map('map');

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
     maxZoom: 18
  }).addTo(map);
  map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

  var london = new L.LatLng(51.505, -0.09); // geographical point (longitude and latitude)
  map.setView(london, 10);

  getBusStops(eventLat, eventLon);

  group = L.featureGroup([]).addTo(map);
}

function getBusStops(lat, lon) {
   $.ajax({
      url: "https://api.tfl.gov.uk/Stoppoint?lat=" + lat + "&lon=" + lon + "&stoptypes=NaptanPublicBusCoachTram",
      success: function ( data ) {
        console.log(data);

        if (data.stopPoints.length==0) alert('no coordinates');
        $('.map').hide();

        data.stopPoints.forEach(function(sp) {
          var marker = new L.Marker(new L.LatLng(sp.lat, sp.lon));

          group.addLayer(marker);
        });

        map.fitBounds(group.getBounds().pad(0.5));
      }
   });
}
