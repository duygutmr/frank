$(document).ready(function() {
$('.owl-carousel').owlCarousel({
    loop:false,
    margin:20,
    center: true,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:6
        }
    }
})
})