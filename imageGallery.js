let images = ["img_1.jpg", "img_2.jpg", "img_3.jpg","img_6.jpg","img_7.jpg","img_9.jpg","img_10.jpg","img_11.jpg","img_12.jpg"];
let currentImgIndex = 0;
let fullImg = document.getElementById("fullImg");
let fullImgbox = document.getElementById("fullImgbox");
let gallery = document.querySelector('.img-gallery');

// Render gallery images
function renderGallery() {
    gallery.innerHTML = '';
    images.forEach((imgSrc, index) => {
        let img = document.createElement('img');
        img.src = imgSrc;
        img.onclick = function() {
            openFullImg(index);
        }
        gallery.appendChild(img);
    });
}

renderGallery();
// Open full image
function openFullImg(index) {
    fullImgbox.style.display = "flex";
    fullImg.src = images[index];
    currentImgIndex = index;
    fullImgbox.classList.add("show");
}

// Close full image
function closeFullImg() {
    fullImgbox.style.display = "none";
}

// Previous Image
function prevImg() {
    if (images.length === 0) return;
    currentImgIndex--;
    if (currentImgIndex < 0) {
        currentImgIndex = images.length - 1; 
    }
    fullImg.src = images[currentImgIndex];
}

// Next Image
function nextImg() {
    if (images.length === 0) return;
    currentImgIndex++;
    if (currentImgIndex >= images.length) {
        currentImgIndex = 0; 
    }
    fullImg.src = images[currentImgIndex];
}

document.addEventListener("keydown", function(event) {
    if (fullImgbox.classList.contains("show")) {
        if (event.key === "ArrowRight") {
            nextImg();
        } else if (event.key === "ArrowLeft") {
            prevImg();
        } else if (event.key === "Escape") {
            closeFullImg(); // close image when pressing Esc key
        } else if (event.key === "Delete") {
            deleteCurrentImg();
        }
    }
});

// Delete Current Image
function deleteCurrentImg() {
    if (images.length > 0) {
        images.splice(currentImgIndex, 1);
        renderGallery();
        if (images.length === 0) {
            closeFullImg();
        } else {
            currentImgIndex = currentImgIndex % images.length;
            fullImg.src = images[currentImgIndex];
        }
    }
}

function downloadImg() {
    const link = document.createElement('a');
    link.href = fullImg.src;
    link.download = "downloaded_image.jpg";
    link.click();
}
