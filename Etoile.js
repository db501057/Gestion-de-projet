class Etoile {

    constructor(x, y, taille){
        this.x = x;
        this.y = y;
        this.taille = taille;
        this.vitesse = 1;
    }


    draw(ctx){
        ctx.save();

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.arc(this.x,this.y,this.taille,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    move(w, h){
        if(this.x >= w/2){
            this.x += this.vitesse * Math.random()
        } else {
            this.x -= this.vitesse * Math.random()
        }

        if(this.y > h/2){
            this.y += this.vitesse * Math.random()
        } else {
            this.y -= this.vitesse * Math.random()
        }
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }


    acceleration(){
        this.vitesse += 1;
    }


}