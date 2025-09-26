import Slider from "react-slick";

export default function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="w-full mx-auto overflow-hidden pb-6">
            <Slider {...settings}>
                <div><img src="https://i.ytimg.com/vi/XTSewtmCGTo/maxresdefault.jpg" alt="img1" className="w-full md:h-auto md:max-h-[550px] sm:max-h-[300px]" /></div>
                <div><img src="https://i.ytimg.com/vi/PnoF-tAxnQw/maxresdefault.jpg" alt="img2" className="w-full md:h-auto md:max-h-[550px] sm:max-h-[300px]" /></div>
                <div><img src="/images/p1.jpg" alt="img3" className="w-full md:h-auto md:max-h-[550px] sm:max-h-[300px]" /></div>
            </Slider>
        </div>
    );
}
