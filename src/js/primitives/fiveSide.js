import BasePrimitiveGraphics from './base'
import setting from '../setting'


export default class FiveSidePrimitiveGraphics extends BasePrimitiveGraphics {
    constructor(...args) {
        super(...args);
        this.area = Math.floor(5 * setting.primitives.fiveSide.radius * setting.primitives.fiveSide.radius*Math.sin(36*Math.PI/180)*Math.cos(36*Math.PI/180));
        this.name = 'fiveSide';
    }

    init(options) {
        let width, height;

        super.init(options);

        ({width, height} = this.getBounds());
        if (options && options.x) {
            this.x = this.calcPointedWidth(options.x);
        } else {
            this.x = Math.floor(width/2 + Math.random()*(this.appData.width - width));
        }
        if (options && options.y) {
            this.y = options.y - Math.floor(height/2);
        } else {
            this.y = -height;
        }
    }

    draw() {
        let r = setting.primitives.fiveSide.radius, data;

        data = [
            -Math.floor(r*Math.sin(36*Math.PI/180)), Math.floor(r*Math.cos(36*Math.PI/180) + r/2),
            -Math.floor(r*Math.sin(72*Math.PI/180)), -Math.floor(r*Math.cos(72*Math.PI/180)- r/2),
            0, -Math.floor(r/2),
            Math.floor(r*Math.sin(72*Math.PI/180)), -Math.floor(r*Math.cos(72*Math.PI/180)- r/2),
            Math.floor(r*Math.sin(36*Math.PI/180)), Math.floor(r*Math.cos(36*Math.PI/180)+ r/2)
        ];
        this.beginFill(this.getRandomColor());
        this.drawPolygon(data);
        this.endFill();
        return this;
    }

    getArea() {
        return this.area;
    }
}