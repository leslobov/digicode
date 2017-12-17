import {Graphics} from '../aliasPIXI';
import setting from '../setting';
import eventEmitter from '../eventEmitter';

export default class BasePrimitiveGraphics extends Graphics {

    constructor(...args) {
        super(...args);
        this.tickCount = null;
        this.appData = null;
        this.isDelete = false;
        this.isDropped = false;
        this.interactive = true;
    }

    init(options) {
        this.tickCount = 0;
        this.appData = (options && options.appData) || setting.app;
        this.isDropped = false;
        return this;
    };

    play() {
        this.tickCount +=1;

        this.y += setting.gravity * setting.gravityMultitype * this.tickCount * this.tickCount;
        if (this.y > this.appData.height + this.getBounds().height) {
            this.isDropped = true;
            eventEmitter.trigger('primitive:dropped', {primitive: this});
        }
    };

    delete() {
        this.y = this.appData.height + this.getBounds().height;
        this.isDelete = true;
    };

    restore() {
        this.isDelete = false;
    };

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '0x';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    calcPointedWidth(x) {
        let width = this.getBounds().width;

        if (x < width/2) {
            return Math.floor(width/2);
        }
        if (x > setting.app.width - width/2) {
            return Math.floor(setting.app.width - width/2);
        }
        return x
    }
}