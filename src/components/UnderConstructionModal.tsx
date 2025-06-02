
import React, { useState, useCallback, type ChangeEvent } from 'react';
import { X, Sparkles, CheckCircle, Clock, Users, Bell } from 'lucide-react';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UnderConstructionModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [hasJoined, setHasJoined] = useState<boolean>(false);

  const handleJoinWaitlist = useCallback(async (): Promise<void> => {
    if (!email.trim() || !email.includes('@')) return;
    
    setIsJoining(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setHasJoined(true);
      console.log('Added to waitlist:', email);
    } catch (error) {
      console.error('Failed to join waitlist:', error);
    } finally {
      setIsJoining(false);
    }
  }, [email]);

  const handleClose = useCallback((): void => {
    setEmail('');
    setHasJoined(false);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 w-full max-w-md overflow-hidden animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                <Clock size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Under Construction</h2>
                <p className="text-slate-300 text-sm">Feature in development</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!hasJoined ? (
            <>
              {/* Construction Message */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={32} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  AI-Powered SDLC Generation Coming Soon!
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We're building something amazing! Our AI-powered Software Development Life Cycle generator is currently under development. Be the first to know when it's ready.
                </p>
              </div>

              {/* Features Preview */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-slate-300">
                  <CheckCircle size={16} className="text-green-400 mr-3 flex-shrink-0" />
                  <span>Intelligent project analysis & planning</span>
                </div>
                <div className="flex items-center text-sm text-slate-300">
                  <CheckCircle size={16} className="text-green-400 mr-3 flex-shrink-0" />
                  <span>Automated timeline & milestone generation</span>
                </div>
                <div className="flex items-center text-sm text-slate-300">
                  <CheckCircle size={16} className="text-green-400 mr-3 flex-shrink-0" />
                  <span>Technology stack recommendations</span>
                </div>
                <div className="flex items-center text-sm text-slate-300">
                  <CheckCircle size={16} className="text-green-400 mr-3 flex-shrink-0" />
                  <span>Risk assessment & mitigation strategies</span>
                </div>
              </div>

              {/* Waitlist Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Join our waitlist for early access
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full p-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 focus:outline-none"
                  />
                </div>
                
                <button
                  onClick={handleJoinWaitlist}
                  disabled={!email.trim() || !email.includes('@') || isJoining}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none flex items-center justify-center"
                >
                  {isJoining ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Joining Waitlist...
                    </>
                  ) : (
                    <>
                      <Bell size={18} className="mr-2" />
                      Join Waitlist
                    </>
                  )}
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center mt-6 pt-4 border-t border-slate-700">
                <div className="flex items-center text-slate-400 text-sm">
                  <Users size={16} className="mr-2" />
                  <span>Join 2,847+ developers already waiting</span>
                </div>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                You're on the list!
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Thanks for joining our waitlist. We'll notify you as soon as the AI-powered SDLC generator is ready for early access.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all duration-200"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionModal;