"use client";
import React from 'react'

const RecentBlogSection = () => {
  const blogs = [
    {
      image: './assets/images/blog/632.png',
      date: '22 Aug 2021',
      category: 'tips & tricks',
      title: 'Top 10 casual look ideas to dress up your kids',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...'
    },
    {
      image: './assets/images/blog/632.png',
      date: '25 Aug 2021',
      category: 'trending',
      title: 'Latest trends of wearing street wears supremely',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...'
    },
    {
      image: './assets/images/blog/632.png',
      date: '28 Aug 2021',
      category: 'inspiration',
      title: '10 Different Types of comfortable clothes ideas for women',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...'
    }
  ];

  return (
    <>
    <section id="latest-blog" className="py-5">
      <div className="container-fluid">
        <div className="row">
          <div className="section-header d-flex align-items-center justify-content-between my-5">
            <h2 className="section-title">Our Recent Blog</h2>
            <div className="btn-wrap align-right">
              <a href="#" className="d-flex align-items-center nav-link">Read All Articles <svg width="24" height="24"><use xlinkHref="#arrow-right"></use></svg></a>
            </div>
          </div>
        </div>
        <div className="blog-slider-wrapper">
          <div className="d-flex flex-nowrap gap-3 blog-slider overflow-auto pb-3" style={{scrollSnapType: 'x mandatory'}}>
            {blogs.map((blog, index) => (
              <div className="flex-shrink-0 blog-card" style={{minWidth: '100%', maxWidth: '100%', scrollSnapAlign: 'start'}} key={index}>
                <article className="post-item card border-0 shadow-sm h-100">
                  <div className="image-holder zoom-effect">
                    <a href="#">
                      <img src={blog.image} alt="post" className="card-img-top" />
                    </a>
                  </div>
                  <div className="card-body d-flex flex-column p-3">
                    <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center flex-shrink-0">
                      <div className="meta-date"><svg width="16" height="16"><use xlinkHref="#calendar"></use></svg>{blog.date}</div>
                      <div className="meta-categories"><svg width="16" height="16"><use xlinkHref="#category"></use></svg>{blog.category}</div>
                    </div>
                    <div className="post-header flex-grow-1 d-flex flex-column">
                      <h3 className="post-title flex-grow-1">
                        <a href="#" className="text-decoration-none">{blog.title}</a>
                      </h3>
                      <p className="text-muted small mt-auto mb-0">{blog.excerpt}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          .blog-slider {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .blog-slider::-webkit-scrollbar {
            display: none;
          }
          @media (min-width: 768px) {
            .blog-slider {
              overflow: visible !important;
            }
            .blog-slider {
              flex-wrap: wrap !important;
              justify-content: flex-start !important;
              gap: 1.5rem !important;
            }
            .blog-card {
              min-width: calc(33.333% - 1rem) !important;
              max-width: calc(33.333% - 1rem) !important;
              scrollSnapAlign: none !important;
            }
          }
          @media (min-width: 1200px) {
            .blog-card {
              min-width: calc(33.333% - 1rem) !important;
              max-width: calc(33.333% - 1rem) !important;
            }
          }
        `}</style>
      </div>
    </section>
    </>
  )
}
export default RecentBlogSection