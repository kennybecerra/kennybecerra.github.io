import normalize from '../scss/vendor/normalize.css';
import style from '../scss/main.scss';
import pdf from '../assets/documents/Kenny_Becerra_Resume.pdf';
import icon from '../assets/images/favicon.ico';

// Functions meant to include the assets files if they can not be included via the css or html
function requireAll(r) {
  r.keys().forEach(r);
}
// requireAll(require.context('../assets/SVG/', false, /\.svg$/));
// requireAll(require.context('../assets/images/', false, /\.(png|jpeg|jpg)$/));
// requireAll(
//   require.context('../assets/videos/', false, /\.(mp4|webm|mov|ogv)$/)
// );
