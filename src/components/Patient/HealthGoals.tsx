import React, { useState } from 'react';
import { Target, Plus, TrendingUp, Calendar, Award, CheckCircle, Clock, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

interface HealthGoal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: 'active' | 'completed' | 'paused';
  priority: 'low' | 'medium' | 'high';
  milestones: Milestone[];
  createdAt: string;
}

interface Milestone {
  id: string;
  title: string;
  targetValue: number;
  completed: boolean;
  completedAt?: string;
}

const HealthGoals: React.FC = () => {
  const [goals, setGoals] = useState<HealthGoal[]>([
    {
      id: '1',
      title: 'Lose 5kg Weight',
      description: 'Achieve healthy weight through diet and exercise',
      category: 'Weight Management',
      targetValue: 65,
      currentValue: 68,
      unit: 'kg',
      deadline: '2024-06-01',
      status: 'active',
      priority: 'high',
      createdAt: '2024-01-01',
      milestones: [
        { id: '1', title: 'Lose 2kg', targetValue: 68, completed: true, completedAt: '2024-01-15' },
        { id: '2', title: 'Lose 3kg', targetValue: 67, completed: false },
        { id: '3', title: 'Reach target 65kg', targetValue: 65, completed: false }
      ]
    },
    {
      id: '2',
      title: 'Walk 10,000 Steps Daily',
      description: 'Maintain daily walking routine for better cardiovascular health',
      category: 'Fitness',
      targetValue: 10000,
      currentValue: 7500,
      unit: 'steps',
      deadline: '2024-12-31',
      status: 'active',
      priority: 'medium',
      createdAt: '2024-01-01',
      milestones: [
        { id: '1', title: 'Walk 5000 steps daily', targetValue: 5000, completed: true, completedAt: '2024-01-10' },
        { id: '2', title: 'Walk 7500 steps daily', targetValue: 7500, completed: true, completedAt: '2024-01-20' },
        { id: '3', title: 'Walk 10000 steps daily', targetValue: 10000, completed: false }
      ]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<HealthGoal | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    targetValue: 0,
    currentValue: 0,
    unit: '',
    deadline: '',
    priority: 'medium'
  });

  const categories = ['Weight Management', 'Fitness', 'Nutrition', 'Mental Health', 'Sleep', 'Medication Adherence'];
  const priorityColors = {
    low: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    high: 'text-red-600 bg-red-100'
  };

  const statusColors = {
    active: 'text-blue-600 bg-blue-100',
    completed: 'text-green-600 bg-green-100',
    paused: 'text-gray-600 bg-gray-100'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGoal: HealthGoal = {
      id: Date.now().toString(),
      ...formData,
      status: 'active',
      milestones: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setGoals([...goals, newGoal]);
    setFormData({
      title: '',
      description: '',
      category: '',
      targetValue: 0,
      currentValue: 0,
      unit: '',
      deadline: '',
      priority: 'medium'
    });
    setShowAddForm(false);
    toast.success('Health goal created successfully!');
  };

  const updateProgress = (goalId: string, newValue: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, currentValue: newValue } : goal
    ));
    toast.success('Progress updated!');
  };

  const calculateProgress = (goal: HealthGoal) => {
    const progress = Math.min((goal.currentValue / goal.targetValue) * 100, 100);
    return Math.round(progress);
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const activeGoals = goals.filter(g => g.status === 'active').length;
  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const totalMilestones = goals.reduce((sum, g) => sum + g.milestones.filter(m => m.completed).length, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Goals</h1>
        <p className="text-gray-600">Set and track your personal health and wellness goals</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Goals</p>
              <p className="text-2xl font-bold text-blue-600">{activeGoals}</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedGoals}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Milestones</p>
              <p className="text-2xl font-bold text-purple-600">{totalMilestones}</p>
            </div>
            <Award className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-yellow-600">
                {goals.length > 0 ? Math.round((completedGoals / goals.length) * 100) : 0}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Health Goal</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Value</label>
                <input
                  type="number"
                  value={formData.targetValue}
                  onChange={(e) => setFormData({ ...formData, targetValue: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Value</label>
                <input
                  type="number"
                  value={formData.currentValue}
                  onChange={(e) => setFormData({ ...formData, currentValue: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="kg, steps, hours"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Goal
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goals List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">My Health Goals</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add Goal</span>
            </button>
          </div>

          {goals.map(goal => {
            const progress = calculateProgress(goal);
            const daysRemaining = getDaysRemaining(goal.deadline);
            
            return (
              <div
                key={goal.id}
                onClick={() => setSelectedGoal(goal)}
                className={`bg-white p-6 rounded-xl shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                  selectedGoal?.id === goal.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{goal.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{goal.description}</p>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[goal.status]}`}>
                        {goal.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[goal.priority]}`}>
                        {goal.priority} priority
                      </span>
                      <span className="text-xs text-gray-500">{goal.category}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {goal.currentValue}/{goal.targetValue}
                    </div>
                    <div className="text-sm text-gray-500">{goal.unit}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {daysRemaining > 0 ? `${daysRemaining} days left` : 'Deadline passed'}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newValue = prompt(`Update ${goal.title} (${goal.unit}):`);
                      if (newValue) updateProgress(goal.id, parseFloat(newValue));
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Goal Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {selectedGoal ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedGoal.title}</h2>
                  <p className="text-gray-600">{selectedGoal.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedGoal.status]}`}>
                  {selectedGoal.status}
                </span>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Progress</label>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedGoal.currentValue} {selectedGoal.unit}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Target</label>
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedGoal.targetValue} {selectedGoal.unit}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Progress</label>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress(selectedGoal)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{calculateProgress(selectedGoal)}% complete</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Milestones</h3>
                  <div className="space-y-3">
                    {selectedGoal.milestones.map(milestone => (
                      <div
                        key={milestone.id}
                        className={`p-3 rounded-lg border ${
                          milestone.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              milestone.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>
                              {milestone.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                              {milestone.completedAt && (
                                <p className="text-sm text-green-600">
                                  Completed on {new Date(milestone.completedAt).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {milestone.targetValue} {selectedGoal.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Created:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(selectedGoal.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Deadline:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(selectedGoal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Goal</h3>
              <p className="text-gray-500">Choose a health goal to view progress and milestones.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthGoals;