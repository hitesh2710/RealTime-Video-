import React from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getAllUserVideos, getFolderInfo } from "@/actions/workspace";
import FolderInfo from "@/components/global/folders/forlder-info";
import Videos from "@/components/global/videos";

type Props = {
  params: {
    folderId: string;
    workspaceId: string;
  };
};

const page = async ({ params: { folderId, workspaceId } }: Props) => {
  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: ['folder-videos'],
    queryFn: () => getAllUserVideos(folderId),
  })

  await query.prefetchQuery({
    queryKey: ['folder-info'],
    queryFn: () => getFolderInfo(folderId),
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="relative">
        <div className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10">
          <div className="h-full w-full bg-[radial-gradient(75%_60%_at_50%_-10%,rgba(99,102,241,0.18),rgba(14,14,20,0))]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl text-white shadow-2xl">
            <FolderInfo folderId={folderId} />
          </div>

          {/* Videos card */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <Videos
              workspaceId={workspaceId}
              folderId={folderId}
              videosKey="folder-videos"
            />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default page;
