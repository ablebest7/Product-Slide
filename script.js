const wrapper = document.querySelector('.wrapper')
const carousel = document.querySelector('.carousel')
const arrowBtns = document.querySelectorAll('.wrapper i')
const firstCardWidth = document.querySelector('.card').offsetWidth
const carouselChildrens = [...carousel.children]

let isDragging = false
let startX;
let startScrollLeft;
let timeoutId;


let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)
// console.log(carouselChildrens.slice(-cardPerView));
carouselChildrens.slice(-cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
})


carouselChildrens.slice(0, cardPerView).forEach(card =>{
    carousel.insertAdjacentHTML('beforeend', card.outerHTML)
})

arrowBtns.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
        // same thing with the one under
        // if (btn.id === 'left') {
        //     carousel.scrollLeft -= firstCardWidth
        // } else {
        //     carousel.scrollLeft += firstCardWidth
        // }
    })
})

const dragStart = (e) => {
    isDragging = true
    carousel.classList.add('dragging')
    startX = e.pageX
    startScrollLeft = carousel.scrollLeft
    console.log(startScrollLeft);
}


const dragging = (e) => {
    if (!isDragging) return

    carousel.scrollLeft = startScrollLeft - (e.pageX - startX) 

    // console.log(e.pageX - startX);
}

const dragStop = () => {
    isDragging = false
    carousel.classList.remove('dragging')
}

const autoPlay = () => {
    if (window.innerWidth < 270) return
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500)
}
autoPlay()

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add('no-transition')
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth)
        carousel.classList.remove('no-transition')
    }
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add('no-transition')
        carousel.scrollLeft = carousel.offsetWidth
        carousel.classList.remove('no-transition')
    }
    clearTimeout(timeoutId)
    if (!wrapper.matches(':hover')) autoPlay()
} 

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('mousemove', dragging)
document.addEventListener('mouseup', dragStop)
carousel.addEventListener('scroll', infiniteScroll)
wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId))
wrapper.addEventListener('mouseleave', autoPlay)

// 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

git clone https://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@github.com/ablebest7/Product-Slide.git
