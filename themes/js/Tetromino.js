function Tetrominos (tetromino) { /* Class qui gère les Tetrominos*/

    formesPossibles = [];/*Tableau qui contient les Formes possibles*/

    formesPossibles.push(                               // L-gauche
        new TForme([new Case(4, 0), new Case(4, 1),
                new Case(5, 1), new Case(6, 1)],
            "blue"));

    formesPossibles.push(                               // L-right
        new TForme([new Case(4, 1), new Case(5, 1),
                new Case(6, 1), new Case(6, 0)],
            "darkorange"));

    formesPossibles.push(                               // T
        new TForme([new Case(4, 1), new Case(5, 1),
                new Case(6, 1), new Case(5, 0)],
            "rebeccapurple"));

    formesPossibles.push(                               // Z-gauche
        new TForme([new Case(4, 0), new Case(5, 0),
                new Case(5, 1), new Case(6, 1)],
            "red"));

    formesPossibles.push(                               // Z-droite
        new TForme([new Case(4, 1), new Case(5, 1),
                new Case(5, 0), new Case(6, 0)],
            "green"));

    formesPossibles.push(                               // carré
        new TForme([new Case(4, 0), new Case(4, 1),
                new Case(5, 0), new Case(5, 1)],
            "gold"));

    formesPossibles.push(                               // baton
        new TForme([new Case(3, 0), new Case(4, 0),
                new Case(5, 0), new Case(6, 0)],
            "dodgerblue"));

    this.genrerForme = function () { /*Génére Un nouveau Tetromino*/
        var index = Math.floor(Math.random() * formesPossibles.length);
        tetromino.copieForme(formesPossibles[index]);
    }
}