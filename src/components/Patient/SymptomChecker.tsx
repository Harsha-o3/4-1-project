import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Clock, Phone, Stethoscope } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface SymptomCheckerResult {
  possibleConditions: string[];
  urgencyLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
  recommendations: string[];
  shouldSeeDoctor: boolean;
}

const SymptomChecker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [severity, setSeverity] = useState(5);
  const [customSymptom, setCustomSymptom] = useState('');
  const [result, setResult] = useState<SymptomCheckerResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const commonSymptoms = [
    'Fever', 'Cough', 'Headache', 'Stomach pain', 'Chest pain',
    'Difficulty breathing', 'Dizziness', 'Nausea', 'Vomiting',
    'Diarrhea', 'Fatigue', 'Body aches', 'Sore throat',
    'Runny nose', 'Rash', 'Joint pain', 'Back pain',
    'Loss of appetite', 'Weight loss', 'Sleep problems'
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      setSelectedSymptoms(prev => [...prev, customSymptom.trim()]);
      setCustomSymptom('');
    }
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error('Please select at least one symptom');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/symptom-checker', {
        symptoms: selectedSymptoms,
        age: parseInt(age) || 25,
        gender: gender || 'unknown',
        severity
      });

      setResult(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to analyze symptoms');
    } finally {
      setIsLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'LOW': return 'text-green-600 bg-green-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'HIGH': return 'text-orange-600 bg-orange-100';
      case 'EMERGENCY': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'LOW': return <CheckCircle className="w-5 h-5" />;
      case 'MEDIUM': return <Clock className="w-5 h-5" />;
      case 'HIGH': return <AlertCircle className="w-5 h-5" />;
      case 'EMERGENCY': return <Phone className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const reset = () => {
    setSelectedSymptoms([]);
    setAge('');
    setGender('');
    setSeverity(5);
    setResult(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Symptom Checker</h1>
        <p className="text-gray-600">Get instant health insights based on your symptoms</p>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Important Disclaimer</p>
              <p>This tool provides general health information only and should not replace professional medical advice. Always consult a healthcare provider for proper diagnosis and treatment.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  min="1"
                  max="120"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity Level: {severity}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>
          </div>

          {/* Symptom Selection */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Symptoms</h3>
            
            {/* Custom Symptom Input */}
            <div className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customSymptom}
                  onChange={(e) => setCustomSymptom(e.target.value)}
                  placeholder="Add custom symptom..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
                />
                <button
                  onClick={addCustomSymptom}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Common Symptoms */}
            <div className="grid grid-cols-2 gap-2">
              {commonSymptoms.map(symptom => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`p-3 text-sm rounded-lg border transition-colors text-left ${
                    selectedSymptoms.includes(symptom)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>

            {/* Selected Symptoms */}
            {selectedSymptoms.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Symptoms:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map(symptom => (
                    <span
                      key={symptom}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {symptom}
                      <button
                        onClick={() => toggleSymptom(symptom)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={analyzeSymptoms}
              disabled={isLoading || selectedSymptoms.length === 0}
              className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* Urgency Level */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Result</h3>
                
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getUrgencyColor(result.urgencyLevel)}`}>
                  {getUrgencyIcon(result.urgencyLevel)}
                  <span className="font-medium">{result.urgencyLevel} Priority</span>
                </div>

                {result.urgencyLevel === 'EMERGENCY' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-red-900">Seek Immediate Medical Attention</span>
                    </div>
                    <p className="text-red-800 text-sm mt-1">Call emergency services or visit the nearest hospital immediately.</p>
                  </div>
                )}
              </div>

              {/* Possible Conditions */}
              {result.possibleConditions.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Possible Conditions</h3>
                  <div className="space-y-2">
                    {result.possibleConditions.map((condition, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Stethoscope className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {result.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{recommendation}</span>
                    </div>
                  ))}
                </div>

                {result.shouldSeeDoctor && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">Doctor Consultation Recommended</span>
                    </div>
                    <p className="text-blue-800 text-sm mt-1">Based on your symptoms, we recommend consulting with a healthcare professional.</p>
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Book Appointment
                    </button>
                  </div>
                )}
              </div>

              {/* Reset Button */}
              <button
                onClick={reset}
                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Start New Assessment
              </button>
            </>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-center py-8">
                <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Analyze</h3>
                <p className="text-gray-500">Select your symptoms and click "Analyze Symptoms" to get health insights.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;