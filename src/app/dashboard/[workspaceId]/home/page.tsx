import React from "react";
import { getWixContent, howToPost } from "@/actions/workspace";
import VideoCard from "@/components/global/videos/video-card";
import HowToPost from "@/components/global/how-to-post";

type Props = {};

const Home = async (props: Props) => {
  const videos = await getWixContent();
  const post = await howToPost();

  return (
    <div className="relative">
      {/* Decorative global background */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_-10%,rgba(99,102,241,0.20),rgba(14,14,20,0))]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header Section */}
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-8 text-center backdrop-blur-xl shadow-xl">
          <h1 className="text-3xl font-semibold md:text-4xl bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent">
            A Message From The VidSphere Team
          </h1>

          {post?.data && (
            <div className="mt-5 flex justify-center">
              <HowToPost {...post.data} />
            </div>
          )}
        </div>

        {/* Videos Section */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl shadow-2xl">
          <h2 className="text-xl font-medium text-white/90 mb-6 text-center">
            Latest Videos
          </h2>

          {videos.status === 200 && videos.data?.length ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {videos.data.map((video) => (
                <VideoCard
                  key={video.id}
                  {...video}
                  workspaceId={video.workSpaceId!}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-white/70">
              <p className="text-lg">No videos available right now.</p>
              <p className="text-white/40 text-sm mt-1">
                Upload your first video to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
