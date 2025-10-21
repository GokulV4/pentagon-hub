import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePayment } from '../../contexts/PaymentContext';
import AttendanceTracker from '../../components/AttendanceTracker';
import { 
  Clock, 
  Calendar, 
  Users, 
  Award, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle,
  BookOpen,
  Plus,
  Settings,
  History,
  DollarSign
} from 'lucide-react';

const MemberDashboard = () => {
  const { user } = useAuth();
  const { getMemberPayments, getPendingPayments } = usePayment();
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [recentPayment, setRecentPayment] = useState(null);

  useEffect(() => {
    if (user) {
      const payments = getMemberPayments(user.id);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      // Check if user has paid for current month
      const currentMonthPayment = payments.find(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate.getMonth() === currentMonth && 
               paymentDate.getFullYear() === currentYear;
      });
      
      setPaymentStatus(currentMonthPayment ? 'paid' : 'pending');
      setRecentPayment(currentMonthPayment);
    }
  }, [user, getMemberPayments]);

  const stats = [
    { 
      name: 'Total Sessions', 
      value: '24', 
      change: '+12%', 
      changeType: 'positive',
      icon: Clock,
      color: '#3b82f6'
    },
    { 
      name: 'Hours Skated', 
      value: '48.5', 
      change: '+8%', 
      changeType: 'positive',
      icon: Clock,
      color: '#10b981'
    },
    { 
      name: 'Lessons Taken', 
      value: '6', 
      change: '+2', 
      changeType: 'positive',
      icon: Award,
      color: '#8b5cf6'
    },
    { 
      name: 'Events Attended', 
      value: '3', 
      change: '+1', 
      changeType: 'positive',
      icon: Users,
      color: '#f59e0b'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'session', title: 'Evening Skate Session', time: '2 hours ago', duration: '2h 15m' },
    { id: 2, type: 'lesson', title: 'Advanced Techniques Class', time: '1 day ago', instructor: 'Sarah Johnson' },
    { id: 3, type: 'event', title: 'Friday Night Jam', time: '3 days ago', participants: '45 skaters' },
    { id: 4, type: 'session', title: 'Morning Practice', time: '1 week ago', duration: '1h 30m' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Beginner Workshop', date: 'Tomorrow', time: '10:00 AM', instructor: 'Mike Chen' },
    { id: 2, title: 'Speed Skating Competition', date: 'Next Saturday', time: '2:00 PM', location: 'Main Rink' },
    { id: 3, title: 'Family Skate Night', date: 'Next Friday', time: '7:00 PM', price: '$15' }
  ];

  const getActivityIcon = (type) => {
    const iconStyle = {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    };

    switch (type) {
      case 'session':
        return (
          <div style={{ ...iconStyle, background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
            <Clock size={16} />
          </div>
        );
      case 'lesson':
        return (
          <div style={{ ...iconStyle, background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
            <Award size={16} />
          </div>
        );
      case 'event':
        return (
          <div style={{ ...iconStyle, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
            <Users size={16} />
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' };
      case 'pending':
        return { bg: '#fef3c7', text: '#92400e', border: '#fde68a' };
      default:
        return { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' };
    }
  };

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
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '4px'
              }}>
                Welcome back, {user?.name || 'Member'}!
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                Here's what's happening with your skating journey
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link 
                to="/blog" 
                style={{
                  background: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                }}
              >
                <BookOpen size={16} />
                View Blog
              </Link>
              <Link 
                to="/payment" 
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                }}
              >
                <CreditCard size={16} />
                {paymentStatus === 'paid' ? 'Payment History' : 'Pay Monthly Fee'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Payment Status Alert */}
        {paymentStatus === 'pending' && (
          <div style={{
            background: getStatusColor(paymentStatus).bg,
            border: `2px solid ${getStatusColor(paymentStatus).border}`,
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <AlertTriangle size={24} style={{ color: getStatusColor(paymentStatus).text }} />
            <div>
              <div style={{
                fontWeight: '600',
                color: getStatusColor(paymentStatus).text,
                fontSize: '1.1rem',
                marginBottom: '4px'
              }}>
                Monthly Payment Due
              </div>
              <div style={{
                color: getStatusColor(paymentStatus).text,
                opacity: 0.8,
                fontSize: '0.9rem'
              }}>
                Your monthly membership fee is pending. Click "Pay Monthly Fee" to complete payment.
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
                    {stat.name}
                  </p>
                  <p style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937' }}>
                    {stat.value}
                  </p>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}CC 100%)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div style={{
                marginTop: '12px',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: stat.changeType === 'positive' ? '#10b981' : '#ef4444'
              }}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Attendance Tracker */}
          <AttendanceTracker />

          {/* Recent Activities */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>
                Recent Activities
              </h3>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {recentActivities.map((activity) => (
                  <div key={activity.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }}>
                    {getActivityIcon(activity.type)}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.9rem' }}>
                        {activity.title}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '4px' }}>
                        {activity.time} • {activity.duration || activity.instructor || activity.participants}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', marginTop: '32px' }}>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Upcoming Events */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '24px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>
                  Upcoming Events
                </h3>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {upcomingEvents.map((event) => (
                    <div key={event.id} style={{
                      padding: '16px',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      borderLeft: '4px solid #667eea'
                    }}>
                      <h4 style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.9rem', marginBottom: '4px' }}>
                        {event.title}
                      </h4>
                      <p style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: '4px' }}>
                        {event.date} • {event.time}
                      </p>
                      <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                        {event.instructor || event.location || event.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '24px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>
                  Quick Actions
                </h3>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button style={{
                  width: '100%',
                  background: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }} onMouseOver={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                }} onMouseOut={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                }}>
                  <Clock size={16} />
                  Book a Session
                </button>
                <button style={{
                  width: '100%',
                  background: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }} onMouseOver={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                }} onMouseOut={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                }}>
                  <Award size={16} />
                  Schedule Lesson
                </button>
                <button style={{
                  width: '100%',
                  background: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }} onMouseOver={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                }} onMouseOut={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                }}>
                  <Calendar size={16} />
                  View Schedule
                </button>
                <button style={{
                  width: '100%',
                  background: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }} onMouseOver={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                }} onMouseOut={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                }}>
                  <Settings size={16} />
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard; 