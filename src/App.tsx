import React, { useState, useCallback, useMemo, type JSX } from 'react';
import { Send, X, Plus, Sparkles, Code, Target, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import UnderConstructionModal from './components/UnderConstructionModal'

interface ValidationErrors {
  [key: string]: string;
}

const App: React.FC = () => {
  const [projectTitle, setProjectTitle] = useState<string>('EcoTrack - Smart Environmental Monitoring Platform');
  const [projectDescription, setProjectDescription] = useState<string>('EcoTrack is an innovative IoT-powered environmental monitoring platform designed to help organizations and individuals track, analyze, and optimize their environmental impact in real-time. The system integrates advanced sensor networks, machine learning analytics, and intuitive dashboards to provide actionable insights for sustainable practices. Built with scalability in mind, EcoTrack serves both residential users and enterprise clients, offering customizable monitoring solutions that adapt to specific environmental goals and compliance requirements.');
  const [requirements, setRequirements] = useState<string[]>([
    'Develop a real-time IoT sensor integration system capable of collecting environmental data including air quality metrics (PM2.5, CO2, VOCs), temperature, humidity, and energy consumption patterns from multiple device categories and building zones.',
    'Implement machine learning algorithms for predictive analytics that can forecast environmental trends, detect anomalies, provide optimization recommendations, and generate automated sustainability reports with actionable insights.',
    'Create responsive web and mobile applications with interactive dashboards featuring customizable widgets, data visualization tools, carbon footprint tracking, and comprehensive reporting capabilities for different user roles.',
    'Build a notification system with configurable alerts for threshold breaches, goal achievements, and compliance monitoring, including email, SMS, and in-app notifications with escalation workflows.',
    'Design a scalable cloud infrastructure with secure data storage, API endpoints for third-party integrations, user authentication, role-based access control, and support for multi-tenant architecture.'
  ]);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [showModal, setShowModal] = useState<boolean>(false);

  const addRequirement = useCallback((): void => {
    setRequirements(prev => [...prev, '']);
  }, []);

  const updateRequirement = useCallback((index: number, value: string): void => {
    setRequirements(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
    
    // Clear validation error for this field
    if (validationErrors[`requirement-${index}`]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[`requirement-${index}`];
        return updated;
      });
    }
  }, [validationErrors]);
  
  const removeRequirement = useCallback((index: number): void => {
    if (requirements.length > 1) {
      setRequirements(prev => prev.filter((_, i) => i !== index));
    }
  }, [requirements.length]);

  const validateForm = useCallback((): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    if (!projectTitle.trim()) {
      errors.projectTitle = 'Project title is required';
    } else if (projectTitle.trim().length < 3) {
      errors.projectTitle = 'Project title must be at least 3 characters';
    }
    
    if (!projectDescription.trim()) {
      errors.projectDescription = 'Project description is required';
    } else if (projectDescription.trim().length < 50) {
      errors.projectDescription = 'Project description must be at least 50 characters';
    }
    
    const validRequirements = requirements.filter(req => req.trim());
    if (validRequirements.length === 0) {
      errors.requirements = 'At least one requirement is required';
    } else {
      requirements.forEach((req, index) => {
        if (req.trim() && req.trim().length < 10) {
          errors[`requirement-${index}`] = 'Requirement must be at least 10 characters';
        }
      });
    }
    
    return errors;
  }, [projectTitle, projectDescription, requirements]);

  const handleSubmit = useCallback(async (): Promise<void> => {
    const errors = validateForm();
    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    // Show the under construction modal instead of processing
    setShowModal(true);
  }, [validateForm]);

  const completionPercentage = useMemo((): number => {
    const titleComplete = projectTitle.trim() ? 1 : 0;
    const descriptionComplete = projectDescription.trim() ? 1 : 0;
    const requirementsComplete = requirements.filter(r => r.trim()).length > 0 ? 1 : 0;
    return Math.round((titleComplete + descriptionComplete + requirementsComplete) / 3 * 100);
  }, [projectTitle, projectDescription, requirements]);

  const isFormValid = useMemo(() => {
    return projectTitle.trim() && 
           projectDescription.trim() && 
           requirements.filter(r => r.trim()).length > 0 &&
           Object.keys(validateForm()).length === 0;
  }, [projectTitle, projectDescription, requirements, validateForm]);

  const renderError = (fieldName: string): JSX.Element | null => {
    if (validationErrors[fieldName]) {
      return (
        <div className="flex items-center mt-2 text-red-400 text-sm">
          <AlertCircle size={14} className="mr-1 flex-shrink-0" />
          <span>{validationErrors[fieldName]}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-white/5 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900/80 via-gray-900/80 to-slate-900/80 backdrop-blur-sm p-6 sm:p-8 border-b border-white/10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Sparkles size={28} className="text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                The Weaver
              </h1>
            </div>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Your personal Software Development Life Cycle co-pilot
              <br className="hidden sm:block" />
              Provide your project requirements to get started with intelligent development planning and implementation.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Project Title */}
          <div className="space-y-3">
            <label className="flex items-center text-lg font-semibold text-slate-200 mb-3">
              <Target size={20} className="mr-3 text-blue-400" />
              Project Title
              <span className="text-red-400 ml-1">*</span>
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => {
                setProjectTitle(e.target.value);
                if (validationErrors.projectTitle) {
                  setValidationErrors(prev => {
                    const updated = { ...prev };
                    delete updated.projectTitle;
                    return updated;
                  });
                }
              }}
              className={`w-full p-4 bg-slate-800/50 backdrop-blur-sm border rounded-2xl text-slate-200 placeholder-slate-500 transition-all duration-300 text-lg focus:outline-none focus:ring-2 ${
                validationErrors.projectTitle 
                  ? 'border-red-500 focus:border-red-400 focus:ring-red-500/20' 
                  : 'border-slate-600 focus:border-blue-400 focus:ring-blue-500/20 hover:border-slate-500'
              }`}
              placeholder="Enter a descriptive project title..."
              maxLength={100}
            />
            {renderError('projectTitle')}
            <div className="text-right text-xs text-slate-500">
              {projectTitle.length}/100 characters
            </div>
          </div>

          {/* Project Description */}
          <div className="space-y-3">
            <label className="flex items-center text-lg font-semibold text-slate-200 mb-3">
              <Code size={20} className="mr-3 text-emerald-400" />
              Project Description
              <span className="text-red-400 ml-1">*</span>
            </label>
            <textarea
              value={projectDescription}
              onChange={(e) => {
                setProjectDescription(e.target.value);
                if (validationErrors.projectDescription) {
                  setValidationErrors(prev => {
                    const updated = { ...prev };
                    delete updated.projectDescription;
                    return updated;
                  });
                }
              }}
              rows={6}
              className={`w-full p-4 bg-slate-800/50 backdrop-blur-sm border rounded-2xl text-slate-200 placeholder-slate-500 transition-all duration-300 text-base leading-relaxed resize-none focus:outline-none focus:ring-2 ${
                validationErrors.projectDescription
                  ? 'border-red-500 focus:border-red-400 focus:ring-red-500/20'
                  : 'border-slate-600 focus:border-emerald-400 focus:ring-emerald-500/20 hover:border-slate-500'
              }`}
              placeholder="Provide a comprehensive description of your project, including goals, target audience, and key features..."
              maxLength={2000}
            />
            {renderError('projectDescription')}
            <div className="text-right text-xs text-slate-500">
              {projectDescription.length}/2000 characters
            </div>
          </div>

          {/* Project Requirements */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <label className="flex items-center text-lg font-semibold text-slate-200">
                <Zap size={20} className="mr-3 text-amber-400" />
                Project Requirements
                <span className="text-red-400 ml-1">*</span>
              </label>
              <button
                onClick={addRequirement}
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <Plus size={18} className="mr-2" />
                Add Requirement
              </button>
            </div>

            {validationErrors.requirements && renderError('requirements')}

            <div className="space-y-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="group relative">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-slate-300 text-sm font-medium mt-2">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={requirement}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        rows={3}
                        className={`w-full p-4 bg-slate-800/50 backdrop-blur-sm border rounded-xl text-slate-200 placeholder-slate-500 transition-all duration-300 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 group-hover:border-slate-500 ${
                          validationErrors[`requirement-${index}`]
                            ? 'border-red-500 focus:border-red-400 focus:ring-red-500/20'
                            : 'border-slate-600 focus:border-purple-400 focus:ring-purple-500/20'
                        }`}
                        placeholder={`Describe requirement ${index + 1} in detail...`}
                        maxLength={500}
                      />
                      {renderError(`requirement-${index}`)}
                      <div className="text-right text-xs text-slate-500 mt-1">
                        {requirement.length}/500 characters
                      </div>
                    </div>
                    {requirements.length > 1 && (
                      <button
                        onClick={() => removeRequirement(index)}
                        className="flex-shrink-0 p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none mt-2"
                        title="Remove requirement"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CheckCircle size={20} className="mr-2 text-blue-400" />
                <span className="text-slate-300 font-medium">Form Completion</span>
              </div>
              <span className={`font-bold text-lg ${
                completionPercentage === 100 ? 'text-green-400' : 'text-blue-400'
              }`}>
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="mt-3 text-sm text-slate-400">
              {completionPercentage < 100 ? 
                'Complete all required fields to proceed' : 
                'Ready to submit your requirements'
              }
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {showModal ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Processing Requirements...
                </>
              ) : (
                <>
                  <Send size={20} className="mr-3" />
                  Generate SDLC Plan
                </>
              )}
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20 hover:border-blue-400/30 transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mr-3">
                  <Sparkles size={18} className="text-blue-400" />
                </div>
                <div className="text-blue-400 font-semibold">AI Analysis</div>
              </div>
              <div className="text-slate-400 text-sm leading-relaxed">
                Advanced AI algorithms analyze your requirements to identify patterns, dependencies, and optimization opportunities.
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-sm p-6 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/30 transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mr-3">
                  <Target size={18} className="text-emerald-400" />
                </div>
                <div className="text-emerald-400 font-semibold">SDLC Generation</div>
              </div>
              <div className="text-slate-400 text-sm leading-relaxed">
                Complete development lifecycle with phases, milestones, deliverables, and timeline estimates.
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/30 transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mr-3">
                  <Code size={18} className="text-purple-400" />
                </div>
                <div className="text-purple-400 font-semibold">Smart Recommendations</div>
              </div>
              <div className="text-slate-400 text-sm leading-relaxed">
                Curated technology stack, architecture patterns, and best practices tailored to your project needs.
              </div>
            </div>
          </div>
        </div>
        <UnderConstructionModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
        />
      </div>
    </div>
  );
};

export default App;