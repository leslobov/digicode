import BasePrimitiveGraphics from './base'
import setting from '../setting'

export default class FourSidePrimitiveGraphics extends BasePrimitiveGraphics {
    constructor(...args) {
        super(...args);
        this.name = 'fourSide';
        this.area = setting.primitives.rectangle.width * setting.primitives.rectangle.height;
    }

    init(options) {
        let width, height;

        super.init(options);

        ({width, height} = this.getBounds());
        if (options && options.x) {
            this.x = this.calcPointedWidth(options.x) - Math.floor(width/2);
        } else {
            this.x = Math.floor(Math.random()*(this.appData.width - width));
        }
        if (options && options.y) {
            this.y = options.y - Math.floor(height/2);
        } else {
            this.y = -height;
        }
    }

    draw() {
        this.beginFill(this.getRandomColor());
        this.drawRect(0, 0, setting.primitives.rectangle.width, setting.primitives.rectangle.height);
        this.endFill();
        return this;
    }

    getArea() {
        return this.area;
    }
}