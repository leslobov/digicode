import {
    CirclePrimitiveGraphics,
    FourSidePrimitiveGraphics,
    ThreeSidePrimitiveGraphics,
    FiveSidePrimitiveGraphics,
    SixSidePrimitiveGraphics,
    EllipsePrimitiveGraphics,
    RandomPrimitiveGraphics
} from '../primitives/index';

import {Graphics} from '../aliasPIXI';
import settings from '../setting';
import eventEmitter from '../eventEmitter';

let _instance = null;

export default class AppController {

    constructor(app) {
        if (_instance) {
            return _instance
        }
        this.app = app;
        this.primitivesClasses = [
            CirclePrimitiveGraphics,
            FourSidePrimitiveGraphics,
            ThreeSidePrimitiveGraphics,
            FiveSidePrimitiveGraphics,
            SixSidePrimitiveGraphics,
            EllipsePrimitiveGraphics,
            RandomPrimitiveGraphics
        ];
        this.primitives = [];
        this.background = null;
        this.init();
        _instance = this;
    }

    init() {
        this.emitterEvents();

        this.background = new Graphics();
        this.background.beginFill(0xFFFFFF);
        this.background.lineStyle(1, 0x000000);
        this.background.drawRect(0, 0, settings.app.width, settings.app.height);
        this.background.endFill();
        this.background.interactive = true;

        this.app.stage.addChild(this.background);
        this.background.on('pointerdown', this.onAppBackgroundClickAction.bind(this));

    }

    emitterEvents() {
        eventEmitter.on('primitive:dropped', this.onPrimitiveDroppedAction.bind(this));
        eventEmitter.on('increase:elements', this.onIncreaseElementAction.bind(this));
        eventEmitter.on('decrease:elements', this.onDecreaseElementAction.bind(this));
    }

    startAction() {
        this.addPrimitive();
        this.app.ticker.add(delta => this.gameLoop(delta));
        document.getElementById('shapes-number-per-sec').innerHTML = this.getActivePrimitives().length;
    }

    onPrimitiveDroppedAction(options) {
        let primitive = options.primitive;
        window.setTimeout(() => {
            primitive.init();
        }, 1000)
    }

    onIncreaseElementAction(options) {
        let deletedPrimitives = this.getDeletedPrimitives();
        if (deletedPrimitives.length) {
            let primitive = deletedPrimitives.pop();
            primitive.restore();
            primitive.init(options);
        } else {
            this.addPrimitive(options);
        }
        eventEmitter.trigger('element:qntChange', this.getActivePrimitives().length);
    }

    onDecreaseElementAction() {
        let primitive, onScreenPrimitives, activePrimitives;

        onScreenPrimitives = this.getOnScreenPrimitives();
        activePrimitives = this.getActivePrimitives();

        if (onScreenPrimitives.length) {
            primitive = onScreenPrimitives.pop();
        } else if (activePrimitives.length) {
            primitive = activePrimitives.pop()
        } else {
            return
        }
        primitive.delete();
        eventEmitter.trigger('element:qntChange', this.getActivePrimitives().length);
    }

    onPrimitiveClickAction(event) {
        event.currentTarget.delete();
        eventEmitter.trigger('element:qntChange', this.getActivePrimitives().length);
    }

    onAppBackgroundClickAction(event) {
        this.onIncreaseElementAction({x: event.data.global.x, y: event.data.global.y});
    }

    getActivePrimitives() {
        return this.primitives.filter(function(primitive) {
            return !primitive.isDelete;
        });
    }

    getDeletedPrimitives() {
        return this.primitives.filter(function(primitive) {
            return primitive.isDelete;
        });
    }

    getOnScreenPrimitives() {
        return this.primitives.filter(function(primitive) {
            return !primitive.isDropped && !primitive.isDelete;
        });
    }

    addPrimitive(options) {
        let Primitive, primitiveInstance;
        Primitive = this._getPrimitiveClass();

        primitiveInstance = new Primitive();
        primitiveInstance.draw().init(options);
        this.app.stage.addChild(primitiveInstance);
        primitiveInstance.on('pointerdown', this.onPrimitiveClickAction.bind(this));
        this.primitives.push(primitiveInstance);
    }

    _getPrimitiveClass() {
        return this.primitivesClasses[Math.floor(Math.random() * this.primitivesClasses.length)];
    }

    gameLoop() {
        let count = 0, area = 0;
        for (let primitive of this.primitives) {
            if (primitive.isDelete || primitive.isDropped) {
                continue;
            }
            primitive.play();
            count++;
            area += primitive.getArea()
        }
        eventEmitter.trigger('game:loop', {primitivesOnScreenQnt: count, area: area});
    }
}