import './range-slider.scss'

function rangeSlidersInit()
{
    let rangeSliders= document.getElementsByClassName('range-slider');           
    
    for (let i = 0; i < rangeSliders.length; i++)
    {         
        let pointers = rangeSliders[i].getElementsByClassName('range-slider__pointer');
        let segment = rangeSliders[i].querySelector('.range-slider__segment');        

        let leftPointer = {position: 50, offset: 0};
        let rightPointer = {position: 180, offset: 0};        
        let currentPointer = {};

        function setPointers()
        {
            if (currentPointer == leftPointer)
            {
                if (leftPointer.position < -5)
                    leftPointer.position = -5;            
                if (leftPointer.position > rightPointer.position - 14)
                    leftPointer.position = rightPointer.position - 14;                
            } 
            else 
            {
                if (rightPointer.position < leftPointer.position + 14)
                    rightPointer.position = leftPointer.position + 14;
                if (rightPointer.position > 250)
                    rightPointer.position = 250;                
            } 
            pointers[0].style.left = leftPointer.position + 'px';
            pointers[1].style.left = rightPointer.position + 'px';
            segment.style.left = leftPointer.position + 12 + 'px';
            segment.style.width = rightPointer.position - leftPointer.position - 6 + 'px';      
        }

        setPointers();

        function sliderMove(event)
        {             
            currentPointer.position = event.clientX + currentPointer.offset;
            setPointers();
        }

        function sliderEndMove()
        { 
            document.removeEventListener('mousemove', sliderMove);
            document.removeEventListener('mouseup', sliderEndMove);
        }        
        
        for (let j = 0; j < 2; j++){
            pointers[j].onmousedown = function(event)
            {                                
                currentPointer = (j === 0) ? leftPointer : rightPointer;                
                currentPointer.offset = currentPointer.position - event.clientX;
                
                document.addEventListener('mousemove', sliderMove);
                document.addEventListener('mouseup', sliderEndMove);
                event.preventDefault();  
            }
        }  
    }
}

rangeSlidersInit();