/* Déclaration des variables  */
  /* global google */
document.querySelector("html").classList.add('js');
 
// initialisation des variables
var fileInput  = document.querySelector( ".input-file" ),  
    button     = document.querySelector( ".input-file-trigger" ),
    the_return = document.querySelector(".file-return");
 
// action lorsque la "barre d'espace" ou "Entrée" est pressée
button.addEventListener( "keydown", function( event ) {
    if ( event.keyCode == 13 || event.keyCode == 32 ) {
        fileInput.focus();
    }
});
 
// action lorsque le label est cliqué
button.addEventListener( "click", function( event ) {
   fileInput.focus();
   return false;
});
 
// affiche un retour visuel dès que input:file change
fileInput.addEventListener( "change", function( event ) {  
    the_return.innerHTML = this.value;  
});
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
        center: {lat: -34.397, lng: 150.644},
        zoomControl: false,
        disableDefaultUI: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.TERRAIN
          ]
    }
    });
    var geocoder = new google.maps.Geocoder();
    //var nom = document.getElementById("nom").value;  
    var address = document.getElementById("addresse").value;    
    //var cp = document.getElementById("cp").value;
    //var adresse =nom + " " + address + " " + cp;
    geocoder.geocode({'address': address }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        document.getElementById("divResultat").style="block";
        document.getElementById("divConfirmation").style="block"; 
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        document.getElementById("resultat").innerHTML = results[0].formatted_address;
      } else {
        document.getElementById("divResultat").style="none";
        document.getElementById("divConfirmation").style="none"; 
        //document.getElementById("map").style="none";
        alert('Le geocodage n\'a pu etre effectue pour la raison suivante: ' + status);
      }
    });
}

function addressValide(){
    document.getElementById("Insertion").style="block";
    document.getElementById("divConfirmation").style="none";
}
function addressNonValide(){
      location.reload();  
}
//Fonction de chargement d'une image PNG
function chargementImage(){
     var files = this.files,
                filesLen = files.length,
                imgType;
            for (var i = 0 ; i < filesLen ; i++) {

                imgType = files[i].name.split('.');
                imgType = imgType[imgType.length - 1];

                if(allowedTypes.indexOf(imgType) != -1) {
                    createThumbnail(files[i]);
                }
            }
            
            var allowedTypes = ['png', 'jpg', 'jpeg', 'gif'],
            fileInput = document.querySelector('#file'),
            prev = document.querySelector('#prev');
    
            function createThumbnail(file) {

            var reader = new FileReader();

            reader.addEventListener('load', function() {

                var imgElement = document.createElement('img');
                imgElement.style.maxWidth = '150px';
                imgElement.style.maxHeight = '150px';
                imgElement.src = this.result;
                prev.appendChild(imgElement);

            }, false);

            reader.readAsDataURL(file);

        }
}


