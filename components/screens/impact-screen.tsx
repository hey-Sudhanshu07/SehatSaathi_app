"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  TrendingDown, 
  Users, 
  Target,
  Sparkles,
  ArrowRight,
  Shield,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WorkProfile, SymptomLog } from "@/app/page";

interface ImpactScreenProps {
  workProfile: WorkProfile | null;
  symptomLogs: SymptomLog[];
  onRestart: () => void;
}

export function ImpactScreen({ workProfile, symptomLogs, onRestart }: ImpactScreenProps) {
  const totalLogs = symptomLogs.length;
  const hasHighSeverity = symptomLogs.some((log) => log.severity >= 3);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Celebration Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg"
        >
          <Sparkles className="h-10 w-10 text-primary-foreground" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-2 text-3xl font-bold text-foreground"
        >
          {workProfile?.name ? `Well done, ${workProfile.name.split(" ")[0]}!` : "Well done!"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground"
        >
          You&apos;re taking control of your health
        </motion.p>
      </motion.div>

      <div className="flex-1 overflow-auto px-4 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-6 py-8"
        >
          {/* Personal Impact */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-card-foreground">
              <Heart className="h-5 w-5 text-primary" />
              Your Health Protection
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-primary/5 p-4 text-center">
                <div className="text-3xl font-bold text-primary">{totalLogs}</div>
                <div className="text-sm text-muted-foreground">Health checks logged</div>
              </div>
              <div className="rounded-xl bg-primary/5 p-4 text-center">
                <div className="text-3xl font-bold text-primary">
                  {hasHighSeverity ? "Early" : "Active"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {hasHighSeverity ? "Warning detected" : "Monitoring"}
                </div>
              </div>
            </div>
            {hasHighSeverity && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-lg bg-yellow-50 p-3"
              >
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> You&apos;ve logged symptoms that need attention. 
                  Visit your nearest PHC within 2 weeks for professional evaluation.
                </p>
              </motion.div>
            )}
          </div>

          {/* Collective Impact */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-card-foreground">
              <Users className="h-5 w-5 text-primary" />
              Collective Worker Impact
            </h3>
            <div className="space-y-4">
              <ImpactMetric
                icon={<TrendingDown className="h-5 w-5" />}
                value="15%"
                label="Target reduction in critical disease onset"
                description="SDG 3.9 aligned goal for 6 months"
              />
              <ImpactMetric
                icon={<Shield className="h-5 w-5" />}
                value="2,500+"
                label="Workers documenting health"
                description="Across UP manufacturing districts"
              />
              <ImpactMetric
                icon={<Target className="h-5 w-5" />}
                value="85%"
                label="Early detection success rate"
                description="When symptoms are logged consistently"
              />
            </div>
          </div>

          {/* SDG Alignment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Good Health & Well-being</h3>
                <p className="text-sm text-muted-foreground">UN Sustainable Development Goal</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              SDG Target 3.9: By 2030, substantially reduce the number of deaths and illnesses 
              from hazardous chemicals and air, water and soil pollution and contamination.
            </p>
            <div className="mt-4 flex items-center gap-2 text-primary">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">You&apos;re contributing to this goal</span>
            </div>
          </motion.div>

          {/* What Happens Next */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold text-card-foreground">What Happens Next?</h3>
            <div className="space-y-3">
              <NextStep
                number={1}
                title="Keep logging daily"
                description="Consistent data builds stronger health proof"
              />
              <NextStep
                number={2}
                title="Download your reports"
                description="Share with doctors or use for legal claims"
              />
              <NextStep
                number={3}
                title="Spread awareness"
                description="Help other workers protect themselves"
              />
            </div>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center"
          >
            <p className="text-lg font-medium italic text-foreground">
              &quot;Prevention is better than cure. Early detection saves lives.&quot;
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              — SehatSaathi Mission
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 p-4 backdrop-blur">
        <Button
          onClick={onRestart}
          size="lg"
          className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Log Another Health Check
          <ArrowRight className="h-5 w-5" />
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Remember to check in daily for best results
        </p>
      </div>
    </div>
  );
}

function ImpactMetric({
  icon,
  value,
  label,
  description,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function NextStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {number}
      </div>
      <div>
        <h4 className="font-medium text-card-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
