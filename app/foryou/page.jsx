import VideoCard from "../../components/VideoCard.jsx";

// Dummy video data
const dummyVideos = [
  {
    id: 1,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    user: {
      name: "User 1",
      avatar: "/avatar1.png",
      username: "@user1",
    },
    likes: 500,
    comments: 120,
    shares: 80,
  },
  {
    id: 2,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    user: {
      name: "User 2",
      avatar: "/avatar2.png",
      username: "@user2",
    },
    likes: 300,
    comments: 80,
    shares: 50,
  },
  // Add more videos as needed
];

const ForYou = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">For You</h1>
      {dummyVideos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default ForYou;
