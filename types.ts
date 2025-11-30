export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  image: string;
  category: string;
  description: string;
  duration: string;
  lessons: number;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  enrolledCourseIds: string[];
}

// Midtrans Type Definitions
export interface SnapResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: 'capture' | 'settlement' | 'pending' | 'deny' | 'cancel' | 'expire' | 'failure';
  fraud_status?: string;
  pdf_url?: string;
}

declare global {
  interface Window {
    snap: {
      pay: (
        token: string, 
        options?: {
          onSuccess?: (result: SnapResult) => void;
          onPending?: (result: SnapResult) => void;
          onError?: (result: SnapResult) => void;
          onClose?: () => void;
        }
      ) => void;
    }
  }
}