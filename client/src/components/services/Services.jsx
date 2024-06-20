import "./Services.css";

const Services = () => {
  return (
    <section className="service-container">
      <h3 className="service-head-text pb-8">Our Offers</h3>

      <div className="service-img">
        <img src=".././img4.jpg" alt="image" className="rounded-lg" />
      </div>

      <div className="service-wrapper container m-auto py-4 mb-4 gap-4 max-w-screen-lg">
        <div>
          <p className="px-2 py-2">
            As a trusted car seller, we are dedicated to helping you find the
            perfect vehicle that meets your needs and exceeds your expectations.
            Our extensive inventory includes a wide range of new and pre-owned
            cars from top manufacturers.
          </p>
          <p className="px-2 py-2">
            We also provide car service, we pride ourselves on delivering
            unparalleled automotive care to ensure your vehicle operates at its
            peak performance. Our team of certified technicians utilizes the
            latest technology and highest quality parts to guarantee reliability
            and safety on the road.
          </p>
        </div>

        <div>
          <ul className="list-disc">
            <li className="pb-2">
              Competitive pricing, and exceptional customer service ensure a
              seamless and satisfying car-buying experience.
            </li>
            <li className="pb-2">
              Experience top-notch car maintenance and repair with our expert
              team, ensuring your vehicle runs smoothly and safely on every
              journey.
            </li>
            <li className="pb-2">
              Our comprehensive range of services, from routine maintenance and
              oil changes to complex engine diagnostics and repairs, is designed
              to meet the needs of all makes and models.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
