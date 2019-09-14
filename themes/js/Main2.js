var PlayBtn = document.getElementById("PlayButton");
var ThemeButton = document.getElementById("ThemeButton");
var Aide = document.getElementById("Aide");
var AideMenu = document.getElementById("AideMenu");
var ScoreUsers = document.getElementById("UsersScoresBtn");
var Quitter = document.getElementById("Quitter");
var modesSel = document.getElementById("ModeSelection");
var menu = document.getElementById("MenuContainer");
var carousel = document.getElementById("myCarousel");
var theme_space = document.getElementById("theme_space");
var theme_kids = document.getElementById("theme_enfant");
var theme_snow = document.getElementById("theme_snow");
var theme_aqua = document.getElementById("theme_aquarium");
var theme_sea = document.getElementById("theme_sea");
var gif1 = document.getElementById("gif1");
var gif2 = document.getElementById("gif2");
var BtnRetour = document.getElementById("BtnRetour");
var mode1 = document.getElementById("modeClassic");
var mode2 = document.getElementById("modeDefi");
var i=0;

localStorage.setItem("mode","normal");

BtnRetour.onclick = function (ev) {
    menu.style.visibility = "visible";
    gif2.style.visibility = "hidden";
    gif1.style.visibility = "hidden";
    carousel.style.visibility = "hidden";
    AideMenu.style.visibility = "hidden";
    mode1.style.visibility = "hidden";
    mode2.style.visibility = "hidden";
    BtnRetour.style.visibility = "hidden";
    ThemeButtonClicked = false;
};

gif1.onmouseover = function () {
    gif1.style.cursor = "pointer";
    if (gif1.style.borderColor == "red")gif1.style.border = "10px solid red";
    else gif1.style.border = "10px solid #bfc1af";
};
gif1.onmouseout = function () {
    if (gif1.style.borderColor == "red")gif1.style.border = "6px solid red";
    else gif1.style.border = "6px solid #bfc1af";
};
gif1.onclick = function () {
    gif1.style.border = "10px solid red";
    gif2.style.border = "6px solid #bfc1af";
    localStorage.setItem("mode","normal");

};

gif2.onmouseover = function () {
    gif2.style.cursor = "pointer";
    if (gif2.style.borderColor === "red")gif2.style.border = "10px solid red";
    else gif2.style.border = "10px solid #bfc1af";
};
gif2.onmouseout = function () {
    if (gif2.style.borderColor === "red")gif2.style.border = "6px solid red";
    else gif2.style.border = "6px solid #bfc1af";
};

gif2.onclick = function () {
    gif2.style.border = "10px solid red";
    gif1.style.border = "6px solid #bfc1af";
    localStorage.setItem("mode","defi");

};
modesSel.onmouseover = function () {
    modesSel.style.borderColor = 'blue'  ;
    modesSel.style.borderWidth = '8px';
};

modesSel.onmouseout = function () {
    modesSel.style.borderColor = '#FFFFFF';
    modesSel.style.borderWidth = '2px';
};
modesSel.onclick = function () {
    menu.style.visibility = "hidden";
    gif1.style.visibility = "visible";
    gif2.style.visibility = "visible";
    mode1.style.visibility = "visible";
    mode2.style.visibility = "visible";
    BtnRetour.style.visibility = "visible";

}

var ThemeButtonClicked = false ;
ThemeButton.onclick = function () {
    carousel.style.visibility = 'visible';
    BtnRetour.style.visibility = "visible";
    menu.style.visibility = 'hidden';
    ThemeButtonClicked = true;
};

ThemeButton.onmouseover = function (ev) {
    ThemeButton.style.borderColor = 'blue'  ;
    ThemeButton.style.borderWidth = '8px';

}

ThemeButton.onmouseout = function () {
    ThemeButton.style.borderColor = '#FFFFFF';
    ThemeButton.style.borderWidth = '2px';

};

document.addEventListener("keydown", function (ev) {
    keys= {left: 37,right: 39};
    if (ThemeButtonClicked) {
        if (event.which === keys.left){
            document.getElementById("previous").click();
        }
        else if (event.which === keys.right){
            document.getElementById("next").click();
        }
    }
})

