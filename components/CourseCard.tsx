import React from 'react';
import { Course } from '../types';
import { Star, Clock, User } from 'lucide-react';
import { formatCurrency } from '../services/paymentService';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
  variant?: 'vertical' | 'horizontal';
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, variant = 'vertical' }) => {
  if (variant === 'horizontal') {
    return (
      <div 
        onClick={() => onClick(course)}
        className="flex bg-white rounded-2xl p-3 shadow-sm mb-4 active:scale-95 transition-transform duration-200 cursor-pointer"
      >
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
        />
        <div className="ml-4 flex flex-col justify-between flex-1">
          <div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mb-1 inline-block">
              {course.category}
            </span>
            <h3 className="font-bold text-gray-800 text-sm leading-tight line-clamp-2">
              {course.title}
            </h3>
          </div>
          <div className="flex justify-between items-end mt-2">
             <div className="flex items-center text-xs text-gray-500">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                <span>{course.rating}</span>
             </div>
             <span className="font-bold text-blue-600 text-sm">
               {formatCurrency(course.price)}
             </span>
          </div>
        </div>
      </div>
    );
  }

  // Vertical (Large Card)
  return (
    <div 
      onClick={() => onClick(course)}
      className="min-w-[260px] bg-white rounded-3xl p-3 shadow-sm mr-4 active:scale-95 transition-transform duration-200 cursor-pointer relative overflow-hidden group"
    >
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-40 rounded-2xl object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center shadow-sm">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-xs font-bold text-gray-800">{course.rating}</span>
        </div>
      </div>
      
      <div className="mt-3 px-1">
        <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1 line-clamp-2">
            {course.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3">{course.instructor}</p>
        
        <div className="flex items-center justify-between">
           <div className="flex items-center space-x-3 text-xs text-gray-400">
               <div className="flex items-center">
                   <Clock className="w-3 h-3 mr-1" />
                   {course.duration}
               </div>
               <div className="flex items-center">
                   <User className="w-3 h-3 mr-1" />
                   {course.students}
               </div>
           </div>
           <div className="text-blue-600 font-bold">
               {formatCurrency(course.price)}
           </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;