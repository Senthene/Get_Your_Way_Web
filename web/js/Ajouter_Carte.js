function verifForm(f)
{
   var nomOK = verif_champ(f.nom);
   var adresseOK = verif_champ(f.addresse);
   var cpOK = verif_champ(f.cp);
   var mailOk = verifMail(f.email);
      
   if(nomOK && mailOk && adresseOK && cpOK ){
        AjouterCarte();
   }
   else
   {
      alert("Veuillez remplir correctement tous les champs");
      return false;
   }
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
    return true;
}

//Fonction qui souligne le input en rouge
function surligne(champ, erreur) {
   if(erreur)
      champ.style.backgroundColor = "#fba";
   else
      champ.style.backgroundColor = "";
}


function AjouterCarte() {

    var nom = document.getElementById('nom').value;
    var email = document.getElementById('email').value;
    var addresse = document.getElementById('addresse').value;
    var cp = document.getElementById('cp').value;
    
    var xhr=null;
    if (window.XMLHttpRequest) { 
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) 
    {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var re = "http://192.168.1.50/Requetes.php?nom=" + nom + "&email=" + email + "&addresse=" + addresse + "&cp=" + cp +"&i=" + 1 +"";
    //on appelle le fichier requete.txt
    xhr.open("GET","http://192.168.1.50/Requetes.php?nom=" + nom + "&email=" + email + "&addresse=" + addresse + "&cp=" + cp +"&i=" + 1 +"" , true);
    xhr.send(null);

    
    var fileInput = document.querySelector('#carte');
    var reader = new FileReader();
    reader.addEventListener('load', function() {
            //alert('Contenu du fichier "' + fileInput.files[0].name + '" :\n\n' + reader.result);
            
            csvJSON(reader.result, nom, addresse, cp);
    });
    reader.readAsText(fileInput.files[0]);   
    
}

        

function csvJSON(csv, nom, addresse, cp){

    var lines=csv.split("\n");

    var result = new Object();
                     
    var headers=lines[0].split(",");
                    

    for(var i=1;i<lines.length;i++){

        var obj =  new Object();
        var currentline=lines[i].split(",");

        for(var j=0;j<headers.length;j++){

            var ent =headers[j].replace(' ',''); 
            var entete =ent.replace('�','e'); 
            if (currentline[j]==""){
                obj[entete] = "0";
            }
            else {
                obj[entete] = currentline[j];
            }                              
        }
        //result.push(obj);
        insert(obj, nom, addresse, cp);
    }                     
}

function insert(plan, nom, addresse, cp)
{
    //alert(plan.FinY);
    var xhr=null;
    if (window.XMLHttpRequest) { 
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) 
    {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
        var re = "http://192.168.1.50/Requetes.php?DepartX=" + plan.DepartX + "&DepartY=" + plan.DepartY + "&DepartZ=" + plan.DepartZ + "&FinX=" + plan.FinX +"&FinY=" + plan.FinY + "&FinZ=" + plan.FinZ + "&Angle=" + plan.Angle +"&nom=" + nom + "&addresse=" + addresse + "&cp=" + cp +"&i=" + 2 +"";
    //on appelle le fichier requete.txt
    xhr.open("GET","http://192.168.1.50/Requetes.php?DepartX=" + plan.DepartX + "&DepartY=" + plan.DepartY + "&DepartZ=" + plan.DepartZ + "&FinX=" + plan.FinX +"&FinY=" + plan.FinY + "&FinZ=" + plan.FinZ + "&Angle=" + plan.Angle +"&nom=" + nom + "&addresse=" + addresse + "&cp=" + cp +"&i=" + 2 +"" , true);
    xhr.send(null);
    
}