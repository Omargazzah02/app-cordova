/* C'est la page principale pour gerer les fonctions et la base donnée d'admine */

// ouvrir la base donnée 




var db = openDatabase('Data_Base_Application', '1.0', 'Data_Base_Application', 2 * 1024 * 1024);

















/* une fonction pour inserer un admin */
function Create_Admin() {
  Admin_name=document.getElementById('Admin-name').value;
  Admin_password=document.getElementById('Admin-password').value;
  
if(Admin_name.length<5||Admin_password.length<5){
  alert("The fields are empty or the name or password is not long enoughThe fields are empty, or the name or password is less than 5 characters long..")
}

else {


      db.transaction(function(tx) {
          tx.executeSql('insert into admin (id,admin_name,admin_password) values (?,?,?) ',[1,Admin_name,Admin_password]);
          location.replace("../Version.html");

        });

      }
        }



/* une fonction pour redemarer l'application (supprimer toutes les données et tables )*/


function Restart() {
password_input=prompt('If you are sure you want to delete all information! Enter the password');

  db.transaction(function(tx){
    tx.executeSql('select admin_password from admin where id=?',[1],function(tx,result){
      password_db=result.rows.item(0).admin_password;
      if (password_db==password_input){
        db.transaction(function(tx){
          tx.executeSql('drop table admin');
          tx.executeSql('drop table user');
          location.replace('../index.html')
      
        })
      }
      
      else {
        alert("incorrect password")
      }
      





    })
  })





}





/*  Fonction pour modifier une ligne de base de la table user   */

function Modify(){
//récuperer tous les champs 



var last_name = document.getElementById('last_name-input').value;
var firstname = document.getElementById('first_name-input').value;
var age = document.getElementById('age-input').value;
var job = document.getElementById('job-input').value;
var photo= document.getElementById('image-id-affichage').src;
var id_user=document.getElementById("selectElement").value;


if (id_user==0){
  alert('Please select a user!')
}


else if( last_name.length==0||firstname.length==0||age.length==0||job.length==0){
  alert('one of the  inputs is empty!')

}


else {


 




db.transaction(function(tx){
  tx.executeSql('delete from user where id=?',[id_user]);

})


db.transaction(function(tx){
  tx.executeSql('insert into user values (?,?,?,?,?,?)',[id_user,last_name,firstname,age,job,photo]);
  location.reload();

})




}
}














//une fonction   pour afficher toutes les utilisateur dans une select 
 function Affiche() {
var Select_user=document.getElementById('selectElement');
var options;
    db.transaction(function(tx){
      tx.executeSql("select * from user",[],function(tx,result){
        rows=result.rows;
        for(i=0;i<rows.length;i++){
          user = rows.item(i);
          options += "<option value='" + user.id + "'>" + user.last_name +' '+user.first_name+ "</option>";
        }
        options +="<option selected value='0'  >Choose User</option>";

    
        Select_user.innerHTML=options;
      })
    })
 
  }



    // c'est une fonction pour modifier les valeurs d'inputs de page modifier 

    function Updatedata(){
      // pour récuperer toutes les inputs 
      var last_name = document.getElementById('last_name-input');
      var firstname = document.getElementById('first_name-input');
      var age = document.getElementById('age-input');
      var job = document.getElementById('job-input');
      var photo=document.getElementById('image-id-affichage');



   id_user=document.getElementById('selectElement').value;
   if (id_user!=0){
    
    db.transaction(function(tx){
      tx.executeSql('select * from user where id=?',[id_user],function(tx,result){

      user=result.rows.item(0);
      last_name.value=user.last_name;
      firstname.value=user.first_name;
      age.value=user.age;
      job.value=user.job;
      photo.src=user.photo;





      
      })
    })

   }



    }






   
    // Fonction pour supprimer utilisateur 
    function Delete() {
      id_user=document.getElementById('selectElement').value;

      if (id_user==0){
        alert('Please select a user!')

  

    }


    else {
      db.transaction(function(tx){
        tx.executeSql('delete from user where id=?',[id_user])
              location.reload();

      })
    }
    } 




    // une fonction pour afficher l'utilisateur
    

    function Show(){
      // pour récuperer tous cases d'affichage (output)


      var id=document.getElementById('output-id');
      var last_name=document.getElementById('output-last_name');
      var first_name=document.getElementById('output-first_name');
      var age = document.getElementById('output-age');
      var job=document.getElementById('output-job');
      var photo=document.getElementById('image-id-affichage');
      var download=document.getElementById('download-balise');


      //pour récuperer toutes les données d'utilisateur selecté et les mettre dans les outputs
      id_user=document.getElementById('selectElement').value;


      //une condition pour verfier si la balise select selecte un user
      if (id_user!=0){



      db.transaction(function(tx){
        tx.executeSql("select * from user where id=?",[id_user],function(tx,result){
          user=result.rows.item(0);
          id.textContent='Id :'+user.id;
          last_name.textContent= 'Last Name :'+user.last_name;
          first_name.textContent='First Name :'+user.first_name;
          age.textContent='Age :'+user.age;
          job.textContent='Job :'+user.job;
          photo.src=user.photo;
          download.textContent='Download the image';
          download.href=user.photo
          download.download=user.last_name+"-"+user.first_name;
          

        })
      })

    }


    }