"use client";

import { useState } from "react";
import { WelcomeScreen } from "@/components/screens/welcome-screen";
import { WorkProfileScreen } from "@/components/screens/work-profile-screen";
import { DailyCheckInScreen } from "@/components/screens/daily-checkin-screen";
import { HealthAssessmentScreen } from "@/components/screens/health-assessment-screen";
import { DocumentationScreen } from "@/components/screens/documentation-screen";
import { ImpactScreen } from "@/components/screens/impact-screen";

export type WorkProfile = {
  name: string;
  factoryType: "plastic" | "textile" | "other";
  yearsWorking: number;
  district: string;
};

export type SymptomLog = {
  id: string;
  date: Date;
  symptoms: string[];
  severity: number;
  notes: string;
};

export default function SehatSaathiApp() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [workProfile, setWorkProfile] = useState<WorkProfile | null>(null);
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);

  const screens = [
    <WelcomeScreen key="welcome" onNext={() => setCurrentScreen(1)} />,
    <WorkProfileScreen
      key="profile"
      onNext={(profile) => {
        setWorkProfile(profile);
        setCurrentScreen(2);
      }}
      onBack={() => setCurrentScreen(0)}
    />,
    <DailyCheckInScreen
      key="checkin"
      workProfile={workProfile}
      onSubmit={(log) => {
        setSymptomLogs((prev) => [...prev, log]);
        setCurrentScreen(3);
      }}
      onBack={() => setCurrentScreen(1)}
    />,
    <HealthAssessmentScreen
      key="assessment"
      workProfile={workProfile}
      latestLog={symptomLogs[symptomLogs.length - 1]}
      onNext={() => setCurrentScreen(4)}
      onBack={() => setCurrentScreen(2)}
    />,
    <DocumentationScreen
      key="documentation"
      workProfile={workProfile}
      symptomLogs={symptomLogs}
      onNext={() => setCurrentScreen(5)}
      onBack={() => setCurrentScreen(3)}
    />,
    <ImpactScreen
      key="impact"
      workProfile={workProfile}
      symptomLogs={symptomLogs}
      onRestart={() => {
        setCurrentScreen(2);
      }}
    />,
  ];

  return (
    <main className="min-h-screen bg-background">
      {screens[currentScreen]}
    </main>
  );
}
