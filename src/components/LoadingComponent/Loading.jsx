export default function Loading() {
    return (
        <div className="flex items-center justify-center h-[200px]">
          <div className="flex space-x-2">
            <div className="h-10 w-10 bg-red-500 rounded-full animate-bounce"></div>
            <div className="h-10 w-10 bg-green-500 rounded-full animate-bounce"></div>
            <div className="h-10 w-10 bg-blue-500 rounded-full animate-bounce"></div>
          </div>
      </div>
    )
  }