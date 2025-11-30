import { Course } from './types';

export const MIDTRANS_SERVER_KEY = "SB-Mid-server-00d-pzzNYmONwbRRJ844umvR";
export const MIDTRANS_API_URL = "https://app.sandbox.midtrans.com/snap/v1/transactions";

export const CATEGORIES = ["All", "Design", "Coding", "Business", "Marketing"];

export const COURSES: Course[] = [
  {
    id: "c1",
    title: "UI/UX Design Masterclass 2024",
    instructor: "Sarah Jenkins",
    price: 150000,
    rating: 4.8,
    students: 1240,
    image: "https://picsum.photos/800/600?random=1",
    category: "Design",
    description: "Learn how to design beautiful interfaces and user experiences from scratch using Figma and Adobe XD.",
    duration: "12h 30m",
    lessons: 42
  },
  {
    id: "c2",
    title: "Fullstack React & Node.js",
    instructor: "David Lee",
    price: 250000,
    rating: 4.9,
    students: 3500,
    image: "https://picsum.photos/800/600?random=2",
    category: "Coding",
    description: "Build complete web applications with the MERN stack. Includes Redux, Authentication, and Deployment.",
    duration: "24h 15m",
    lessons: 85
  },
  {
    id: "c3",
    title: "Digital Marketing Strategy",
    instructor: "Emily Chen",
    price: 99000,
    rating: 4.6,
    students: 800,
    image: "https://picsum.photos/800/600?random=3",
    category: "Marketing",
    description: "Master social media marketing, SEO, and email campaigns to grow any business.",
    duration: "8h 45m",
    lessons: 30
  },
  {
    id: "c4",
    title: "Python for Data Science",
    instructor: "Michael Brown",
    price: 199000,
    rating: 4.9,
    students: 2100,
    image: "https://picsum.photos/800/600?random=4",
    category: "Coding",
    description: "Data analysis, visualization, and machine learning basics using Python, Pandas, and Scikit-Learn.",
    duration: "18h 00m",
    lessons: 55
  },
  {
    id: "c5",
    title: "Startup Business Fundamentals",
    instructor: "Jessica Wu",
    price: 120000,
    rating: 4.7,
    students: 560,
    image: "https://picsum.photos/800/600?random=5",
    category: "Business",
    description: "From idea to execution. Learn the lean startup methodology and how to pitch to investors.",
    duration: "6h 20m",
    lessons: 18
  }
];