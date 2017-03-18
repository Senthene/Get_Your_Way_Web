/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function verifCompte(){
    var monobjet_json = sessionStorage.getItem("objet");
    var profil = JSON.parse(monobjet_json);
    if (profil == null){
        document.location = "../index.html";
    }
}


