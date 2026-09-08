import React, { useState } from "react";
import { Upload, BarChart3, Pill, Leaf } from "lucide-react";

const slides = [
  {
    id: "upload",
    icon: Upload,
    badge: "Step 1",
    title: "Upload & Select Mode",
    description:
      "Drag-and-drop or browse any leaf photo. Choose between Auto-routing, Crop Specialist (Model A) or Indoor Specialist (Model B) — or let the AI decide for you.",
    image: "/demo_upload_scan.jpg",
    tags: ["Auto-Routing", "Drag & Drop", "Crop + Indoor"],
    accent: "from-sky-500 to-botanic-500",
  },
  {
    id: "crop",
    icon: BarChart3,
    badge: "Step 2",
    title: "Crop Disease Diagnosis",
    description:
      "The Crop Specialist MobileNetV2 identifies diseases across 14 agricultural species with a top-5 probability distribution chart and Shannon entropy confidence scoring.",
    image: "/demo_crop_diagnosis.jpg",
    tags: ["38 Crop Classes", "High Confidence", "Immediate Steps"],
    accent: "from-botanic-600 to-emerald-500",
  },
  {
    id: "indoor",
    icon: Leaf,
    badge: "Step 3",
    title: "Indoor Plant Diagnosis",
    description:
      "The Indoor Specialist model covers houseplant conditions with detailed treatment plans, organic remedies, and long-term prevention tips per diagnosis.",
    image: "/demo_indoor_diagnosis.jpg",
    tags: ["16 Indoor Classes", "Organic Remedies", "Prevention Tips"],
    accent: "from-amber-500 to-orange-500",
  },
];

export default function ShowcaseSection() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  return (
    <section className="py-16 sm:py-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-botanic-50 dark:bg-botanic-950/60 text-botanic-700 dark:text-botanic-300 border border-botanic-200 dark:border-botanic-800 mb-4">
          <Pill className="w-3 h-3" />
          Live Demo Walkthrough
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-earth-950 dark:text-white tracking-tight">
          See PlantDoc AI in Action
        </h2>
        <p className="mt-3 text-sm sm:text-base text-earth-500 dark:text-earth-400 max-w-xl mx-auto">
          From leaf photo to clinical treatment plan — in under a second.
        </p>
      </div>

      {/* Step Tabs */}
      <div className="flex justify-center gap-2 sm:gap-4 mb-8 flex-wrap px-4">
        {slides.map((s, i) => {
          const Icon = s.icon;
          const isActive = active === i;
          return (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                isActive
                  ? "bg-botanic-600 text-white border-botanic-600 shadow-lg shadow-botanic-600/25"
                  : "bg-white dark:bg-forest-900 text-earth-700 dark:text-earth-300 border-earth-200 dark:border-forest-850 hover:border-botanic-400 dark:hover:border-botanic-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{s.badge} — </span>
              <span>{s.title.split(" ").slice(0, 2).join(" ")}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div
          key={slide.id}
          className="glass-panel rounded-3xl border border-earth-200 dark:border-forest-850 overflow-hidden shadow-xl animate-fade-in"
        >
          {/* Screenshot */}
          <div className="relative w-full overflow-hidden bg-earth-100 dark:bg-forest-950 border-b border-earth-200 dark:border-forest-850">
            {/* Browser chrome mockup */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-earth-50 dark:bg-forest-900 border-b border-earth-200 dark:border-forest-850">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <div className="ml-3 flex-1 max-w-xs h-5 rounded-md bg-earth-200 dark:bg-forest-850 text-[10px] flex items-center px-2 text-earth-400 dark:text-earth-500 font-mono">
                localhost:5173 — PlantDoc AI
              </div>
            </div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full object-cover"
              style={{ maxHeight: "420px", objectPosition: "top" }}
            />
            {/* Gradient overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-forest-900 to-transparent" />
          </div>

          {/* Info Row */}
          <div className="p-5 sm:p-7 flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r ${slide.accent} text-white`}
                >
                  {slide.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-earth-900 dark:text-white">
                {slide.title}
              </h3>
              <p className="mt-1 text-sm text-earth-600 dark:text-earth-300 max-w-lg leading-relaxed">
                {slide.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap sm:flex-col gap-2 sm:items-end shrink-0">
              {slide.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-earth-100 dark:bg-forest-850 text-earth-700 dark:text-earth-300 border border-earth-200 dark:border-forest-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Dot Navigator */}
          <div className="flex justify-center gap-2 pb-5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === i
                    ? "w-6 bg-botanic-600"
                    : "w-1.5 bg-earth-300 dark:bg-forest-700 hover:bg-earth-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
