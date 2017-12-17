import '../css/style.css';
import {Application, loader, resources, Sprite} from './aliasPIXI'
import setting from './setting'
import AppController from './controllers/appController';
import ViewController from './controllers/viewController';

let app, state, appController, viewController;

setting.app = setting.app || {};
setting.app.width = Math.floor(0.9* window.innerWidth);
setting.app.height = Math.floor(0.75 * window.innerHeight);

app = new Application({
        width: setting.app.width,
        height: setting.app.height,
        antialias: true,
        transparent: true,
        resolution: 1
    }
);

appController = new AppController(app);
appController.startAction();

viewController = new ViewController();

export default app;