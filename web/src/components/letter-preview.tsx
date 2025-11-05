import type { LetterContent } from "@/lib/letter-generator";

interface LetterPreviewProps {
  letter: LetterContent;
}

export default function LetterPreview({ letter }: LetterPreviewProps) {
  return (
    <article className="letter-preview mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-[32px] border border-zinc-200 bg-white p-10 shadow-2xl shadow-amber-100/30 print:border-none print:p-0 print:shadow-none">
      <header className="flex flex-col gap-1 text-sm leading-relaxed text-zinc-600">
        {letter.headerLines.map((line, index) => (
          <span key={`${line}-${index}`} className={line ? "text-zinc-600" : "h-4"}>
            {line}
          </span>
        ))}
      </header>

      <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-700">
        {letter.subjectLine}
      </h2>

      <p className="text-base font-medium text-zinc-800">{letter.salutation}</p>

      <div className="flex flex-col gap-4 text-base leading-7 text-zinc-700">
        {letter.bodyParagraphs.map((paragraph, index) => (
          <p key={index} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
        <p className="font-medium text-amber-700">{letter.gratitudeLine}</p>
      </div>

      <footer className="mt-6 flex flex-col gap-1 text-base font-medium text-zinc-800">
        {letter.closingLines.map((line, index) => (
          <span key={`${line}-${index}`} className="whitespace-pre-line">
            {line}
          </span>
        ))}
      </footer>
    </article>
  );
}