PlayBtn.onmouseover = function () {
    PlayBtn.style.borderColor = 'blue'  ;
    PlayBtn.style.borderWidth = '8px';
};

PlayBtn.onmouseout = function () {
    PlayBtn.style.borderColor = '#FFFFFF';
    PlayBtn.style.borderWidth = '2px';
};


Aide.onmouseover = function () {
    Aide.style.borderColor = 'blue'  ;
    Aide.style.borderWidth = '8px';
};

Aide.onmouseout = function () {
    Aide.style.borderColor = '#FFFFFF';
    Aide.style.borderWidth = '2px';
};
Aide.onclick = function () {
    AideMenu.style.visibility = "visible";
    menu.style.visibility= "hidden";
    BtnRetour.style.visibility = "visible";
}


ScoreUsers.onmouseover = function () {
    ScoreUsers.style.borderColor = 'blue'  ;
    ScoreUsers.style.borderWidth = '8px';
};
ScoreUsers.onmouseout = function () {
    ScoreUsers.style.borderColor = '#FFFFFF';
    ScoreUsers.style.borderWidth = '2px';
};

Quitter.onmouseover = function () {
    Quitter.style.borderColor = 'blue'  ;
    Quitter.style.borderWidth = '8px';
};
Quitter.onmouseout = function () {
    Quitter.style.borderColor = '#FFFFFF';
    Quitter.style.borderWidth = '2px';
};



theme_space.onclick =function () {
    i = 0;
    theme_space.style.border = '10px red solid';
    theme_aqua.style.border = '';
    theme_snow.style.border = '';
    theme_kids.style.border = '';
    theme_sea.style.border = '';


};
theme_kids.onclick =function () {
    i = 1;
    theme_kids.style.border = '10px red solid';
    theme_aqua.style.border = '';
    theme_snow.style.border = '';
    theme_space.style.border = '';
    theme_sea.style.border = '';
};

theme_aqua.onclick =function () {
    i = 3;
    theme_aqua.style.border = '10px red solid';
    theme_space.style.border = '';
    theme_snow.style.border = '';
    theme_kids.style.border = '';
    theme_sea.style.border = '';
};
theme_snow.onclick =function () {
    i = 4;
    theme_snow.style.border = '10px red solid';
    theme_aqua.style.border = '';
    theme_space.style.border = '';
    theme_kids.style.border = '';
    theme_sea.style.border = '';
};

theme_sea.onclick =function () {
    i = 5;
    theme_sea.style.border = '10px red solid';
    theme_aqua.style.border = '';
    theme_snow.style.border = '';
    theme_kids.style.border = '';
    theme_space.style.border = '';
};


PlayBtn.onclick = function () {
    switch (i){
        case 0 : location.href = "themes/theme_espace.html";break;
        case 1 : location.href = "themes/theme_enfant.html";break;
        case 3 : location.href = "themes/theme_aquarium.html";break;
        case 4 : location.href ="themes/theme_snow1.html";break;
        case 5 : location.href ="themes/theme_sea.html";break;
    }
};

var RetourUsersScores = document.getElementById("RetourUsersScores");
var UsersScores = document.getElementById("UsersScores");
var UsersScoresBtn = document.getElementById("UsersScoresBtn");

RetourUsersScores.onclick = function () {
    HideUsersScores();
};
UsersScoresBtn.onclick = function () {
    ShowUsersScores();
};
function ShowUsersScores() {
    //HideMenu();
    //paused = true;
    RetourUsersScores.style.visibility= 'visible';
    UsersScores.style.display = "block";
    UsersScores.style.visibility = "visible";
    UsersScores.style.zIndex = '2';
}
function HideUsersScores() {
    RetourUsersScores.style.visibility= 'hidden';
    UsersScores.style.display = "none";
    UsersScores.style.visibility = "hidden";
    UsersScores.style.zIndex = '0';
    //ShowMenu();
}
