//lorsque que la page est chargé
window.onload = init;

var fw;
var checkNuage;



function init(){
    fw = new FrameWork();
    fw.init();
}

/*Variable pour HTML et input*/
{
    //créer le nombre d'extraterrestre selctionné par le range
    function createNExtraterreste(nb) {
        fw.clearTabE();
        fw.createExtraterreste(nb);
        document.querySelector("#extra").innerHTML = nb;
    }

//recupere la couleur selectionnée pour les nuages
    function changeColorCloud(color) {
        fw.changeColor(color);
    }

//créer le nombre de soucoupe selectionné au range
    function createNSoucoupe(n) {
        fw.clearTabS();
        fw.createSoucoupe(n);
        document.querySelector("#nbSoucoupe").innerHTML = n;
    }

//recupere l'état de la radio box nuage
    function gereCloud(check) {
        checkNuage = check;
        fw.nuages();
    }

//recupere la vitesse du range vitesse soucoupes
    function getSpeedRange(speedM) {
        let newVitesse = (speedM - fw.getSpeedSoucoupe());
        fw.setVitesse(speedM);
        fw.moreSpeed(newVitesse);
        document.querySelector("#rVitesseS").innerHTML = speedM;
    }

//recupère la position su clique de la souris
    function getMouse(event) {
        let xMouse = event.clientX - fw.getPosXCanvas() + fw.getPosXScroll();
        let yMouse = event.clientY - fw.getPosYCanvas() + fw.getPosYScroll();
        fw.downSoucoupe(xMouse, yMouse);
    }
}

