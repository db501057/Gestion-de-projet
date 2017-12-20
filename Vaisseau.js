class Vaisseau {
    constructor(x, y, img){
        this.x = x;
        this.y = y;
        this.vX = Math.random();
        this.vY = Math.random();
        this.scale = Math.random() * 0.5;
        this.image = img;
    }


    draw(ctx){
        ctx.save();
        ctx.scale(this.scale, this.scale);
        ctx.drawImage(this.image, this.x, this.y);
        ctx.restore();
    }
}