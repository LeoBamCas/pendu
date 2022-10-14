
//les variables

let coeur = document.querySelector('#coeur');
let lettreEntree = document.querySelector('#lettreEntree');
let btn = document.querySelector('#btn');
let etoiles = document.querySelector('#etoiles');
let checked = document.querySelector('#checked');
let corps = document.querySelector('#corps');
let btnReload = document.querySelector('#btnReload');
let alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z '
let alphabetCheck;
let dictionnaire = ["cacatoes", "percolateur","armorique","bistouquette","primaire","mistigri","nullissime","gonflant","hereditaire"];
let motMystere;
let compteur;
let motAffiche = []

//on initialise le mot mystere puis le mot affiché avec des * puis le reste de l'affichage de la page. Le tout dans une fonction start()

function start(){
    let alphabetCheck = alphabet;
    checked.textContent = alphabetCheck;
    motAffiche = []
    compteur = 7;
    corps.classList.add('corps7');
    motMystere = dictionnaire[Math.floor(Math.random()*dictionnaire.length)];
    for(i=0;i<motMystere.length;i++){
        motAffiche.push("*");
    }
    etoiles.textContent = motAffiche;
    coeur.textContent = `il vous reste ${compteur} vies`;
 
}

start()
//on lance le jeu au clic


btn.addEventListener('click', function(e){

    e.preventDefault();
    let temp = motMystere.indexOf(lettreEntree.value);
    console.log(lettreEntree.value)
    console.log(temp);
    if(lettreEntree.value.length>1){
        alert('Il ne vous faut entrer qu\'une lettre');
    }
    else if(temp < 0){
        if(compteur>0){

            corps.classList.remove(`corps${compteur}`);
            compteur --;
            corps.classList.add(`corps${compteur}`);
        }
  
    }else{
        while(temp>=0){

            motAffiche[temp] = motMystere[temp];
            console.log(`motAf : ${motAffiche[temp]}, motM ${motMystere[temp]}`)
            temp = motMystere.indexOf(lettreEntree.value,temp+1);
            console.log(`temp fin while : ${temp}`)

        }
        
    }
    coeur.textContent = `il vous reste ${compteur} vies`;
    checked.textContent = alphabetCheck;
    etoiles.textContent = motAffiche;
    
//les conditions de fin de jeu :


    if(compteur<=0){
        coeur.textContent = `C'est perdu`;
        btnReload.classList.remove('hidden');
        btnReload.classList.add('visible');

    }else if (motAffiche.indexOf('*')<0){
        coeur.textContent = `C'est gagné`;
        corps.classList.remove(`corps${compteur}`);
        corps.classList.add('gagne');
        btnReload.classList.remove('hidden');
        btnReload.classList.add('visible');
    }



})