function TForme(tab,couleur) {/*Manipulation des Formes*/

    this.getXI = function (i) { /*Retourne Le X de la Case i de ce Tetromino */
        return tab[i].getX();
    }

    this.getYI = function (i) { /*Retourne Le Y de la Case i de ce Tetromino */
        return tab[i].getY();
    }

    this.setXI = function (x, i) { /*Affecte au X de la Case i de ce Tetromino la valeur x */
        tab[i].setX(x);
    }

    this.setYI = function (y, i) { /*Affecte au Y de la Case i de ce Tetromino la valeur x */
        tab[i].setY(y);
    }

    this.getTabForme = function () { /*Retourne un Tableau dont chaque case contient un point de ce tetromino*/
        return tab;
    }

    this.getCouleur = function () {/*Retourne la couleur de ce Teromino*/
        return couleur;
    }

    this.copieForme = function (forme2) {  /*copie les attributs de forme2 dans forme1*/
        tab = forme2.getTabForme();
        couleur = forme2.getCouleur();
    }

	this.deplacer = function(dx,dy,grille,longueur) { //ajoute au attributs x,y (de la classe case) les entrées dx,dy respectivement
        var x,y;
        var stop = false ;
        for (var i = 0; i < 4; i++){
            x = tab[i].getX() + dx  ;
            if(x<0 || x > longueur-1 ){
                stop = true ;
            }
        }
        if(!stop) {
            for (i = 0; i < 4; i++) {
                x = tab[i].getX();
                y = tab[i].getY();

                tab[i].deplacer(dx, dy);
            }
        }
    }

    this.retourner = function(grille) { /* retourne une piéce de 90°*/

            var x,y;
            var cpt=0;
            var cpt1=0;
            var j=0;
            var j1=0;
            var j2=0;
            var j3=0;
            var testx=false;
            var testy=false;
            var MinX=tab[0].getX(),MinY=tab[0].getY(),MaxX=tab[0].getX();
            var tforme = new TForme(tab,couleur);
            for (var i = 0; i < tab.length; i++) {
                if (tab[i].getX() < MinX) MinX=tab[i].getX();
                if (tab[i].getY() < MinY) MinY=tab[i].getY();
                if (tab[i].getX() > MaxX) MaxX=tab[i].getX();
            }
            MaxX-=MinX;
            for ( i = 0; i < tab.length; i++) {
                x=MinX+(MaxX-(tab[i].getY()-MinY));
                y=MinY+(tab[i].getX()-MinX);
                j=0; j2=0;
                while  (  (x<0)  )
                        {
                            x++;
                            j++;
                            testx=true;
                        }
                if(j>j1) {j1=j;}

                 while  (  (y>20)  )
                        {
                            y--;
                            j2++;
                            testy=true;
                        }
                if(j2>j3) {j3=j2;}
            }

            if(testx===true) {cpt=j1;}
            if(testy===true) {cpt1=j3;}

            var coll=false;
            for ( i = 0; i < tab.length; i++) {
                x=MinX+(MaxX-(tab[i].getY()-MinY))+cpt;
                y=MinY+(tab[i].getX()-MinX)-cpt1+1;
                if ((grille.testrot(x,y))===false){
                   coll=true ;
                  }
            }

            if ( coll===false){

             for ( i = 0; i < tab.length; i++) {
                 x = MinX + (MaxX - (tab[i].getY() - MinY)) + cpt;
                 y = MinY + (tab[i].getX() - MinX) - cpt1 + 1;
                 tforme.setXI(x, i);
                 tforme.setYI(y, i);
             }
            }
    }

    this.instantanee = function(grille) {
            let x,y,dy = 0, dx =0,max =21 ;
            var stop,up= false ,faux= false;
            for (var i = 0; i < 4; i++){
                x = tab[i].getX() ;
                y = tab[i].getY() ;
                stop = false ;
                dy = 0 ;
                while (y < 22 && !stop){
                    if((grille.testrot(x,y))===true) {
                        y++ ;
                        dy++ ;
                        if(y===21) up = true ;
                    }
                    else {
                        stop = true;
                        faux = true ;
                        dy-- ;
                    }
                }
                if(up && !faux) dy-- ;
                if(max > dy) max = dy ;
            }

            for (i = 0; i < 4; i++) {
                x = tab[i].getX();
                y = tab[i].getY();

                tab[i].deplacer(dx, max);
            }
            return max;
        }
}
