"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Wind, Droplets, Bone, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { WorkProfile, SymptomLog } from "@/app/page";

interface DailyCheckInScreenProps {
  workProfile: WorkProfile | null;
  onSubmit: (log: SymptomLog) => void;
  onBack: () => void;
}

const SYMPTOM_CATEGORIES = [
  {
    id: "respiratory",
    title: "Breathing Issues",
    titleHi: "सांस की समस्या",
    icon: Wind,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    symptoms: [
      { id: "cough", label: "Persistent cough (खांसी)" },
      { id: "shortness", label: "Shortness of breath (सांस फूलना)" },
      { id: "wheezing", label: "Wheezing sounds (सांस में आवाज़)" },
      { id: "chest_tight", label: "Chest tightness (छाती में जकड़न)" },
      { id: "dust_react", label: "Reaction to dust/fumes (धूल से परेशानी)" },
    ],
  },
  {
    id: "dermatological",
    title: "Skin Problems",
    titleHi: "त्वचा की समस्या",
    icon: Droplets,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    symptoms: [
      { id: "rash", label: "Skin rash (चकत्ते)" },
      { id: "itching", label: "Persistent itching (खुजली)" },
      { id: "dryness", label: "Unusual dryness (रूखापन)" },
      { id: "burns", label: "Chemical burns (जलन)" },
      { id: "discolor", label: "Skin discoloration (रंग बदलना)" },
    ],
  },
  {
    id: "musculoskeletal",
    title: "Body Pain",
    titleHi: "शरीर में दर्द",
    icon: Bone,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    symptoms: [
      { id: "back_pain", label: "Back pain (पीठ दर्द)" },
      { id: "joint_pain", label: "Joint pain (जोड़ों में दर्द)" },
      { id: "numbness", label: "Numbness in hands/feet (सुन्नपन)" },
      { id: "muscle_weak", label: "Muscle weakness (कमज़ोरी)" },
      { id: "neck_pain", label: "Neck/shoulder pain (गर्दन दर्द)" },
    ],
  },
];

const SEVERITY_LEVELS = [
  { value: 1, label: "Mild", labelHi: "हल्का", color: "bg-green-500" },
  { value: 2, label: "Moderate", labelHi: "मध्यम", color: "bg-yellow-500" },
  { value: 3, label: "Severe", labelHi: "गंभीर", color: "bg-orange-500" },
  { value: 4, label: "Very Severe", labelHi: "बहुत गंभीर", color: "bg-red-500" },
];

export function DailyCheckInScreen({ workProfile, onSubmit, onBack }: DailyCheckInScreenProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState(1);
  const [notes, setNotes] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>("respiratory");

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((s) => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSubmit = () => {
    const log: SymptomLog = {
      id: Date.now().toString(),
      date: new Date(),
      symptoms: selectedSymptoms,
      severity,
      notes,
    };
    onSubmit(log);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 px-4 py-4 backdrop-blur">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">Daily Health Check-In</h1>
            <p className="text-sm text-muted-foreground">
              {workProfile?.name ? `Hi ${workProfile.name.split(" ")[0]}` : "Hi"}, how are you feeling today?
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 pb-40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 py-4"
        >
          {/* Symptom Categories */}
          {SYMPTOM_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isExpanded = expandedCategory === category.id;
            const selectedInCategory = category.symptoms.filter((s) =>
              selectedSymptoms.includes(s.id)
            ).length;

            return (
              <motion.div
                key={category.id}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                  className="flex w-full items-center gap-4 p-4"
                >
                  <div className={`rounded-lg p-2 ${category.bgColor}`}>
                    <Icon className={`h-5 w-5 ${category.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-card-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.titleHi}</p>
                  </div>
                  {selectedInCategory > 0 && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      {selectedInCategory}
                    </span>
                  )}
                  <motion.div
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    className="text-muted-foreground"
                  >
                    <Plus className="h-5 w-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-border"
                    >
                      <div className="space-y-2 p-4">
                        {category.symptoms.map((symptom) => {
                          const isSelected = selectedSymptoms.includes(symptom.id);
                          return (
                            <motion.button
                              key={symptom.id}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => toggleSymptom(symptom.id)}
                              className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all ${
                                isSelected
                                  ? "bg-primary/10 border border-primary"
                                  : "bg-muted/50 border border-transparent"
                              }`}
                            >
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                                  isSelected ? "bg-primary" : "border-2 border-muted-foreground"
                                }`}
                              >
                                {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                              </div>
                              <span className={isSelected ? "text-foreground font-medium" : "text-muted-foreground"}>
                                {symptom.label}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Severity Slider */}
          {selectedSymptoms.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-card p-4"
            >
              <h3 className="mb-4 font-semibold text-card-foreground">
                Overall Severity (समस्या कितनी गंभीर है?)
              </h3>
              <div className="flex justify-between gap-2">
                {SEVERITY_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setSeverity(level.value)}
                    className={`flex-1 rounded-lg p-3 text-center transition-all ${
                      severity === level.value
                        ? `${level.color} text-white`
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <div className="text-xs font-medium">{level.label}</div>
                    <div className="text-xs opacity-80">{level.labelHi}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Notes */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 font-semibold text-card-foreground">
              Additional Notes (अतिरिक्त जानकारी)
            </h3>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe when symptoms started, what makes them worse..."
              className="min-h-24 resize-none"
            />
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 p-4 backdrop-blur">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {selectedSymptoms.length} symptoms selected
          </span>
          <span className="text-muted-foreground">
            {new Date().toLocaleDateString("en-IN", { dateStyle: "medium" })}
          </span>
        </div>
        <Button
          onClick={handleSubmit}
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {selectedSymptoms.length > 0 ? "Submit Health Check" : "No Symptoms Today"}
        </Button>
      </div>
    </div>
  );
}
