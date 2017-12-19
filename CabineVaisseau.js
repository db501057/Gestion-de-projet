class CabineVaisseau {

    constructor(img, w, h){
        this.image = img;
        this.w = w;
        this.h = h;
        this.rotation = 0;
        this.translate = 0;
    }

    draw(ctx){

        let dw = this.w/2;
        let dh = this.h/2;

        ctx.save();
        ctx.translate(dw, dh);
        ctx.rotate(this.rotation);
        ctx.scale(1.5, 1.5);
        ctx.translate(0, this.translate);
        ctx.drawImage(this.image, -dw, -dh, this.w, this.h);
        ctx.restore();
    }


    rotateV(key){

        if(key === 37){
            this.rotation -= .005;
            if(this.rotation < -.24){
                this.rotation = -.24;
            }
        }


        if (key == 39) {
            this.rotation += .01;

            if(this.rotation > .24){
                this.rotation = .24;
            }

        }


        if(key == 38){
            this.translate += 10;
            if(this.translate > 60){
                this.translate = 60;
            }
        }


        if(key == 40){
            this.translate -= 10;
            if(this.translate <  -60){
                this.translate = -60;
            }
        }
    }


    /*retour(){
        for (var i = 0; i < Math.abs(this.rotation / .005); i++){
            if(this.rotation < 0){
                this.rotation += .005;
            } else{
                this.rotation -= .005;
            }
        }
    }*/
}