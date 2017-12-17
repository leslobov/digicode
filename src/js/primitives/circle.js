import BasePrimitiveGraphics from './base'
import setting from '../setting'

export default class CirclePrimitiveGraphics extends BasePrimitiveGraphics {
    constructor(...args) {
        super(...args);
        this.area = Math.floor(Math.PI * setting.primitives.circle.radius * setting.primitives.circle.radius);
        this.name = 'circle';
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
        this.beginFill(this.getRandomColor());
        this.drawCircle(0, 0, setting.primitives.circle.radius);
        this.endFill();
        return this;
    }

    getArea() {
        return this.area;
    }
}