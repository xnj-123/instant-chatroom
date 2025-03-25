import type { Ref } from "vue";
import { onMounted,onUnmounted } from "vue";

export function useResize(elementRef:Ref<HTMLElement | null> , dir:string = 'col'){
    let startX : number | null = null;
    let startY:number | null=null;
    let startWidth : string | null = null;
    let startHeight : string |null = null;

    const onMouseMove = (event:MouseEvent)=>{
        if(startX!=null && startWidth !=null &&elementRef.value&&dir=='col'){
            const delatX = event.clientX - startX;
            elementRef.value.style.width = `${parseFloat(startWidth) + delatX}px`;
        }else if(startY!=null && startHeight !=null &&elementRef.value && dir=='row'){
            const delatY = startY - event.clientY ;
            elementRef.value.style.height = `${parseFloat(startHeight) + delatY}px`
        }
    }

    const onMouseUp = ()=>{
        document.removeEventListener('mousemove', onMouseMove);  
        document.removeEventListener('mouseup', onMouseUp);  
        startX = null;
        startWidth = null;
        startY=null;
        startHeight = null;
    }

    const startResize = (event:MouseEvent) => {  
        if (elementRef.value) { 
            if(dir == 'col'){
                startX = event.clientX;  
                startWidth = elementRef.value.clientWidth + 'px';  
            } 
            else if (dir == 'row'){
                startY = event.clientY;
                startHeight = elementRef.value.clientHeight + 'px';
            }
            document.addEventListener('mousemove', onMouseMove);  
            document.addEventListener('mouseup', onMouseUp);  
        }  
    };  

    onMounted(() => {  
        if (elementRef.value) {  
            const separator = elementRef.value.querySelector('.seperate');  
            if (separator) {  
                separator.addEventListener('mousedown', startResize  as EventListener);  
            }  
        }  
    });

    onUnmounted(() => {  
        if (elementRef.value) {  
            const separator = elementRef.value.querySelector('.seperate');  
            if (separator) {  
                separator.removeEventListener('mousedown', startResize  as EventListener);  
            }  
            document.removeEventListener('mousemove', onMouseMove);  
            document.removeEventListener('mouseup', onMouseUp);  
        }  
    }); 
}