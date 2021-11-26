import './fonts/fonts.scss';
import './global.scss';

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('./components', true, /\.js$|scss$/));
importAll(require.context('./pages', true, /\.js$|scss$/));