import React from "react";
import parse from "html-react-parser";

const HowToPost = () => {
  return (
    <div className="flex flex-col gap-y-12 lg:col-span-2 mt-10 p-6 bg-gray-50 rounded-2xl shadow-md">
      {/* Main Heading */}
      <h6 className="text-2xl font-bold text-center text-gray-800 leading-tight">
        Empower Your Team with AI-Powered Real-Time Video Sharing
      </h6>

      {/* Content Section */}
      <div className="post--container [&>h5]:text-xl [&>h5]:font-semibold [&>h5]:text-gray-700 [&>ul]:pl-6 [&>ul]:list-disc [&>ul]:text-gray-600 [&>ul]:mt-4 [&>h6]:mt-6 [&>h6]:text-lg [&>h6]:text-gray-700">
        <h5>
          Our platform revolutionizes video collaboration and client outreach. Effortlessly record, stream, and share videos in real-time with built-in AI features. Highlights include:
        </h5>

        <ul className="space-y-4">
          <li>
            <span className="font-medium text-gray-800">Seamless Video Recording & Streaming:</span> Capture in 720p/1080p with screen and webcam options.
          </li>
          <li>
            <span className="font-medium text-gray-800">AI-Powered Insights:</span> Generate summaries, transcriptions, titles, and descriptions for every video.
          </li>
          <li>
            <span className="font-medium text-gray-800">Collaboration Made Easy:</span> Invite team members to workspaces and track viewer engagement.
          </li>
          <li>
            <span className="font-medium text-gray-800">Effortless Sharing:</span> Custom thumbnails, dynamic embed links, and email notifications for first views.
          </li>
          <li>
            <span className="font-medium text-gray-800">Flexible Plans:</span> Explore free and pro tiers tailored to your needs.
          </li>
        </ul>

        <h6>
          Available on web and desktop with Next.js and Electron, powered by AWS, Cloudfront, and Stripe. Experience smarter video sharing today!
        </h6>
      </div>

    
    </div>
  );
};

export default HowToPost;