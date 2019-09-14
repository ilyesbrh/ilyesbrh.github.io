function Tetris(canvas,context,choix){ /*gére la Tetris Complète*/
   console.log(choix);
    var score;/*Le Score Actuel*/
    var niveau;/*Le niveau Actuel*/
    var But ;/*Le nombre de but Actuel*/
    this.grille = new Grille(canvas.getContext("2d"),22,10,choix,canvas,"red") ;/*la grille principal*/
    var tab=[new Case(0,0),new Case(0,1),new Case(1,1),new Case(1,2)]; /*Tableu de point Initial*/
    this.precFrm =  new TForme(tab,"yellow");/*Le tetrominos Precedent*/
    this.courantFrm =  new TForme(tab,"green");/*Le Tetromino Courrent*/
    this.dess=new TForme(tab,"pink");
    var tabTetro=[];/*Tableau contient les 6 Tetrominos prochaines*/
    var nbrLigneSup ;/* la Nombre de lignes supprimées a la fois*/
    var nbrTotaleLigneSup=0;/* la Nombre de lignes supprimées des le debut*/
    var vitesse ;/* la vitesse de descente*/
    var p = [40,100,300,1200] ;
    //var pause ;/*booleen pour indique si le jeu est en pause ou non */
    var finpartie ;/* Booleene indique la fin de la partie*/
    var f ;
    var mode =0 ;/*variable de mode par defaut mode simple sinon mode de défit*/
    var cpt=0 ;/*utilise dans le mode de defit pour le comptagge de secondes*/
    var couleur= ["#FF002D","#FF1C00","#FF4900","#FF6700","#FF7D00","#FF8E00","#FFAD00","#FFE702","#FFF301","#F1FF05","#9EFF06","#70FF00","#1AFF00","#11FF03","#00FF65"];
    // tableau de couleurs pour un jeux de couleur sur l'affichage du temps restant
    this.direction=0;
    var joker ;//le nomber de joker qui peut utiliser
    var intervale = null ;

    var sound11=new Audio();
    sound11.src = "js/audio/touche.wav";


    /**** Methodes .........**/

    this.setCaracteris = function() { //cette fonction ajoute aux score les point achevée
    But -= nbrLigneSup ;
    nbrTotaleLigneSup+= nbrLigneSup ;
    if( nbrLigneSup >0) score += p[nbrLigneSup-1] * (niveau + 1) ;

    if (But <= 0) {
        niveau++;
        But = f* (niveau +1) + But;
        vitesse /= (niveau +1) ;
        clearInterval(intervale);
        intervale=setInterval(this.miseajour.bind(this), vitesse);
    }
        document.getElementById("score").innerText = "'"+score+"'" ;
        document.getElementById("but").innerText = "'"+But+"'" ;
        document.getElementById("Lignes").innerText = "'"+nbrTotaleLigneSup+"'" ;
        document.getElementById("niveau").innerText="'"+(niveau+1)+"'";
    };

/********///////////////////////////////////////////////////////////******/
            /******Added by BOUBRED MOHAMED FOr the pause Menu */
/****///////////////////////////////////////////////////////////////////***/
    var paused;
    var pauseIcone = document.getElementById('PauseIcone') ;
    var ReprendreBtn = document.getElementById("ReprendreBtn");
    var RecommencerBtn = document.getElementById("RecommencerBtn");
    var AideBtn = document.getElementById("AideBtn");
    var QuitterMP = document.getElementById("QuitterMP");
    var RetourAide = document.getElementById("RetourAide");


    var aide_btn = document.getElementsByClassName("aid_btn");
    var x = document.getElementById("macimg").src;
    var x2=x.substr(0,x.length-7);
    console.log(x2);
    aide_btn[0].onclick=function(){ document.getElementById("macimg").src=x2+"left_gif1.gif";};
    aide_btn[1].onclick=function(){ document.getElementById("macimg").src=x2+"down_gif1.gif";};
    aide_btn[2].onclick=function(){ document.getElementById("macimg").src=x2+"right_gif1.gif";};
    aide_btn[3].onclick=function(){ document.getElementById("macimg").src=x2+"up_gif1.gif";};
    aide_btn[4].onclick=function(){ document.getElementById("macimg").src=x2+"space_gif1.gif";};
    aide_btn[5].onclick=function(){ document.getElementById("macimg").src=x2+"down1.png";};
    aide_btn[6].onclick=function(){ document.getElementById("macimg").src=x2+"space_gif1.gif";};



  //  mac.style.backgroundImage = "url('down1.png')";


    document.getElementById("vol_plus").onclick =function(){
        if  (sound11.volume<1)sound11.volume+=0.1;
    };
    document.getElementById("vol_moins").onclick =function(){
        if  (sound11.volume>0)sound11.volume-=0.1;
    };
    /*document.getElementById("vol").onclick = function () {
        if(sound7.volume>0) sound7.volume = 0;
        else sound7.volume = 1;
    }*/
    this.togglePause = function () {
        if (!paused) {
            paused = true;
            ShowMenu();
        } else if (paused) {
            paused= false;
            HideMenu();
        }

    };
    function ShowMenu() {
        document.getElementById("MenuPause").classList.toggle('active');
        paused = true;
        document.getElementById("ps").style.visibility="hidden";
        document.getElementById("ps").style.display="none";
    }
    function HideMenu() {
        document.getElementById("MenuPause").classList.toggle('active');
        paused = false;
        document.getElementById("ps").style.visibility="visible";
        document.getElementById("ps").style.display="block";
    }
    function RefreshPage() {
        window.location.reload();
    }
    function ShowAide() {
        document.getElementById("AideMenu").classList.toggle('active');
        var Aide = document.getElementById("AideMenu");
        var retourBtn = document.getElementById("RetourAide");
        retourBtn.style.visibility= 'visible';
        HideMenu();
        paused = true;
    }
    function HideAide() {
        document.getElementById("AideMenu").classList.toggle('active');
        var Aide = document.getElementById("AideMenu");
        var retourBtn = document.getElementById("RetourAide");
        retourBtn.style.visibility= 'hidden';
        ShowMenu();
    }
    pauseIcone.onclick = function(){
        ShowMenu();
    };
    ReprendreBtn.onclick = function(){
        HideMenu();
    };
    RecommencerBtn.onclick = function(){
        RefreshPage();
    };
    AideBtn.onclick = function(){
        ShowAide();
    };
    QuitterMP.onclick = function(){
        window.open('../index.php','_Parent');
    };
    RetourAide.onclick = function () {
        HideAide();
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**** J'ai aussi rajouter quelques modifications au niveau des autres methodes
            Pour plus d'info veuillez me contacter sur Facebook    */
    /////////////////////////////////////////////////////////////////////////////


    this.nouveauTetriminos = function () { /*génération du nouveau Tetrominos et mettre a jour l tableau des tetrominos suivants*/
        var I = new TForme(tab,"yellow");
        var La = new Tetrominos(I);
        La.genrerForme();
        for(var  i=0;i<6;i++){
            tabTetro[i].copieForme(tabTetro[i+1]);
        }
        this.courantFrm.copieForme(tabTetro[0]);
        tabTetro[6].copieForme(I);
    };

    this.debut = function () { /* Cette fonction initialise l'environement du jeu lors d'une nouvelle partie*/

        var I = new TForme(tab,"yellow");
        var La = new Tetrominos(I);
        for (var i=0;i<7;i++){
            La.genrerForme();
            tabTetro[i]=new TForme(tab,"yellow");
            tabTetro[i].copieForme(I);
        }
        this.dessinerSuivant();
        joker = 2 ;
        niveau=0;
        score=0;
        But=5;
        f =5 ;
        nbrLigneSup = 0 ;
        this.grille.initialiser();
        vitesse=1000;
        if(mode === 0) {
            this.grille.initialiser();
        }
        else {
            this.grille.initialDefit() ;
        }
        this.touhe() ;
        var player = document.querySelector("#audio");
        player.play();
        player.volume = 1;
        document.getElementById("vol").onclick = function () {
            if (player.volume>0) player.volume = 0;
            else player.volume = 1;
        }
    };

    this.miseajour= function() { /*la boucles pricipales qui permet met a jour la grille et les parametres du Tetris a chaque itération*/

        if (!finpartie && !paused) {
            cpt+= vitesse ;
            this.precFrm.copieForme(this.courantFrm);
            this.grille.devaliderTetrominos(this.precFrm);
            this.courantFrm.deplacer(0, 1, this.grille);
            this.direction = 0;
            if (!(this.grille.testCollision(this.courantFrm))) {
                nbrLigneSup = this.grille.effacerLigne();
                this.grille.validerTetrominos(this.courantFrm);
                this.setCaracteris();
            } else {
                if (this.direction === 0) {
                    this.precFrm.deplacer(0, -1, this.grille);
                    this.grille.validerTetrominos(this.precFrm);
                    this.nouveauTetriminos();
                    if (this.grille.testfin()) {
                        finpartie = true;
                        this.grille.noire() ;
                        var endGame = document.getElementById("finPartieContainer");
                        endGame.style.display= 'block';
                        endGame.style.visibility = "visible";
                        endGame.style.zIndex = '2';
                        window.open("http://localhost/tetrisgame/TETRIS_final/themes/SaveScore.php?u="+ document.getElementById("userName").innerText + "&s=" + score,"_blank");
                    }
                    this.dessinerSuivant();
                }
                else {
                    this.grille.validerTetrominos(this.courantFrm);
                }
            }
            if(mode === 1) {
                var second =30 -Math.floor((Math.floor(cpt)/1000))  ;
                document.getElementById("time").innerHTML = second+"`";
                document.getElementById("time").style.color = couleur[Math.floor(second/2)];


                if ((Math.floor(cpt) % 30000) === 0) {
                    cpt = 0;
                    this.grille.decalerVersHaut(this.courantFrm);
                }
            }
            this.grille.dessiner();
        }
    } ;

    this.dessinerSuivant = function(){ /*Cette fonction déssigne les prochaines tetrominos a gauche de la grille principale*/

        switch (choix) {
            case 1:  // theme snow
            {
                var x,y,taille=7;
                var y1=0;
                var taille1=27;
                for (var j=0;j<17;j++){

                    for (var i=0;i<6;i++){
                        context.clearRect(i*taille1+.3,j*taille1,taille1-.25,taille1-.25)  ;
                    }
                }
                for( j=1;j<2;j++) {
                    this.dess.copieForme(tabTetro[j]);
                    for ( i = 0; i < 4; i++) {
                        x = this.dess.getXI(i) - 3;
                        y = this.dess.getYI(i);


                        var grd1 = context.createLinearGradient(x*taille+.25,y*taille+.25+y1,x*taille+.25,y*taille+taille);
                        var color1=this.dess.getCouleur();
                        grd1.addColorStop(0, "#DDDDDD");
                        grd1.addColorStop(1, color1);
                        context.fillStyle = grd1;
                        context.fillRect(x * taille + .3, y * taille + 75*(j-1), taille - .25, taille - .25);
                    }
                    y1=y1+taille*5.5+.25;
                }
                break;
            }

            case 2: // theme espace
            {
                taille=20;
                y1=0;
                taille1=27;
                for ( j=0;j<17;j++){

                    for ( i=0;i<6;i++){
                        context.clearRect(i*taille1+.3,j*taille1,taille1-.25,taille1-.25)  ;
                    }
                }
                for( j=1;j<2;j++) {
                    this.dess.copieForme(tabTetro[j]);
                    for ( i = 0; i < 4; i++) {
                        x = this.dess.getXI(i) - 3;
                        y = this.dess.getYI(i);


                        grd1 = context.createLinearGradient(x*taille+.25,y*taille+.25+y1,x*taille+.25,y*taille+taille);
                        color1=this.dess.getCouleur();
                        grd1.addColorStop(0, "#DDDDDD");
                        grd1.addColorStop(1, color1);
                        context.fillStyle = grd1;
                        context.fillRect(x * taille + .3, y * taille + 75*(j-1), taille - .25, taille - .25);
                    }
                    y1=y1+taille*5.5+.25;
                }
                break;
            }

            case 3: //theme aquarium
            {
                taille=13;
                y1=0;
                taille1=27;
                for ( j=0;j<17;j++){

                    for ( i=0;i<6;i++){
                        context.clearRect(i*taille1+.3,j*taille1,taille1-.25,taille1-.25)  ;
                    }
                }
                for( j=1;j<2;j++) {
                    this.dess.copieForme(tabTetro[j]);
                    for ( i = 0; i < 4; i++) {
                        x = this.dess.getXI(i) - 3;
                        y = this.dess.getYI(i);
                        grd1 = context.createLinearGradient(x*taille+.25,y*taille+.25+y1,x*taille+.25,y*taille+taille);
                        color1=this.dess.getCouleur();
                        grd1.addColorStop(0, "#DDDDDD");
                        grd1.addColorStop(1, color1);
                        context.fillStyle = grd1;
                        context.fillRect(x * taille + .3, y * taille + 75*(j-1), taille - .25, taille - .25);
                    }
                    y1=y1+taille*5.5+.25;
                }
                break;
            }

            case 4:   //theme enfant
            {
                 taille=20;
                 y1=0;
                taille1=27;
                for (j=0;j<17;j++){

                    for (i=0;i<6;i++){
                        context.clearRect(i*taille1+.3,j*taille1,taille1-.25,taille1-.25)  ;
                    }
                }
                for(j=1;j<2;j++) {
                    this.dess.copieForme(tabTetro[j]);
                    for (i = 0; i < 4; i++) {
                        x = this.dess.getXI(i) - 3;
                        y = this.dess.getYI(i);
                        grd1 = context.createLinearGradient(x*taille+.25,y*taille+.25+y1,x*taille+.25,y*taille+taille);
                        color1=this.dess.getCouleur();
                        grd1.addColorStop(0, "#DDDDDD");
                        grd1.addColorStop(1, color1);
                        context.fillStyle = grd1;
                        context.fillRect(x * taille + .3, y * taille + 75*(j-1), taille - .25, taille - .25);
                    }
                    y1=y1+taille*5.5+.25;
                }
                break;
            }
            case 5: //theme sea
            {
                 taille=27;
                 y1=0;
                taille1=27;
                for (j=0;j<17;j++){

                    for (i=0;i<6;i++){
                        context.clearRect(i*taille1+.3,j*taille1,taille1-.25,taille1-.25)  ;
                    }
                }
                for(j=1;j<2;j++) {
                    this.dess.copieForme(tabTetro[j]);
                    for (i = 0; i < 4; i++) {
                        x = this.dess.getXI(i) - 3;
                        y = this.dess.getYI(i);
                        grd1 = context.createLinearGradient(x*taille+.25,y*taille+.25+y1,x*taille+.25,y*taille+taille);
                        color1=this.dess.getCouleur();
                        grd1.addColorStop(0, "#DDDDDD");
                        grd1.addColorStop(1, color1);
                        context.fillStyle = grd1;
                        context.fillRect(x * taille + .3, y * taille + 75*(j-1), taille - .25, taille - .25);
                    }
                    y1=y1+taille*5.5+.25;
                }
                break;
            }
        }
    }

    this.jouer = function(i,grille){ /* cette fonction déclanche le debut du jeu */
        mode = i ;
        if(mode===1){
            document.getElementById("temp").style.visibility ="visible" ;
        }
        else {document.getElementById("temp").style.visibility ="hidden" ;}
        this.debut();
        this.grille.validerTetrominos(this.courantFrm);
        intervale = setInterval(this.miseajour.bind(this), vitesse);
        nbrLigneSup += grille.effacerLigne() ; // retourne le nombre de lignes efface dans chaque deplacement
    };
    var up1=document.getElementById("up");
    var down1=document.getElementById("down");
    var left1=document.getElementById("left");
    var right1=document.getElementById("right");
    var space1=document.getElementById("space_bouton");

    this.touhe = function () {/*Gère les actions effectué en cliquanr sur les bouttons concerné par le jeu*/
        var keys = {up: 38, left: 37, right: 39, down: 40, space: 32, pause:80,joker :74};
        up1.addEventListener("click",function () {
            if (this.courantFrm !== null && !paused) {
                this.precFrm.copieForme(this.courantFrm);
                this.grille.devaliderTetrominos(this.precFrm);
                var moved = false;
                var dx = 0, dy = 0;
                this.courantFrm.retourner(this.grille);
                moved = true;
                sound11.play();
                if (moved && !finpartie && !paused) {
                    if (!(this.grille.testCollision(this.courantFrm))) {
                        this.grille.dessiner();
                        this.grille.validerTetrominos(this.courantFrm);
                        this.grille.dessiner();
                    } else {
                        if (dy === 0) {
                            this.courantFrm.deplacer(dx, dy, this.grille, 10);
                            this.grille.validerTetrominos(this.courantFrm);
                        }
                        else {
                            this.courantFrm.deplacer(dx, dy, this.grille, 10);
                            this.grille.validerTetrominos(this.courantFrm);
                            this.nouveauTetriminos();
                            this.dessinerSuivant();
                        }
                    }
                }
            } }.bind(this));

        down1.addEventListener("click",function () {
            if (this.courantFrm !== null && !paused) {
                this.precFrm.copieForme(this.courantFrm);
                this.grille.devaliderTetrominos(this.precFrm);
                var moved = false;
                var dx = 0, dy = 0;

                this.courantFrm.deplacer(0, 1, this.grille, 10);
                moved = true;
                dy = -1;
                this.direction = 0;
                sound11.play();
                if (moved && !finpartie && !paused) {
                    if (!(this.grille.testCollision(this.courantFrm))) {
                        this.grille.dessiner();
                        this.grille.validerTetrominos(this.courantFrm);
                        this.grille.dessiner();
                    } else {
                        if (dy === 0) {
                            this.courantFrm.deplacer(dx, dy, this.grille, 10);
                            this.grille.validerTetrominos(this.courantFrm);
                        }
                        else {
                            this.courantFrm.deplacer(dx, dy, this.grille, 10);
                            this.grille.validerTetrominos(this.courantFrm);
                            this.nouveauTetriminos();
                            this.dessinerSuivant();
                        }
                    }
                }
            } }.bind(this));

        right1.addEventListener("click",function () {
            if (this.courantFrm !== null && !paused) {
                this.precFrm.copieForme(this.courantFrm);
                this.grille.devaliderTetrominos(this.precFrm);
                var moved = false;
                var dx = 0, dy = 0;

                this.courantFrm.deplacer(1, 0, this.grille, 10);
                moved = true;
                dx = -1;
                this.direction = 1;
                sound11.play();
                if (moved && !finpartie && !paused) {
                    if (!(this.grille.testCollision(this.courantFrm))) {
                        this.grille.dessiner();
                        this.grille.validerTetrominos(this.courantFrm);
                        this.grille.dessiner();
                    } else {
                        if (dy === 0) {
                            this.courantFrm.deplacer(dx, dy, this.grille, 10);
                            this.grille.validerTetrominos(this.courantFrm);
                        }
                        else {
                            this.courantFrm.deplacer(dx, dy, this.grille, 10);
                            this.grille.validerTetrominos(this.courantFrm);
                            this.nouveauTetriminos();
                            this.dessinerSuivant();
                        }
                    }
                }
            } }.bind(this));

        left1.addEventListener("click",function () {
            if (this.courantFrm !== null && !paused) {
                this.precFrm.copieForme(this.courantFrm);
                this.grille.devaliderTetrominos(this.precFrm);
                var moved = false;
                var dx = 0, dy = 0;

                this.courantFrm.deplacer(-1, 0, this.grille, 10);
                moved = true;
                dx = 1;
                this.direction = 1;
                sound11.play();
                if (moved && !finpartie && !paused) {
                    if (!(this.grille.testCollision(this.courantFrm))) {
                        this.grille.dessiner();
                        this.grille.validerTetrominos(this.courantFrm);
                        this.grille.dessiner();
                    } else {
                        if (dy === 0) {
                            this.courantFrm.deplacer(dx, dy, this.grille, 10);
                            this.grille.validerTetrominos(this.courantFrm);
                        }
                        else {
                            this.courantFrm.deplacer(dx, dy, this.grille, 10);
                            this.grille.validerTetrominos(this.courantFrm);
                            this.nouveauTetriminos();
                            this.dessinerSuivant();
                        }
                    }
                }
            } }.bind(this));

        space1.addEventListener("click",function () {
            if (this.courantFrm !== null && !paused) {
                this.precFrm.copieForme(this.courantFrm);
                this.grille.devaliderTetrominos(this.precFrm);
                var moved = false;
                var dx = 0, dy = 0;
                sound11.play();
                dy = this.courantFrm.instantanee(this.grille);
                moved = true;
                this.direction = 0;

                if (moved && !finpartie && !paused) {
                    if (!(this.grille.testCollision(this.courantFrm))) {
                        this.grille.dessiner();
                        this.grille.validerTetrominos(this.courantFrm);
                        this.grille.dessiner();
                    } else {
                        if (dy === 0) {
                            this.courantFrm.deplacer(dx, dy, this.grille, 10);
                            this.grille.validerTetrominos(this.courantFrm);
                        }
                        else {
                            this.courantFrm.deplacer(dx, dy, this.grille, 10);
                            this.grille.validerTetrominos(this.courantFrm);
                            this.nouveauTetriminos();
                            this.dessinerSuivant();
                        }
                    }
                }
            } }.bind(this));

        document.addEventListener("keydown", function (event) {
            if (this.courantFrm !== null && !paused) {
                this.precFrm.copieForme(this.courantFrm);
                this.grille.devaliderTetrominos(this.precFrm);
                var moved = false;
                var dx = 0, dy = 0;

                if (event.which === keys.left) {
                    sound11.play();
                    this.courantFrm.deplacer(-1, 0, this.grille, 10);
                    moved = true;
                    dx = 1;
                    this.direction = 1;
                } else if (event.which === keys.right) {
                    sound11.play();
                    this.courantFrm.deplacer(1, 0, this.grille, 10);
                    moved = true;
                    dx = -1;
                    this.direction = 1;
                } else if (event.which === keys.down) {
                    sound11.play();
                    this.courantFrm.deplacer(0, 1, this.grille, 10);
                    moved = true;
                    dy = -1;
                    this.direction = 0;
                } else if (event.which === keys.up) {
                    sound11.play();
                    this.courantFrm.retourner(this.grille);
                    moved = true;
                } else if (event.which === keys.space) {
                    sound11.play();
                    dy = this.courantFrm.instantanee(this.grille);
                    moved = true;
                    this.direction = 0;
                }
                if (moved && !finpartie && !paused) {
                    if (!(this.grille.testCollision(this.courantFrm))) {
                        this.grille.dessiner();
                        this.grille.validerTetrominos(this.courantFrm);
                        this.grille.dessiner();
                    } else {
                        if (dy === 0) {
                            this.courantFrm.deplacer(dx, dy, this.grille, 10);
                            this.grille.validerTetrominos(this.courantFrm);
                        }
                        else {
                            this.courantFrm.deplacer(dx, dy, this.grille, 10);
                            this.grille.validerTetrominos(this.courantFrm);
                            this.nouveauTetriminos();
                            this.dessinerSuivant();
                        }
                    }
                }
            }
            if (event.which === keys.pause) {
                this.togglePause();}

            if (event.which === keys.joker) {///voila jai ajoiuter sa pr joker
                if (joker !== 0 && this.grille.jokerpossible()) {
                    this.grille.joker(this.courantFrm);
                    joker-- ;
                    if(joker === 1) document.getElementById("img1").setAttribute("src",x2+"jokerfin.png") ;
                    if(joker === 0) document.getElementById("img2").setAttribute("src",x2+"jokerfin.png") ;
                }
            }
        }.bind(this));
    };
}
