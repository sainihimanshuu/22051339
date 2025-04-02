import { useEffect, useState } from "react";

interface Post {
  postId: string;
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts?type=latest`);
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching feed", error);
      }
    };

    fetchFeed();
    const interval = setInterval(fetchFeed, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live Feed</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.postId} className="p-4 border rounded shadow-md">
            <img
              src={`https://source.unsplash.com/300x200/?random`}
              alt="Post"
              className="rounded-md mb-2"
            />
            <p className="font-semibold">Post ID: {post.postId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
