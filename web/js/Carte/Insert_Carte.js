/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function insertCarte() {

    var adresse = document.getElementById('adresse').innerHTML;
    var cp = document.getElementById('cp').innerHTML;
    var pays = document.getElementById('country').innerHTML;
    var nom = document.getElementById('name').value;    
    var place_id = document.getElementById('place_id').innerHTML;
    var latitude = document.getElementById('latitude').innerHTML;
    var longitude = document.getElementById('longitude').innerHTML;
    var monobjet_json = sessionStorage.getItem("objet");
    var profil = JSON.parse(monobjet_json);
    var id_user = profil[0].J01_ID_USER;
    
    var salle = document.getElementById('salle').value;
    var ouverture = document.getElementById('ouverture').value;
    var fermeture = document.getElementById('fermeture').value;
    var description = document.getElementById('description').value;
    
    adresse = adresse.replace(" ", "_");    
    var xmlhttp=null;
    if (window.XMLHttpRequest) { 
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) 
    {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    console.log("http://192.168.43.30/Requetes.php?id_user=" + id_user +"&latitude=" + latitude + "&placeid=" + place_id + "&adresse=" + adresse + "&longitude=" + longitude +"&i=2&y=1");
    //on appelle le fichier requete.txt
    xmlhttp.open("POST","http://getyourwyn.cluster023.hosting.ovh.net/Requetes.php" , true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("id_user=" + id_user +"&latitude=" + latitude + "&placeid=" + place_id + "&adresse=" + adresse + "&cp=" + cp + "&pays=" + pays + "&nom=" + nom +"&longitude=" + longitude +"&i=2&y=1");
    

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if ( xmlhttp.status == 200) {
                if (xmlhttp.responseText == 0) {
                    alert("Votre identifiant ou votre mdp n'existe pas");
                }
                else if(xmlhttp.responseText == "42S020"){
                    alert("Erreur sur la requete SQL");
                }
                else {
                    alert("ajout parfait");
               }

            }
            else {
                alert("Error ->" + xmlhttp.responseText);
            }
        }
    };
    insertEtiquette(place_id)
    
}


function addEtiquette(){
    var salle = document.getElementById('salle').value;
    var ouverture = document.getElementById('ouverture').value;
    var fermeture = document.getElementById('fermeture').value;
    var description = document.getElementById('description').value;
    
    var id = document.getElementById("id-path").innerHTML;
    
    document.getElementById(id).setAttribute('data-info', '<div>Salle: ' + salle +'</div><div>Ouverture: ' + ouverture +'</div><div>Fermeture: ' + fermeture +'</div><div>Description: ' + description +'</div>');
    
   }
function insertEtiquette(place_id){
    
    var salle = document.getElementById('salle').value;
    var ouverture = document.getElementById('ouverture').value;
    var fermeture = document.getElementById('fermeture').value;
    var description = document.getElementById('description').value;
    var xmlhttp=null;
    if (window.XMLHttpRequest) { 
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) 
    {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    console.log("http://192.168.43.30/Requetes.php?placeid=" + place_id + "&salle=" + salle + "&description=" + description + "&ouverture=" + ouverture +"&fermeture=" + fermeture +"&i=2&y=2");
    //on appelle le fichier requete.txt
    xmlhttp.open("POST","http://getyourwyn.cluster023.hosting.ovh.net/Requetes.php" , true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("placeid=" + place_id + "&salle=" + salle + "&description=" + description + "&ouverture=" + ouverture +"&fermeture=" + fermeture +"&i=2&y=2");
    
 
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if ( xmlhttp.status == 200) {
                if (xmlhttp.responseText == 0) {
                    alert("Votre identifiant ou votre mdp n'existe pas");
                }
                else if(xmlhttp.responseText == "42S020"){
                    alert("Erreur sur la requete SQL");
                }
                else {
                    alert("ajout parfait");
               }

            }
            else {
                alert("Error ->" + xmlhttp.responseText);
            }
        }
    };
}