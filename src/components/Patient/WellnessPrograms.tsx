import React, { useState } from 'react';
import { Target, Calendar, Users, Award, Play, CheckCircle, Clock, Star } from 'lucide-react';
import toast from 'react-hot-toast';

interface WellnessProgram {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  participants: number;
  rating: number;
  progress?: number;
  enrolled: boolean;
  modules: ProgramModule[];
  benefits: string[];
  instructor: string;
  price: number;
}

interface ProgramModule {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'article' | 'exercise' | 'quiz';
}

const WellnessPrograms: React.FC = () => {
  const [programs] = useState<WellnessProgram[]>([
    {
      id: '1',
      title: 'Diabetes Management Masterclass',
      description: 'Comprehensive program to manage diabetes through diet, exercise, and lifestyle changes.',
      category: 'Chronic Disease',
      duration: '8 weeks',
      difficulty: 'intermediate',
      participants: 1250,
      rating: 4.8,
      progress: 65,
      enrolled: true,
      instructor: 'Dr. Rajesh Kumar',
      price: 0,
      modules: [
        { id: '1', title: 'Understanding Diabetes', duration: '15 min', completed: true, type: 'video' },
        { id: '2', title: 'Blood Sugar Monitoring', duration: '20 min', completed: true, type: 'article' },
        { id: '3', title: 'Dietary Guidelines', duration: '25 min', completed: false, type: 'video' },
        { id: '4', title: 'Exercise Routine', duration: '30 min', completed: false, type: 'exercise' }
      ],
      benefits: [
        'Better blood sugar control',
        'Reduced medication dependency',
        'Improved energy levels',
        'Weight management'
      ]
    },
    {
      id: '2',
      title: 'Heart Health Bootcamp',
      description: 'Complete cardiovascular health program focusing on prevention and management.',
      category: 'Cardiovascular',
      duration: '6 weeks',
      difficulty: 'beginner',
      participants: 890,
      rating: 4.9,
      enrolled: false,
      instructor: 'Dr. Priya Sharma',
      price: 999,
      modules: [
        { id: '1', title: 'Heart Health Basics', duration: '18 min', completed: false, type: 'video' },
        { id: '2', title: 'Cardio Exercises', duration: '25 min', completed: false, type: 'exercise' },
        { id: '3', title: 'Nutrition for Heart', duration: '22 min', completed: false, type: 'article' }
      ],
      benefits: [
        'Lower blood pressure',
        'Improved circulation',
        'Reduced heart disease risk',
        'Better stamina'
      ]
    },
    {
      id: '3',
      title: 'Mental Wellness Journey',
      description: 'Mindfulness and stress management program for better mental health.',
      category: 'Mental Health',
      duration: '4 weeks',
      difficulty: 'beginner',
      participants: 2100,
      rating: 4.7,
      enrolled: false,
      instructor: 'Dr. Anjali Verma',
      price: 599,
      modules: [
        { id: '1', title: 'Stress Management', duration: '20 min', completed: false, type: 'video' },
        { id: '2', title: 'Meditation Basics', duration: '15 min', completed: false, type: 'exercise' },
        { id: '3', title: 'Sleep Hygiene', duration: '18 min', completed: false, type: 'article' }
      ],
      benefits: [
        'Reduced stress levels',
        'Better sleep quality',
        'Improved focus',
        'Emotional balance'
      ]
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState<WellnessProgram | null>(null);

  const categories = ['all', 'Chronic Disease', 'Cardiovascular', 'Mental Health', 'Nutrition', 'Fitness'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'article': return <Calendar className="w-4 h-4" />;
      case 'exercise': return <Activity className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const enrollInProgram = (programId: string) => {
    toast.success('Successfully enrolled in wellness program!');
  };

  const startModule = (moduleId: string) => {
    toast.success('Starting module...');
  };

  const filteredPrograms = programs.filter(program => 
    selectedCategory === 'all' || program.category === selectedCategory
  );

  const enrolledPrograms = programs.filter(p => p.enrolled);
  const completedModules = enrolledPrograms.reduce((sum, p) => 
    sum + p.modules.filter(m => m.completed).length, 0
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wellness Programs</h1>
        <p className="text-gray-600">Join expert-led programs to improve your health and wellbeing</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Enrolled Programs</p>
              <p className="text-2xl font-bold text-blue-600">{enrolledPrograms.length}</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Modules Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedModules}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-purple-600">
                {enrolledPrograms.length > 0 
                  ? Math.round(enrolledPrograms.reduce((sum, p) => sum + (p.progress || 0), 0) / enrolledPrograms.length)
                  : 0}%
              </p>
            </div>
            <Activity className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-yellow-600">3</p>
            </div>
            <Award className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Programs' : category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Programs List */}
        <div className="space-y-6">
          {filteredPrograms.map(program => (
            <div
              key={program.id}
              onClick={() => setSelectedProgram(program)}
              className={`bg-white p-6 rounded-xl shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                selectedProgram?.id === program.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600 mb-3">{program.description}</p>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(program.difficulty)}`}>
                      {program.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">{program.duration}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{program.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{program.participants} enrolled</span>
                  </div>
                  
                  <p className="text-sm text-gray-600">Instructor: {program.instructor}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {program.price === 0 ? 'Free' : `₹${program.price}`}
                  </div>
                  {program.enrolled && program.progress && (
                    <div className="mt-2">
                      <div className="text-sm text-gray-600 mb-1">{program.progress}% complete</div>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${program.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {!program.enrolled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    enrollInProgram(program.id);
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Enroll Now
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Program Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedProgram ? (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProgram.title}</h2>
                <p className="text-gray-600 mb-4">{selectedProgram.description}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedProgram.difficulty)}`}>
                    {selectedProgram.difficulty}
                  </span>
                  <span className="text-sm text-gray-600">{selectedProgram.duration}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{selectedProgram.rating}</span>
                  </div>
                </div>
              </div>

              {/* Program Benefits */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Program Benefits</h3>
                <div className="grid grid-cols-1 gap-2">
                  {selectedProgram.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Program Modules */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Modules</h3>
                <div className="space-y-3">
                  {selectedProgram.modules.map((module, index) => (
                    <div
                      key={module.id}
                      className={`p-4 rounded-lg border ${
                        module.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            module.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {module.completed ? <CheckCircle className="w-4 h-4" /> : getModuleIcon(module.type)}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{module.title}</h4>
                            <p className="text-sm text-gray-500">{module.duration} • {module.type}</p>
                          </div>
                        </div>
                        
                        {selectedProgram.enrolled && !module.completed && (
                          <button
                            onClick={() => startModule(module.id)}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            Start
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {!selectedProgram.enrolled && (
                <button
                  onClick={() => enrollInProgram(selectedProgram.id)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  {selectedProgram.price === 0 ? 'Enroll for Free' : `Enroll for ₹${selectedProgram.price}`}
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Program</h3>
              <p className="text-gray-500">Choose a wellness program to view details and modules.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WellnessPrograms;