import Link from 'next/link';

export default function PostView({ post }) {
    return (
        <div className="w-full border rounded-lg p-6 shadow-md mb-6 flex flex-col md:flex-row items-stretch">
            <div className="flex-1 md:pr-6">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-2">{post.date}</p>
                <p className="mb-4"><strong>Description: </strong>{post.description}</p>
                <Link 
                    href={`/blog/?postId=${post.id}`} 
                    className="text-blue-500 hover:underline"
                >
                    Read More
                </Link>
            </div>
            {post.image && (
                <div className="flex-shrink-0 md:w-1/3 md:ml-auto">
                    <img 
                        src={post.image.url} 
                        alt={post.title} 
                        className="w-full h-24 object-cover rounded"
                    />
                </div>
            )}
        </div>
    );
}
