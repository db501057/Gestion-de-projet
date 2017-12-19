class CabineVaisseau {

    constructor(img, w, h){
        this.image = img;
        this.w = w;
        this.h = h;
    }

    draw(ctx){

        let dw = this.w/2;
        let dh = this.h/2;

        ctx.save();
        ctx.translate(dw, dh);
        ctx.rotate(.1);
        ctx.drawImage(this.image, -dw, -dh, this.w, this.h);
        ctx.restore();
    }


    rotate(){
        ctx.rotate(.1);
    }

}