function FrameWork(){

    let canvas, ctx;          //Les varaible du canvas
    var h, w;     //les dimension du canvas
    let tabObjectExtraterrestre = [];     //tableau avec tous les objets du canvas
    let tabObjectCloud = [];
    let tabObjectSoucoupe = [];
    let couleur = Math.random() * 100 + 155;        //couleur des nuages au départ
    var colorCloud =  "rgb("+couleur+","+couleur+","+couleur+")";       //stockage de la couleur
    var speedSoucoupe = 0;      //vitesse en plus des soucoupe volantes

    function init(){
        canvas = document.querySelector("#canvas");
        ctx = canvas.getContext("2d");
        getDimCanavs();     //recuperation des dimension du canvas
        //animation du canvas
        setInterval(changeColorChap, 10);       //changement de la couleur du chapeau de l'extraterrestre
        setInterval(colorBrakeSoucoupe, 3);     //chnagem la couleur de la cabine de la soucoupe quand on clique dessus
        requestAnimationFrame(animeCanvas);

    }

    //renvoie la valeur de la vitesse des soucoupe précédente
    function getSpeedSoucoupe(){
        return speedSoucoupe;
    }

    //recupere les dimension du canvas en cas de redimensionnement de la page web
    function getDimCanavs() {
       w = canvas.width;
       h = canvas.height;
    }

    //animation
    function animeCanvas(){
        getDimCanavs();      //on verifie les dimension du canvas
        ctx.clearRect(0, 0, w, h);
        tabObjectExtraterrestre.forEach(function(r){
            r.draw(ctx);
            r.move();
            r.tryColision(w, h);
            r.rotationBras();
        });

        //dessine les soucoupes volantes
        tabObjectSoucoupe.forEach(function(s){
            s.draw(ctx);
            s.move(ctx);
            s.tryColision(w, h);
        });

        //desinnes les nuages
        tabObjectCloud.forEach(function(c){
            c.draw(ctx);
            c.move();
        });



        //test s'il faut recreer des nuages
        nuages();

        //regarde les nuage a supprimer qui sont dehor du canvas
        removeCloud(tabObjectCloud);


        requestAnimationFrame(animeCanvas);
    }

    //change la couleur du chapeau
    function changeColorChap() {
        tabObjectExtraterrestre.forEach(function (e){
            if (e.colorChap === 'white') {
                e.colorChap = 'red';
            } else if (e.colorChap === 'red') {
                e.colorChap = 'white';
            }
        });
    }

    //color de la soucoupe cassé
    function colorBrakeSoucoupe(){
        tabObjectSoucoupe.forEach(function (s) {
           if (s.touch){
                if(s.colorC === 'lightblue'){
                    s.colorC = 'yellow';
                } else if (s.colorC === "yellow"){
                    s.colorC = "red";
                } else if (s.colorC === "red"){
                    s.colorC = 'yellow'
                }
           } else {
               s.colorC = 'lightblue';
           }
        });
    }

    //vide la liste des objets
    function clearTabE(){
        tabObjectExtraterrestre = [];
    }

    function clearTabS() {
        tabObjectSoucoupe = [];
    }

    //creer un nombre n d'extraterreste
    function createExtraterreste(n){

        //genere la position x dans le canvas
        function genereX(scale){
            let ppX = Math.random() * w;
            if(ppX < scale * 85) {
                return ppX + scale * 85;
            } else if (ppX > w - scale * 185){
                return ppX - scale * 185;
            } else  {
                return ppX;
            }
        }

        //genere la position y dans le canvas
        function genereY(scale){
            let ppY = Math.random() * h;
            if(ppY < scale * 90) {
                return ppY + scale * 90;
            } else if (ppY > h - scale * 160){
                return ppY - scale * 160;
            } else  {
                return ppY;
            }
        }

        //genere un échelle aléatoire != 0
        function genereScale(){
            let ps = Math.random() * 0.7;
            if (ps == 0){
                return ps + 0.1
            } else {
                return ps;
            }
        }

        //genere les n objets extraterrestres
        for(i = 0; i < n; i++){
            let scale = genereScale();      //genere un échelle au hasard
            let posX = Math.floor(genereX(scale));       //position x
            let posY = Math.floor(genereY(scale));       //position y
            let vitX = Math.random() * 2;
            let vitY = Math.random() * 2;
            let e = new Extraterrestre(posX, posY, vitX, vitY, scale);
            tabObjectExtraterrestre.push(e);
        }

    }

    //creer des nuages
    function createCloud(){
        let vitesseD = Math.random() * 2 + .1;       //vitesse du nuage
        let size = Math.random() * 60 + 60;
        //creation d l'objet nuage
        let Ncloud = new Cloud(vitesseD, colorCloud, size, w);
        tabObjectCloud.push(Ncloud);
    }

    //creation d'un nouvau nuages s'il y a lieu
    function newCloud(){
        var max = 0;
        var taille = 0;
        tabObjectCloud.forEach(function(c){
            if(max < c.x + 10){
                max = c.x;
                taille = c.taille;
            }
        });
        if(w - taille > max){
            createCloud();
        }
    }

    //supprimer un nuage
    function removeCloud(tab){
        tab.sort();
        for(var i = 0; i < tab.length; i++){
            if(tab[i].x < - tab[i].taille){
                tab.shift();
            }
        }
    }

    //change la couleur des nuages
    function changeColor(color) {
        colorCloud = color;
    }


    //creer n soucoupes volante
    function createSoucoupe(n){

        //genere la position x dans le canvas
        function genereX(scale){
            let ppX = Math.random() * w;
            if(ppX < scale * 100) {
                return ppX + scale * 100;
            } else if (ppX > w - scale * 100){
                return ppX - scale * 100;
            } else  {
                return ppX;
            }
        }

        //genere la position y dans le canvas
        function genereY(scale){
            let ppY = Math.random() * h;
            if(ppY < scale * 60) {
                return ppY + scale * 60;
            } else if (ppY > h - scale * 60){
                return ppY - scale * 60;
            } else  {
                return ppY;
            }
        }

        //genere un échelle aléatoire != 0
        function genereScale(){
            let ps = Math.random() * 0.7;
            if (ps === 0){
                return ps + 0.1
            } else {
                return ps;
            }
        }

        //genere les n objets soucoupes
        for(i = 0; i < n; i++){
            let scale = genereScale();      //genere un échelle au hasard
            let posX = Math.floor(genereX(scale));       //position x
            let posY = Math.floor(genereY(scale));       //position y
            let vitX = Math.floor(Math.random() * 6 - 12);
            let vitY = Math.floor(Math.random() * 6 - 12);
            let s = new Soucoupe(posX, posY, vitX, vitY, scale);
            tabObjectSoucoupe.push(s);
        }

    }

    //gere nuage
    function nuages(){
        if (checkNuage){
            newCloud();
        }
    }

    //augmente la vitesse des soucoupe en fonction du slider
    function moreSpeed(speedS){
        tabObjectSoucoupe.forEach(function(s){
            if(s.xVitesse >= 0){
                s.xVitesse += speedS;
            } else if(s.xVitesse < 0){
                s.xVitesse -= speedS;
            }

            if(s.yVitesse >= 0){
                s.yVitesse += speedS;
            } else if (s.yVitesse < 0){
                s.yVitesse -= speedS;
            }
            /*console.log(s.xVitesse);
            s.xVitesse += speedS;
            console.log(s.xVitesse);
            s.yVitesse += speedS;*/
        });
    }

    //modifier la variable vitesse
    function setVitesse(newSpeed){
        speedSoucoupe = newSpeed;
    }

    //retorune la position x du canvas dans la page HTML
    function getPosXCanvas(){
        return canvas.offsetLeft;
    }

    //retorune la position y du canavs dans la page html
    function getPosYCanvas(){
        return canvas.offsetTop;
    }

    //renvoye les coordonée du scroll
    function getPosXScroll(){
        return window.scrollX;
    }

    function getPosYScroll(){
        return window.scrollY;
    }

    //fait tomber la soucoupe si on a cliqué dessus
    function downSoucoupe(xMouse, yMouse){
        tabObjectSoucoupe.forEach(function(s){
           if(xMouse >= s.x - 50 && xMouse <= s.x + 50 && yMouse >= s.y - 50 && yMouse <= s.y + 50){
               if (s.touch){
                   s.touch = false;
                   s.rotation = 0;
               } else {
                   s.touch = true;
               }
           }
        });
    }

    /*Black box model*/
    return {
        init,
        clearTabE,
        clearTabS,
        createExtraterreste,
        changeColor,
        createSoucoupe,
        nuages,
        moreSpeed,
        getSpeedSoucoupe,
        setVitesse,
        getPosXCanvas,
        getPosYCanvas,
        downSoucoupe,
        getPosXScroll,
        getPosYScroll
    }


}