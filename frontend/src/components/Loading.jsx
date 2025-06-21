import React from 'react'

const Loading = () => {
  return (
    <div className="max-w-[1048px] mx-auto px-4 my-5 md:my-8">
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-gray-600 text-lg font-medium">Loading your data...</p>
        <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
    </div>
</div>
  )
}

export default Loading
