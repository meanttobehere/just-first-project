import './header.scss';
import './__item/header__item.js'
import '../logotype/logotype.js'
import header__menu from './header__menu.svg'

function headersInit(){
    let headers = document.getElementsByClassName('header');
    let mediaQueryList = window.matchMedia('(min-width: 600px)');

    for (let i = 0; i < headers.length; i++){
        let menu = headers[i].querySelector('.header__menu-icon');
        let container = headers[i].querySelector('.header__container');
        let userblock = headers[i].querySelector('.header__userblock');
        let navbar = headers[i].querySelector('.header__navbar');

        menu.onclick = () => {
            container.classList.toggle('header__container_open');
        }

        function changeHierarchy(userblockOutsideNavbar){
            if (userblockOutsideNavbar) {                
                container.appendChild(userblock);
            } else {
                navbar.appendChild(userblock);
            }
        }

        changeHierarchy(mediaQueryList.matches);

        mediaQueryList.addEventListener('change', (e) => {
            changeHierarchy(e.matches);
        });
    }    
}

headersInit();