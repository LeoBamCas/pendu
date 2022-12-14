
//les variables

let coeur = document.querySelector('#coeur');
let lettreEntree = document.querySelector('#lettreEntree');
let btn = document.querySelector('#btn');
let etoiles = document.querySelector('#etoiles');
let checked = document.querySelector('#checked');
let corps = document.querySelector('#corps');
let btnReload = document.querySelector('#btnReload');
let ronnie = document.querySelector('#ronnie');
let mort = document.querySelector('#mort');
let ambiance = document.querySelector('#ambiance');
let alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z '
let alphabetCheck = '';
let dictionnaire = ["cacatoes","xylophone", "percolateur","armorique","bistouquette","primaire","mistigri","nullissime","gonflant","hereditaire", "myxomatose"];
let motMystere;
let compteur;
let motAffiche = []


//on initialise le mot mystere puis le mot affiché avec des * puis le reste de l'affichage de la page. Le tout dans une fonction start()

function start(){
    lettreEntree.focus(); 
    alphabetCheck = alphabet;
    checked.textContent = alphabetCheck;
    motAffiche = []
    compteur = 7;
    corps.classList.remove('corps0');
    corps.classList.remove('gagne');
    corps.classList.add('corps7');
    motMystere = dictionnaire[Math.floor(Math.random()*dictionnaire.length)];
    for(i=0;i<motMystere.length;i++){
        motAffiche.push("*");
    }
    etoiles.textContent = motAffiche;
    coeur.textContent = `il vous reste ${compteur} vies`;
    ronnie.pause();
    mort.pause();
    btnReload.classList.remove('visible');
    btnReload.classList.add('hidden');
   
 
}

//fonction pour ne plus afficher une lettre déjà entrée


//on demarre

start()
//on lance le jeu au clic


btn.addEventListener('click', function(e){

    e.preventDefault();
    ambiance.play();
    lettreEntree.value = lettreEntree.value.toLowerCase();
    let temp = motMystere.indexOf(lettreEntree.value);
    if (coeur.textContent === `C'est perdu`){
        alert("rien ne sert de s'acharner, assume ta défaite");
    }
    else if(coeur.textContent === `C'est gagné`){
            alert("calme toi, c'est déjà gagné !");
    }
    else if(lettreEntree.value.length>1){                                    //si l'utilisateur fait une erreur
        alert('Il ne vous faut entrer qu\'une lettre');
    }
    else if(lettreEntree.value === ''){
        alert('Il vous faut entrer une lettre')
    }
    else if(alphabetCheck.indexOf(lettreEntree.value)<0){
        alert('lettre déjà soumise');
    }
    else if(temp < 0){
        if(compteur>0){                                                 //si l'utilisateur se trompe

            corps.classList.remove(`corps${compteur}`);
            compteur --;
            corps.classList.add(`corps${compteur}`);
            alphabetCheck = alphabetCheck.slice(0,alphabetCheck.indexOf(lettreEntree.value)) + alphabetCheck.slice(alphabetCheck.indexOf(lettreEntree.value)+2,alphabetCheck.length);
        }
      
    }else{                                                              //si la lettre est contenu dans motMystere
        while(temp>=0){
            motAffiche[temp] = motMystere[temp];           
            temp = motMystere.indexOf(lettreEntree.value,temp+1);
           
        }
        alphabetCheck = alphabetCheck.slice(0,alphabetCheck.indexOf(lettreEntree.value)) + alphabetCheck.slice(alphabetCheck.indexOf(lettreEntree.value)+2,alphabetCheck.length);
        
    }
    coeur.textContent = `il vous reste ${compteur} vies`;
    checked.textContent = alphabetCheck;
    etoiles.textContent = motAffiche;
       //on prépare la prochaine saisie utilisateur
       lettreEntree.value=""; // vide le champs de saisie
       lettreEntree.focus();   // remet le focus sur le champs
    
//les conditions de fin de jeu :


    if(compteur<=0){
        coeur.textContent = `C'est perdu`;
        btnReload.classList.remove('hidden');
        btnReload.classList.add('visible');
        ambiance.pause();
        mort.play();
    }else if (motAffiche.indexOf('*')<0){
        coeur.textContent = `C'est gagné`;
        corps.classList.remove(`corps${compteur}`);
        corps.classList.add('gagne');
        btnReload.classList.remove('hidden');
        btnReload.classList.add('visible');
        ambiance.pause();
        ronnie.play();   
    }



})