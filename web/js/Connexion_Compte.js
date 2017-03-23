/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Connexion(){

    var email = document.getElementById('email').value;
    var mdp = document.getElementById('mdp').value;
    var xmlhttp =null;
    var xmlhttp = new XMLHttpRequest();
    
    var url = "http://192.168.1.50/Requetes.php";
    
    xmlhttp.open('POST',url,true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("email=" + email + "&mdp=" + mdp + "&i=1&y=1");
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
                    var resultat = eval( "(" +  xmlhttp.responseText + ")"); 
                    var monobjet_json = JSON.stringify(resultat);
                    sessionStorage.setItem("objet",monobjet_json);
                    document.getElementById('profil').click();
               }

            }
            else {
                alert("Error ->" + xmlhttp.responseText);
            }
        }
    };
}

function Deconnexion(){
    sessionStorage.clear();
    document.location = "index.html";
}

function verif_champConn(champ) {
    if (champ.value == "") {
        //alert("Le champs "+champ+" n'est pas renseignÃ©");
        surligne(champ, true);
        return false;
    }
    surligne(champ, false);
    return true;
}

