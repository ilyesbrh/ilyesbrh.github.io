function Grille(context,longueur,largeur,theme) { /*La Class qui gère la grille principal*/

    var grille = new Array(largeur).fill(null);/*La grille*/
    this.loose=21 ;
    var sound=new Audio();
    sound.src= "audio/effacer1.mp3";

    this.initialiser=function() {/*initialisation de la grille*/
        for (var i=0 ; i<largeur; i++) {
            grille[i] = new Array(longueur).fill(null) ;
        } ;
    }

    this.initialDefit=function() {
        for (var i=0 ; i<largeur; i++) {
            grille[i] = new Array(longueur).fill(null) ;
        }

        for(i = 21 ;i>16;i--){
            var empty = Math.floor(Math.random() * 10);
            for(let j=0;j<10;j++){
                if(j !== empty) grille[j][i] = "#a3c8be" ;
            }
        };
    }

    this.decalerVersHaut=function (T) {
        for (let j = largeur - 1; j >= 0; j--) {
            for (let i = 1 ; i <=longueur -1; i++) {
                grille[j][i-1] = grille[j][i];
            }
        }

        var empty = Math.floor(Math.random() * 10);
        grille[empty][21] = null ;

        for(let j=0;j<10;j++){
            if(j !== empty) grille[j][21] = "#00e392" ;
        }

        var tab = new Array(4) ;
        tab = T.getTabForme() ;
        var x, y ;
        var k =0 ;

        for (let i = 0; i<4 ; i++) {
            x = tab[i].getX();
            y = tab[i].getY();
            console.log(x," ",y) ;
            grille[x][y-1] = null ;
        }

        if(this.testCollision(T)) T.deplacer(0,-1,grille,longueur);

        for (let i = 0; i<4 ; i++) {
            x = tab[i].getX();
            y = tab[i].getY();
            grille[x][y-k] = T.getCouleur();
        }

    } ;

    this.joker = function (T) { /* Cette fonction efface les lignes complètes et retourne le nombre de lignes détruits*/
        var tab = new Array(4);
        tab = T.getTabForme();
        var x, y;
        var k = 0;
        this.devaliderTetrominos(T);
        i=22 ;
        for (j = i; j > 0; j--) {
            for (var k = 0; k < largeur; k++) {
                grille[k][j] = grille[k][j - 1];
            }
        }
        for (j = 0; j < largeur; j++) {
            grille[j][0] = null;
        }



        T.deplacer(0, +1, grille, longueur);

    }

    this.jokerpossible = function(){
        var possible = false ;
        for(var i = 0; i<10 ; i++) {
            if(grille[i][19] !== null){possible=true;}
        }
        return possible;
    };


    this.testCollision = function(T){ /* retourne Vrai si l Tetromino T provoque une collision , Faux si non */
        var tab = T.getTabForme() ;
            var x, y ;
            for (var i = 0; i<4 ; i++) {
                x = tab[i].getX() ;
                y = tab[i].getY() ;
                if ( (y<0 || y > longueur-1)  ){
                     return true ;
                }
                else if (grille[x][y] !== null) {

                    return true ;
                }
            }
        return false ;
    }

    this.testrot= function(x2,y2){ /*retourne Vrai si La case x2,y2 est Vide*/
         if(grille[x2][y2] !== null){return false;}
         else{return true;}
    }

    this.testfin= function(){ /*retourne Vrai la partie est terminé, Faux si non*/
        var fin=false;
        for(var i = 0; i<10 ; i++) {
            if(grille[i][0] !== null){fin=true;}
        }
        return fin;
    }

    this.validerTetrominos=function(T){ /* Cette fonction Valide (affecte) le Tetromino T dans la grille pricinpal*/
        var tab =T.getTabForme() ;
        var x, y ;
        for (var i = 0; i<4 ; i++) {
            x = tab[i].getX() ;
            y = tab[i].getY() ;
            grille[x][y] = T.getCouleur() ;
        }
    }

    this.effacerLigne=function(){ /* Cette fonction efface les lignes complètes et retourne le nombre de lignes détruits*/
        var cpt=0;
        for (var i=longueur-1;i>=0;i--){
            var complete=true;
            for(let j=largeur-1;j>=0;j--){
                if(grille[j][i] == null){
                    complete=false;
                    break;
                }
            }
            if(complete){
                cpt++;
                if (i===0){
                    for(j=0;j<largeur;j++){
                        grille[j][0]=null;
                    }
                }else{
                    for(j=i;j>0;j--){
                        for(let k=0;k<largeur;k++){
                            grille[k][j]=grille[k][j-1];
                        }
                    }
                    for(j=0;j<largeur;j++){
                            grille[j][0]=null;
                    }
                    i++;
                }
            }

        }
        for (let j=0;j++;j<cpt){sound.play();}
        if (cpt>0) sound.play();
        return cpt;
    }


    this.dessiner=function(){ /*Afin de déssiner la grille dans la page HTML*/

        var t=theme;
        console.log(t);
        switch (theme) {
            case 1: //theme snow
            {   var b1  = $(window).height() * 0.68;
                var iph= document.getElementById('iphone_img');
                iph.style.height=$(window).height() * 0.95+ "px";
                iph.style.width=$(window).width() * 0.208+ "px";
                var tetro_suivant= document.getElementById('Tetro_Suivant');
                var stat1= document.getElementsByClassName('sta');
                var iphone_bg= document.getElementById('iphone_bg');
                var ps= document.getElementById('ps');
                var stat= document.getElementsByClassName('stats');
                ps.style.width=$(window).width() * 0.15+"px";
                ps.style.height=$(window).height() * 0.2 +"px";
                ps.style.top=$(window).height() * 0.7 +"px";
                ps.style.left=$(window).width() * 0.48 +"px";
                var canvas = document.getElementById('Grille');
                var a  = $(window).width() ;
                var b  = $(window).height() ;
                canvas.width=$(window).width() * 0.19;
                canvas.height=$(window).height() * 0.78;
                if (a<500) {
                    canvas.width=$(window).width() * 0.66;
                    ps.style.width=$(window).width() * 0.47+"px";
                }
                var width = canvas.scrollWidth;
                var height = canvas.scrollHeight;
                console.log(a);
                console.log(b);
                tetro_suivant.style.width=width +"px";
                tetro_suivant.style.height=height*1.3 +"px";
                iphone_bg.style.width=width*0.98 +"px";
                iphone_bg.style.height=height*1.13 +"px";
                for (var i = 0; i < stat.length; i++) {
                    stat[i].style.height=height/7.2 +"px";
                }
                for (var i = 0; i < stat.length; i++) {
                    stat[i].style.fontSize=height/25 +"px";
                }

                stat1[0].style.fontSize=height/13 +"px";
                stat1[1].style.fontSize=height/8 +"px";

                document.getElementById('ReprendreBtn').style.fontSize=width/12+"px";
                document.getElementById('RecommencerBtn').style.fontSize=width/12+"px";
                document.getElementById('AideBtn').style.fontSize=width/12+"px";
                document.getElementById('Options').style.fontSize=width/12+"px";
                document.getElementById('QuitterMP').style.fontSize=width/12+"px";
                if (a<500) {
                    document.getElementById('temp').style.visibility="hidden";
                    document.getElementById('bout_tfn').style.visibility="visible";
                    document.getElementById('ReprendreBtn').style.fontSize=width/7+"px";
                    document.getElementById('RecommencerBtn').style.fontSize=width/7+"px";
                    document.getElementById('AideBtn').style.fontSize=width/7+"px";
                    document.getElementById('Options').style.fontSize=width/7+"px";
                    document.getElementById('QuitterMP').style.fontSize=width/7+"px";
                }
                if(a<1100){document.getElementById('bout_tfn').style.visibility="visible";}
                if(a>1100){document.getElementById('bout_tfn').style.visibility="hidden";}
                taille=width/10;
                taille2=height/22;
                for (let y = 0; y < longueur; y++) {
                    for (let x = 0; x < largeur; x++) {
                        context.beginPath();
                        context.lineWidth="1";
                        context.color = "transparent" ;
                        context.strokeStyle="transparent";
                        context.rect(x*taille+.25,y*taille2+.25,taille,taille2);
                        context.stroke();
                        if (grille[x][y] !== null) {

                            var grd = context.createLinearGradient(x*taille+.25,y*taille2+.25,x*taille+.25,y*taille2+taille2);

                            grd.addColorStop(0, "#DDDDDD");
                            grd.addColorStop(0.5, grille[x][y]);
                            grd.addColorStop(1, grille[x][y]);
                            context.fillStyle = grd;
                            context.fillRect(x*taille+.3,y*taille2+.3,taille-.25,taille2-.25)  ;
                        }
                        else if (grille[x][y] === null){
                            context.clearRect(x*taille+.5,y*taille2+.25,taille-.5,taille2-.5) ;
                        }
                    }
                }
                break;
            }
            case 2: //theme espace
            {
                var b1  = $(window).height() * 0.68;
                var surface1= document.getElementById('surface1');
                var tetro_suivant= document.getElementById('Tetro_Suivant');
               // var tetrosuiv= document.getElementById('surface11');
                var stat1= document.getElementsByClassName('sta');
                var stat= document.getElementsByClassName('stats1');
                var ps= document.getElementById('ps');
                ps.style.width=$(window).width() * 0.15+"px";
                ps.style.height=$(window).height() * 0.2 +"px";
                var canvas = document.getElementById('Grille');
                var a  = $(window).width() ;
                var b  = $(window).height();
                canvas.width=$(window).width() * 0.2;
                canvas.height=$(window).height() * 0.88;
                if (a<500) {
                    canvas.width=$(window).width() * 0.63;
                    canvas.height=$(window).height() * 0.75;
                    ps.style.width=$(window).width() * 0.47+"px";
                }
                var width = canvas.scrollWidth;
                var height = canvas.scrollHeight;
                console.log(a);
                console.log(b);
                surface1.style.width=width/2 +"px";
                surface1.style.height=height/4.3 +"px";
                //tetrosuiv.style.width=width/2.7 +"px";
               // tetrosuiv.style.height=height/7.95 +"px";
                tetro_suivant.style.width=width/2 +"px";
                tetro_suivant.style.height=height/1.5 +"px";
                for (var i = 0; i < stat.length; i++) {
                    stat[i].style.height=height/14 +"px";
                }
                for (var i = 0; i < stat.length; i++) {
                    stat[i].style.fontSize=height/16 +"px";
                }
                stat1[0].style.fontSize=height/13 +"px";
                stat1[1].style.fontSize=height/8 +"px";
                document.getElementById('ReprendreBtn').style.fontSize=width/12+"px";
                document.getElementById('RecommencerBtn').style.fontSize=width/12+"px";
                document.getElementById('AideBtn').style.fontSize=width/12+"px";
                document.getElementById('Options').style.fontSize=width/12+"px";
                document.getElementById('QuitterMP').style.fontSize=width/12+"px";
                if (a<500) {
                    tetro_suivant.style.top=$(window).height() * 0.18+"px";
                    tetro_suivant.style.left=$(window).width() * 0.02+"px";
                    document.getElementById('temp').style.visibility="hidden";
                    document.getElementById('bout_tfn').style.visibility="visible";
                    document.getElementById('ReprendreBtn').style.fontSize=width/7+"px";
                    document.getElementById('RecommencerBtn').style.fontSize=width/7+"px";
                    document.getElementById('AideBtn').style.fontSize=width/7+"px";
                    document.getElementById('Options').style.fontSize=width/7+"px";
                    document.getElementById('QuitterMP').style.fontSize=width/7+"px";
                }
                if(a<1100){document.getElementById('bout_tfn').style.visibility="visible";}
                if(a>1100){document.getElementById('bout_tfn').style.visibility="hidden";}
                taille=width/10;
                taille2=height/22;
                for (let y = 0; y < longueur; y++) {
                    for (let x = 0; x < largeur; x++) {
                        context.beginPath();
                        context.lineWidth="1";
                        context.color = "transparent" ;
                        context.strokeStyle="transparent";
                        context.rect(x*taille+.25,y*taille2+.25,taille,taille2);
                        context.stroke();
                        if (grille[x][y] !== null) {

                            var grd = context.createLinearGradient(x*taille+.25,y*taille2+.25,x*taille+.25,y*taille2+taille2);

                            grd.addColorStop(0, "#DDDDDD");
                            grd.addColorStop(0.5, grille[x][y]);
                            grd.addColorStop(1, grille[x][y]);
                            context.fillStyle = grd;
                            context.fillRect(x*taille+.3,y*taille2+.3,taille-.25,taille2-.25)  ;
                        }
                        else if (grille[x][y] === null){
                            context.clearRect(x*taille+.5,y*taille2+.25,taille-.5,taille2-.5) ;
                        }
                    }
                }
                break;
            }

            case 3:  // theme aquarium
            {
                var b1  = $(window).height() * 0.68;
                var tetro_suivant= document.getElementById('Tetro_Suivant');
                var stat22= document.getElementById('stat');
                // var tetrosuiv= document.getElementById('surface11');
                var stat= document.getElementsByClassName('stats');
                var ps= document.getElementById('ps');
                var suiv= document.getElementById('suiv');
                var cadrage=document.getElementsByClassName("cadrage");
                var cdr=document.getElementsByClassName("cdr");
                ps.style.width=$(window).width() * 0.15+"px";
                ps.style.height=$(window).height() * 0.2 +"px";
                var canvas = document.getElementById('Grille');
                var a  = $(window).width() ;
                var b  = $(window).height();
                canvas.width=$(window).width() * 0.16;
                canvas.height=$(window).height() * 0.78;
                if (a<500) {
                    canvas.width=$(window).width() * 0.66;
                    canvas.height=$(window).height() * 0.777;
                    ps.style.width=$(window).width() * 0.47+"px";
                }
                var width = canvas.scrollWidth;
                var height = canvas.scrollHeight;
                var stat1=document.getElementsByClassName("pht");
                console.log(a);
                console.log(b);
                tetro_suivant.style.width=width/2.64 +"px";
                tetro_suivant.style.height=height/3 +"px";
                for (var i = 0; i < stat.length; i++) {
                    stat[i].style.height=height/14 +"px";
                }
                stat[0].style.top=$(window).height() * 0.3+"px";
                stat[1].style.top=$(window).height() * 0.3+"px";
                stat[2].style.top=$(window).height() * 0.3+"px";
                stat[3].style.top=$(window).height() * 0.3+"px";
                suiv.style.height=$(window).height()* 0.28 +"px";
                suiv.style.width=$(window).width()* 0.13 +"px";
                cdr[0].style.top=$(window).height()* 0.4 +"px";
                cdr[1].style.top=$(window).height()* 0.4 +"px";
                cdr[2].style.top=$(window).height()* 0.4 +"px";
                cdr[3].style.top=$(window).height()* 0.4 +"px";
                for (var i = 0; i < cadrage.length; i++) {
                    cadrage[i].style.height=height*1.17 +"px";
                    cadrage[i].style.width=width/2 +"px";
                }
                for (var i = 0; i < cdr.length; i++) {
                    cdr[i].style.height=height/5.6 +"px";
                    cdr[i].style.width=width/1.8 +"px";
                }
                for (var i = 0; i < stat.length; i++) {
                    stat[i].style.fontSize=height/37 +"px";
                }
                document.getElementById('ReprendreBtn').style.fontSize=width/12+"px";
                document.getElementById('RecommencerBtn').style.fontSize=width/12+"px";
                document.getElementById('AideBtn').style.fontSize=width/12+"px";
                document.getElementById('Options').style.fontSize=width/12+"px";
                document.getElementById('QuitterMP').style.fontSize=width/12+"px";
                if (a<500) {
                    for (var i = 0; i < stat1.length; i++) {
                        stat1[i].style.visibility="hidden";
                    }
                    document.getElementById('temp').style.visibility="hidden";
                    tetro_suivant.style.top=$(window).height() * 0.29+"px";
                    tetro_suivant.style.left=$(window).width() * 0.09+"px";
                    document.getElementById('bout_tfn').style.visibility="visible";
                    document.getElementById('ReprendreBtn').style.fontSize=width/7+"px";
                    document.getElementById('RecommencerBtn').style.fontSize=width/7+"px";
                    document.getElementById('AideBtn').style.fontSize=width/7+"px";
                    document.getElementById('Options').style.fontSize=width/7+"px";
                    document.getElementById('QuitterMP').style.fontSize=width/7+"px";
                }
                if(a<1100){document.getElementById('bout_tfn').style.visibility="visible";}
                if(a>1100){document.getElementById('bout_tfn').style.visibility="hidden";}
                taille=width/10;
                taille2=height/22;
                if (a<500){
                    document.getElementById('bout_tfn').style.zIndex="999999";
                    taille=width/10;
                    taille2=height/22;
                }
                for (let y = 0; y < longueur; y++) {
                    for (let x = 0; x < largeur; x++) {
                        context.beginPath();
                        context.lineWidth="1";
                        context.color = "transparent" ;
                        context.strokeStyle="transparent";
                        context.rect(x*taille+.25,y*taille2+.25,taille,taille2);
                        context.stroke();
                        if (grille[x][y] !== null) {

                            var grd = context.createLinearGradient(x*taille+.25,y*taille2+.25,x*taille+.25,y*taille2+taille2);

                            grd.addColorStop(0, "#DDDDDD");
                            grd.addColorStop(0.5, grille[x][y]);
                            grd.addColorStop(1, grille[x][y]);
                            context.fillStyle = grd;
                            context.fillRect(x*taille+.3,y*taille2+.3,taille-.25,taille2-.25)  ;
                        }
                        else if (grille[x][y] === null){
                            context.clearRect(x*taille+.5,y*taille2+.25,taille-.5,taille2-.5) ;
                        }
                    }
                }
                break;
            }

            case 4: // theme enfant
            {
                var  taille=27;
                for (var y = 0; y < longueur; y++) {
                    for (var x = 0; x < largeur; x++) {
                        context.beginPath();
                        context.lineWidth="1";
                        context.color = "white" ;
                        context.strokeStyle="white";
                        context.rect(x*taille+.25,y*taille+.25,taille,taille);
                        context.stroke();
                        if (grille[x][y] !== null) {
                            context.fillStyle = grille[x][y];
                            context.fillRect(x*taille+.3,y*taille+.3,taille-.25,taille-.25)  ;
                        }
                        else if (grille[x][y] === null){
                            context.clearRect(x*taille+.5,y*taille+.25,taille-.5,taille-.5) ;
                        }
                    }
                }
                break;
            }

            case 5: // theme sea
            {   var b1  = $(window).height() * 0.68;
                var tetro_suivant= document.getElementById('Tetro_Suivant');
                var canvas = document.getElementById('Grille');
                var cadre = document.getElementById('cadre');
                var a  = $(window).width() ;
                var b  = $(window).height() ;
                canvas.width=$(window).width() * 0.19;
                canvas.height=$(window).height() * 0.78;
                var width = canvas.scrollWidth;
                var height = canvas.scrollHeight;
                cadre.style.width=width+"px";
                cadre.style.height=height+"px";
                console.log(a);
                console.log(b);
                tetro_suivant.style.width=width/3 +"px";
                tetro_suivant.style.height=width/3 +"px";


                taille=width/10;
                taille2=height/22;
                for (let y = 0; y < longueur; y++) {
                    for (let x = 0; x < largeur; x++) {
                        context.beginPath();
                        context.lineWidth="1";
                        context.color = "transparent" ;
                        context.strokeStyle="transparent";
                        context.rect(x*taille+.25,y*taille2+.25,taille,taille2);
                        context.stroke();
                        if (grille[x][y] !== null) {

                            var grd = context.createLinearGradient(x*taille+.25,y*taille2+.25,x*taille+.25,y*taille2+taille2);

                            grd.addColorStop(0, "#DDDDDD");
                            grd.addColorStop(0.5, grille[x][y]);
                            grd.addColorStop(1, grille[x][y]);
                            context.fillStyle = grd;
                            context.fillRect(x*taille+.3,y*taille2+.3,taille-.25,taille2-.25)  ;
                        }
                        else if (grille[x][y] === null){
                            context.clearRect(x*taille+.5,y*taille2+.25,taille-.5,taille2-.5) ;
                        }
                    }
                }
                break;
            }
        }

    }

    this.devaliderTetrominos=function(T){ /* dévalide ou supprime le Tetromino de la grille*/
        var tab = T.getTabForme() ;
        var x, y ;
        for (let i = 0; i<4 ; i++) {
            x = tab[i].getX() ;
            y = tab[i].getY() ;
            grille[x][y] = null ;
        }
    }

    this.noire = function () { /*Rend tout les tetrominos Noires a la fin du jeu*/
        for (let i = longueur - 1; i >= 0; i--) {
            for (let j = largeur - 1; j >= 0; j--) {
                if (grille[j][this.loose] != null) {
                    grille[j][this.loose] = "black";
                }
            }
            this.loose--;
        }
    }
};