import React from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getPreviewVideo } from "@/actions/workspace";
import { getUserProfile, getVideoComments } from "@/actions/user";
import VideoPreview from "@/components/global/videos/preview";

type Props = {
  params: {
    videoId: string;
  };
};

const VideoPage = async ({ params: { videoId } }: Props) => {
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ['preview-video'],
    queryFn: () => getPreviewVideo(videoId),
  });

  await query.prefetchQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
  });

  await query.prefetchQuery({
    queryKey: ['video-comments'],
    queryFn: () => getVideoComments(videoId),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="relative">
        {/* subtle backdrop that matches the new design system */}
        <div className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10">
          <div className="h-full w-full bg-[radial-gradient(75%_60%_at_50%_-10%,rgba(99,102,241,0.18),rgba(14,14,20,0))]" />
        </div>

        {/* glass wrapper is optional—remove if VideoPreview already renders full-bleed */}
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-3 md:p-4 backdrop-blur-xl">
            <VideoPreview videoId={videoId} />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default VideoPage;
