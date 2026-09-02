'use client';

import { useConnectOneDriveQuery } from '@/redux/api/onedriveapi';
import { selectUser } from '@/redux/features/authSlice';
import { Cloud, CheckCircle2, ArrowRight, Zap, Lock, Download } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
export default function OneDriveSetup() {
  const user = useSelector(selectUser);
  const { data, error } = useConnectOneDriveQuery(user?._id);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectOneDrive = async () => {
    setIsConnecting(true);
    if (data?.success) {
      setIsConnecting(false);
      window.location.href = data?.data;
      return;
    }

    toast.error(error?.data?.message || error?.error?.data?.message);
  };

  return (
    <main className="bg-gradient-to-br from-background via-background to-slate-50 dark:to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col justify-center space-y-6 order-2 lg:order-1">
            <div className="space-y-3 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium w-fit">
                <Zap className="w-4 h-4" />
                <span>Cloud Integration Ready</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-foreground">
                Sync Images Instantly
              </h1>

              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Connect your OneDrive account to automatically sync all uploaded images directly to
                your PC.
              </p>
            </div>

            <div className="space-y-3 pt-4 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
              {[
                {
                  icon: Cloud,
                  title: 'Cloud Storage',
                  description: 'Access images from anywhere, anytime',
                },
                {
                  icon: Download,
                  title: 'Auto Sync',
                  description: 'Images sync automatically to your device',
                },
                {
                  icon: Lock,
                  title: 'Secure & Encrypted',
                  description: 'Your data is protected with enterprise security',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="order-1 lg:order-2 animate-in fade-in slide-in-from-right-4 duration-700">
            {/* Replaced Card with div */}
            <div className="relative p-8 sm:p-10 shadow-2xl border border-border/50 rounded-xl backdrop-blur-sm bg-card/95">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl pointer-events-none" />

              <div className="relative space-y-6">
                <div className="space-y-4 pb-6 border-b border-border/50">
                  <div className="flex items-center justify-center">
                    <div className="p-4 bg-primary/10 rounded-xl">
                      <Cloud className="w-10 h-10 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-2 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold">Ready to Get Started?</h2>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Connect your Microsoft OneDrive account in seconds to enable automatic image
                      syncing.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    What happens next:
                  </p>

                  <div className="space-y-3">
                    {[
                      "You'll be redirected to Microsoft login",
                      'Grant permission to sync your images',
                      'Start uploading with automatic cloud backup',
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connect Button */}
                <button
                  onClick={handleConnectOneDrive}
                  disabled={isConnecting}
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      Connect OneDrive
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Learn More Button */}
                <button className="w-full h-11 text-sm font-medium border border-border/50 rounded-lg hover:bg-secondary/50 transition bg-transparent">
                  Learn More
                </button>

                <div className="pt-4 space-y-2 border-t border-border/50">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>Microsoft certified partner</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Lock className="w-4 h-4 text-accent" />
                    <span>End-to-end encrypted</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-4">
              We take your privacy seriously. Read our{' '}
              <a href="#" className="underline hover:text-foreground transition-colors">
                data policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
    </main>
  );
}
