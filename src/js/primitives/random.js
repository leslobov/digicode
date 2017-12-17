import BasePrimitiveGraphics from './base';
import setting from '../setting';
import {Graphics, Container} from '../aliasPIXI';

export default class RandomPrimitiveGraphics extends BasePrimitiveGraphics {
    constructor(...args) {
        super(...args);
        this.area = 1000; //TODO: create real formula
        this.name = 'random';
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
            this.y = options.y;
        } else {
            this.y = -height;
        }
    }

    draw() {
        let width, height, color, ellipse2, ellipse3;

        color = this.getRandomColor();

        ({width, height} = setting.primitives.random.ellipse1);
        this.beginFill(color);
        this.drawEllipse(0, 0, width, height);
        this.rotation = Math.floor(Math.random() * Math.PI);
        this.endFill();


        ({width, height} = setting.primitives.random.ellipse2);
        ellipse2 = new Graphics();
        ellipse2.beginFill(color);
        ellipse2.drawEllipse(0, 0, width, height);
        ellipse2.rotation = Math.floor(Math.random() * Math.PI);
        ellipse2.endFill();

        ({width, height} = setting.primitives.random.ellipse3);
        ellipse3 = new Graphics();
        ellipse3.beginFill(color);
        ellipse3.drawEllipse(0, 0, width, height);
        ellipse3.rotation = Math.floor(Math.random() * Math.PI);
        ellipse3.endFill();

        this.addChild(ellipse2);
        this.addChild(ellipse3);

        return this;
    }

    getArea() {
        return this.area;
    }
}