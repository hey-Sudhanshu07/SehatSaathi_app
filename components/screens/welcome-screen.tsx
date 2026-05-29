"use client";

import { motion } from "framer-motion";
import { Heart, Shield, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-lg"
          >
            <Heart className="h-12 w-12 text-primary-foreground" />
          </motion.div>

          {/* App Name */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-2 text-4xl font-bold tracking-tight text-foreground"
          >
            SehatSaathi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-2 text-lg text-primary font-medium"
          >
            सेहत साथी
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-12 max-w-xs text-muted-foreground"
          >
            Your health companion for a safer workplace
          </motion.p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-12 w-full max-w-sm space-y-4"
        >
          <FeatureItem
            icon={<Shield className="h-5 w-5" />}
            title="Early Detection"
            description="AI-powered screening for respiratory, skin & muscle issues"
          />
          <FeatureItem
            icon={<FileText className="h-5 w-5" />}
            title="Health Documentation"
            description="Build your own medical history with timestamped proof"
          />
          <FeatureItem
            icon={<Heart className="h-5 w-5" />}
            title="Worker-Owned Data"
            description="Your health records belong to you, always"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="w-full max-w-sm"
        >
          <Button
            onClick={onNext}
            size="lg"
            className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Start Your Health Journey
            <ChevronRight className="h-5 w-5" />
          </Button>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Free for all factory workers · No login required
          </p>
        </motion.div>
      </div>

      {/* SDG Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pb-6 text-center"
      >
        <p className="text-xs text-muted-foreground">
          Supporting SDG 3.9 · Good Health & Well-being
        </p>
      </motion.div>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-card p-4 shadow-sm border border-border">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-card-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
