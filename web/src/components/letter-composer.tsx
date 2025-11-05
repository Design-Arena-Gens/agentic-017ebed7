"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import LetterPreview from "./letter-preview";
import {
  generateLetter,
  type LetterInputs,
  toneOptions,
  languageOptions,
} from "@/lib/letter-generator";

const today = () => format(new Date(), "PPP");

const initialForm: LetterInputs = {
  senderName: "Aarav Sharma",
  senderAddress: "Sector 21, Gurugram",
  recipientName: "Respected Principal",
  recipientAddress: "Sunrise Public School",
  subject: "Leave request for cultural event",
  contextPoints: [
    "I have been selected to represent our school in a district level music competition.",
    "The event is scheduled for 28th to 30th July and requires my full participation.",
    "I have completed all pending assignments and coordinated with classmates for notes.",
  ],
  gratitudeNote:
    "I am grateful for your constant encouragement and promise to uphold the school's name.",
  signOffName: "Yours faithfully,\nAarav Sharma",
  tone: "formal",
  language: "hinglish",
  letterDate: today(),
};

export default function LetterComposer() {
  const [form, setForm] = useState<LetterInputs>(initialForm);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("preview");
  const [copied, setCopied] = useState(false);

  const letter = useMemo(() => generateLetter(form), [form]);

  const handleChange = <K extends keyof LetterInputs>(key: K, value: LetterInputs[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updatePoint = (index: number, value: string) => {
    const nextPoints = [...form.contextPoints];
    nextPoints[index] = value;
    handleChange("contextPoints", nextPoints);
  };

  const addPoint = () => {
    handleChange("contextPoints", [...form.contextPoints, ""]);
  };

  const removePoint = (index: number) => {
    if (form.contextPoints.length === 1) {
      updatePoint(0, "");
      return;
    }
    handleChange(
      "contextPoints",
      form.contextPoints.filter((_, idx) => idx !== index),
    );
  };

  const resetToSample = () => {
    setForm({ ...initialForm, letterDate: today() });
    setCopied(false);
    setActiveTab("preview");
  };

  const copyToClipboard = async () => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard API unavailable in this browser");
      return;
    }
    try {
      await navigator.clipboard.writeText(letter.fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error("Clipboard write failed", error);
    }
  };

  const handlePrint = () => {
    if (typeof window === "undefined") return;
    window.print();
  };

  return (
    <section className="grid gap-10 lg:grid-cols-[360px,minmax(0,1fr)]">
      <div className="flex flex-col gap-6 rounded-3xl border border-amber-100 bg-white/90 p-6 shadow-lg shadow-amber-100/40 backdrop-blur">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Letter Inputs</h2>
          <button
            onClick={resetToSample}
            className="rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700 transition hover:bg-amber-200"
          >
            Reset
          </button>
        </div>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-zinc-700">Sender Name</span>
          <input
            value={form.senderName}
            onChange={(event) => handleChange("senderName", event.target.value)}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="Your full name"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-zinc-700">Sender Address</span>
          <textarea
            value={form.senderAddress}
            onChange={(event) => handleChange("senderAddress", event.target.value)}
            rows={2}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="City, area, etc."
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-zinc-700">Recipient Name</span>
          <input
            value={form.recipientName}
            onChange={(event) => handleChange("recipientName", event.target.value)}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="Who are you writing to?"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-zinc-700">Recipient Address / Organization</span>
          <textarea
            value={form.recipientAddress}
            onChange={(event) => handleChange("recipientAddress", event.target.value)}
            rows={2}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="School, company, etc."
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-zinc-700">Subject / Topic</span>
          <input
            value={form.subject}
            onChange={(event) => handleChange("subject", event.target.value)}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="Why are you writing?"
          />
        </label>
        <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-amber-200 bg-amber-50/40 p-4">
          <span className="text-sm font-medium text-amber-700">Key points / supporting details</span>
          <p className="text-sm text-amber-900/80">
            Add bullet points you want the letter to expand into full sentences. Leave
            blank entries for automatic phrasing.
          </p>
          <div className="flex flex-col gap-3">
            {form.contextPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="mt-2 text-sm text-amber-400">•</span>
                <div className="flex flex-1 flex-col gap-2">
                  <textarea
                    value={point}
                    onChange={(event) => updatePoint(index, event.target.value)}
                    rows={2}
                    className="w-full rounded-xl border border-amber-200 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    placeholder="Write a point or leave empty for auto text"
                  />
                  <button
                    onClick={() => removePoint(index)}
                    className="self-end text-xs font-medium text-amber-500 hover:text-amber-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addPoint}
              className="rounded-full border border-amber-300 bg-white px-4 py-1 text-sm font-medium text-amber-600 transition hover:border-amber-400 hover:text-amber-700"
            >
              Add another point
            </button>
          </div>
        </div>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-zinc-700">Gratitude / Closing note</span>
          <textarea
            value={form.gratitudeNote}
            onChange={(event) => handleChange("gratitudeNote", event.target.value)}
            rows={3}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="Optional acknowledgement"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-zinc-700">Signature block</span>
          <textarea
            value={form.signOffName}
            onChange={(event) => handleChange("signOffName", event.target.value)}
            rows={2}
            className="whitespace-pre-wrap rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder={"Regards,\nYour Name"}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-zinc-700">Letter Date</span>
          <input
            value={form.letterDate}
            onChange={(event) => handleChange("letterDate", event.target.value)}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="Date in words"
          />
        </label>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <label className="flex flex-col gap-2">
            <span className="font-medium text-zinc-700">Tone</span>
            <select
              value={form.tone}
              onChange={(event) => handleChange("tone", event.target.value as LetterInputs["tone"])}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              {toneOptions.map((toneOption) => (
                <option key={toneOption.value} value={toneOption.value}>
                  {toneOption.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium text-zinc-700">Language</span>
            <select
              value={form.language}
              onChange={(event) => handleChange(
                "language",
                event.target.value as LetterInputs["language"],
              )}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              {languageOptions.map((languageOption) => (
                <option key={languageOption.value} value={languageOption.value}>
                  {languageOption.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between rounded-3xl border border-zinc-200 bg-white/80 p-3 text-sm shadow-sm backdrop-blur">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("form")}
              className={`rounded-full px-4 py-1 font-medium transition ${
                activeTab === "form"
                  ? "bg-zinc-900 text-white shadow"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Form
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`rounded-full px-4 py-1 font-medium transition ${
                activeTab === "preview"
                  ? "bg-zinc-900 text-white shadow"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Preview
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={copyToClipboard}
              className="rounded-full border border-zinc-200 bg-white px-4 py-1 font-medium text-zinc-700 transition hover:border-amber-300 hover:text-amber-700"
            >
              {copied ? "Copied!" : "Copy text"}
            </button>
            <button
              onClick={handlePrint}
              className="rounded-full bg-zinc-900 px-5 py-1 font-medium text-white transition hover:bg-zinc-700"
            >
              Print / Save PDF
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white/90 p-8 shadow-lg shadow-amber-100/20 backdrop-blur">
          {activeTab === "form" ? (
            <div className="text-sm text-zinc-600">
              Adjust the inputs on the left to instantly update your letter. Switch to
              the preview tab anytime to see the final formatted version ready for
              download or copy.
            </div>
          ) : (
            <LetterPreview letter={letter} />
          )}
        </div>
      </div>
    </section>
  );
}
