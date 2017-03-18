/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function chargmentCompte(){
       
    var monobjet_json = sessionStorage.getItem("objet");
    var profil = JSON.parse(monobjet_json);
    //Si il est pas connceté
    if (profil == null){

    }
    //Si il est connecté
    else {
        document.getElementById("nom").value = profil[0].J01_NOM;
        document.getElementById("prenom").value = profil[0].J01_PRENOM;
        document.getElementById("email").value = profil[0].J01_EMAIL;
        document.getElementById("mdp").value = profil[0].J01_PASSWORD;
    }
}

function updateProfil(){
    var monobjet_json = sessionStorage.getItem("objet");
    var profil = JSON.parse(monobjet_json);
    var id = profil[0].J01_ID_USER;
    
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var email = document.getElementById("email").value;
    var mdp = document.getElementById("mdp").value;
    
    var xmlhttp = new XMLHttpRequest();
    var url = "http://192.168.43.30/Requetes.php?email=" + email + "&mdp=" + mdp + "&prenom=" + prenom + "&nom=" + nom + "&id=" + id + "&i=1&y=3";
    console.log(url);
    xmlhttp.open('GET',url,true);
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if ( xmlhttp.status == 200) {
                if (xmlhttp.responseText == 0) {
                    alert("Votre identifiant ou votre mdp n'existe pas");
                }
                else{
                    var resultat = eval( "(" +  xmlhttp.responseText + ")"); 
                    sessionStorage.clear();
                    var monobjet_json = JSON.stringify(resultat);
                    sessionStorage.setItem("objet",monobjet_json);
                    location.reload();
                }
            }
            else {
                alert("Error ->" + xmlhttp.responseText);
            }
        }
    };
}
