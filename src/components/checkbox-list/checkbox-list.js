import '../custom-checkbox/custom-checkbox.js'

function chechboxListsInit()
{
    let chechboxLists = document.getElementsByClassName('checkbox-list_expandable');       
    
    for (let i = 0; i < chechboxLists.length; i++)
    { 
        let cl = chechboxLists[i];
        let title = cl.querySelector('.checkbox-list__title');
        let container = cl.querySelector('.checkbox-list__container');
        
        title.onclick = function(){
            container.classList.toggle('checkbox-list__container_open');
        }
    }
}

chechboxListsInit();