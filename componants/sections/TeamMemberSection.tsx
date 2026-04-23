"use client";
import React from 'react';
import Link from 'next/link';

const TeamMemberSection = () => {
  const teamMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      title: 'Chairman & Founder',
      image: '/assets/images/reviewer-1.jpg',
      bio: 'Visionary leader with 20+ years in direct selling. Built multiple successful MLM networks across India.'
    },
    {
      name: 'Priya Sharma',
      title: 'CEO',
      image: '/assets/images/reviewer-2.jpg',
      bio: 'Dynamic executive driving 100%+ YoY growth. Expert in compliance and distributor empowerment.'
    },
    {
      name: 'Amit Patel',
      title: 'Chief Marketing Officer',
      image: '/assets/images/reviewer-3.jpg',
      bio: 'Digital marketing guru scaling networks through innovative strategies and partnerships.'
    },
    {
      name: 'Neha Gupta',
      title: 'Director - Operations',
      image: '/assets/images/reviewer-1.jpg',
      bio: 'Manages seamless logistics for 10-level matrix. Ensures timely payouts and product delivery.'
    },
    {
      name: 'Vikram Singh',
      title: 'Head of Distributor Success',
      image: '/assets/images/reviewer-2.jpg',
      bio: 'Trains new members to build teams and maximize commissions. 10x growth specialist.'
    },
    {
      name: 'Sunita Rao',
      title: 'Finance Director',
      image: '/assets/images/reviewer-3.jpg',
      bio: 'Oversees transparent TDS-compliant payouts. Financial architect for sustainable growth.'
    }
  ];

  return (
    <>
      <section className="py-5 bg-light">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center mb-5">
              <h2 className="display-5 fw-bold text-dark mb-3">Our Leadership Team</h2>
              <p className="lead text-muted">Meet the experts powering your MLM success across 10 levels</p>
            </div>
            <div className="team-slider-wrapper">
              <div className="d-flex flex-nowrap gap-3 team-slider overflow-auto pb-3" style={{scrollSnapType: 'x mandatory'}}>
                {teamMembers.map((member, index) => (
                  <div className="flex-shrink-0 team-card text-center p-4 border rounded-3 shadow-sm hover-shadow-lg" style={{minWidth: '100%', maxWidth: '100%', scrollSnapAlign: 'start'}} key={index}>
                    <div className="member-image mb-4 mx-auto">
                      <img 
                        src={member.image} 
                        className="rounded-circle img-fluid shadow" 
                        style={{width: '140px', height: '140px', objectFit: 'cover'}}
                        alt={member.name}
                      />
                    </div>
                    <h6 className="fw-bold text-dark mb-2 fs-5">{member.name}</h6>
                    <h6 className="text-brand-pink mb-3 fw-semibold fs-6">{member.title}</h6>
                    <p className="text-muted small mb-3">{member.bio}</p>
                    <Link href="/about-us" className="btn btn-primary btn-sm px-4">
                      Learn More
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <style jsx>{`
              .team-slider {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .team-slider::-webkit-scrollbar {
                display: none;
              }
              @media (min-width: 768px) {
                .team-slider {
                  overflow: visible !important;
                }
                .team-slider {
                  flex-wrap: wrap !important;
                  justify-content: flex-start !important;
                }
                .team-card {
                  min-width: calc(33.333% - 0.75rem) !important;
                  max-width: calc(33.333% - 0.75rem) !important;
                  scrollSnapAlign: none !important;
                }
              }
              @media (min-width: 1200px) {
                .team-card {
                  min-width: calc(33.333% - 0.75rem) !important;
                  max-width: calc(33.333% - 0.75rem) !important;
                }
              }
              .team-card {
                transition: all 0.3s ease;
              }
              .team-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 15px 40px rgba(0,0,0,0.15) !important;
                background-image: linear-gradient(45deg, rgb(141, 198, 63), 1%, rgb(142, 227, 255), 60%, rgb(228, 165, 197)) !important;
              }
            `}</style>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamMemberSection;

