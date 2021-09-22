import './formelements.scss';
import img1 from '../../svg/uikit-logotype.svg';
import img2 from '../../svg/arrow-right.svg';
import '../../components/inpt/inpt.js'

let elements = document.getElementsByClassName('inpt_type-dropdown');

elements.foreach((inpt) => {
    inpt.onclick = () =>{
        console.log('uuu');
    }
})