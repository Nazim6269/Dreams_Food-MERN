//import ExampleCarouselImage from "components/ExampleCarouselImage";

const HeroSection = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Savor Every Flavor, Indulge in Culinary Delights
          </h1>
          <p className="mb-8 leading-7">
            Welcome to here, where passion meets plate. Immerse yourself in a
            world of exquisite tastes, curated with love and served with flair.
            Our culinary journey is a celebration of flavors, creating memorable
            experiences with every bite.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-pink-600 border-0 py-2 px-6 focus:outline-none  rounded text-lg">
              Get Started
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="" alt="hero" src="./foodpanda_hero.webp" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
