import React, { createContext, useContext, useState, useEffect } from 'react';

const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load payments from localStorage on mount
  useEffect(() => {
    const savedPayments = JSON.parse(localStorage.getItem('pentagon_payments') || '[]');
    setPayments(savedPayments);
  }, []);

  // Save payments to localStorage whenever payments change
  useEffect(() => {
    localStorage.setItem('pentagon_payments', JSON.stringify(payments));
  }, [payments]);

  const processPayment = async (paymentData) => {
    setIsLoading(true);
    
    try {
      // Simulate Google Pay API call
      const result = await simulateGooglePayPayment(paymentData);
      
      if (result.success) {
        const newPayment = {
          id: Date.now(),
          memberId: paymentData.memberId,
          memberName: paymentData.memberName,
          memberEmail: paymentData.memberEmail,
          amount: paymentData.amount,
          description: paymentData.description,
          status: 'completed',
          paymentMethod: 'Google Pay',
          transactionId: result.transactionId,
          date: new Date().toISOString(),
          month: paymentData.month,
          year: paymentData.year
        };

        setPayments(prev => [newPayment, ...prev]);
        
        // Update member's payment status
        updateMemberPaymentStatus(paymentData.memberId, 'paid');
        
        return { success: true, payment: newPayment };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'Payment failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const simulateGooglePayPayment = async (paymentData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate 90% success rate
    if (Math.random() > 0.1) {
      return {
        success: true,
        transactionId: `GP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
    } else {
      return {
        success: false,
        error: 'Payment was declined. Please check your payment method.'
      };
    }
  };

  const updateMemberPaymentStatus = (memberId, status) => {
    const members = JSON.parse(localStorage.getItem('pentagon_members') || '[]');
    const updatedMembers = members.map(member => 
      member.id === memberId 
        ? { ...member, paymentStatus: status, lastPaymentDate: new Date().toISOString() }
        : member
    );
    localStorage.setItem('pentagon_members', JSON.stringify(updatedMembers));
  };

  const getMemberPayments = (memberId) => {
    return payments.filter(payment => payment.memberId === memberId);
  };

  const getPaymentHistory = () => {
    return payments.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getMonthlyRevenue = (month, year) => {
    return payments
      .filter(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate.getMonth() === month && paymentDate.getFullYear() === year;
      })
      .reduce((total, payment) => total + payment.amount, 0);
  };

  const getPendingPayments = () => {
    const members = JSON.parse(localStorage.getItem('pentagon_members') || '[]');
    return members.filter(member => member.paymentStatus === 'pending');
  };

  const value = {
    payments,
    isLoading,
    processPayment,
    getMemberPayments,
    getPaymentHistory,
    getMonthlyRevenue,
    getPendingPayments
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

