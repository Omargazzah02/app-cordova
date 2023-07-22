// Toutes les fonction du page index  et les traitement sont ici 
//pour lancer notre base de données  
var db = openDatabase('Data_Base_Application', '1.0', 'Data_Base_Application', 2 * 1024 * 1024);


//  pour construire  le tableau USER

db.transaction(function(tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS User (id integer, last_name TEXT , first_name TEXT,job TEXT,photo TEXT)');

});


// Fonction pour la mise a jour d'image exécutée au chargement de la page


// Fonction pour récupérer toutes les données et les envoyer à la base de données

function Send() {

  // récupérer les champs du formulaire
  var id = document.formulaire['id-input'].value;
  var last_name = document.formulaire['lastname-input'].value;
  var firstname = document.formulaire['firstname-input'].value;
  var job = document.formulaire['job-input'].value;
  var URLimage;

  // Récupérer le lien d'image 
  var input = document.formulaire['image-input'];
  var file = input.files[0];
  var reader = new FileReader();

  reader.onload = function(e) {
    URLimage = e.target.result;
  };


  reader.readAsDataURL(file);

// URL d'image est dans la variable URMimage

// fonction pour enregistrer toutes les champs et la photo dans la base donnée tableau(USER)
  db.transaction(function(tx) {
   tx.executeSql('INSERT INTO user (id, last_name, first_name, job, photo) VALUES (?, ?, ?, ?, ?)', [id, last_name, firstname, job, URLimage]);

});

}




/*

function Send0() {
    // Récupérer les valeurs des champs
     id = document.formulaire['id-input'].value;
    last_name = document.formulaire['lastname-input'].value;
  firstname = document.formulaire['firstname-input'].value;
    job = document.formulaire['job-input'].value;
     photo = null;


  
    // Envoyer ces valeurs à la base de données
    db.transaction(function(tx) {
      tx.executeSql('INSERT INTO user (id, last_name, first_name, Job, photo) VALUES (?, ?, ?, ?, ?)', [id, last_name, firstname, job, photo]);
    });




  }


*/
















  




