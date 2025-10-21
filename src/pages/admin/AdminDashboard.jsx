import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  UserPlus, 
  Plus, 
  FileText, 
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    pendingPayments: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load members from localStorage
    const membersData = JSON.parse(localStorage.getItem('pentagon_members') || '[]');
    const paymentsData = JSON.parse(localStorage.getItem('pentagon_payments') || '[]');
    
    setMembers(membersData);
    setPayments(paymentsData);
    
    // Calculate stats
    const totalMembers = membersData.length;
    const activeMembers = membersData.filter(m => m.paymentStatus === 'paid').length;
    const pendingPayments = membersData.filter(m => m.paymentStatus === 'pending').length;
    const totalRevenue = paymentsData.reduce((sum, payment) => sum + (payment.amount || 0), 0);
    
    setStats({
      totalMembers,
      activeMembers,
      pendingPayments,
      totalRevenue
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: { color: '#10b981', bg: '#dcfce7', text: '#166534' },
      pending: { color: '#f59e0b', bg: '#fef3c7', text: '#92400e' },
      active: { color: '#10b981', bg: '#dcfce7', text: '#166534' },
      inactive: { color: '#6b7280', bg: '#f3f4f6', text: '#374151' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
        background: config.bg,
        color: config.text
      }}>
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const recentMembers = members.slice(0, 5);
  const recentPayments = payments.slice(0, 5);

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
                Admin Dashboard
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                Welcome back, {user?.name || 'Admin'}! Manage your roller skating facility.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
                      <Link
                        to="/admin/blogs"
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
                        <FileText size={16} />
                        Manage Blog
                      </Link>
                      <Link
                        to="/admin/attendance"
                        style={{
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: '#10b981',
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
                          e.target.style.background = 'rgba(16, 185, 129, 0.2)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = 'rgba(16, 185, 129, 0.1)';
                        }}
                      >
                        <Users size={16} />
                        Take Attendance
                      </Link>
              <button style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }} onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
              }} onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}>
                <Plus size={16} />
                Add Event
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
                  Total Members
                </p>
                <p style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937' }}>
                  {stats.totalMembers}
                </p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <Users size={24} />
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
                  Active Members
                </p>
                <p style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937' }}>
                  {stats.activeMembers}
                </p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <CheckCircle size={24} />
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
                  Pending Payments
                </p>
                <p style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937' }}>
                  {stats.pendingPayments}
                </p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <Clock size={24} />
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
                  Total Revenue
                </p>
                <p style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937' }}>
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <DollarSign size={24} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          {/* Recent Members */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>
                Recent Members
              </h3>
              <Link 
                to="/admin/members" 
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#667eea',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.target.style.color = '#5a67d8'}
                onMouseOut={(e) => e.target.style.color = '#667eea'}
              >
                View all →
              </Link>
            </div>
            <div style={{ padding: '24px' }}>
              {recentMembers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  <Users size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                  <p>No members registered yet</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {recentMembers.map((member) => (
                    <div key={member.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px',
                      background: '#f9fafb',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: '600',
                          fontSize: '0.9rem'
                        }}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.9rem' }}>
                            {member.name}
                          </div>
                          <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                            {member.email}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                            {formatDate(member.registrationDate)}
                          </div>
                        </div>
                        {getStatusBadge(member.paymentStatus)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                  <UserPlus size={16} />
                  Add Member
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
                  Create Event
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
                  <FileText size={16} />
                  View Reports
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
                  Settings
                </button>
              </div>
            </div>

            {/* System Status */}
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
                  System Status
                </h3>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Main Rink</span>
                  {getStatusBadge('active')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Equipment</span>
                  {getStatusBadge('active')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Booking System</span>
                  {getStatusBadge('active')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Payment System</span>
                  {getStatusBadge('pending')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 