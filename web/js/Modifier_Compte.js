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
        document.getElementById("name").innerHTML = profil[0].J01_NOM + " " + profil[0].J01_PRENOM;
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
    
    var xmlhttp =null;
    var xmlhttp = new XMLHttpRequest();
    var url = "http://getyourwyn.cluster023.hosting.ovh.net/Requetes.php";
    xmlhttp.open('POST',url,true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("email=" + email + "&mdp=" + mdp + "&prenom=" + prenom + "&nom=" + nom + "&id=" + id + "&i=1&y=3");
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if ( xmlhttp.status == 200) {
                if(xmlhttp.responseText == "42S020"){
                    alert("Erreur sur la requete SQL");
                }
                else if (xmlhttp.responseText==0){
                    alert("L'adresse email ne peut être remplacer par " + email + " car elle est deja utilisée par un autre utilisateur.")
                }
                else {
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
