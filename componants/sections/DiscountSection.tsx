import React from "react";

const DiscountSection = () => {
  return (
    <>
      <section className="py-5">
        <div className="container-fluid">
          <div
            className=" py-5 my-5 rounded-5"
            style={{
              // backgroundImage:
              //   "url('./assets/images/bg-leaves-img-pattern.png')",
              backgroundRepeat: "no-repeat",
              backgroundImage:
                "linear-gradient(45deg, #8DC63F, 1%, #8ee3ff,  60%, #e4a5c5)",
            }}
          >
            <div className="container my-md-5">
              <div className="row">
                <div className="col-md-6 p-md-5">
                  <div className="section-header">
                    <h2 className="section-title display-4">
                      Share the <span className="text-primary">Care.</span>{" "}
                      Build Your <span className="text-primary">Future</span>
                    </h2>
                  </div>
                  <p>
                    Why just buy when you can earn? Join the Feel Safe Co.
                    Ambassador Program. Share our premium pads and diapers with
                    your community and build a recurring income stream.
                  </p>
                </div>
                <div className="col-md-6 p-md-5">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="name"
                        id="name"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        name="email"
                        id="email"
                        placeholder="abc@mail.com"
                      />
                    </div>
                    <div className="form-check form-check-inline mb-3">
                      <label className="form-check-label" htmlFor="subscribe">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="subscribe"
                          value="subscribe"
                        />
                        Subscribe to the newsletter
                      </label>
                    </div>
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-dark btn-lg">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DiscountSection;
