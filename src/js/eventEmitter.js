let eventEmitter;

class EventEmitter {

    constructor() {
        this.events = {};
    }

    trigger(event, data) {
        if (!this.events[event]) {
            return;
        }
        for (let cb of this.events[event]) {
            cb(data);
        }
    }

    on(event, cb) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(cb);
    }
}

eventEmitter = new EventEmitter();

export default eventEmitter;