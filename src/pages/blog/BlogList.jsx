import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - in a real app, this would come from an API
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'tips', name: 'Skating Tips' },
    { id: 'events', name: 'Events' },
    { id: 'equipment', name: 'Equipment' },
    { id: 'community', name: 'Community' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Essential Safety Tips for Beginner Skaters',
      excerpt: 'Learn the fundamental safety practices that every new skater should know before hitting the rink.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      category: 'tips',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Choosing the Right Roller Skates for Your Style',
      excerpt: 'A comprehensive guide to selecting the perfect pair of roller skates based on your skating style and experience level.',
      author: 'Mike Chen',
      date: '2024-01-12',
      category: 'equipment',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Upcoming Speed Skating Competition',
      excerpt: 'Get ready for our biggest speed skating event of the year. Registration is now open for all skill levels.',
      author: 'Emma Davis',
      date: '2024-01-10',
      category: 'events',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'Building a Strong Skating Community',
      excerpt: 'Discover how our skating community has grown and the amazing friendships formed on the rink.',
      author: 'Alex Thompson',
      date: '2024-01-08',
      category: 'community',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'Advanced Techniques for Intermediate Skaters',
      excerpt: 'Take your skating to the next level with these advanced techniques and drills.',
      author: 'Sarah Johnson',
      date: '2024-01-05',
      category: 'tips',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
    },
    {
      id: 6,
      title: 'Maintenance Guide for Your Roller Skates',
      excerpt: 'Keep your roller skates in top condition with our comprehensive maintenance guide.',
      author: 'Mike Chen',
      date: '2024-01-03',
      category: 'equipment',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: 'Inter, sans-serif', 
      backgroundImage: 'url(/bgmgif.gif)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 0 60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          width: '100px',
          height: '100px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite 2s'
        }}></div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
              <img 
                src="/LOGOTEST.png" 
                alt="Pentagon Logo" 
                style={{
                  height: '50px',
                  width: 'auto',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              />
              <h1 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: '800',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}>
                Pentagon Blog
              </h1>
            </div>
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Stay updated with the latest skating tips, events, and community stories
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Search and Filter */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ position: 'relative', flex: '1', maxWidth: '400px', width: '100%' }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '16px',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                🔍
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: 'white'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '50px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    ...(selectedCategory === category.id
                      ? {
                          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                          color: 'white',
                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                        }
                      : {
                          background: 'white',
                          color: '#6b7280',
                          border: '2px solid #e5e7eb'
                        })
                  }}
                  onMouseOver={(e) => {
                    if (selectedCategory !== category.id) {
                      e.target.style.background = '#f3f4f6';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedCategory !== category.id) {
                      e.target.style.background = 'white';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '800',
              marginBottom: '32px',
              color: '#1f2937',
              textAlign: 'center'
            }}>
              Featured Article
            </h2>
            <div style={{
              background: 'white',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                <div style={{ position: 'relative', height: '400px' }}>
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px'
                  }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '8px 16px',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      color: '#1f2937'
                    }}>
                      Featured
                    </span>
                  </div>
                </div>
                <div style={{
                  padding: '48px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '16px'
                  }}>
                    <span>{featuredPost.author}</span>
                    <span style={{ margin: '0 8px' }}>•</span>
                    <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    <span style={{ margin: '0 8px' }}>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    marginBottom: '16px',
                    color: '#1f2937',
                    lineHeight: '1.3'
                  }}>
                    {featuredPost.title}
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '32px',
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}>
                    {featuredPost.excerpt}
                  </p>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: 'white',
                      padding: '16px 32px',
                      textDecoration: 'none',
                      borderRadius: '50px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                      transition: 'all 0.3s ease',
                      alignSelf: 'flex-start'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
                    }}
                  >
                    Read More
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '800',
            marginBottom: '32px',
            color: '#1f2937',
            textAlign: 'center'
          }}>
            Latest Articles
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {filteredPosts.filter(post => !post.featured).map((post) => (
              <article key={post.id} style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease'
              }} onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-8px)';
                e.target.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
              }} onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
              }}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px'
                  }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '6px 12px',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: 'rgba(255,255,255,0.9)',
                      color: '#374151',
                      backdropFilter: 'blur(10px)'
                    }}>
                      {categories.find(cat => cat.id === post.category)?.name}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '12px'
                  }}>
                    <span>{post.author}</span>
                    <span style={{ margin: '0 8px' }}>•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span style={{ margin: '0 8px' }}>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    marginBottom: '12px',
                    color: '#1f2937',
                    lineHeight: '1.4'
                  }}>
                    {post.title}
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '20px',
                    lineHeight: '1.6',
                    fontSize: '0.875rem'
                  }}>
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.id}`}
                    style={{
                      color: '#3b82f6',
                      fontWeight: '600',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#1d4ed8'}
                    onMouseOut={(e) => e.target.style.color = '#3b82f6'}
                  >
                    Read More
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '24px',
          padding: '60px 40px',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '100px',
            height: '100px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '15%',
            width: '80px',
            height: '80px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: '800',
              marginBottom: '16px'
            }}>
              Stay Updated
            </h3>
            <p style={{
              fontSize: '1.125rem',
              opacity: 0.9,
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px',
              lineHeight: '1.6'
            }}>
              Subscribe to our newsletter to get the latest skating tips, event updates, and community stories delivered to your inbox.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: '16px 24px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.6)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
              />
              <button style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#1f2937',
                padding: '16px 32px',
                border: 'none',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)'
              }} onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 15px 40px rgba(251, 191, 36, 0.4)';
              }} onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 30px rgba(251, 191, 36, 0.3)';
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default BlogList; 