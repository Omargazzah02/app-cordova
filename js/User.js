// pour ouvrir la base de données 
var db = openDatabase('Data_Base_Application', '1.0', 'Data_Base_Application', 2 * 1024 * 1024);












/* fonction pour modifier régulierement la photo */

document.addEventListener('DOMContentLoaded', function() {

    get_image();
  });

  function get_image(){


image=document.getElementById('image-id-affichage');
lien_image=document.getElementById('image-input')

lien_image.addEventListener('change', function(event) {
  var selectedFile = event.target.files[0];

  var reader = new FileReader();
  reader.onload = function() {
URLimage=reader.result;
    image.src = URLimage;

  };
  reader.readAsDataURL(selectedFile);
})
  }






//une traitement pour incrementer automatique l'id
var id;
db.transaction(function(tx){
  tx.executeSql("select Max(id) id_max from user ",[],function(tx,result){
    id_max=result.rows.item(0).id_max;
    if (id_max==undefined){
      id=1;

    }
    else {
      id=id_max+1;
    }
  })
})

























  /*fonction pour inserer une ligne dans la tableau utilisateur */ 
   
  function Send() {

    // récupérer les champs du formulaire

  


    
 


    var last_name = document.getElementById('last_name-input').value;
    var firstname = document.getElementById('first_name-input').value;
    var age = document.getElementById('age-input').value;
    var job = document.getElementById('job-input').value;;
    var photo=document.getElementById('image-id-affichage').src;
    var verifphoto=document.getElementById('image-input').value;

// pour verifier si l'image est existe et si les elements sont nuls ou non
if (last_name.length==0||firstname.length==0|| age.length==0|| job.length==0){
  alert('one of the  inputs is empty!')
}

else if(verifphoto.length==0){
  alert('Take a photo!')
}


else {


  // fonction pour enregistrer toutes les champs et la photo dans la base donnée tableau(USER)
    db.transaction(function(tx) {
      // la valeur d'image est URLimage


     tx.executeSql('INSERT INTO User (id, last_name, first_name,age, job, photo) VALUES (?, ?, ?, ?, ?,?)', [id, last_name, firstname,age, job, photo]);
  location.reload();
  });
}
  }
  
  











