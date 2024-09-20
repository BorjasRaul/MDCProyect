

let offsetX, offsetY, isDragging = false;

function startDrag(ev) {
    isDragging = true;
    offsetX = ev.clientX - ev.target.closest('.video-container').getBoundingClientRect().left;
    offsetY = ev.clientY - ev.target.closest('.video-container').getBoundingClientRect().top;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(ev) {
    if (isDragging) {
        const videoContainer = document.getElementById('VideoC');
        videoContainer.style.left = (ev.clientX - offsetX) + 'px';
        videoContainer.style.top = (ev.clientY - offsetY) + 'px';
    }
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}