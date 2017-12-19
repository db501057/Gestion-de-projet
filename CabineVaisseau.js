class CabineVaisseau {

    constructor(img, w, h, r){
        this.image = img;
        this.w = w;
        this.h = h;
        this.rotation = r
    }

    draw(ctx){

        let dw = this.w/2;
        let dh = this.h/2;

        ctx.save();
        ctx.translate(dw, dh);
        ctx.rotate(this.rotation);
        console.log(this.rotation);
        ctx.scale(1.5, 1.5);
        ctx.translate(0, 0);
        ctx.drawImage(this.image, -dw, -dh, this.w, this.h);
        ctx.restore();
    }


    rotate(){
        this.rotation += .1;
    }

}