// C:\Adriatica\client\src\pages\Tools.tsx
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { EexiCalculator } from "@/components/tools/EexiCalculator";
import { CiiCalculator } from "@/components/tools/CiiCalculator";
import { BwtsCalculator } from "@/components/tools/BwtsCalculator";

const TABS = [
  { id: "eexi", label: "EEXI Calculator", component: EexiCalculator },
  { id: "cii", label: "CII Predictor", component: CiiCalculator },
  { id: "bwts", label: "BWTS Sizing", component: BwtsCalculator },
];

export default function Tools() {
  const [activeTab, setActiveTab] = useState("eexi");
  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component;

  return (
    <>
      <SEO
        title="Engineering Tools"
        description="Free preliminary EEXI, CII, and BWTS sizing calculators. Download branded PDF reports."
        canonical="https://www.adriaticadoo.com/tools"
      />
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Başlık */}
          <h1 className="font-display text-4xl font-bold text-primary mb-4">Marine Engineering Calculators</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">Preliminary compliance assessments based on IMO regulations.</p>

          {/* Sekmeler */}
          <div className="flex gap-2 mb-8 border-b pb-4">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                  activeTab === tab.id ? "bg-primary text-white" : "bg-neutral-100 text-muted-foreground hover:bg-neutral-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* İçerik Grid'i */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol: Hesaplama Alanı (Sekmeye göre değişen component) */}
            <div className="lg:col-span-2">
              {ActiveComponent && <ActiveComponent />}
            </div>

            {/* Sağ: Sabit Yan Panel (PDF ve CTA) */}
            <div className="lg:col-span-1">
               {/* Burası hep sabit kalacak. 
                   ActiveComponent içinde hesaplandığında PDF butonuna tıklayacak. */}
               <div className="sticky top-24 bg-neutral-50 border p-6 rounded-sm">
                 <h3 className="font-display font-bold text-lg mb-4">Need Official Documentation?</h3>
                 <p className="text-sm text-muted-foreground mb-6">
                   These tools provide preliminary estimations. For Class Society submission packages and official EEXI/CII files, contact our engineering team.
                 </p>
                 <a
                   href="/request-consultation"
                   className="block w-full text-center bg-primary text-white px-4 py-3 rounded-sm font-medium hover:bg-primary/90 transition"
                 >
                   Request Official Study
                 </a>
               </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}