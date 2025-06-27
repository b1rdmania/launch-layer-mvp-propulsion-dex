import Link from "next/link";

export default function BetaPage() {
  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <div className="glass-card p-12 rounded-3xl shadow-glass backdrop-blur-xl max-w-2xl text-center">
          <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-purple">
            <span className="text-2xl">🚀</span>
          </div>
          
          <h1 className="text-4xl font-bold gradient-text mb-6">Beta Experience</h1>
          
          <p className="text-lg text-primary-300 mb-8 leading-relaxed">
            This is a placeholder for the upcoming Beta user experience. 
            Stay tuned for new features, advanced trading tools, and enhanced design!
          </p>

          <div className="space-y-4 mb-8">
            <div className="glass-card p-4 rounded-2xl">
              <h3 className="text-primary-200 font-semibold mb-2 flex items-center justify-center space-x-2">
                <span>✨</span>
                <span>Coming Soon Features</span>
              </h3>
              <ul className="text-sm text-primary-300 space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="text-primary-400">•</span>
                  <span>Advanced trading charts and analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary-400">•</span>
                  <span>Portfolio tracking and management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary-400">•</span>
                  <span>Enhanced liquidity pool strategies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary-400">•</span>
                  <span>Real-time notifications and alerts</span>
                </li>
              </ul>
            </div>
          </div>

          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-purple text-white rounded-2xl font-semibold hover:shadow-purple transition-all duration-300 hover:scale-105 neon-glow"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to DEX</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="glass-card p-4 rounded-2xl">
            <p className="text-primary-400 text-xs">
              🌊 Powered by SilverSwap • Sonic Mainnet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 