import React, { useState } from 'react';
import Header from './components/Header';
import GoalInput from './components/GoalInput';
import LoadingScreen from './components/LoadingScreen';
import VideoPlayer from './components/VideoPlayer';
import { fetchWorkoutVideos } from './services/api';
import { AppState, VideoRecommendation } from './types';
import { AlertCircle, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<AppState>('INPUT');
  const [recommendations, setRecommendations] = useState<VideoRecommendation[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleGoalSubmit = async (goal: string) => {
    setViewState('LOADING');
    setErrorMessage('');
    
    try {
      const videos = await fetchWorkoutVideos(goal);
      if (videos && videos.length > 0) {
        setRecommendations(videos);
        setViewState('RESULTS');
      } else {
        throw new Error('No videos found for this goal.');
      }
    } catch (error) {
      setViewState('ERROR');
      // Extract the message safely
      const msg = error instanceof Error ? error.message : 'An unexpected error occurred.';
      setErrorMessage(msg);
    }
  };

  const resetApp = () => {
    setViewState('INPUT');
    setRecommendations([]);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-red-900 selection:text-white">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-8">
        
        {viewState === 'INPUT' && (
          <GoalInput onSubmit={handleGoalSubmit} />
        )}

        {viewState === 'LOADING' && (
          <LoadingScreen />
        )}

        {viewState === 'RESULTS' && (
          <div className="w-full h-full flex flex-col">
            <div className="w-full max-w-7xl mx-auto px-6 mb-4 flex justify-end">
               <button 
                onClick={resetApp}
                className="flex items-center text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
               >
                 <RefreshCw className="w-4 h-4 mr-2" />
                 New Goal
               </button>
            </div>
            <VideoPlayer recommendations={recommendations} />
          </div>
        )}

        {viewState === 'ERROR' && (
          <div className="text-center px-6 max-w-lg mx-auto animate-fade-in">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/30 mb-6 border border-red-900/50">
                <AlertCircle className="w-8 h-8 text-red-500" />
             </div>
             <h3 className="text-xl font-bold text-white mb-4">Connection Failed</h3>
             <div className="bg-red-950/30 border border-red-900/30 rounded-lg p-4 mb-8 text-left">
                <p className="text-red-200 text-sm font-mono break-words">
                  {errorMessage || "Unknown error occurred."}
                </p>
             </div>
             <button 
               onClick={resetApp}
               className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold tracking-wide rounded-xl transition-all shadow-lg hover:shadow-red-900/40 transform hover:-translate-y-1"
             >
               Try Again
             </button>
          </div>
        )}

      </main>

      <footer className="py-6 text-center text-gray-700 text-sm">
        <p>&copy; {new Date().getFullYear()} Red Bulk App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;