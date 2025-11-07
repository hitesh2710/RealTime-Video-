import { getAllUserVideos, getWorkspaceFolders } from "@/actions/workspace";
import CreateForlders from "@/components/global/create-folders";
import CreateWorkspace from "@/components/global/create-workspace";
import Folders from "@/components/global/folders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import React from 'react'

type Props = {
  params: { workspaceId: string }
}

const Page = async ({ params: { workspaceId } }: Props) => {
  const query = new QueryClient()

  await query.prefetchQuery({
    queryKey: ['workspace-folders'],
    queryFn: () => getWorkspaceFolders(workspaceId),
  })

  await query.prefetchQuery({
    queryKey: ['user-videos'],
    queryFn: () => getAllUserVideos(workspaceId),
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="relative">
        {/* Subtle VidSphere backdrop */}
        <div className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10">
          <div className="h-full w-full bg-[radial-gradient(75%_60%_at_50%_-10%,rgba(99,102,241,0.18),rgba(14,14,20,0))]" />
        </div>

        <div className="mx-auto max-w-7xl px-4">
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl text-white">
            <Tabs defaultValue="videos" className="w-full">
              <div className="flex w-full items-center justify-between">
                <TabsList className="bg-transparent p-0">
                  <TabsTrigger
                    value="videos"
                    className="rounded-full px-6 py-[13px] text-white/80 data-[state=active]:bg-white/10 data-[state=active]:text-white"
                  >
                    Videos
                  </TabsTrigger>
                  <TabsTrigger
                    value="archive"
                    className="rounded-full px-6 py-[13px] text-white/80 data-[state=active]:bg-white/10 data-[state=active]:text-white"
                  >
                    Archive
                  </TabsTrigger>
                </TabsList>

                <div className="flex gap-3">
                  <CreateWorkspace />
                  <CreateForlders workspaceId={workspaceId} />
                </div>
              </div>

              <section className="py-6">
                <TabsContent value="videos" className="m-0">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                    <Folders workspaceId={workspaceId} />
                  </div>
                </TabsContent>

                <TabsContent value="archive" className="m-0">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center text-white/70 backdrop-blur-xl">
                    Archive coming soon.
                  </div>
                </TabsContent>
              </section>
            </Tabs>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
