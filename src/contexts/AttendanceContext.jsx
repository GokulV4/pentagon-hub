import React, { createContext, useContext, useState, useEffect } from 'react';

const AttendanceContext = createContext();

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};

export const AttendanceProvider = ({ children }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedAttendance = JSON.parse(localStorage.getItem('pentagon_attendance') || '[]');
    const savedSessions = JSON.parse(localStorage.getItem('pentagon_sessions') || '[]');
    
    setAttendanceRecords(savedAttendance);
    setSessions(savedSessions);
  }, []);

  // Save data to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('pentagon_attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('pentagon_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const createSession = (sessionData) => {
    const newSession = {
      id: Date.now(),
      name: sessionData.name,
      date: sessionData.date,
      time: sessionData.time,
      type: sessionData.type || 'regular',
      instructor: sessionData.instructor || '',
      description: sessionData.description || '',
      maxCapacity: sessionData.maxCapacity || 50,
      status: 'scheduled', // scheduled, in-progress, completed, cancelled
      createdAt: new Date().toISOString()
    };

    setSessions(prev => [newSession, ...prev]);
    return newSession;
  };

  const updateSession = (sessionId, updates) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === sessionId ? { ...session, ...updates } : session
      )
    );
  };

  const deleteSession = (sessionId) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    // Also remove attendance records for this session
    setAttendanceRecords(prev => prev.filter(record => record.sessionId !== sessionId));
  };

  const takeAttendance = (sessionId, memberId, status = 'present') => {
    const existingRecord = attendanceRecords.find(
      record => record.sessionId === sessionId && record.memberId === memberId
    );

    if (existingRecord) {
      // Update existing record
      setAttendanceRecords(prev =>
        prev.map(record =>
          record.sessionId === sessionId && record.memberId === memberId
            ? { ...record, status, timestamp: new Date().toISOString() }
            : record
        )
      );
    } else {
      // Create new record
      const newRecord = {
        id: Date.now(),
        sessionId,
        memberId,
        status,
        timestamp: new Date().toISOString()
      };
      setAttendanceRecords(prev => [newRecord, ...prev]);
    }
  };

  const bulkTakeAttendance = (sessionId, attendanceData) => {
    // Remove existing records for this session
    setAttendanceRecords(prev => 
      prev.filter(record => record.sessionId !== sessionId)
    );

    // Add new records
    const newRecords = attendanceData.map(data => ({
      id: Date.now() + Math.random(),
      sessionId,
      memberId: data.memberId,
      status: data.status,
      timestamp: new Date().toISOString()
    }));

    setAttendanceRecords(prev => [...newRecords, ...prev]);
  };

  const getSessionAttendance = (sessionId) => {
    return attendanceRecords.filter(record => record.sessionId === sessionId);
  };

  const getMemberAttendance = (memberId) => {
    return attendanceRecords.filter(record => record.memberId === memberId);
  };

  const getMemberAttendanceStats = (memberId) => {
    const memberRecords = getMemberAttendance(memberId);
    const presentCount = memberRecords.filter(record => record.status === 'present').length;
    const absentCount = memberRecords.filter(record => record.status === 'absent').length;
    const lateCount = memberRecords.filter(record => record.status === 'late').length;
    
    return {
      totalSessions: memberRecords.length,
      present: presentCount,
      absent: absentCount,
      late: lateCount,
      attendanceRate: memberRecords.length > 0 ? (presentCount / memberRecords.length) * 100 : 0
    };
  };

  const getSessionStats = (sessionId) => {
    const sessionRecords = getSessionAttendance(sessionId);
    const presentCount = sessionRecords.filter(record => record.status === 'present').length;
    const absentCount = sessionRecords.filter(record => record.status === 'absent').length;
    const lateCount = sessionRecords.filter(record => record.status === 'late').length;
    
    return {
      totalAttendees: sessionRecords.length,
      present: presentCount,
      absent: absentCount,
      late: lateCount,
      attendanceRate: sessionRecords.length > 0 ? (presentCount / sessionRecords.length) * 100 : 0
    };
  };

  const getUpcomingSessions = () => {
    const now = new Date();
    return sessions
      .filter(session => new Date(session.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getRecentSessions = (limit = 10) => {
    const now = new Date();
    return sessions
      .filter(session => new Date(session.date) <= now)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  const getMembersWithPaymentStatus = () => {
    const members = JSON.parse(localStorage.getItem('pentagon_members') || '[]');
    return members.map(member => ({
      ...member,
      attendanceStats: getMemberAttendanceStats(member.id)
    }));
  };

  const getAttendanceReport = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const sessionsInRange = sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= start && sessionDate <= end;
    });

    const attendanceInRange = attendanceRecords.filter(record => {
      const session = sessions.find(s => s.id === record.sessionId);
      if (!session) return false;
      const sessionDate = new Date(session.date);
      return sessionDate >= start && sessionDate <= end;
    });

    return {
      sessions: sessionsInRange,
      attendance: attendanceInRange,
      totalSessions: sessionsInRange.length,
      totalAttendance: attendanceInRange.length,
      presentCount: attendanceInRange.filter(r => r.status === 'present').length,
      absentCount: attendanceInRange.filter(r => r.status === 'absent').length,
      lateCount: attendanceInRange.filter(r => r.status === 'late').length
    };
  };

  const value = {
    attendanceRecords,
    sessions,
    isLoading,
    createSession,
    updateSession,
    deleteSession,
    takeAttendance,
    bulkTakeAttendance,
    getSessionAttendance,
    getMemberAttendance,
    getMemberAttendanceStats,
    getSessionStats,
    getUpcomingSessions,
    getRecentSessions,
    getMembersWithPaymentStatus,
    getAttendanceReport
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

