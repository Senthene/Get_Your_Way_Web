/* Déclaration des variables  */
  /* global google */

var geocoder;
  var map;
  var markers = new Array();
  var i = 0;

  /* Initialisation de la carte  */
function initMap() {
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: {lat: -34.397, lng: 150.644}
  });
  
  var geocoder = new google.maps.Geocoder();
  
  document.getElementById('submit').addEventListener('click', function() {
    
    geocodeAddress(geocoder, map);
  });
}

  /* Fonction de géocodage déclenchée en cliquant surle bouton "Geocoder"  */
  function geocodeAddress() {
      var resultsMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();
    var nom = document.getElementById("nom").value;  
    var address = document.getElementById("addresse").value;    
    var cp = document.getElementById("cp").value;
    var adresse =nom + " " + address + " " + cp;
    geocoder.geocode({'address': adresse }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        //document.getElementById("map").style="block";  
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
          //document.getElementById("map").style="none";
        alert('Le geocodage n\'a pu etre effectue pour la raison suivante: ' + status);
      }
    });
}