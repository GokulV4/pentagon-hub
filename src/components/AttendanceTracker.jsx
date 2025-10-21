import React, { useState, useEffect } from 'react';
import { useAttendance } from '../contexts/AttendanceContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  Target,
  Award,
  BarChart3
} from 'lucide-react';

const AttendanceTracker = () => {
  const { user } = useAuth();
  const { getMemberAttendance, getMemberAttendanceStats, getUpcomingSessions } = useAttendance();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [stats, setStats] = useState({});
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('all'); // all, thisMonth, lastMonth

  useEffect(() => {
    if (user) {
      const records = getMemberAttendance(user.id);
      const memberStats = getMemberAttendanceStats(user.id);
      const upcoming = getUpcomingSessions();
      
      setAttendanceRecords(records);
      setStats(memberStats);
      setUpcomingSessions(upcoming.slice(0, 5));
    }
  }, [user, getMemberAttendance, getMemberAttendanceStats, getUpcomingSessions]);

  const getFilteredRecords = () => {
    const now = new Date();
    let filtered = [...attendanceRecords];

    switch (selectedPeriod) {
      case 'thisMonth':
        filtered = filtered.filter(record => {
          const recordDate = new Date(record.timestamp);
          return recordDate.getMonth() === now.getMonth() && 
                 recordDate.getFullYear() === now.getFullYear();
        });
        break;
      case 'lastMonth':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
        filtered = filtered.filter(record => {
          const recordDate = new Date(record.timestamp);
          return recordDate.getMonth() === lastMonth.getMonth() && 
                 recordDate.getFullYear() === lastMonth.getFullYear();
        });
        break;
      default:
        // Show all records
        break;
    }

    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
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
        return { bg: '#dcfce7', text: '#166534' };
      case 'absent':
        return { bg: '#fef2f2', text: '#dc2626' };
      case 'late':
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

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAttendanceStreak = () => {
    const records = getFilteredRecords();
    let streak = 0;
    let currentStreak = 0;
    
    for (let i = 0; i < records.length; i++) {
      if (records[i].status === 'present') {
        currentStreak++;
        streak = Math.max(streak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    
    return streak;
  };

  const getRecentStreak = () => {
    const records = getFilteredRecords();
    let currentStreak = 0;
    
    for (let i = 0; i < records.length; i++) {
      if (records[i].status === 'present') {
        currentStreak++;
      } else {
        break;
      }
    }
    
    return currentStreak;
  };

  const filteredRecords = getFilteredRecords();
  const attendanceStreak = getAttendanceStreak();
  const recentStreak = getRecentStreak();

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Calendar size={20} />
          Attendance Tracking
        </h3>
        <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
          Track your session attendance and progress
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          padding: '16px',
          background: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #bae6fd',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0369a1', marginBottom: '4px' }}>
            {stats.present || 0}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: '600' }}>
            Sessions Attended
          </div>
        </div>
        
        <div style={{
          padding: '16px',
          background: '#f0fdf4',
          borderRadius: '8px',
          border: '1px solid #bbf7d0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#166534', marginBottom: '4px' }}>
            {Math.round(stats.attendanceRate || 0)}%
          </div>
          <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: '600' }}>
            Attendance Rate
          </div>
        </div>
        
        <div style={{
          padding: '16px',
          background: '#fef3c7',
          borderRadius: '8px',
          border: '1px solid #fde68a',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#92400e', marginBottom: '4px' }}>
            {recentStreak}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: '600' }}>
            Current Streak
          </div>
        </div>
        
        <div style={{
          padding: '16px',
          background: '#f3e8ff',
          borderRadius: '8px',
          border: '1px solid #d8b4fe',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#7c3aed', marginBottom: '4px' }}>
            {attendanceStreak}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#7c3aed', fontWeight: '600' }}>
            Best Streak
          </div>
        </div>
      </div>

      {/* Period Filter */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          background: '#f3f4f6',
          padding: '4px',
          borderRadius: '8px',
          width: 'fit-content'
        }}>
          {[
            { value: 'all', label: 'All Time' },
            { value: 'thisMonth', label: 'This Month' },
            { value: 'lastMonth', label: 'Last Month' }
          ].map(period => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                background: selectedPeriod === period.value ? 'white' : 'transparent',
                color: selectedPeriod === period.value ? '#374151' : '#6b7280',
                boxShadow: selectedPeriod === period.value ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Attendance History */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '16px'
        }}>
          Attendance History
        </h4>
        
        {filteredRecords.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280'
          }}>
            <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <p>No attendance records found for this period</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredRecords.slice(0, 10).map((record, index) => (
              <div key={record.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {getStatusIcon(record.status)}
                  <div>
                    <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.9rem' }}>
                      Session #{index + 1}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {formatDate(record.timestamp)} at {formatTime(record.timestamp)}
                    </div>
                  </div>
                </div>
                <div style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  background: getStatusColor(record.status).bg,
                  color: getStatusColor(record.status).text
                }}>
                  {record.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Sessions */}
      {upcomingSessions.length > 0 && (
        <div>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Upcoming Sessions
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {upcomingSessions.map(session => (
              <div key={session.id} style={{
                padding: '12px 16px',
                background: '#f0f9ff',
                borderRadius: '8px',
                border: '1px solid #bae6fd'
              }}>
                <div style={{ fontWeight: '600', color: '#0369a1', fontSize: '0.9rem', marginBottom: '4px' }}>
                  {session.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#0369a1' }}>
                  {formatDate(session.date)} at {formatTime(session.time)}
                  {session.instructor && ` • ${session.instructor}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTracker;

