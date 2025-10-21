import React, { useState, useEffect } from 'react';
import { useAttendance } from '../../contexts/AttendanceContext';
import { usePayment } from '../../contexts/PaymentContext';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Save,
  UserCheck,
  UserX,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const AttendanceManager = () => {
  const { 
    sessions, 
    createSession, 
    updateSession, 
    deleteSession, 
    takeAttendance, 
    bulkTakeAttendance,
    getSessionAttendance,
    getMembersWithPaymentStatus,
    getUpcomingSessions,
    getRecentSessions
  } = useAttendance();
  
  const { getPendingPayments } = usePayment();
  const [selectedSession, setSelectedSession] = useState(null);
  const [members, setMembers] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [newSession, setNewSession] = useState({
    name: '',
    date: '',
    time: '',
    type: 'regular',
    instructor: '',
    description: '',
    maxCapacity: 50
  });

  useEffect(() => {
    const membersWithPayment = getMembersWithPaymentStatus();
    setMembers(membersWithPayment);
  }, [getMembersWithPaymentStatus]);

  useEffect(() => {
    if (selectedSession) {
      const attendance = getSessionAttendance(selectedSession.id);
      const attendanceMap = {};
      attendance.forEach(record => {
        attendanceMap[record.memberId] = record.status;
      });
      setAttendanceData(attendanceMap);
    }
  }, [selectedSession, getSessionAttendance]);

  const handleCreateSession = (e) => {
    e.preventDefault();
    const session = createSession(newSession);
    setNewSession({
      name: '',
      date: '',
      time: '',
      type: 'regular',
      instructor: '',
      description: '',
      maxCapacity: 50
    });
    setShowCreateSession(false);
    setSelectedSession(session);
  };

  const handleAttendanceChange = (memberId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [memberId]: status
    }));
  };

  const saveAttendance = () => {
    if (!selectedSession) return;

    const attendanceArray = Object.entries(attendanceData).map(([memberId, status]) => ({
      memberId: parseInt(memberId),
      status
    }));

    bulkTakeAttendance(selectedSession.id, attendanceArray);
    alert('Attendance saved successfully!');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle size={16} style={{ color: '#10b981' }} />;
      case 'absent':
        return <XCircle size={16} style={{ color: '#ef4444' }} />;
      case 'late':
        return <AlertCircle size={16} style={{ color: '#f59e0b' }} />;
      default:
        return <Clock size={16} style={{ color: '#6b7280' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' };
      case 'absent':
        return { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' };
      case 'late':
        return { bg: '#fef3c7', text: '#92400e', border: '#fde68a' };
      default:
        return { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return { bg: '#dcfce7', text: '#166534' };
      case 'pending':
        return { bg: '#fef3c7', text: '#92400e' };
      default:
        return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                Attendance Management
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                Manage session attendance and track member participation
              </p>
            </div>
            <button
              onClick={() => setShowCreateSession(true)}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '12px 24px',
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
              <Plus size={16} />
              Create Session
            </button>
          </div>

          {/* Session Selector */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Select Session
              </label>
              <select
                value={selectedSession?.id || ''}
                onChange={(e) => {
                  const session = sessions.find(s => s.id === parseInt(e.target.value));
                  setSelectedSession(session);
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'white',
                  outline: 'none'
                }}
              >
                <option value="">Choose a session...</option>
                {sessions.map(session => (
                  <option key={session.id} value={session.id}>
                    {session.name} - {formatDate(session.date)} at {formatTime(session.time)}
                  </option>
                ))}
              </select>
            </div>
            {selectedSession && (
              <div style={{ display: 'flex', alignItems: 'end', gap: '12px' }}>
                <button
                  onClick={saveAttendance}
                  style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#059669';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#10b981';
                  }}
                >
                  <Save size={16} />
                  Save Attendance
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Create Session Modal */}
        {showCreateSession && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '24px'
              }}>
                Create New Session
              </h2>
              
              <form onSubmit={handleCreateSession} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Session Name *
                  </label>
                  <input
                    type="text"
                    value={newSession.name}
                    onChange={(e) => setNewSession(prev => ({ ...prev, name: e.target.value }))}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                    placeholder="e.g., Morning Skate Session"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Date *
                    </label>
                    <input
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession(prev => ({ ...prev, date: e.target.value }))}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Time *
                    </label>
                    <input
                      type="time"
                      value={newSession.time}
                      onChange={(e) => setNewSession(prev => ({ ...prev, time: e.target.value }))}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Instructor
                  </label>
                  <input
                    type="text"
                    value={newSession.instructor}
                    onChange={(e) => setNewSession(prev => ({ ...prev, instructor: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                    placeholder="Instructor name"
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Description
                  </label>
                  <textarea
                    value={newSession.description}
                    onChange={(e) => setNewSession(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                    placeholder="Session description..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowCreateSession(false)}
                    style={{
                      background: '#f3f4f6',
                      color: '#374151',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    Create Session
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Attendance Taking Interface */}
        {selectedSession && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                {selectedSession.name}
              </h2>
              <p style={{ color: '#6b7280' }}>
                {formatDate(selectedSession.date)} at {formatTime(selectedSession.time)}
                {selectedSession.instructor && ` • Instructor: ${selectedSession.instructor}`}
              </p>
            </div>

            {/* Members List */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {members.map(member => (
                <div key={member.id} style={{
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
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
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        {member.email}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Payment Status */}
                    <div style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      background: getPaymentStatusColor(member.paymentStatus).bg,
                      color: getPaymentStatusColor(member.paymentStatus).text
                    }}>
                      <DollarSign size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {member.paymentStatus}
                    </div>
                    
                    {/* Attendance Status */}
                    <select
                      value={attendanceData[member.id] || 'not-marked'}
                      onChange={(e) => handleAttendanceChange(member.id, e.target.value)}
                      style={{
                        padding: '8px 12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        background: 'white',
                        outline: 'none',
                        minWidth: '100px'
                      }}
                    >
                      <option value="not-marked">Not Marked</option>
                      <option value="present">Present</option>
                      <option value="late">Late</option>
                      <option value="absent">Absent</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sessions List */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '24px'
          }}>
            All Sessions
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {sessions.map(session => (
              <div key={session.id} style={{
                padding: '16px',
                background: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                    {session.name}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                    {formatDate(session.date)} at {formatTime(session.time)}
                    {session.instructor && ` • ${session.instructor}`}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={() => setSelectedSession(session)}
                    style={{
                      background: 'rgba(102, 126, 234, 0.1)',
                      color: '#667eea',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    Take Attendance
                  </button>
                  <button
                    onClick={() => deleteSession(session.id)}
                    style={{
                      background: '#fef2f2',
                      color: '#dc2626',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManager;
