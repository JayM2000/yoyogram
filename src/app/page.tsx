"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function Home() {
  const trpc = useTRPC();
  
  // Use TanStack query through the tRPC options proxy
  const { data: helloData, isLoading: helloLoading } = useQuery(
    trpc.example.hello.queryOptions({ text: "from Yoyogram" })
  );

  const { data: allData, isLoading: allLoading } = useQuery(
    trpc.example.getAll.queryOptions()
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      <div className="z-10 max-w-3xl w-full flex flex-col items-center space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Yoyogram
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
            Your full-stack foundation powered by Next.js, tRPC, TanStack Query, and shadcn/ui.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center space-y-4">
              <h2 className="text-2xl font-semibold text-slate-200">tRPC Hello Query</h2>
              {helloLoading ? (
                <div className="h-10 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-400"></div>
                </div>
              ) : (
                <p className="text-lg font-medium text-indigo-300 py-2">
                  {helloData?.greeting}
                </p>
              )}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 h-full flex flex-col items-center text-center space-y-4">
              <h2 className="text-2xl font-semibold text-slate-200">tRPC List Query</h2>
              {allLoading ? (
                <div className="h-24 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-400"></div>
                </div>
              ) : (
                <ul className="space-y-2 w-full">
                  {allData?.map((item) => (
                    <li key={item.id} className="bg-slate-800/50 rounded-lg py-2 px-4 text-slate-300 flex justify-between items-center hover:bg-slate-800 transition-colors">
                      <span className="text-sm text-slate-500">#{item.id}</span>
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 shadow-lg shadow-indigo-500/20">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-200 backdrop-blur-md">
            Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}
