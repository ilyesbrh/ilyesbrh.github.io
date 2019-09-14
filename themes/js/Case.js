function Case(x,y){

    this.deplacer=function (dx, dy){        /*ajoute au attributs x,y les entrées x,y respectivement*/
        x += dx;
        y += dy;
    }

    this.getX = function () {                /* retourne l'attribut x*/
        return x;
    }

    this.getY =function() {                 /* retourne l'attribut y*/
        return y;
    }

    this.setX  =function(a){                 /* modifie l'attribut x par l'entrée x*/
        x = a;
    }

    this.setY=function (b) {                /* modifie l'attribut y par l'entrée y*/
        y = b;
    }
}