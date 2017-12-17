import setting from '../setting';
import eventEmitter from '../eventEmitter'

let _instance = null;

export default class AppController {

    constructor() {
        if (_instance) {
            return _instance
        }
        this.emitterEvents();
        this.domEvents();
        document.getElementById('gravity-value').innerHTML = setting.gravity;
        _instance = this;
    }

    emitterEvents() {
        eventEmitter.on('element:qntChange', this.onElementQntChangeAction.bind(this));
        eventEmitter.on('game:loop', this.onGameLoopAction.bind(this));
    }

    domEvents() {
        document.getElementById('gravity-decrease').addEventListener('click', this.onDecreaseGravityAction.bind(this));
        document.getElementById('gravity-increase').addEventListener('click', this.onIncreaseGravityAction.bind(this));
        document.getElementById('increase-elements').addEventListener('click', this.onIncreaseElementAction.bind(this));
        document.getElementById('decrease-elements').addEventListener('click', this.onDecreaseElementAction.bind(this));
    }

    onDecreaseGravityAction() {
        if (setting.gravity > setting.gravityStep) {
            setting.gravity -= setting.gravityStep;
        }
        document.getElementById('gravity-value').innerHTML = setting.gravity;
    }

    onIncreaseGravityAction() {
        setting.gravity += setting.gravityStep;
        document.getElementById('gravity-value').innerHTML = setting.gravity;
    }

    onIncreaseElementAction() {
        eventEmitter.trigger('increase:elements')
    }

    onDecreaseElementAction() {
        eventEmitter.trigger('decrease:elements')
    }

    onElementQntChangeAction(qnt) {
        document.getElementById('shapes-number-per-sec').innerHTML = qnt;
    }

    onGameLoopAction(options) {
        document.getElementById('shapes-number').innerHTML = options.primitivesOnScreenQnt;
        document.getElementById('surface-area').innerHTML = options.area;
    }
}