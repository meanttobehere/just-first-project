function customlistsInit()
{
    let customlists = document.getElementsByClassName('custom-list');       
    
    for (let i = 0; i < customlists.length; i++)
    { 
        let cl = customlists[i];
        let title = cl.querySelector('.custom-list__title');
        let container = cl.querySelector('.custom-list__container');
        
        title.onclick = function(){
            if (container.style.maxHeight)
                container.style.maxHeight = null;
            else
                container.style.maxHeight = container.scrollHeight + "px";
            console.log('click');
        }
    }
}

customlistsInit();