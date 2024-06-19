"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Following = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (!user) {
          // Redirect to login if user is not authenticated
          router.push("/login");
          return;
        }

        const response = await fetch("/api/videos");
        const { data } = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user]);

  if (!user) {
    return null; // Or render a loading indicator or login prompt
  }

  // Example data for followed users/content
  const followedItems = [
    {
      id: 1,
      name: "User 1",
      description: "Content Creator",
    },
    { id: 2, name: "User 2", description: "Blogger" },
    { id: 3, name: "User 3", description: "Musician" },
    // Add more items as needed
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Following</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {followedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-4 bg-white shadow-md rounded-lg"
          >
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Following;
