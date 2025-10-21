import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings, Code, Database, Users, FileText, DollarSign, X, RefreshCw } from 'lucide-react';

const DebugPanel = () => {
  const { toggleDebugMode, isDebugMode } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const debugTabs = [
    { id: 'overview', label: 'Overview', icon: Settings },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'code', label: 'Code', icon: Code }
  ];

  const getSystemStats = () => {
    const members = JSON.parse(localStorage.getItem('pentagon_members') || '[]');
    const blogs = JSON.parse(localStorage.getItem('pentagon_blogs') || '[]');
    
    return {
      totalMembers: members.length,
      activeMembers: members.filter(m => m.paymentStatus === 'paid').length,
      pendingPayments: members.filter(m => m.paymentStatus === 'pending').length,
      totalBlogs: blogs.length,
      publishedBlogs: blogs.filter(b => b.published).length
    };
  };

  const stats = getSystemStats();

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('pentagon_members');
      localStorage.removeItem('pentagon_blogs');
      localStorage.removeItem('pentagon_payments');
      window.location.reload();
    }
  };

  const exportData = () => {
    const data = {
      members: JSON.parse(localStorage.getItem('pentagon_members') || '[]'),
      blogs: JSON.parse(localStorage.getItem('pentagon_blogs') || '[]'),
      payments: JSON.parse(localStorage.getItem('pentagon_payments') || '[]'),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pentagon-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderOverview = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', color: '#1f2937' }}>
        System Overview
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.totalMembers}</div>
          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Total Members</div>
        </div>
        <div style={{ background: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.activeMembers}</div>
          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Active Members</div>
        </div>
        <div style={{ background: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f59e0b' }}>{stats.pendingPayments}</div>
          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Pending Payments</div>
        </div>
        <div style={{ background: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#8b5cf6' }}>{stats.totalBlogs}</div>
          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Total Blogs</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={exportData}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Database size={16} />
          Export Data
        </button>
        <button
          onClick={clearAllData}
          style={{
            background: '#dc2626',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <RefreshCw size={16} />
          Clear All Data
        </button>
      </div>
    </div>
  );

  const renderUsers = () => {
    const members = JSON.parse(localStorage.getItem('pentagon_members') || '[]');
    
    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', color: '#1f2937' }}>
          User Management
        </h3>
        
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {members.map((member, index) => (
            <div key={index} style={{
              background: '#f9fafb',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>{member.name}</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>{member.email}</div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    Joined: {new Date(member.registrationDate).toLocaleDateString()}
                  </div>
                </div>
                <div style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  background: member.paymentStatus === 'paid' ? '#dcfce7' : '#fef3c7',
                  color: member.paymentStatus === 'paid' ? '#166534' : '#92400e'
                }}>
                  {member.paymentStatus}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    const blogs = JSON.parse(localStorage.getItem('pentagon_blogs') || '[]');
    
    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', color: '#1f2937' }}>
          Content Management
        </h3>
        
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {blogs.map((blog, index) => (
            <div key={index} style={{
              background: '#f9fafb',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                {blog.title}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
                {blog.content.substring(0, 100)}...
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
                <div style={{
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  background: blog.published ? '#dcfce7' : '#fef3c7',
                  color: blog.published ? '#166534' : '#92400e'
                }}>
                  {blog.published ? 'Published' : 'Draft'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPayments = () => {
    const payments = JSON.parse(localStorage.getItem('pentagon_payments') || '[]');
    
    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', color: '#1f2937' }}>
          Payment Management
        </h3>
        
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {payments.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
              No payment records found
            </div>
          ) : (
            payments.map((payment, index) => (
              <div key={index} style={{
                background: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1f2937' }}>{payment.memberName}</div>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>{payment.email}</div>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                      {new Date(payment.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1f2937', textAlign: 'right' }}>
                      ${payment.amount}
                    </div>
                    <div style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      background: payment.status === 'completed' ? '#dcfce7' : '#fef3c7',
                      color: payment.status === 'completed' ? '#166534' : '#92400e'
                    }}>
                      {payment.status}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderDatabase = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', color: '#1f2937' }}>
        Database Operations
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={() => {
            const data = {
              members: JSON.parse(localStorage.getItem('pentagon_members') || '[]'),
              blogs: JSON.parse(localStorage.getItem('pentagon_blogs') || '[]'),
              payments: JSON.parse(localStorage.getItem('pentagon_payments') || '[]')
            };
            console.log('Database dump:', data);
            alert('Database dumped to console');
          }}
          style={{
            background: '#6b7280',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          Dump Database to Console
        </button>
        
        <button
          onClick={() => {
            const size = JSON.stringify(localStorage).length;
            alert(`LocalStorage size: ${(size / 1024).toFixed(2)} KB`);
          }}
          style={{
            background: '#6b7280',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          Check Storage Size
        </button>
        
        <button
          onClick={() => {
            localStorage.clear();
            alert('LocalStorage cleared');
            window.location.reload();
          }}
          style={{
            background: '#dc2626',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          Clear All Storage
        </button>
      </div>
    </div>
  );

  const renderCode = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', color: '#1f2937' }}>
        Code Management
      </h3>
      
      <div style={{ background: '#1f2937', color: '#f9fafb', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ color: '#10b981' }}>// Debug Mode Active</span>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ color: '#3b82f6' }}>const</span> debugMode = <span style={{ color: '#fbbf24' }}>true</span>;
        </div>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ color: '#3b82f6' }}>const</span> userRole = <span style={{ color: '#fbbf24' }}>'debug'</span>;
        </div>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ color: '#3b82f6' }}>const</span> permissions = [<span style={{ color: '#fbbf24' }}>'all'</span>];
        </div>
        <div>
          <span style={{ color: '#8b5cf6' }}>console</span>.<span style={{ color: '#fbbf24' }}>log</span>(<span style={{ color: '#fbbf24' }}>'Debug panel loaded'</span>);
        </div>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#6b7280' }}>
        <p>Debug mode provides full access to system data and operations.</p>
        <p>Use with caution - changes affect the entire application.</p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'users': return renderUsers();
      case 'content': return renderContent();
      case 'payments': return renderPayments();
      case 'database': return renderDatabase();
      case 'code': return renderCode();
      default: return renderOverview();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      width: isExpanded ? '400px' : '60px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      border: '2px solid #fbbf24',
      zIndex: 9999,
      transition: 'all 0.3s ease',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        color: '#1f2937',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer'
      }} onClick={() => setIsExpanded(!isExpanded)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code size={20} />
          {isExpanded && (
            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>
              Debug Panel
            </span>
          )}
        </div>
        <X size={16} onClick={(e) => {
          e.stopPropagation();
          toggleDebugMode();
        }} style={{ cursor: 'pointer' }} />
      </div>

      {/* Content */}
      {isExpanded && (
        <>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e5e7eb',
            overflowX: 'auto'
          }}>
            {debugTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? '#f3f4f6' : 'transparent',
                  border: 'none',
                  padding: '12px 16px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: activeTab === tab.id ? '#1f2937' : '#6b7280',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = '#f9fafb';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {renderTabContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default DebugPanel;

