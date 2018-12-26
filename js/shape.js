class Figure {
    constructor(xA, yA) {
        this.xA = xA;
        this.yA = yA;
        this.xB = xA;
        this.yB = yA;
        this.yAConst= yA;
        this.xAConst = xA;
        this.width = 0;
        this.height = 0;
        this.figureCreated = false;
        this.createOtherFigure = true;
        this.expandFigureLeft = false;
        this.expandFigureRight = false;
        this.startDrawing = false;
        this.posY = 0;
        this.drawShape();
    }
    drawingShape(){
        console.log('oliz');
        if(!this.figureCreated){
            this.width = Math.abs(this.xB - this.xA);
            this.height = Math.abs(this.yB - this.yA);
            if(!this.startDrawing){
                this.xB = event.clientX;
                this.yB = event.clientY;
                if(this.width >= this.height){
                    this.yB = this.yAConst + 35;
                    this.yA = this.yA - 35;
                    this.xB = event.clientX;
                }else if(this.height > this.width) {
                    this.xB = this.xAConst + 35;
                    this.xA = this.xA - 35;
                    this.yB = event.clientY;
                }
            }
            if(this.width > this.height || this.width < this.height){
                this.startDrawing = true;
            }
            if(this.width >= this.height){
                this.yB = this.yA + 70;
                if(this.xB >= this.xAConst){
                    this.xB = event.clientX + 35;
                }else{
                    this.xB = event.clientX - 35;
                }
                
            }else if(this.height > this.width){
                this.xB = this.xA + 70;
                if(this.yB >= this.yAConst){
                    this.yB = event.clientY + 35;
                }else{
                    this.yB = event.clientY - 35;
                }
            }
        }
    }
    drawShape(){
        document.querySelector('#container').addEventListener('mousemove', e => {
            this.drawingShape();
        });
        document.querySelector('#container').addEventListener('touchmove', e => {
            this.drawingShape();
        });
        document.querySelector('#container').addEventListener('mouseup', e => {
            if(!this.figureCreated){
                // this.xB = event.clientX;
                // this.yB = event.clientY;
            }
            this.figureCreated = true;
            this.expandFigureLeft = false;
            this.expandFigureRight = false;
        });
        this.groupFigure = new Konva.Group({
            draggable: true
        });
        this.shape = new Konva.Shape({
            sceneFunc: (context, shape) => {
                context.beginPath();
                context.moveTo(this.xA, this.yA);
                context.lineTo(this.xB, this.yA);
                context.lineTo(this.xB, this.yB);
                context.lineTo(this.xA, this.yB);
                context.closePath();
                context.fillStrokeShape(shape);
            },
            fill: '#f4f8ff',
            stroke: '#c4e8ff',
            strokeWidth: 2,
        });
        this.groupFigure.add(this.shape);
        layer.add(this.groupFigure);

        this.interval = setInterval(() => {
            if(!this.figureCreated){
                layer.draw();
            }else{ 
                // this.activeEvents();
                // this.expandFigure();
                clearInterval(this.interval);
            }
        }, 55/1000);
    }
    activeEvents(){
        this.groupFigure.on('mousedown touchstart', evt => {
            this.createOtherFigure = false;
            document.querySelector('#container').style.cursor = 'grabbing';
        });
        this.groupFigure.on('mouseup touchend', evt => {
            this.createOtherFigure = true;
            document.querySelector('#container').style.cursor = 'grab';

            this.expandFigureLeft = false;
            this.expandFigureRight = false;
        });
        this.groupFigure.on('mouseover',evt => {
            document.querySelector('#container').style.cursor = 'grab';
            this.zoneExpandFigureLeft.show();
            this.zoneExpandFigureRight.show();
            layer.draw();
        });
        this.groupFigure.on('mouseout',evt => {
            document.querySelector('#container').style.cursor = 'crosshair';
            this.zoneExpandFigureLeft.hide();
            this.zoneExpandFigureRight.hide();
            layer.draw();
        });
    }
    expandFigure(){
        this.width = this.xB - this.xA;
        this.height = this.yB - this.yA;
        this.zoneExpandFigureLeft = new Konva.Rect({
            x: this.xA + 2,
            y: this.yA + 2,
            width: this.width*15/100,
            height: this.height - 4,
            fill: '#edf3ff'
        });
        this.zoneExpandFigureRight = new Konva.Rect({
            x: this.xB - (this.width*15/100 + 2),
            y: this.yA + 2,
            width: this.width*15/100,
            height: this.height - 4,
            fill: '#edf3ff'
        });
        this.zoneExpandFigureLeft.hide();
        this.zoneExpandFigureRight.hide();
        this.groupFigure.add(this.zoneExpandFigureLeft);
        this.groupFigure.add(this.zoneExpandFigureRight);
        
        this.zoneExpandFigureLeft.on('mousedown', evt => {
            this.expandFigureLeft = true;
            this.groupFigure.draggable(false);
            this.distanceYLeft = this.yB - event.clientY;
            this.posYLeft = event.clientY + this.distanceY;

            this.shape.sceneFunc((context, shape) => {
                context.beginPath();
                context.moveTo(this.xA, this.yA);
                context.lineTo(this.xB, this.yA);
                context.lineTo(this.xB, this.yB);
                context.lineTo(this.xA + this.width*15/100, this.yB);
                context.lineTo(this.xA + this.width*15/100, this.posYLeft);
                context.lineTo(this.xA, this.posYLeft);
                context.lineTo(this.xA, this.yA);
                context.closePath();
                context.fillStrokeShape(shape);
            });
            
            this.interval2 = setInterval(() => {
                if(this.expandFigureLeft){
                    layer.draw();
                }else{
                    clearInterval(this.interval2);
                }
            }, 55/1000);
        });
        this.zoneExpandFigureRight.on('mousedown', evt => {
            this.expandFigureRight = true;
            this.groupFigure.draggable(false);
            this.distanceYRight = this.yB - event.clientY;
            this.posYRight = event.clientY + this.distanceY;

            this.shape.sceneFunc((context, shape) => {
                context.beginPath();
                context.moveTo(this.xA, this.yA);
                context.lineTo(this.xB, this.yA);
                context.lineTo(this.xB, this.posYRight);
                context.lineTo(this.xB - this.width*15/100, this.posYRight);
                context.lineTo(this.xB - this.width*15/100, this.yB);
                context.lineTo(this.xA, this.yB);
                context.moveTo(this.xA, this.yA);
                context.closePath();
                context.fillStrokeShape(shape);
            });
            
            this.interval3 = setInterval(() => {
                if(this.expandFigureRight){
                    layer.draw();
                }else{
                    clearInterval(this.interval3);
                }
            }, 55/1000);
        });
        document.querySelector('#container').addEventListener('mousemove', evt => {
            if(this.expandFigureLeft){
                this.posYLeft = event.clientY + this.distanceYLeft;
            }
            if(this.expandFigureRight){
                this.posYRight = event.clientY + this.distanceYRight;
            }
        });
        layer.draw();   
    }
}