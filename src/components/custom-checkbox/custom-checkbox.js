import checkmark from './custom-checkbox-checkmark.svg';

function checkboxsInit()
{
    let checkboxs = document.getElementsByClassName('custom-checkbox');       
    
    for (let i = 0; i < checkboxs.length; i++)
    { 
        let cb = checkboxs[i];
        
        cb.onclick = function(){
            this.querySelector('.custom-checkbox__box').classList.toggle('custom-checkbox__box_clicked');
            //this.querySelector('.custom-checkbox__checkmark').classList.toggle('custom-checkbox__checkmark_clicked');
        }
    }
}

checkboxsInit();
