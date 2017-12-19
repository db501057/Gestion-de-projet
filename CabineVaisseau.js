class CabineVaisseau {

    constructor(img, w, h){
        this.image = img;
        this.w = w;
        this.h = h;
        this.rotation = 0
    }

    draw(ctx){

        let dw = this.w/2;
        let dh = this.h/2;

        ctx.save();
        ctx.translate(dw, dh);
        ctx.rotate(this.rotation);
        ctx.scale(1.5, 1.5);
        ctx.translate(0, 0);
        ctx.drawImage(this.image, -dw, -dh, this.w, this.h);
        ctx.restore();
    }


    rotateV(key){
        switch (key){
            case 37: {
                this.rotation = this.rotation - .005;

                if(this.rotation < -.24){
                    this.rotation = -.24;
                }
            }

            case 38: {



        }

        }
    }

}