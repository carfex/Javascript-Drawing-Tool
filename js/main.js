const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

const layer = new Konva.Layer();

listFigures = [];
document.querySelector('#container').addEventListener('mousedown', e => {
    draw();
});
document.querySelector('#container').addEventListener('touchstart', e => {
    draw();
});
const draw = () => {
    const xA = event.clientX;
    const yA = event.clientY;
    const createOtherFigure = listFigures.every(figure => {
        return figure.createOtherFigure == true;
    });
    if (createOtherFigure) {
        const figure = new Figure(xA, yA);
        listFigures.push(figure);
    }else{
        console.log('no se creo la figura');
    }
};
stage.add(layer);

