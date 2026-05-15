let filters={
    Brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    Contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    // Exposure:{
    //     value:100,
    //     min:0,
    //     max:200,
    //     unit:"%"
    // },
    Saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    HueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"  
    },
    Blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    GrayScale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    Sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"    
    },
    Opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    Invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }
}

const presets={
    Drama:{
        Brightness:100,
        Contrast:150,
        Saturation:130,
        HueRotation:0,
        Blur:0,
        GrayScale:0,
        Sepia:0,
        Opacity:100,
        Invert:0
    },
    Vintage:{
        Brightness:110,
        Contrast:80,
        Saturation:70,
        HueRotation:-15,
        Blur:0,
        GrayScale:0,
        Sepia:30,
        Opacity:100,
        Invert:0
    },
    OldSchool:{
        Brightness:90,
        Contrast:120,
        Saturation:40,
        HueRotation:0,
        Blur:0,
        GrayScale:50,
        Sepia:40,
        Opacity:100,
        Invert:0
    },
    Noir:{
        Brightness:80,
        Contrast:180,
        Saturation:0,
        HueRotation:0,
        Blur:0,
        GrayScale:100,
        Sepia:0,
        Opacity:100,
        Invert:0
    },
    Sunny:{
        Brightness:130,
        Contrast:110,
        Saturation:140,
        HueRotation:15,
        Blur:0,
        GrayScale:0,
        Sepia:0,
        Opacity:100,
        Invert:0
    },
    Cool:{
        Brightness:100,
        Contrast:110,
        Saturation:120,
        HueRotation:200,
        Blur:0,
        GrayScale:0,
        Sepia:0,
        Opacity:100,
        Invert:0
    }
}
const presetcontainer=document.querySelector(".presets");
const imagecanvas=document.querySelector("#image-canvas");
const imgInput=document.querySelector("#image-input");
const filtercontainer=document.querySelector(".filters");
const canvasctx=imagecanvas.getContext("2d");
const resetbtn=document.querySelector("#reset-btn");
const downloadbtn=document.querySelector("#download-btn");
let file=null;
let image=null;
function createFilterElement(name,unit="%",value,min,max){
    const div=document.createElement("div");
    div.classList.add("filter");

    const input=document.createElement("input");
    input.type="range";
    input.min=min;
    input.max=max;
    input.value=value;
    input.id=name;
    const p=document.createElement("p");
    p.innerText=name;
    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input",(e)=>{
        filters[name].value=input.value;
        applyFilters();
    });
    return div;
}
function createFilters(){
    Object.keys(filters).forEach(key=>{
        const filterelement=createFilterElement(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max);
        filtercontainer.appendChild(filterelement);
    });
}
createFilters();

imgInput.addEventListener("change",(e)=>{
    file=e.target.files[0];
    const imagePlaceholder=document.querySelector(".placeholder");
    imagecanvas.style.display="block";
    imagePlaceholder.style.display="none";
    const img=new Image();
    image=img;
    img.src=URL.createObjectURL(file);
    img.onload=()=>{
        imagecanvas.width=img.width;
        imagecanvas.height=img.height;
        canvasctx.drawImage(img,0,0);
    }
})
function applyFilters(){
    canvasctx.clearRect(0,0,imagecanvas.width,imagecanvas.height);
    let filterString=`
        brightness(${filters.Brightness.value}${filters.Brightness.unit})
        contrast(${filters.Contrast.value}${filters.Contrast.unit})
        saturate(${filters.Saturation.value}${filters.Saturation.unit})
        hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})
        blur(${filters.Blur.value}${filters.Blur.unit})
        grayscale(${filters.GrayScale.value}${filters.GrayScale.unit})
        sepia(${filters.Sepia.value}${filters.Sepia.unit})
        opacity(${filters.Opacity.value}${filters.Opacity.unit})
        invert(${filters.Invert.value}${filters.Invert.unit})
    `.trim();
    canvasctx.filter=filterString;
    canvasctx.drawImage(image,0,0);
}
resetbtn.addEventListener("click",()=>{
    filters={
    Brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    Contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    // Exposure:{
    //     value:100,
    //     min:0,
    //     max:200,
    //     unit:"%"
    // },
    Saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    HueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"  
    },
    Blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    GrayScale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    Sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"    
    },
    Opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    Invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }
}
    applyFilters();
    filtercontainer.innerHTML="";
    createFilters();
})

downloadbtn.addEventListener("click",()=>{
    const link=document.createElement("a");
    link.download="edited-image.png";
    link.href=imagecanvas.toDataURL();
    link.click();
});

Object.keys(presets).forEach(presetname=>{
    const presetbutton=document.createElement("button");
    presetbutton.classList.add("btn");
    presetbutton.innerText=presetname;
    presetcontainer.appendChild(presetbutton);
    presetbutton.addEventListener("click",()=>{
        const presetfilters=presets[presetname];
        // Apply the preset filters
        Object.keys(presetfilters).forEach(filtername=>{
            filters[filtername].value=presetfilters[filtername];
        });
        applyFilters();
        // Update the filter inputs
        filtercontainer.innerHTML="";
        createFilters();
    });
});