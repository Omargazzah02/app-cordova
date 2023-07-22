// Toutes les fonction sont ici 

// Fonction pour la mise a jour d'image (exécutée au chargement de la page)

document.addEventListener('DOMContentLoaded', function() {

    get_image();
  });

  function get_image(){




image=document.getElementById('image-id-affichage');
lien_image=document.formulaire['image-input'];

lien_image.addEventListener('change', function(event) {
  var selectedFile = event.target.files[0];

  var reader = new FileReader();
  reader.onload = function() {

    image.src = reader.result;

  };


  reader.readAsDataURL(selectedFile);
})
  }





// Fonction pour récupérer toutes les données et les envoyer à la base de données
function Send() {

    var URLimage;

    
    
    
 // traitement pour envoyer l'image    
    var input =document.formulaire['image-input'];
    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
 URLimage= e.target.result

    }


    reader.readAsDataURL(file);
    console.log(URLimage);

  }




