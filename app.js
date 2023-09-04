const $ = document;

const fileInput = $.querySelector(".file-input");
const chooseImgBtn = $.querySelector(".choose-img");
const previewImg = $.querySelector(".preview-img img");
const filterOptions = $.querySelectorAll(".filter button");
const filterName = $.querySelector(".filter-info .name");
const filterSlider = $.querySelector(".slider input");
const filterValue = $.querySelector(".filter-info .value");
const rotateOptions = $.querySelectorAll(".rotate .options button");
const resetFilterBtn = $.querySelector(".reset-filter");
const saveImageBtn = $.querySelector(".save-img");

let rotate = 0 , flipHorizontal = 1 , flipVertical = 1;
let brightness = 100, seturation = 100, inversion = 0, grayscale = 0;

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal} , ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${seturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
};

const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
};
fileInput.addEventListener("change" , loadImage);
chooseImgBtn.addEventListener("click" , () => fileInput.click());

filterOptions.forEach(option => {
    option.addEventListener("click" , () => {
        $.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}&`;
        } else if(option.id === "seturation") {
            filterSlider.max = "200";
            filterSlider.value = seturation;
            filterValue.innerText = `${seturation}&`;
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}&`;
        } else if(option.id === "grayscale") {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}&`;
        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = $.querySelector(".filter .active");

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "seturation") {
        seturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else if(selectedFilter.id === "grayscale") {
        grayscale = filterSlider.value;
    }

    applyFilters();
};

filterSlider.addEventListener("input" , updateFilter);

rotateOptions.forEach(option => {
    option.addEventListener("click" , () => {
        if(option.id === "left") {
            rotate -= 90;
        } else if (option.id === "right") {
            rotate += 90;
        } else if (option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1 ;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1 ;
        }
        applyFilters();
    });
});

const resetFilter = () => {
    rotate = 0 ; flipHorizontal = 1 ; flipVertical = 1;
    brightness = 100; seturation = 100; inversion = 0; grayscale = 0;
    filterOptions[0].click();
    applyFilters();
};

resetFilterBtn.addEventListener("click" , resetFilter);

const saveImage = () => {
    const canvas = $.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${seturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2 , canvas.height / 2 );
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal , flipVertical);
    ctx.drawImage(previewImg , -canvas.width / 2 , -canvas.height / 2 , canvas.width , canvas.height);
    
    const link = $.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();


};

saveImageBtn.addEventListener("click" , saveImage);






















