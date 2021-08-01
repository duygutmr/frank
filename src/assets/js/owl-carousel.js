$(document).ready(function() {
$('.owl-carousel').owlCarousel({
    loop:false,
    margin:20,
    nav:true,
    autoWidth:true,
    navText: ["<img src='../assets/svg/left-arrow.svg'>","<img src='../assets/svg/right-arrow.svg'>"],
    responsive:{
        0:{
            items:1,
            center:true,
        },
        600:{
            items:3,
        },
        1000:{
            items:6
        }
    }
})
})
