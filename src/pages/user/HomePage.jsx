import Navbar from '../../Components/shared/Navbar';
import Slider from '../../Components/shared/Slider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from '../../Components/shared/Carousel';

function HomePage() {
  return (
    <>
      <Carousel />
      <Slider />
    </>
  );
}

export default HomePage;