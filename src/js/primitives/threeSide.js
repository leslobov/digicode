import BasePrimitiveGraphics from './base'
import setting from '../setting'

export default class ThreeSidePrimitiveGraphics extends BasePrimitiveGraphics {
    constructor(...args) {
        super(...args);
        this.area = Math.floor((setting.primitives.rectangle.width * setting.primitives.rectangle.height) / 2);
        this.name = 'threeSide';
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
        this.beginFill(this.getRandomColor());
        this.drawPolygon(setting.primitives.triangle);
        this.endFill();
        return this;
    }

    getArea() {
        return this.area;
    }
}