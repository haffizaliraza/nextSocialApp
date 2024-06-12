import React from "react";

const friends = [
  {
    id: 1,
    name: "Jane Doe",
    username: "@janedoe",
    avatar: "/path-to-avatar1.jpg", // Replace with your avatar paths
  },
  {
    id: 2,
    name: "Sam Smith",
    username: "@samsmith",
    avatar: "/path-to-avatar2.jpg",
  },
  {
    id: 3,
    name: "Alice Johnson",
    username: "@alicejohnson",
    avatar: "/path-to-avatar3.jpg",
  },
];

const FriendsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="bg-white w-full max-w-2xl mt-10 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Friends</h2>
        <ul className="space-y-4">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={friend.avatar}
                  alt={`${friend.name}'s Avatar`}
                />
                <div>
                  <h3 className="text-lg font-semibold">{friend.name}</h3>
                  <p className="text-gray-600">{friend.username}</p>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Message
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendsPage;
