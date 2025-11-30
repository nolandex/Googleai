import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  BookOpen, 
  User as UserIcon, 
  ChevronLeft, 
  PlayCircle,
  Clock,
  Award,
  CheckCircle,
  Loader2,
  Lock,
  LogOut,
  Star,
  CreditCard,
  X,
  AlertCircle,
  RefreshCw,
  Wallet,
  Building2,
  Store
} from 'lucide-react';
import { Course, User } from './types';
import { COURSES, CATEGORIES } from './constants';
import CourseCard from './components/CourseCard';
import { createTransaction, formatCurrency, FALLBACK_TOKEN_PREFIX } from './services/paymentService';

// --- Components defined within App.tsx ---

// Fake Snap Popup (Replica) for Fallback Mode
const SnapReplicaModal = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  amount 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSuccess: () => void; 
  amount: number;
}) => {
  const [step, setStep] = useState<'method' | 'processing' | 'success'>('method');

  useEffect(() => {
    if (isOpen) setStep('method');
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm md:max-w-md h-[90vh] md:h-auto md:rounded-lg flex flex-col shadow-2xl overflow-hidden relative">
        {/* Snap Header */}
        <div className="bg-white border-b border-gray-100 p-4 flex items-center justify-between shadow-sm z-10">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Midtrans_Logo.png/1200px-Midtrans_Logo.png" alt="Midtrans" className="h-6 object-contain" />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 relative">
          
          {step === 'method' && (
            <div className="p-4 space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                 <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                 <p className="text-xl font-bold text-blue-600">{formatCurrency(amount)}</p>
                 <p className="text-xs text-gray-400 mt-1">Order ID: #ORDER-DEMO-123</p>
              </div>

              <p className="text-sm font-bold text-gray-700 mt-4">Select Payment Method</p>
              
              <div className="space-y-2">
                <button onClick={handlePay} className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                   <div className="flex items-center">
                     <CreditCard className="w-5 h-5 text-gray-400 mr-3 group-hover:text-blue-500" />
                     <div className="text-left">
                       <p className="text-sm font-semibold text-gray-800">Credit/Debit Card</p>
                       <p className="text-xs text-gray-400">Visa, Mastercard, JCB</p>
                     </div>
                   </div>
                   <ChevronLeft className="w-4 h-4 text-gray-300 rotate-180" />
                </button>

                <button onClick={handlePay} className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                   <div className="flex items-center">
                     <Building2 className="w-5 h-5 text-gray-400 mr-3 group-hover:text-blue-500" />
                     <div className="text-left">
                       <p className="text-sm font-semibold text-gray-800">Bank Transfer</p>
                       <p className="text-xs text-gray-400">BCA, Mandiri, BNI, BRI</p>
                     </div>
                   </div>
                   <ChevronLeft className="w-4 h-4 text-gray-300 rotate-180" />
                </button>

                <button onClick={handlePay} className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                   <div className="flex items-center">
                     <Wallet className="w-5 h-5 text-gray-400 mr-3 group-hover:text-blue-500" />
                     <div className="text-left">
                       <p className="text-sm font-semibold text-gray-800">GoPay / QRIS</p>
                       <p className="text-xs text-gray-400">Scan QR Code</p>
                     </div>
                   </div>
                   <ChevronLeft className="w-4 h-4 text-gray-300 rotate-180" />
                </button>

                <button onClick={handlePay} className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                   <div className="flex items-center">
                     <Store className="w-5 h-5 text-gray-400 mr-3 group-hover:text-blue-500" />
                     <div className="text-left">
                       <p className="text-sm font-semibold text-gray-800">Indomaret / Alfamart</p>
                       <p className="text-xs text-gray-400">Pay at store</p>
                     </div>
                   </div>
                   <ChevronLeft className="w-4 h-4 text-gray-300 rotate-180" />
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Processing Payment...</p>
              <p className="text-xs text-gray-400 mt-2">Please do not close this window</p>
            </div>
          )}

          {step === 'success' && (
            <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-500 text-sm">Thank you for your purchase. Redirecting you back to the course...</p>
            </div>
          )}

        </div>
        
        {/* Footer Replica */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-center">
            <p className="text-[10px] text-gray-400 flex items-center">
               Secured by <span className="font-bold text-gray-500 ml-1">Midtrans</span>
            </p>
        </div>
      </div>
    </div>
  );
};


// Bottom Navigation Bar
const BottomNav = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'my_courses', icon: BookOpen, label: 'My Learning' },
    { id: 'profile', icon: UserIcon, label: 'Account' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 max-w-md mx-auto safe-area-bottom">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center space-y-1 transition-colors duration-200 ${
              isActive ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-current opacity-20' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// --- Views ---

const HomeView = ({ onCourseClick, user }: { onCourseClick: (c: Course) => void, user: User }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCourses = activeCategory === 'All' 
    ? COURSES 
    : COURSES.filter(c => c.category === activeCategory);

  return (
    <div className="pb-24 pt-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="px-6 mb-6 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Welcome back,</p>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
             <img src={user.avatar} alt="User" className="w-full h-full object-cover"/>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-8">
        <div className="bg-white p-3 rounded-2xl shadow-sm flex items-center space-x-3 border border-gray-50">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for courses..." 
            className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400 text-gray-700"
          />
        </div>
      </div>

      {/* Featured Section */}
      <div className="mb-8">
        <div className="px-6 mb-4 flex justify-between items-end">
          <h2 className="text-lg font-bold text-gray-900">Featured</h2>
          <span className="text-xs text-blue-600 font-semibold cursor-pointer">See All</span>
        </div>
        <div className="flex overflow-x-auto px-6 space-x-0 pb-4 no-scrollbar">
          {COURSES.slice(0, 3).map(course => (
            <CourseCard key={course.id} course={course} onClick={onCourseClick} />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
         <div className="flex overflow-x-auto px-6 space-x-3 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                    : 'bg-white text-gray-500 border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
         </div>
      </div>

      {/* Vertical List */}
      <div className="px-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Popular Courses</h2>
        {filteredCourses.map(course => (
           <CourseCard key={course.id} course={course} onClick={onCourseClick} variant="horizontal" />
        ))}
      </div>
    </div>
  );
};

const CourseDetailView = ({ 
  course, 
  onBack, 
  user, 
  onPurchaseSuccess 
}: { 
  course: Course, 
  onBack: () => void, 
  user: User, 
  onPurchaseSuccess: (courseId: string) => void 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showReplica, setShowReplica] = useState(false); // Controls the "Fake Snap" modal
  
  const isEnrolled = user.enrolledCourseIds.includes(course.id);

  // Check if Snap is loaded
  useEffect(() => {
    if (!window.snap) {
       console.warn("Midtrans Snap.js is not loaded yet.");
    }
  }, []);

  const handleBuy = async () => {
    if (isEnrolled) return;
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // 1. Get Token (Proxy -> Real, or Fallback -> Fake)
      const token = await createTransaction(course, user);
      
      // 2. Check if it's a Fallback Token
      if (token.startsWith(FALLBACK_TOKEN_PREFIX)) {
         // Use the High-Fidelity Replica to avoid "Transaction not found"
         // This happens when the browser/network blocks real API calls
         setIsLoading(false);
         setShowReplica(true);
         return;
      }

      // 3. Use Real Snap if we got a Real Token
      if (!window.snap) {
        throw new Error("Payment system initializing... Please wait a moment and try again.");
      }

      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log('Success', result);
          onPurchaseSuccess(course.id);
          setIsLoading(false);
        },
        onPending: (result) => {
          console.log('Pending', result);
          setErrorMsg("Payment pending. Check your dashboard/email for instructions.");
          setIsLoading(false);
        },
        onError: (result) => {
          console.log('Error', result);
          // If real snap fails, maybe try replica? No, that's confusing.
          setErrorMsg("Payment failed. Please try again.");
          setIsLoading(false);
        },
        onClose: () => {
          console.log('Closed without payment');
          setIsLoading(false);
        }
      });
    } catch (error: any) {
      console.error("Payment Error Full:", error);
      let msg = error.message || "Failed to initialize payment.";
      setErrorMsg(msg);
      setIsLoading(false);
    }
  };

  const handleReplicaSuccess = () => {
    setShowReplica(false);
    onPurchaseSuccess(course.id);
  };

  return (
    <>
      <SnapReplicaModal 
        isOpen={showReplica} 
        onClose={() => setShowReplica(false)} 
        onSuccess={handleReplicaSuccess}
        amount={course.price}
      />

      <div className="bg-white min-h-screen pb-24 animate-in slide-in-from-bottom-10 duration-300 relative z-40">
        {/* Hero Image */}
        <div className="relative h-72 w-full">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-black/60"></div>
          <button 
            onClick={onBack}
            className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Content Container - overlaps image */}
        <div className="-mt-10 relative bg-white rounded-t-3xl px-6 pt-8 pb-8 min-h-[500px]">
          {/* Category Pill */}
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
              {course.category}
          </span>

          <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
            {course.title}
          </h1>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="font-semibold text-gray-800">{course.rating}</span>
              <span className="ml-1">(240 reviews)</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              {course.lessons} Lessons
            </div>
          </div>

          {/* Instructor */}
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-3">
              <img src={`https://i.pravatar.cc/150?u=${course.instructor}`} alt={course.instructor} className="w-full h-full object-cover"/>
            </div>
            <div>
              <p className="text-xs text-gray-500">Instructor</p>
              <h4 className="font-bold text-gray-900">{course.instructor}</h4>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-2">About Course</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {course.description}
              <br/><br/>
              This comprehensive course will guide you through practical examples, hands-on projects, and industry best practices.
            </p>
          </div>

          {/* Syllabus Preview */}
          <div className="mb-24">
            <h3 className="font-bold text-gray-900 mb-4">Curriculum</h3>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center mb-4 p-3 rounded-xl bg-gray-50">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3 text-sm">
                    0{i}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800">Introduction to {course.category}</h4>
                    <p className="text-xs text-gray-500">15 mins • Video</p>
                  </div>
                  {isEnrolled ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Lock className="w-4 h-4 text-gray-400" />
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Modal */}
        {errorMsg && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
                    <div className="flex items-center text-red-600 mb-2">
                        <AlertCircle className="w-6 h-6 mr-2" />
                        <h3 className="font-bold text-lg">Oops!</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{errorMsg}</p>
                    <div className="flex space-x-3">
                      <button 
                          onClick={() => setErrorMsg(null)}
                          className="flex-1 py-3 bg-gray-100 text-gray-800 font-bold rounded-xl hover:bg-gray-200"
                      >
                          Close
                      </button>
                      <button 
                          onClick={handleBuy}
                          className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 flex justify-center items-center"
                      >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Retry
                      </button>
                    </div>
                </div>
            </div>
        )}

        {/* Sticky Bottom Buy Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 z-50 max-w-md mx-auto">
          <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Total Price</span>
                <span className="text-2xl font-bold text-blue-600">
                  {isEnrolled ? 'Purchased' : formatCurrency(course.price)}
                </span>
              </div>
              
              <button 
                onClick={handleBuy}
                disabled={isLoading || isEnrolled}
                className={`px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center ${
                  isEnrolled 
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                } ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : isEnrolled ? (
                  <>
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Start Learning
                  </>
                ) : (
                  'Enroll Now'
                )}
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

const MyCoursesView = ({ user }: { user: User }) => {
  const myCourses = COURSES.filter(c => user.enrolledCourseIds.includes(c.id));

  return (
    <div className="px-6 pt-8 pb-24 animate-in fade-in">
       <h1 className="text-2xl font-bold text-gray-900 mb-6">My Learning</h1>
       
       {myCourses.length === 0 ? (
         <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 font-bold mb-1">No courses yet</h3>
            <p className="text-gray-500 text-sm">Start exploring and enroll in your first course!</p>
         </div>
       ) : (
         <div className="space-y-4">
            {myCourses.map(course => (
              <div key={course.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex space-x-4">
                 <img src={course.image} className="w-20 h-20 rounded-lg object-cover bg-gray-200" alt={course.title} />
                 <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{course.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{course.instructor}</p>
                    </div>
                    <div className="mt-2">
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                           <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                        <span className="text-[10px] text-gray-500 font-medium">0% Completed</span>
                    </div>
                 </div>
              </div>
            ))}
         </div>
       )}
    </div>
  );
};

const ProfileView = ({ user }: { user: User }) => {
  return (
    <div className="px-6 pt-8 pb-24 animate-in fade-in">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Account</h1>
        
        <div className="flex items-center mb-8">
           <div className="w-20 h-20 rounded-full bg-blue-100 mr-4 overflow-hidden border-2 border-white shadow-md">
             <img src={user.avatar} alt="User" className="w-full h-full object-cover"/>
           </div>
           <div>
             <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
             <p className="text-sm text-gray-500">{user.email}</p>
           </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-2 mb-6">
           {[
             { icon: Award, label: "Certificates", value: "0" },
             { icon: Clock, label: "Watch Time", value: "12h" },
             { icon: CheckCircle, label: "Completed", value: "0" }
           ].map((stat, idx) => (
             <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3">
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-700 text-sm">{stat.label}</span>
                </div>
                <span className="font-bold text-gray-900">{stat.value}</span>
             </div>
           ))}
        </div>

        <button className="w-full py-4 rounded-xl bg-red-50 text-red-600 font-bold text-sm flex items-center justify-center space-x-2">
           <LogOut className="w-4 h-4" />
           <span>Log Out</span>
        </button>
    </div>
  );
}

// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<User>({
    name: "Alex Doe",
    email: "alex@example.com",
    avatar: "https://i.pravatar.cc/300?u=alex",
    enrolledCourseIds: []
  });

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToHome = () => {
    setSelectedCourse(null);
  };

  const handlePurchaseSuccess = (courseId: string) => {
    setUser(prev => ({
      ...prev,
      enrolledCourseIds: [...prev.enrolledCourseIds, courseId]
    }));
    // We stay on the course page but it will now show "Start Learning"
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center font-sans">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden">
        
        {/* Main Content Area */}
        <div className="h-full overflow-y-auto no-scrollbar scroll-smooth">
          {selectedCourse ? (
            <CourseDetailView 
              course={selectedCourse} 
              onBack={handleBackToHome} 
              user={user}
              onPurchaseSuccess={handlePurchaseSuccess}
            />
          ) : (
            <>
              {activeTab === 'home' && <HomeView onCourseClick={handleCourseClick} user={user} />}
              {activeTab === 'my_courses' && <MyCoursesView user={user} />}
              {activeTab === 'profile' && <ProfileView user={user} />}
              
              <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
            </>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default App;