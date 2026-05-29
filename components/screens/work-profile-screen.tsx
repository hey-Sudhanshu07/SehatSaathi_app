"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Factory, Clock, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { WorkProfile } from "@/app/page";

interface WorkProfileScreenProps {
  onNext: (profile: WorkProfile) => void;
  onBack: () => void;
}

const FACTORY_TYPES = [
  { id: "plastic", label: "Plastic Manufacturing", icon: "🏭" },
  { id: "textile", label: "Textile & Garment", icon: "🧵" },
  { id: "other", label: "Other Industry", icon: "⚙️" },
] as const;

const DISTRICTS = [
  "Kanpur",
  "Lucknow",
  "Varanasi",
  "Ghaziabad",
  "Noida",
  "Agra",
  "Meerut",
  "Prayagraj",
  "Other",
];

export function WorkProfileScreen({ onNext, onBack }: WorkProfileScreenProps) {
  const [name, setName] = useState("");
  const [factoryType, setFactoryType] = useState<WorkProfile["factoryType"] | null>(null);
  const [yearsWorking, setYearsWorking] = useState<number>(1);
  const [district, setDistrict] = useState("");

  const isValid = name.trim() && factoryType && district;

  const handleSubmit = () => {
    if (!isValid || !factoryType) return;
    onNext({
      name: name.trim(),
      factoryType,
      yearsWorking,
      district,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-4 bg-background/95 px-4 py-4 backdrop-blur">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Tell Us About Yourself</h1>
          <p className="text-sm text-muted-foreground">Step 1 of 2</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 py-4"
        >
          {/* Name Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <User className="h-4 w-4 text-primary" />
              Your Name (आपका नाम)
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="h-12"
            />
          </div>

          {/* Factory Type */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Factory className="h-4 w-4 text-primary" />
              Type of Work (काम का प्रकार)
            </label>
            <div className="grid gap-3">
              {FACTORY_TYPES.map((type) => (
                <motion.button
                  key={type.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFactoryType(type.id)}
                  className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                    factoryType === type.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="font-medium text-card-foreground">{type.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Years Working */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock className="h-4 w-4 text-primary" />
              Years in Factory Work (कितने साल से काम)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="30"
                value={yearsWorking}
                onChange={(e) => setYearsWorking(Number(e.target.value))}
                className="h-2 flex-1 appearance-none rounded-full bg-muted accent-primary"
              />
              <span className="w-20 rounded-lg bg-primary/10 py-2 text-center font-semibold text-primary">
                {yearsWorking} {yearsWorking === 1 ? "year" : "years"}
              </span>
            </div>
          </div>

          {/* District */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              District (जिला)
            </label>
            <div className="flex flex-wrap gap-2">
              {DISTRICTS.map((d) => (
                <motion.button
                  key={d}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDistrict(d)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    district === d
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {d}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 p-4 backdrop-blur">
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Continue to Health Check
        </Button>
      </div>
    </div>
  );
}
