import BasePrimitiveGraphics from './base'
import setting from '../setting'

export default class EllipsePrimitiveGraphics extends BasePrimitiveGraphics {
    constructor(...args) {
        super(...args);
        this.area = Math.floor(Math.PI * setting.primitives.ellipse.width * setting.primitives.ellipse.height / 4);
        this.name = 'ellipse';
    }

    init(options) {
        let width, height;

        super.init(options);

        ({width, height} = this.getBounds());
        if (options && options.x) {
            this.x = this.calcPointedWidth(options.x)
        } else {
            this.x = Math.floor(width/2 + Math.random()*(this.appData.width - width));
        }
        if (options && options.y) {
            this.y = options.y;
        } else {
            this.y = -Math.floor(height/2);
        }
        return this;
    }

    draw() {
        let width, height;

        ({width, height} = setting.primitives.ellipse);
        this.beginFill(this.getRandomColor());
        this.drawEllipse(0, 0, width, height);
        this.endFill();
        return this;
    }

    getArea() {
        return this.area;
    }
}