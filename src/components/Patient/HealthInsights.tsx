import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Heart, Brain, Target, Calendar, Award } from 'lucide-react';

interface HealthInsight {
  id: string;
  type: 'improvement' | 'concern' | 'achievement' | 'recommendation';
  title: string;
  description: string;
  metric: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  category: string;
}

const HealthInsights: React.FC = () => {
  const [insights] = useState<HealthInsight[]>([
    {
      id: '1',
      type: 'improvement',
      title: 'Blood Pressure Improving',
      description: 'Your blood pressure readings have shown consistent improvement over the past month.',
      metric: 'Blood Pressure',
      value: '125/82 mmHg',
      trend: 'down',
      priority: 'medium',
      actionable: true,
      category: 'Cardiovascular'
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Medication Adherence Goal Met',
      description: 'Congratulations! You\'ve maintained 95% medication adherence this month.',
      metric: 'Adherence Rate',
      value: '95%',
      trend: 'up',
      priority: 'low',
      actionable: false,
      category: 'Medication'
    },
    {
      id: '3',
      type: 'concern',
      title: 'Weight Trend Needs Attention',
      description: 'Your weight has increased by 3kg over the past 2 months. Consider dietary adjustments.',
      metric: 'Weight',
      value: '73 kg',
      trend: 'up',
      priority: 'high',
      actionable: true,
      category: 'Lifestyle'
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Schedule Routine Checkup',
      description: 'It\'s been 6 months since your last comprehensive health checkup.',
      metric: 'Last Checkup',
      value: '6 months ago',
      trend: 'stable',
      priority: 'medium',
      actionable: true,
      category: 'Preventive'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Cardiovascular', 'Medication', 'Lifestyle', 'Preventive'];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'improvement': return <TrendingUp className="w-6 h-6" />;
      case 'concern': return <TrendingDown className="w-6 h-6" />;
      case 'achievement': return <Award className="w-6 h-6" />;
      case 'recommendation': return <Target className="w-6 h-6" />;
      default: return <Activity className="w-6 h-6" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'improvement': return 'text-green-600 bg-green-100';
      case 'concern': return 'text-red-600 bg-red-100';
      case 'achievement': return 'text-purple-600 bg-purple-100';
      case 'recommendation': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const filteredInsights = insights.filter(insight => 
    selectedCategory === 'all' || insight.category === selectedCategory
  );

  const insightStats = {
    total: insights.length,
    improvements: insights.filter(i => i.type === 'improvement').length,
    concerns: insights.filter(i => i.type === 'concern').length,
    achievements: insights.filter(i => i.type === 'achievement').length
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Insights</h1>
        <p className="text-gray-600">AI-powered insights to help you understand and improve your health</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Insights</p>
              <p className="text-2xl font-bold text-gray-900">{insightStats.total}</p>
            </div>
            <Brain className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Improvements</p>
              <p className="text-2xl font-bold text-green-600">{insightStats.improvements}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Concerns</p>
              <p className="text-2xl font-bold text-red-600">{insightStats.concerns}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-purple-600">{insightStats.achievements}</p>
            </div>
            <Award className="w-8 h-8 text-purple-600" />
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
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-6">
        {filteredInsights.map(insight => (
          <div
            key={insight.id}
            className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${getPriorityColor(insight.priority)} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getInsightColor(insight.type)}`}>
                {getInsightIcon(insight.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{insight.title}</h3>
                    <p className="text-gray-600">{insight.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{insight.value}</div>
                    <div className="text-sm text-gray-500">{insight.metric}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getInsightColor(insight.type)}`}>
                      {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">{insight.category}</span>
                  </div>
                  
                  {insight.actionable && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Take Action
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthInsights;