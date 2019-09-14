window.addEventListener("load", function() {/*Lors du chargement de la page*/

    var canvas = document.getElementById("Grille"); /*l'obtention de la surface afin de dessiner la grille  */
    var canvas2 = document.getElementById("Tetro_Suivant");/*l'obtention de la surface afin de dessiner les prochaines Tetrominos  */
    var context = canvas2.getContext("2d");
    var i=0;
    var stop=false;
    var th= [ ];
    th[0]=document.getElementById("snow1");
    th[1]=document.getElementById("space");
    th[2]=document.getElementById("aqua");
    th[3]=document.getElementById("enfant");
    th[4]=document.getElementById("sea");

    while (!stop){
        if(th[i]) stop=true;
        i++;
    }

    var tet=new Tetris(canvas,context,i);/* la Nouvelle Tetris*/
    var g=new Grille(context,22,10);/* La grille Principal*/
   // var sidebarRight = document.getElementById("sidebarRight") ;
    //var sidebarLeft = document.getElementById("sidebarLeft") ;

    var StartMessage = document.getElementById("StartMessage");
    var StartMessageContainer = document.getElementById("StartMessageContainer");

    g.initialiser();/*Intialisation de la grille*/
    if(localStorage.mode === "normal"){/* évènement signifie la début du jeu*/
        setTimeout (function(){StartMessage.innerText = "Go !";}, 1500);
        setTimeout(function () {
            setTimeout(function () {
                StartMessageContainer.style.visibility = 'hidden';
                StartMessageContainer.style.display = 'none';

            }, 1000);
            g.initialiser();
            tet.jouer(0) ;
            },1500);

    }
    if(localStorage.mode === "defi"){
        setTimeout (function(){StartMessage.innerText = "Go !";}, 1500);
        setTimeout(function () {
            setTimeout(function () {
                StartMessageContainer.style.visibility = 'hidden';
                StartMessageContainer.style.display = 'none';

            }, 1000);
            g.initialDefit();
            tet.jouer(1);
            },1500);
    }
});