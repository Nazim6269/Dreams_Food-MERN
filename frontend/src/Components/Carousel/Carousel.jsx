//import ExampleCarouselImage from "components/ExampleCarouselImage";
import Carousel from "react-bootstrap/Carousel";

const CarouselDiv = () => {
  return (
    <Carousel>
      {/* first item */}
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          style={{
            filter: "brightness(30%)",
            objectFit: "contain !important",
          }}
          src="https://source.unsplash.com/random/900×700/?pastry"
          alt="First slide"
        />
      </Carousel.Item>
      {/* second item */}
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100 "
          style={{
            filter: "brightness(30%)",
            objectFit: "contain !important",
          }}
          src="https://source.unsplash.com/random/900×700/?barbeque"
          alt="Second slide"
        />
      </Carousel.Item>
      {/* third item */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{
            filter: "brightness(30%)",
            objectFit: "contain !important",
          }}
          src="https://source.unsplash.com/random/900×700/?pizza"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselDiv;
