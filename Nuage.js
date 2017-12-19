class Cloud extends ObjetGraphique {
    constructor(xVitesse, couleur, taille, w){
        super(xVitesse, couleur);
        this.vitesse = xVitesse;
        this.taille = taille;
        this.couleur = couleur;
        this.x = Math.random() * w/5 + 800;
    }

    //dessine les nuages
    draw(ctx, w){
        ctx.save();
        ctx.translate(this.x, -30);
        ctx.fillStyle = this.couleur;
        ctx.beginPath();
        ctx.arc(0, 0, this.taille, 0, Math.PI * Math.random() + Math.PI);
        ctx.fill();
        ctx.restore();
    }

    //dplace les nuages
    move(){
        this.x -= this.vitesse;
    }
}
