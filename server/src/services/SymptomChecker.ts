import { SymptomCheckerRequest, SymptomCheckerResponse } from '../types/index.js';

// Simple rule-based symptom checker
// In production, integrate with ML models or medical APIs
export class SymptomCheckerService {
  private static symptoms = {
    fever: { conditions: ['Viral Infection', 'Bacterial Infection', 'Malaria'], urgency: 'MEDIUM' },
    cough: { conditions: ['Common Cold', 'Bronchitis', 'Pneumonia'], urgency: 'MEDIUM' },
    'chest pain': { conditions: ['Heart Attack', 'Angina', 'Muscle Strain'], urgency: 'HIGH' },
    'difficulty breathing': { conditions: ['Asthma', 'Pneumonia', 'Heart Failure'], urgency: 'HIGH' },
    headache: { conditions: ['Tension Headache', 'Migraine', 'Sinusitis'], urgency: 'LOW' },
    'stomach pain': { conditions: ['Gastritis', 'Food Poisoning', 'Appendicitis'], urgency: 'MEDIUM' },
    dizziness: { conditions: ['Low Blood Pressure', 'Dehydration', 'Inner Ear Problem'], urgency: 'MEDIUM' },
    rash: { conditions: ['Allergic Reaction', 'Eczema', 'Viral Rash'], urgency: 'LOW' }
  };

  static async analyzeSymptoms(request: SymptomCheckerRequest): Promise<SymptomCheckerResponse> {
    const { symptoms, age, gender, severity } = request;
    
    const matchedConditions = new Set<string>();
    let maxUrgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY' = 'LOW';

    // Analyze each symptom
    for (const symptom of symptoms) {
      const symptomData = this.symptoms[symptom.toLowerCase() as keyof typeof this.symptoms];
      if (symptomData) {
        symptomData.conditions.forEach(condition => matchedConditions.add(condition));
        
        if (this.getUrgencyLevel(symptomData.urgency as any) > this.getUrgencyLevel(maxUrgency)) {
          maxUrgency = symptomData.urgency as any;
        }
      }
    }

    // Adjust urgency based on age and severity
    if (age > 65 || age < 2) {
      maxUrgency = this.escalateUrgency(maxUrgency);
    }
    
    if (severity >= 8) {
      maxUrgency = this.escalateUrgency(maxUrgency);
    }

    // Emergency symptoms
    const emergencySymptoms = ['chest pain', 'difficulty breathing', 'severe bleeding', 'unconscious'];
    if (symptoms.some(s => emergencySymptoms.includes(s.toLowerCase()))) {
      maxUrgency = 'EMERGENCY';
    }

    const recommendations = this.generateRecommendations(maxUrgency, Array.from(matchedConditions));

    return {
      possibleConditions: Array.from(matchedConditions).slice(0, 5),
      urgencyLevel: maxUrgency,
      recommendations,
      shouldSeeDoctor: maxUrgency === 'HIGH' || maxUrgency === 'EMERGENCY' || matchedConditions.size === 0
    };
  }

  private static getUrgencyLevel(urgency: string): number {
    const levels = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3, 'EMERGENCY': 4 };
    return levels[urgency as keyof typeof levels] || 1;
  }

  private static escalateUrgency(current: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY'): 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY' {
    const escalation = {
      'LOW': 'MEDIUM' as const,
      'MEDIUM': 'HIGH' as const,
      'HIGH': 'EMERGENCY' as const,
      'EMERGENCY': 'EMERGENCY' as const
    };
    return escalation[current];
  }

  private static generateRecommendations(urgency: string, conditions: string[]): string[] {
    const recommendations = [];

    switch (urgency) {
      case 'EMERGENCY':
        recommendations.push('Seek immediate medical attention or call emergency services');
        recommendations.push('Do not delay treatment');
        break;
      case 'HIGH':
        recommendations.push('Schedule an appointment with a doctor within 24 hours');
        recommendations.push('Monitor symptoms closely');
        break;
      case 'MEDIUM':
        recommendations.push('Schedule an appointment with a doctor within 2-3 days');
        recommendations.push('Rest and stay hydrated');
        break;
      default:
        recommendations.push('Rest and monitor symptoms');
        recommendations.push('Consider home remedies');
        recommendations.push('See a doctor if symptoms persist for more than 3 days');
    }

    if (conditions.length === 0) {
      recommendations.push('Consult with a healthcare professional for proper diagnosis');
    }

    return recommendations;
  }
}