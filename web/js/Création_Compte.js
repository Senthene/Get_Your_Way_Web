//Vérification lors de l'ensemble des champs du formulaire
function Inscription()
{
   var nomOK = verif_champ(document.getElementById('nom'));
   var prénomOK = verif_champ(document.getElementById('prénom'));
   var mailOk = verifMail(document.getElementById('email'));

   var mdpOK = verif_champ(document.getElementById('mdp'));
   var mdp2OK = verif_champ(document.getElementById('mdp2'));

   
   if(nomOK && prénomOK && mailOk && mdpOK && mdp2OK){
        var mdp = document.getElementById('mdp').value;
        var mdp2 = document.getElementById('mdp2').value;
        if (mdp == mdp2)
            CreationCompte();
        else
        {
        alert("Les mots de passes renseignés ne sont identiques");
        return false; 
        }
   }
   else
   {
      alert("Veuillez remplir correctement tous les champs");
      return false;
   }
}

function CreationCompte() {


    var nom = document.getElementById('nom').value;
    var prénom = document.getElementById('prénom').value;
    var email = document.getElementById('email').value;
    var mdp = document.getElementById('mdp').value;
    
    var xhr=null;
    if (window.XMLHttpRequest) { 
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) 
    {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //alert("http://192.168.1.50/Requetes.php?nom=" + nom + "&email=" + email + "&prenom=" + prénom + "&mdp=" + mdp +"&i=2");
    //console.log("http://192.168.1.50/Requetes.php?nom=" + nom + "&email=" + email + "&prenom=" + prénom + "&mdp=" + mdp +"&i=1&y=2");
    //on appelle le fichier requete.txt
    
    xhr.open("POST","http://192.168.1.50/Requetes.php" , true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("nom=" + nom + "&email=" + email + "&prenom=" + prénom + "&mdp=" + mdp +"&i=1&y=2");

    xhr.onreadystatechange = function() {
         
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
               if(xhr.responseText=="OK"){
                   sessionStorage.setItem("objet",monobjet_json );
                   location.href="Profil.html";
               }
               else if(xhr.responseText=="KO"){
                   alert("Cette adresse email existe déja.");
               }
               else {
                   alert(xhr.responseText);
               }
            }
    };

              
    //}
}

// Vérification du champs Texte
function verif_champ(champ) {
    if (champ.value == "") {
        //alert("Le champs "+champ+" n'est pas renseigné");
        surligne(champ, true);
        return false;
    }
    surligne(champ, false);
    return true;
}
// Vérification du champs Email
function verifMail(champ){
    var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if(!regex.test(champ.value))
    {
       surligne(champ, true);
       return false;
    }
    else
    {
        return true;
    } 
}

//Fonction qui souligne le input en rouge
function surligne(champ, erreur) {
   if(erreur)
      champ.style.backgroundColor = "#fba";
   else
      champ.style.backgroundColor = "";
}

function affCach(cache, id, reponse){
    if (cache){
        document.getElementById(id).style.display = "none";
        document.getElementById(id).innerHTML = "";
    } 
    else {
        document.getElementById(id).style.display = "inline";
        document.getElementById(id).innerHTML = reponse;
    }
}
function génèreImage(champ){
    if (champ.value == "Moniteur"){
        document.getElementById("Eleve").style.display = "none";
        document.getElementById("Moniteur").style.display = "block";
    } 
    else {
        document.getElementById("Eleve").style.display = "block";
        document.getElementById("Moniteur").style.display = "none";
    }
}
    
