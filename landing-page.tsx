import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const videos = [
  {
    id: "v1",
    title: "Faceless Content, $10K in No Time – Start Now!",
    description: "TikTok automation is your gateway to passive income. Learn to monetize simple, faceless videos and turn views into cash. Speed is everything – don't wait!",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487119/nn3hvl7nko7oy9wlcycx.mp4",
    cta1: "Join the Free Discord Now",
    cta2: "Learn from the Best with Media Metas"
  },
  {
    id: "v2",
    title: "Earn $10K Monthly with Your Phone – No Experience Needed!",
    description: "Discover how to clip popular streamers and go viral with ease. TikTok's creativity program rewards you generously – it's time to get your share!",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487173/jy6zczkuquodkufzejyb.mov",
    cta1: "Download CapCut & Start Clipping Today!",
    cta2: "Join Media Metas for Proven Strategies"
  },
  {
    id: "v3",
    title: "Think TikTok is Saturated? Think Again!",
    description: "Learn why TikTok's algorithm is your biggest ally. Leverage Crayola AI to create viral content without editing experience – it's that simple!",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733486947/bcmosa1paublgrcntr8s.mov",
    cta1: "Let's Get You Started – Join Media Metas!",
    cta2: "Stop Waiting, Start Winning on TikTok Today!"
  },
  {
    id: "v4",
    title: "Stay True to Yourself and Still Make Bank!",
    description: "You don't need to compromise your values to succeed. Musa's path proves that hustle and integrity go hand in hand.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733486951/uyrysf0ofweymfskdkz8.mov",
    cta1: "Be Part of a Community that Values You!",
    cta2: "Join Media Metas and Thrive Your Way"
  },
  {
    id: "v5",
    title: "\"Burn the Boats\" – Your Backup Plan Is Holding You Back!",
    description: "Success is inevitable when failure isn't an option. Commit fully, just like Musa did, and start building your empire today.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487374/tjbxafhm44jxjbgyirny.mp4",
    cta1: "Remove Plan B – Join Media Metas Now!",
    cta2: "Start Winning Today with Proven Mentorship!"
  },
  {
    id: "v6",
    title: "From Dream to Reality – Musa's Penthouse Story",
    description: "Your dream lifestyle isn't as far away as you think. See how Musa made it happen at 21 – and how you can, too!",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733486958/d5dp0ams9tw1funjs9sy.mp4",
    cta1: "Your Dream Life Starts Here – Join Media Metas!",
    cta2: "Take the First Step Today!"
  },
  {
    id: "v7",
    title: "This Guy Makes $10K Monthly – Here's How You Can Too!",
    description: "Millions of views, thousands of dollars – Musa's simple strategy can change your life. Why wait? Start your journey today.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733486997/ttwzlghkhbb56veegicv.mov",
    cta1: "Learn the Secrets – Join Media Metas!",
    cta2: "Follow the Path to $10K a Month!"
  },
  {
    id: "v8",
    title: "100 Videos, No Views? Keep Going – Here's Why!",
    description: "Perseverance is the secret to success. Musa's grind got him here, and it can do the same for you. Are you ready to put in the work?",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733486976/kbcc4wmvjmccnjqlhs0y.mov",
    cta1: "Push Through – Join Media Metas!",
    cta2: "Success Loves Grit – Start Now!"
  },
  {
    id: "v9",
    title: "From Zero to $40K Monthly – Musa's Proven System!",
    description: "Even big names like Jidion trust Musa's methods. Learn how to make thousands every month by following his exact strategy.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487367/xxzbhhlr5i1a35mr76gl.mp4",
    cta1: "Get Started with Musa's Proven Formula!",
    cta2: "Join Media Metas and Start Winning!"
  },
  {
    id: "v10",
    title: "$60K in a Month – Want In?",
    description: "TikTok isn't just a platform; it's a goldmine. Musa's strategy can help you turn views into real income. The time to act is now!",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487387/w1hdbcs3wta86afruyum.mp4",
    cta1: "Get Your Share of TikTok Money!",
    cta2: "Join Media Metas and Start Earning!"
  },
  {
    id: "v11",
    title: "Luxury Living from TikTok Views – Learn the Secret!",
    description: "Musa made $22K from just one TikTok page in a month. What's stopping you from doing the same?",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487034/yisagttysjksj3amvyqd.mp4",
    cta1: "Learn the System – Join Media Metas Now!",
    cta2: "TikTok Pays Big – Start Today!"
  },
  {
    id: "v12",
    title: "$35K in Two Weeks? Musa Exposes the Secret!",
    description: "TikTok's Creator Rewards program is a game-changer. Let Musa show you how to make the most of it and secure your future.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733484194/ejwpxx20gx2rq2z7ats6.mp4",
    cta1: "Maximize TikTok Earnings with Media Metas!",
    cta2: "Start Earning Like the Pros Today!"
  },
  {
    id: "v13",
    title: "Speed's Confused – But Musa's Bank Account Isn't!",
    description: "Make $40K monthly using Musa's simple strategies. TikTok's algorithm is ready to pay – are you ready to collect?",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487042/rmw3vng6zwp4tiolh5cg.mp4",
    cta1: "Turn Clips Into Cash – Join Media Metas!",
    cta2: "Don't Just Watch – Start Earning!"
  },
  {
    id: "v14",
    title: "Quadruple Revenue Like Sneako – Musa's Magic!",
    description: "Big creators like Sneako trust Musa to scale their success. His strategies work – it's time to use them for your own growth.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733488858/y1vyhijuj6ydo31bow8p.mov",
    cta1: "Scale Like the Greats – Join Media Metas!",
    cta2: "Your Turn to Win Big – Start Now!"
  }
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-2xl">MetaMedia</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-8 text-center">
              Transform Your Digital Experience with MetaMedia
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <Card key={video.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="relative w-full pt-[177.78%] mb-4">
                      <video
                        controls
                        preload="metadata"
                        poster={`${video.src.split('/upload/')[0]}/upload/so_1/c_limit,w_600,h_800/${video.src.split('/upload/')[1]}`}
                        className="absolute top-0 left-0 w-full h-full object-contain rounded-md bg-gray-100"
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p className="text-sm text-gray-500">{video.description}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full">{video.cta1}</Button>
                    <Button variant="outline" className="w-full">{video.cta2}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 MetaMedia. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

