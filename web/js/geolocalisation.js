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
        document.getElementById("adresse").innerHTML += results[0].formatted_address;
        document.getElementById("place_id").innerHTML += results[0].place_id;
        document.getElementById("latitude").innerHTML += results[0].geometry.location.lat();
        document.getElementById("longitude").innerHTML += results[0].geometry.location.lng();
        document.getElementById("step-1").className = "col-xs-3 bs-wizard-step complete";
      } else {
        document.getElementById("divResultat").style="none";
        document.getElementById("divConfirmation").style="none"; 
        //document.getElementById("map").style="none";
        alert('Le geocodage n\'a pu etre effectue pour la raison suivante: ' + status);
      }
    });
}

function addressValide(){
    
    document.getElementById("resultatRecherche").style.display="block";
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
    canvas= document.getElementById('canvas'),
    context = canvas.getContext('2d');
    link = document.createElement('a');
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
                 let myGray = parseInt(0);
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

//Canvas 
 var configurations = {
    canvasWidth: 500,
    canvasHeight: 500,
    color: "#48c"
};

var tools = {
    selection: function() {
        var v = $("#tools-area .active").val();
        return tools[v];
    },
    move: (function() {
        var imageData = null;
        return {
            onDrag: function(from, to) {
                var w = canvases.user.canvas.width;
                var h = canvases.user.canvas.height;
                if (imageData == null) {
                    imageData = canvases.user.getImageData(0, 0, w, h);
                }
                var dx = to.x - from.x;
                var dy = to.y - from.y;
                canvases.user.clearRect(0, 0, w, h);
                canvases.user.putImageData(imageData, dx, dy);
            },
            onDragEnd: function(from, to) {
                imageData = null;
            }
        };
    })(),
    pencil: (function() {
        var prevPos = null;
        return {
            onDrag: function(from, to) {
                var c = canvases.user;
                c.save();
                c.fillStyle = configurations.color;
                c.strokeStyle = configurations.color;
                c.lineWidth = 1;
                if (prevPos != null) {
                    c.beginPath();
                    c.moveTo(prevPos.x, prevPos.y);
                    c.lineTo(to.x, to.y);
                    c.stroke();
                } else {
                    c.fillRect(to.x, to.y, 1, 1);
                }
                c.restore();
                prevPos = to;
            },
            onDragEnd: function(from, to) {
                prevPos = null;
            }
        };
    })(),
    rect: {
        onDrag: function(from, to) {
            var c = canvases.foreground;
            c.clearRect(0, 0, c.canvas.width, c.canvas.height);
            c.save();
            c.fillStyle = configurations.color;
            c.fillRect(from.x, from.y, to.x - from.x, to.y - from.y);
            c.restore();
        },
        onDragEnd: function(from, to) {
            var c = canvases.foreground;
            c.clearRect(0, 0, c.canvas.width, c.canvas.height);
            var c = canvases.user;
            c.save();
            c.fillStyle = configurations.color;
            c.fillRect(from.x, from.y, to.x - from.x, to.y - from.y);
            c.restore();
        }
    }
};

var control = (function() {
    var dragFrom = null;
    return {
        onmousedown: function(e) {
            dragFrom = canvases.getOffset(e);
        },
        onmousemove: function(e) {
            var pos = canvases.getOffset(e);
            var from = dragFrom;
            var tool = tools.selection();
            from && tool && tool.onDrag && tool.onDrag(from, pos);
        },
        onmouseup: function(e) {
            var pos = canvases.getOffset(e);
            var from = dragFrom;
            var tool = tools.selection();
            from && tool && tool.onDragEnd && tool.onDragEnd(from, pos);
            dragFrom = null;
        }
    };
})();

var canvases = {};

var refreshBackground = function(canvas) {
    var gap = 10;
    var fill = false;
    var w = configurations.canvasWidth;
    var h = configurations.canvasHeight;
    for (var i = 0; i < w; i = i + gap) {
        fill = (i % (gap * 2) == 0);
        for (var j = 0; j < h; j = j + gap) {
            if (fill) {
                canvas.fillStyle = '#eeeeee';
                canvas.fillRect(i, j, gap, gap);
            }
            fill = !fill;
        }
    }
};

$(document).ready(function() {
    // Tooltips
    $("#tools-area .btn").tooltip();
    // Canvases
    canvases = {
        background: $("#background-canvas")[0].getContext("2d"),
        user: $("#user-canvas")[0].getContext("2d"),
        foreground: $("#foreground-canvas")[0].getContext("2d"),
        getOffset: function(event) {
            return {
                x: event.pageX - $("#foreground-canvas").offset().left,
                y: event.pageY - $("#foreground-canvas").offset().top
            };
        },
        resizeAll: function() {
            for (var key in canvases) {
                var c = canvases[key];
                if (c.canvas != undefined) {
                    c.canvas.width = configurations.canvasWidth;
                    c.canvas.height = configurations.canvasHeight;
                }
            }
        }
    };
    canvases.resizeAll();
    refreshBackground(canvases.background);
    // Mouse events
    $("#foreground-canvas").bind("mousedown", control.onmousedown) 
        .bind("mousemove", control.onmousemove)
        .bind("mouseup", control.onmouseup);
});

function etape4(){
    document.getElementById("etape-3").style="none";
    document.getElementById("etape-4").style="block";
}