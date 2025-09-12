import React from "react";

export default function CallToAction1() {
  return (
    <div className="bg-white dark:bg-gray-900 w-full px-4 sm:px-6 py-8 overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 max-w-none mx-0">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white flex items-center justify-center lg:justify-start gap-4">
            <img
              src="https://swarajdesk.adityahota.online/logo.png"
              alt="SwarajDesk Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
            SwarajDesk
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6">
            SwarajDesk empowers citizens to report civic issues directly to
            authorities with AI-powered categorization and real-time tracking.
            Transform your community through transparent, efficient, and
            responsive governance.
          </p>
          
          <div className="space-y-4 max-w-xl mx-auto lg:mx-0">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-600 dark:text-gray-400 text-base">
                <span className="font-semibold text-gray-800 dark:text-gray-200">AI-Powered Solutions:</span> Our advanced machine learning algorithms automatically categorize and prioritize civic issues for faster resolution.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-600 dark:text-gray-400 text-base">
                <span className="font-semibold text-gray-800 dark:text-gray-200">Real-Time Tracking:</span> Stay updated on your complaint status with live notifications and progress tracking from submission to resolution.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-600 dark:text-gray-400 text-base">
                <span className="font-semibold text-gray-800 dark:text-gray-200">Community Impact:</span> Join thousands of citizens who have successfully resolved issues and made their neighborhoods better places to live.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button
              type="button"
              className="group bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 px-8 py-3 text-white dark:text-black font-semibold rounded-full text-base flex items-center gap-2 justify-center shadow-md hover:shadow-lg"
            >
              Learn More
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
            <a
              href="https://pub-a7deba7d0b9642f8afcfd3aebbcb446f.r2.dev/SwarajDesk.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 px-8 py-3 text-black dark:text-white font-semibold rounded-full text-base flex items-center gap-2 justify-center border border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg"
            >
              Download our app
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Phone Mockup */}
        <div className="flex-1 flex justify-center lg:justify-end relative w-full">
          {/* Enhanced iPhone 15 Pro Max mockup with smooth hover animation */}
          <div className="relative w-[270px] h-[550px] rounded-[3rem] p-[5px] transform rotate-3 hover:rotate-0 hover:translate-x-2 hover:-translate-x-2 transition-all duration-700 ease-in-out overflow-hidden bg-gradient-to-b from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 border border-gray-700/50">
            {/* Screen */}
            <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-black">
              {/* Dynamic Island - Enhanced with visible cameras */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-black rounded-full z-20 shadow-2xl border border-gray-700/50 flex items-center justify-between px-3">
                {/* Front camera (left) */}
                <div className="w-2.5 h-2.5 bg-gray-300 rounded-full shadow-inner border border-gray-400/30"></div>
                
                {/* Center sensor array */}
                <div className="flex items-center gap-1">
                  {/* Ambient light sensor */}
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                  {/* Proximity sensor */}
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                </div>
                
                {/* Microphone (right) */}
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 via-gray-700/20 to-gray-800/30 rounded-full"></div>
                
                {/* Animated breathing effect */}
                <div className="absolute inset-0 bg-white/5 rounded-full animate-pulse"></div>
              </div> 
              
              {/* App Screen Content */}
              <div className="relative w-full h-full">
                <img
                  src="mobileview.png"
                  alt="SwarajDesk Mobile App"
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                />
                
                {/* Enhanced overlay gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Subtle screen reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
            
            
            {/* Side lighting effect */}
            <div className="absolute top-1/2 -left-2 w-4 h-32 bg-gradient-to-r from-white/10 to-transparent rounded-r-full blur-sm"></div>
            <div className="absolute top-1/2 -right-2 w-4 h-32 bg-gradient-to-l from-white/10 to-transparent rounded-l-full blur-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}