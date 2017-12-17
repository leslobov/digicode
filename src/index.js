import './css/style.css';
import app from './js/app.js';

if (document.getElementById('application-container').getElementsByTagName('canvas').item(0)) {
    document.getElementById('application-container').removeChild(document.getElementById('application-container').getElementsByTagName('canvas').item(0));
}
document.getElementById('application-container').appendChild(app.view);


if (module.hot) {
    module.hot.accept((err) => {
        if (err) {
            console.error('Cannot apply HMR update.', err);
        }
    });
}