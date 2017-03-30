$("path, circle").hover(function(e) {
  $('#info-box').css('display','block');
  $('#info-box').html($(this).data('info'));
});

$("path, circle").mouseleave(function(e) {
  $('#info-box').css('display','none');
});

$(document).on('mousemove', 'path',function(e) {
  $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
  $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
});

$(document).on('click', 'path', function() { 
    var elt = this;
    var idElt = this.getAttribute('id');
    document.getElementById("id-path").innerHTML = idElt;
    document.getElementById('informationCarte').style="block";
	
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
        
        document.getElementById("etape-1").style="none";
        document.getElementById("etape-2").style="block";
        document.getElementById("divResultat").style="block";
        document.getElementById("divConfirmation").style="block"; 
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        
        document.getElementById("resultat").innerHTML = results[0].formatted_address;
        //extractFromAdress(results[0].address_components, "administrative_area_level_2")
        document.getElementById("adresse").innerHTML =  extractFromAdress(results[0].address_components, "route");
        document.getElementById("cp").innerHTML = extractFromAdress(results[0].address_components, "postal_code");
        document.getElementById("country").innerHTML = extractFromAdress(results[0].address_components, "country");
        document.getElementById("place_id").innerHTML = results[0].place_id;
        document.getElementById("latitude").innerHTML = results[0].geometry.location.lat();
        document.getElementById("longitude").innerHTML = results[0].geometry.location.lng();
        document.getElementById("step-1").className = "col-xs-3 bs-wizard-step complete";
      } else {
        document.getElementById("divResultat").style="none";
        document.getElementById("divConfirmation").style="none"; 
        //document.getElementById("map").style="none";
        alert('Le geocodage n\'a pu etre effectue pour la raison suivante: ' + status);
      }
    });
}
function extractFromAdress(components, type){
    for (var i=0; i<components.length; i++)
        for (var j=0; j<components[i].types.length; j++)
            if (components[i].types[j]==type) return components[i].long_name;
    return "";
}
function addressValide(){
    
    
    document.getElementById("etape-1").style.display="none";
    document.getElementById("etape-2").style.display="none";
    document.getElementById("etape-3").style="block";
    document.getElementById("step-2").className = "col-xs-3 bs-wizard-step active";
}
function addressNonValide(){
      location.reload();  
}
//Fonction de chargement d'une image PNG
function insertionImage(){
    var canvas= document.getElementById('canvas'),
    context = canvas.getContext('2d');
    var link = document.createElement('a');
    link.innerHTML = 'download image';
    link.addEventListener('click', function(ev) {
        link.href = canvas.toDataURL();
        link.download = "mypainting.png";
    }, false);
    document.body.appendChild(link);
    canvas.height= 300;
    canvas.width = 800;
    
    var joconde = new Image();
    joconde.src = "./test2.png";
    joconde.onload = function(){
        context.drawImage(joconde, 0,0);
        var myImage = context.getImageData(0, 0, 400, 400);
        var data = myImage.data;
        for(var i = 0; i < data.length; i += 4) {

        if (myImage.data[i] >200 && myImage.data[i + 1]<200 && myImage.data[i + 2]<200){
                 var myGray = parseInt(0);
    // Assign average to red, green, and blue.

        myImage.data[i] = myGray;

        myImage.data[i + 1] = myGray;

        myImage.data[i + 2] =myGray;
                                    }
            else {
              myImage.data[i] = myImage.data[i + 1] =myImage.data[i + 2] = 255;
              //console.log(`${myImage.data[i]} ${myImage.data[i+1]} ${myImage.data[i+2]} `)
            }
        }
        context.putImageData( myImage, 400, 0);
    };
}

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


function etape4(){
    document.getElementById("etape-3").style="none";
    document.getElementById("etape-4").style="block";
    document.getElementById("step-2").className = "col-xs-3 bs-wizard-step complete";
}



