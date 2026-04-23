import React from "react";

const DownloadApkSection = () => {
  return (
    <>
      <section className="py-5 my-5">
        <div className="container-fluid">
          <div
            className="bg-warning py-5 rounded-5"
            style={{
              backgroundImage: "url('images/bg-pattern-2.png')",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  {/* <img src="assets/images/phone.png" alt="phone" className="image-float img-fluid" /> */}
                </div>
                <div className="col-md-8">
                  <h2 className="my-5">Shop & Earn with the Feel Safe App</h2>
                  <p>
                    Carry your business in your pocket. Use the Feel Safe App to
                    order your monthly essentials in seconds and track your
                    10-level matrix earnings in real-time. Whether you’re a busy
                    parent or a growing entrepreneur, staying protected and
                    profitable has never been easier.
                  </p>
                  <div className="d-flex gap-2 flex-wrap">
                    <img src="assets/images/app-store.jpg" alt="app-store" />
                    <img
                      src="assets/images/google-play.jpg"
                      alt="google-play"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DownloadApkSection;
