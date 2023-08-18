import React from "react";

const Home = () => {
  return (
    <>
      {/* <!-- ======= Hero Section ======= --> */}
      <section id="hero" className="hero d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <h2 data-aos="fade-up">
                Evaluate candidates quickly, affordably, and accurately.
              </h2>
              <blockquote data-aos="fade-up" data-aos-delay="100">
                <p>
                  The #1 platform for technical assessments, interviews, and
                  take-home projects. All plans include unlimited candidates and
                  admins.
                </p>
              </blockquote>
              <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                <a href="#about" className="btn-get-started">
                  Get Started
                </a>
                <a
                  href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                  className="glightbox btn-watch-video d-flex align-items-center"
                >
                  <i className="bi bi-play-circle"></i>
                  <span>Watch Video</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Hero Section --> */}

      <main id="main">
        {/* <!-- ======= Why Choose Us Section ======= --> */}
        <section id="why-us" className="why-us">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>Why Choose Us</h2>
            </div>

            <div className="row g-0" data-aos="fade-up" data-aos-delay="200">
              <div
                className="col-xl-5 img-bg"
                style={{ backgroundImage: 'url("assets/img/why-us-bg.jpg")' }}
              ></div>
              <div className="col-xl-7 slides  position-relative">
                <div className="slides-1 swiper">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="item">
                        <h3 className="mb-3">
                          Powerful evaluation capabilities for every stage of
                          the hiring process
                        </h3>
                        <h4 className="mb-3">
                          Accelerate remote and in-person hiring with our
                          end-to-end platform
                        </h4>
                        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, ipsam perferendis asperiores explicabo vel tempore velit totam, natus nesciunt accusantium dicta quod quibusdam ipsum maiores nobis non, eum. Ullam reiciendis dignissimos laborum aut, magni voluptatem velit doloribus quas sapiente optio.</p> */}
                      </div>
                    </div>
                    {/* <!-- End slide item --> */}

                    <div className="swiper-slide">
                      <div className="item">
                        <h3 className="mb-3">
                          Unde perspiciatis ut repellat dolorem
                        </h3>
                        <h4 className="mb-3">
                          Amet cumque nam sed voluptas doloribus iusto. Dolorem
                          eos aliquam quis.
                        </h4>
                        <p>
                          Dolorem quia fuga consectetur voluptatem. Earum
                          consequatur nulla maxime necessitatibus cum accusamus.
                          Voluptatem dolorem ut numquam dolorum delectus autem
                          veritatis facilis. Et ea ut repellat ea. Facere est
                          dolores fugiat dolor.
                        </p>
                      </div>
                    </div>
                    {/* <!-- End slide item --> */}

                    <div className="swiper-slide">
                      <div className="item">
                        <h3 className="mb-3">Aliquid non alias minus</h3>
                        <h4 className="mb-3">
                          Necessitatibus voluptatibus explicabo dolores a vitae
                          voluptatum.
                        </h4>
                        <p>
                          Neque voluptates aut. Soluta aut perspiciatis porro
                          deserunt. Voluptate ut itaque velit. Aut consectetur
                          voluptatem aspernatur sequi sit laborum. Voluptas enim
                          dolorum fugiat aut.
                        </p>
                      </div>
                    </div>
                    {/* <!-- End slide item --> */}

                    <div className="swiper-slide">
                      <div className="item">
                        <h3 className="mb-3">
                          Necessitatibus suscipit non voluptatem quibusdam
                        </h3>
                        <h4 className="mb-3">
                          Tempora quos est ut quia adipisci ut voluptas.
                          Deleniti laborum soluta nihil est. Eum similique neque
                          autem ut.
                        </h4>
                        <p>
                          Ut rerum et autem vel. Et rerum molestiae aut sit vel
                          incidunt sit at voluptatem. Saepe dolorem et sed
                          voluptate impedit. Ad et qui sint at qui animi animi
                          rerum.
                        </p>
                      </div>
                    </div>
                    {/* <!-- End slide item --> */}
                  </div>
                  <div className="swiper-pagination"></div>
                </div>
                {/* <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div> */}
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Why Choose Us Section --> */}

        {/* <!-- ======= Our Services Section ======= --> */}
        <section id="services-list" className="services-list">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>Our Services</h2>
            </div>

            <div className="row gy-5">
              <div
                className="col-lg-4 col-md-6 service-item d-flex"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="icon flex-shrink-0">
                  <i
                    className="bi bi-briefcase"
                    style={{ color: "#f57813" }}
                  ></i>
                </div>
                <div>
                  <h4 className="title">
                    <a href="#" className="stretched-link">
                      Lorem Ipsum
                    </a>
                  </h4>
                  <p className="description">
                    Voluptatum deleniti atque corrupti quos dolores et quas
                    molestias excepturi sint occaecati cupiditate non provident
                  </p>
                </div>
              </div>
              {/* <!-- End Service Item --> */}

              <div
                className="col-lg-4 col-md-6 service-item d-flex"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="icon flex-shrink-0">
                  <i
                    className="bi bi-card-checklist"
                    style={{ color: "#15a04a" }}
                  ></i>
                </div>
                <div>
                  <h4 className="title">
                    <a href="#" className="stretched-link">
                      Dolor Sitema
                    </a>
                  </h4>
                  <p className="description">
                    Minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat tarad limino ata
                  </p>
                </div>
              </div>
              {/* <!-- End Service Item --> */}

              <div
                className="col-lg-4 col-md-6 service-item d-flex"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="icon flex-shrink-0">
                  <i
                    className="bi bi-bar-chart"
                    style={{ color: "#d90769" }}
                  ></i>
                </div>
                <div>
                  <h4 className="title">
                    <a href="#" className="stretched-link">
                      Sed ut perspiciatis
                    </a>
                  </h4>
                  <p className="description">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </p>
                </div>
              </div>
              {/* <!-- End Service Item --> */}

              <div
                className="col-lg-4 col-md-6 service-item d-flex"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="icon flex-shrink-0">
                  <i
                    className="bi bi-binoculars"
                    style={{ color: "#15bfbc" }}
                  ></i>
                </div>
                <div>
                  <h4 className="title">
                    <a href="#" className="stretched-link">
                      Magni Dolores
                    </a>
                  </h4>
                  <p className="description">
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum
                  </p>
                </div>
              </div>
              {/* <!-- End Service Item --> */}

              <div
                className="col-lg-4 col-md-6 service-item d-flex"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="icon flex-shrink-0">
                  <i
                    className="bi bi-brightness-high"
                    style={{ color: "#f5cf13" }}
                  ></i>
                </div>
                <div>
                  <h4 className="title">
                    <a href="#" className="stretched-link">
                      Nemo Enim
                    </a>
                  </h4>
                  <p className="description">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                  </p>
                </div>
              </div>
              {/* <!-- End Service Item --> */}

              <div
                className="col-lg-4 col-md-6 service-item d-flex"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="icon flex-shrink-0">
                  <i
                    className="bi bi-calendar4-week"
                    style={{ color: "#1335f5" }}
                  ></i>
                </div>
                <div>
                  <h4 className="title">
                    <a href="#" className="stretched-link">
                      Eiusmod Tempor
                    </a>
                  </h4>
                  <p className="description">
                    Et harum quidem rerum facilis est et expedita distinctio.
                    Nam libero tempore, cum soluta nobis est eligendi
                  </p>
                </div>
              </div>
              {/* <!-- End Service Item --> */}
            </div>
          </div>
        </section>
        {/* <!-- End Our Services Section --> */}

        {/* <!-- ======= Call To Action Section ======= --> */}
        <section id="call-to-action" className="call-to-action">
          <div className="container" data-aos="fade-up">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <h3>Ut fugiat aliquam aut non</h3>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident.
                </p>
                <a className="cta-btn" href="#">
                  Call To Action
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Call To Action Section --> */}

        {/* <!-- ======= Features Section ======= --> */}
        <section id="features" className="features">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div className="col-lg-7" data-aos="fade-up" data-aos-delay="100">
                <h3>
                  Powerful Features for <br />
                  Your Business
                </h3>

                <div className="row gy-4">
                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i
                        className="ri-store-line"
                        style={{ color: "#ffbb2c" }}
                      ></i>
                      <span>Easy Cart Features</span>
                    </div>
                  </div>
                  {/* <!-- End Icon List Item--> */}

                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i
                        className="ri-bar-chart-box-line"
                        style={{ color: "#5578ff" }}
                      ></i>
                      <span>Sit amet consectetur adipisicing</span>
                    </div>
                  </div>
                  {/* <!-- End Icon List Item--> */}

                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i
                        className="ri-calendar-todo-line"
                        style={{ color: "#e80368" }}
                      ></i>
                      <span>Ipsum Rerum Explicabo</span>
                    </div>
                  </div>
                  {/* <!-- End Icon List Item--> */}

                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i
                        className="ri-paint-brush-line"
                        style={{ color: "#e361ff" }}
                      ></i>
                      <span>Easy Cart Features</span>
                    </div>
                  </div>
                  {/* <!-- End Icon List Item--> */}

                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i
                        className="ri-database-2-line"
                        style={{ color: "#47aeff" }}
                      ></i>
                      <span>Easy Cart Features</span>
                    </div>
                  </div>
                  {/* <!-- End Icon List Item--> */}

                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i
                        className="ri-gradienter-line"
                        style={{ color: "#ffa76e" }}
                      ></i>
                      <span>Sit amet consectetur adipisicing</span>
                    </div>
                  </div>
                  {/* <!-- End Icon List Item--> */}

                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i
                        className="ri-file-list-3-line"
                        style={{ color: "#11dbcf" }}
                      ></i>
                      <span>Ipsum Rerum Explicabo</span>
                    </div>
                  </div>
                  {/* <!-- End Icon List Item--> */}

                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i
                        className="ri-base-station-line"
                        style={{ color: "#ff5828" }}
                      ></i>
                      <span>Easy Cart Features</span>
                    </div>
                  </div>
                  {/* <!-- End Icon List Item--> */}
                </div>
              </div>
              <div
                className="col-lg-5 position-relative"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="phone-wrap">
                  <img
                    src="assets/img/iphone.png"
                    alt="Image"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="details">
            <div className="container" data-aos="fade-up" data-aos-delay="300">
              <div className="row">
                <div className="col-md-6">
                  <h4>
                    Labore Sdio Lidui
                    <br />
                    Bonde Naruto
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Numquam nostrum molestias doloremque quae delectus odit
                    minima corrupti blanditiis quo animi!
                  </p>
                  <a href="#about" className="btn-get-started">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Features Section --> */}

        {/* <!-- ======= Recent Blog Posts Section ======= --> */}
        <section id="recent-posts" className="recent-posts">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>Recent Blog Posts</h2>
            </div>

            <div className="row gy-5">
              <div
                className="col-xl-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="post-box">
                  <div className="post-img">
                    <img
                      src="assets/img/blog/blog-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="meta">
                    <span className="post-date">Tue, December 12</span>
                    <span className="post-author"> / Julia Parker</span>
                  </div>
                  <h3 className="post-title">
                    Eum ad dolor et. Autem aut fugiat debitis
                  </h3>
                  <p>
                    Illum voluptas ab enim placeat. Adipisci enim velit nulla.
                    Vel omnis laudantium. Asperiores eum ipsa est officiis. Modi
                    qui magni est...
                  </p>
                  <a
                    href="blog-details.html"
                    className="readmore stretched-link"
                  >
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>

              <div
                className="col-xl-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="post-box">
                  <div className="post-img">
                    <img
                      src="assets/img/blog/blog-2.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="meta">
                    <span className="post-date">Fri, September 05</span>
                    <span className="post-author"> / Mario Douglas</span>
                  </div>
                  <h3 className="post-title">
                    Et repellendus molestiae qui est sed omnis
                  </h3>
                  <p>
                    Voluptatem nesciunt omnis libero autem tempora enim ut ipsam
                    id. Odit quia ab eum assumenda. Quisquam omnis doloribus...
                  </p>
                  <a
                    href="blog-details.html"
                    className="readmore stretched-link"
                  >
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>

              <div
                className="col-xl-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="post-box">
                  <div className="post-img">
                    <img
                      src="assets/img/blog/blog-3.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="meta">
                    <span className="post-date">Tue, July 27</span>
                    <span className="post-author"> / Lisa Hunter</span>
                  </div>
                  <h3 className="post-title">Quia assumenda est et veritati</h3>
                  <p>
                    Quia nam eaque omnis explicabo similique eum quaerat
                    similique laboriosam. Quis omnis repellat sed quae
                    consectetur magnam...
                  </p>
                  <a
                    href="blog-details.html"
                    className="readmore stretched-link"
                  >
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>

              <div
                className="col-xl-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="post-box">
                  <div className="post-img">
                    <img
                      src="assets/img/blog/blog-4.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="meta">
                    <span className="post-date">Tue, Sep 16</span>
                    <span className="post-author"> / Mario Douglas</span>
                  </div>
                  <h3 className="post-title">
                    Pariatur quia facilis similique deleniti
                  </h3>
                  <p>
                    Et consequatur eveniet nam voluptas commodi cumque ea est
                    ex. Aut quis omnis sint ipsum earum quia eligendi...
                  </p>
                  <a
                    href="blog-details.html"
                    className="readmore stretched-link"
                  >
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Recent Blog Posts Section --> */}
      </main>
      {/* <!-- End #main --> */}
    </>
  );
};

export default Home;
