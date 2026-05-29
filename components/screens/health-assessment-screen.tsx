"use client";

import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, CheckCircle, Info, Brain, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WorkProfile, SymptomLog } from "@/app/page";

interface HealthAssessmentScreenProps {
  workProfile: WorkProfile | null;
  latestLog: SymptomLog | undefined;
  onNext: () => void;
  onBack: () => void;
}

const RISK_ASSESSMENTS = {
  respiratory: {
    title: "Respiratory Health",
    titleHi: "सांस की सेहत",
    risks: [
      "Plastic fume exposure increases risk of occupational asthma",
      "Textile dust can cause byssinosis (brown lung disease)",
      "Early detection can prevent 85% of chronic conditions",
    ],
    recommendations: [
      "Request N95 masks from employer",
      "Take breaks in ventilated areas",
      "Visit PHC if symptoms persist 2+ weeks",
    ],
  },
  dermatological: {
    title: "Skin Health",
    titleHi: "त्वचा की सेहत",
    risks: [
      "Chemical exposure causes contact dermatitis",
      "Prolonged exposure can lead to chronic conditions",
      "Some chemicals may increase long-term health risks",
    ],
    recommendations: [
      "Use protective gloves provided by employer",
      "Wash hands thoroughly after each shift",
      "Document any new skin changes with photos",
    ],
  },
  musculoskeletal: {
    title: "Body & Joint Health",
    titleHi: "शरीर की सेहत",
    risks: [
      "Repetitive movements cause strain injuries",
      "Poor ergonomics lead to chronic back problems",
      "Standing for long hours affects circulation",
    ],
    recommendations: [
      "Stretch every 2 hours during shift",
      "Request ergonomic equipment if available",
      "Report persistent pain to supervisor in writing",
    ],
  },
};

export function HealthAssessmentScreen({
  workProfile,
  latestLog,
  onNext,
  onBack,
}: HealthAssessmentScreenProps) {
  const symptoms = latestLog?.symptoms || [];
  const severity = latestLog?.severity || 1;

  // Determine which categories are affected
  const affectedCategories = {
    respiratory: symptoms.some((s) =>
      ["cough", "shortness", "wheezing", "chest_tight", "dust_react"].includes(s)
    ),
    dermatological: symptoms.some((s) =>
      ["rash", "itching", "dryness", "burns", "discolor"].includes(s)
    ),
    musculoskeletal: symptoms.some((s) =>
      ["back_pain", "joint_pain", "numbness", "muscle_weak", "neck_pain"].includes(s)
    ),
  };

  const hasSymptoms = symptoms.length > 0;
  const isHighRisk = severity >= 3 && symptoms.length >= 2;

  const getRiskLevel = () => {
    if (!hasSymptoms) return { level: "low", color: "text-green-600", bg: "bg-green-50" };
    if (isHighRisk) return { level: "elevated", color: "text-red-600", bg: "bg-red-50" };
    if (severity >= 2) return { level: "moderate", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { level: "low", color: "text-green-600", bg: "bg-green-50" };
  };

  const risk = getRiskLevel();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 px-4 py-4 backdrop-blur">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">AI Health Assessment</h1>
            <p className="text-sm text-muted-foreground">Personalized risk analysis</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Brain className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 py-4"
        >
          {/* Risk Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-6 ${risk.bg}`}
          >
            <div className="mb-4 flex items-center gap-3">
              {risk.level === "elevated" ? (
                <AlertTriangle className={`h-8 w-8 ${risk.color}`} />
              ) : risk.level === "moderate" ? (
                <Info className={`h-8 w-8 ${risk.color}`} />
              ) : (
                <CheckCircle className={`h-8 w-8 ${risk.color}`} />
              )}
              <div>
                <h2 className={`text-xl font-bold ${risk.color}`}>
                  {risk.level === "elevated"
                    ? "Elevated Risk Detected"
                    : risk.level === "moderate"
                    ? "Moderate Concerns"
                    : "Looking Good!"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Based on your {symptoms.length} reported symptoms
                </p>
              </div>
            </div>

            {hasSymptoms ? (
              <p className="text-sm leading-relaxed text-foreground/80">
                {workProfile?.factoryType === "plastic"
                  ? "Plastic manufacturing workers face higher risks of respiratory and skin conditions. Your symptoms align with common early-stage occupational health patterns."
                  : workProfile?.factoryType === "textile"
                  ? "Textile workers often experience breathing difficulties and repetitive strain. Early documentation helps protect your long-term health."
                  : "Factory workers commonly develop occupational conditions that are preventable with early detection and proper documentation."}
              </p>
            ) : (
              <p className="text-sm leading-relaxed text-foreground/80">
                No symptoms reported today. Keep monitoring your health regularly. Early detection is key to preventing serious conditions.
              </p>
            )}
          </motion.div>

          {/* Category-specific Assessments */}
          {hasSymptoms && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Detailed Analysis</h3>
              
              {Object.entries(affectedCategories).map(([category, isAffected]) => {
                if (!isAffected) return null;
                const assessment = RISK_ASSESSMENTS[category as keyof typeof RISK_ASSESSMENTS];
                
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <h4 className="mb-1 font-semibold text-card-foreground">
                      {assessment.title}
                    </h4>
                    <p className="mb-4 text-sm text-muted-foreground">{assessment.titleHi}</p>

                    <div className="mb-4 space-y-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        What this means for you:
                      </p>
                      {assessment.risks.map((risk, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                          <p className="text-sm text-foreground/80">{risk}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 rounded-lg bg-primary/5 p-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-primary">
                        Recommended Actions:
                      </p>
                      {assessment.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <p className="text-sm text-foreground">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Compliance Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-primary/20 bg-primary/5 p-4"
          >
            <h4 className="mb-2 font-semibold text-primary">Your Rights as a Worker</h4>
            <p className="text-sm text-foreground/80">
              Under the Factories Act, 1948 and OSH Code 2020, employers must provide safe working conditions. 
              Your health documentation serves as legal proof if you ever need to claim compensation or report violations.
            </p>
          </motion.div>

          {/* Important Disclaimer */}
          <div className="rounded-lg bg-muted p-4">
            <p className="text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> This AI assessment is for educational purposes and early awareness only. 
              It does not replace professional medical diagnosis. Please consult a doctor or visit your nearest 
              Primary Health Centre (PHC) for proper examination.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 p-4 backdrop-blur">
        <Button
          onClick={onNext}
          size="lg"
          className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Save to My Health Record
          <ChevronRight className="h-5 w-5" />
        </Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Your data is encrypted and belongs only to you
        </p>
      </div>
    </div>
  );
}
