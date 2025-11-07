import React from "react";

const HowToPost = () => {
  return (
    <div className="flex flex-col gap-y-10 lg:col-span-2 mt-10 p-8 bg-white/[0.04] rounded-2xl shadow-lg border border-white/10 text-white/90">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent">
        Empower Your Team with AI-Driven Real-Time Video Sharing
      </h2>

      {/* Content */}
      <div className="post--container space-y-6">
        <p className="text-base md:text-lg text-white/80 font-normal leading-relaxed">
          Our platform reshapes the way teams communicate. Record, stream, and
          share videos instantly with powerful AI that works behind the scenes.
        </p>

        <ul className="space-y-4 pl-6 list-disc marker:text-cyan-300 text-white/80">
          <li>
            <span className="font-semibold bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent">
              Record & Stream Instantly:
            </span>{" "}
            Capture in 720p/1080p with screen, webcam, or combined mode.
          </li>

          <li>
            <span className="font-semibold bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent">
              AI-Powered Insights:
            </span>{" "}
            Auto summaries, transcripts, titles, and SEO-optimized descriptions.
          </li>

          <li>
            <span className="font-semibold bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent">
              Effortless Collaboration:
            </span>{" "}
            Invite teammates, manage shared workspaces, and track engagement.
          </li>

          <li>
            <span className="font-semibold bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent">
              One-Click Sharing:
            </span>{" "}
            Custom thumbnails, smart embed links, and instant view notifications.
          </li>

          <li>
            <span className="font-semibold bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent">
              Flexible Plans:
            </span>{" "}
            From a free starter tier to advanced pro features for scaling teams.
          </li>
        </ul>

        <p className="text-base md:text-lg text-white/80 leading-relaxed">
          Available on web and desktop (Next.js + Electron), powered by AWS,
          CloudFront, and Stripe for secure and scalable performance.
        </p>
      </div>
    </div>
  );
};

export default HowToPost;
