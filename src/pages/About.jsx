import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Award, Heart, Clock, Shield, ChevronRight, Sparkles } from 'lucide-react';

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  const stats = [
    { icon: Users, number: '500+', label: 'Active Members' },
    { icon: Award, number: '50+', label: 'Championships Won' },
    { icon: Clock, number: '5+', label: 'Years Experience' },
    { icon: Heart, number: '100%', label: 'Community Love' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide a safe, fun, and inclusive environment where people of all ages can learn, practice, and enjoy the sport of roller skating while building lasting friendships and memories.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'We prioritize the safety of all our members with certified instructors, quality equipment, and well-maintained facilities. Every skater\'s wellbeing is our top concern.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Pentagon Roller Skating Hub is more than just a skating rink - it\'s a community where friendships are formed, skills are developed, and memories are made for life.'
    }
  ];

  const achievements = [
    {
      year: '2024',
      title: 'Regional Championship Winners',
      description: 'Our competitive team won first place in the regional roller skating championships.'
    },
    {
      year: '2023',
      title: 'Community Service Award',
      description: 'Recognized for our outreach programs teaching skating to underprivileged children.'
    },
    {
      year: '2022',
      title: 'Facility Upgrade',
      description: 'Completed major renovations including new flooring, lighting, and sound system.'
    },
    {
      year: '2021',
      title: 'Safety Excellence',
      description: 'Achieved perfect safety record with zero major incidents for the entire year.'
    }
  ];
  const scrollToStory = () => {
  const storySection = document.getElementById("story");
  if (storySection) {
    storySection.scrollIntoView({ behavior: "smooth" });
  }
};

  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Image with Overlays */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/boots.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.3) blur(1px)'
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(102,126,234,0.3), rgba(0,0,0,0.8))'
        }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              marginBottom: '32px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white'
            }}>
              <Sparkles size={16} color="#fbbf24" />
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Established 2019</span>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: '900',
              marginBottom: '24px',
              lineHeight: '1.1',
              color: 'white'
            }}>
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(167,139,250,0.5))'
              }}>
                About Pentagon
              </span>
              <span style={{
                display: 'block',
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                marginTop: '16px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Roller Skating Hub
              </span>
            </h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              color: '#e5e7eb',
              maxWidth: '800px',
              margin: '0 auto 48px',
              lineHeight: '1.6'
            }}>
              Since our founding, we've been dedicated to creating the ultimate roller skating experience for our community.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button onClick={scrollToStory} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '1.125rem',
                boxShadow: '0 10px 40px rgba(102,126,234,0.4)',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
              }} onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(102,126,234,0.6)';
              }} onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(102,126,234,0.4)';
              }}>
                Learn Our Story
                <ChevronRight size={20} />
              </button>
              
              <Link to="/register" style={{
                padding: '16px 32px',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '1.125rem',
                border: '2px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease'
              }} onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }} onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}>
                Join Today
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ padding: '80px 24px', position: 'relative' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px'
            }}>
              {stats.map((stat, index) => (
                <div key={index} style={{
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px)',
                  padding: '40px 20px',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(167,139,250,0.5)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(167,139,250,0.3)';
                }} onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                    borderRadius: '16px',
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 10px 30px rgba(167,139,250,0.4)'
                  }}>
                    <stat.icon size={32} />
                  </div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '8px'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: '#d1d5db',
                    fontWeight: '600'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section id="story" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth > 1024 ? '1fr 1fr' : '1fr',
              gap: '60px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: 'rgba(167,139,250,0.2)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '50px',
                  border: '1px solid rgba(167,139,250,0.3)',
                  marginBottom: '24px'
                }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    OUR JOURNEY
                  </span>
                </div>
                
                <h2 style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: '900',
                  marginBottom: '24px',
                  background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1.2'
                }}>
                  Our Story
                </h2>
                
                <p style={{
                  fontSize: '1.125rem',
                  color: '#e5e7eb',
                  lineHeight: '1.8',
                  marginBottom: '20px'
                }}>
                  Pentagon Roller Skating Hub was born from a simple dream: to create a place where 
                  the joy of roller skating could be shared by everyone. What started as a small 
                  community initiative has grown into the premier skating destination in our region.
                </p>
                
                <p style={{
                  fontSize: '1.125rem',
                  color: '#e5e7eb',
                  lineHeight: '1.8',
                  marginBottom: '32px'
                }}>
                  Today, we're proud to serve hundreds of families, host competitive events, and 
                  provide a safe space for people of all ages to discover their passion for skating.
                </p>
                
                <Link to="/register" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  color: '#1f2937',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: '700',
                  fontSize: '1.125rem',
                  boxShadow: '0 10px 30px rgba(251,191,36,0.4)',
                  transition: 'all 0.3s ease'
                }} onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(251,191,36,0.6)';
                }} onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(251,191,36,0.4)';
                }}>
                  Join Our Story
                  <ChevronRight size={20} />
                </Link>
              </div>
              
              <div style={{
                background: 'rgba(167,139,250,0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '60px 40px',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  fontSize: '6rem',
                  marginBottom: '24px',
                  filter: 'drop-shadow(0 10px 30px rgba(251,191,36,0.3))'
                }}>
                  🛼
                </div>
                <h3 style={{
                  fontSize: '2.5rem',
                  fontWeight: '900',
                  marginBottom: '16px',
                  color: 'white'
                }}>
                  Since 2019
                </h3>
                <p style={{
                  color: '#d1d5db',
                  fontSize: '1.125rem',
                  lineHeight: '1.6'
                }}>
                  Building memories and creating champions, one roll at a time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: '900',
                marginBottom: '24px',
                background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Our Values
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: '#e5e7eb',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                The principles that guide everything we do at Pentagon Roller Skating Hub.
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px'
            }}>
              {values.map((value, index) => (
                <div key={index} style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  padding: '40px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(167,139,250,0.5)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(167,139,250,0.3)';
                }} onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                    borderRadius: '16px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 10px 30px rgba(167,139,250,0.4)'
                  }}>
                    <value.icon size={32} />
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '16px',
                    color: 'white'
                  }}>
                    {value.title}
                  </h3>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.6'
                  }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: '900',
                marginBottom: '24px',
                background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Our Achievements
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: '#e5e7eb',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                Milestones and accomplishments that make us proud.
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {achievements.map((achievement, index) => (
                <div key={index} style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  padding: '32px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderLeft: '4px solid #fbbf24',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 15px 50px rgba(251,191,36,0.3)';
                }} onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '900',
                    color: '#fbbf24',
                    marginBottom: '12px'
                  }}>
                    {achievement.year}
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    marginBottom: '12px',
                    color: 'white'
                  }}>
                    {achievement.title}
                  </h3>
                  <p style={{
                    color: '#d1d5db',
                    lineHeight: '1.6'
                  }}>
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: '100px 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              background: 'rgba(167,139,250,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '32px',
              padding: '60px 40px',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: '900',
                marginBottom: '24px',
                color: 'white'
              }}>
                Ready to Join Our Community?
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: '#e5e7eb',
                marginBottom: '40px',
                maxWidth: '600px',
                margin: '0 auto 40px'
              }}>
                Become part of the Pentagon family and start your skating journey today!
              </p>
              
              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <Link to="/register" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  color: '#1f2937',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: '700',
                  fontSize: '1.125rem',
                  boxShadow: '0 10px 30px rgba(251,191,36,0.4)',
                  transition: 'all 0.3s ease'
                }} onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(251,191,36,0.6)';
                }} onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(251,191,36,0.4)';
                }}>
                  Join Today
                  <ChevronRight size={20} />
                </Link>
                
                <Link to="/contact" style={{
                  padding: '16px 32px',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: '700',
                  fontSize: '1.125rem',
                  border: '2px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease'
                }} onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }} onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div style={{ height: '80px' }} />
      </div>
    </div>
  );
};

export default About;