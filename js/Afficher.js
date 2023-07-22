//toutes les fonction d'affichage sont ici 

//pour lancer notre base de données  
var db = openDatabase('Data_Base_Application', '1.0', 'Data_Base_Application', 2 * 1024 * 1024);

// pour récuperer tous les user et les mettre dans la balise select 

db.transaction(function(tx){
tx.executeSql("SELECT * from User ",[],function(tx,result){
    rows=result.rows;
options ='';
    for( var i=0;i<rows.length;i++){
       user= rows.item(i);
        options += "<option value='" + user.id + "'>" + user.last_name +' '+user.first_name+ "</option>";

        

    }
    options+= "<option  selected>"+'Choisir un utilisateur'+"</option>"

selectElement=document.getElementById('selectElement');
selectElement.innerHTML=options;


}) 
}
)







    // Pour recuperer toutes les données de user 
    function Updatedata(){
    var Id_selected=document.getElementById('selectElement').value;

    if (!isNaN(Id_selected)){



    db.transaction(function(tx){

        tx.executeSql('SELECT * FROM User where id=?',[Id_selected],function(tx,result){
            user=result.rows.item(0);
              input_id=Id_selected;
              input_last_name=user.last_name;
              input_first_name=user.first_name;
              input_job=user.job;
              input_photo=user.photo;
              // appeler la fonction afficher
              afficher();

        })

    })

}


// une fonction utilisé pour afficher  l'image et tous les cordonées de user 

function afficher (){
    //pour afficher l'image 
document.getElementById('image-id-affichage').src=input_photo;
//afficher les autres cordonées 
document.getElementById('output-id').textContent="Id: "+input_id;
document.getElementById('output-last_name').textContent="Last Name: "+input_last_name;
document.getElementById('output-first_name').textContent="First Name: "+input_first_name;
document.getElementById('output-job').textContent="Job: "+input_job;



   
}





    }



    //Fonction pour supprimer un element 
    function Supprimer(){

        //recuperer l'id qui sera supprimer 
        Id_sup=document.getElementById('selectElement').value;
        db.transaction(function(tx){
            tx.executeSql('delete from user where id=?',[Id_sup]);
            location.replace("Afficher.html")


        })

    }















