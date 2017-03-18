/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function ChargementProfil(){
    
    var connexion = document.getElementById("buttonConnexion");
    var inscription = document.getElementById("buttonInscription");
    var menu = document.getElementById("dropdownMenu1");
    var monobjet_json = sessionStorage.getItem("objet");
    var profil = JSON.parse(monobjet_json);
    //Si il est pas connceté
    if (profil == null){
        connexion.style.display = "block";
        inscription.style.display ="block";
        menu.style.display ="none";
    }
    //Si il est connecté
    else {
        menu.style.display ="block";
        document.getElementById('Profil').innerHTML = profil[0].J01_NOM;
        connexion.style.display = "none";
        inscription.style.display ="none";
    }
}



