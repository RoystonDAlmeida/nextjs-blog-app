//app/LoadingComponents/PostsViewSkeleton.js

export default function PostsViewSkeleton() {
    return (
        <div className="w-full border rounded-lg p-6 shadow-md mb-6 flex flex-col md:flex-row items-stretch">
            <div className="flex-1 md:pr-6">
                <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4"></div>
            </div>
            <div className="flex-shrink-0 md:w-1/3 md:ml-auto">
                <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    );
}
