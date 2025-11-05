import LetterComposer from "@/components/letter-composer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 text-zinc-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
        <header className="flex flex-col gap-4 text-center sm:text-left">
          <span className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-amber-200 bg-white px-4 py-1 text-sm font-medium uppercase tracking-wide text-amber-600 shadow-sm sm:self-start">
            Letter Studio
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Craft heartfelt letters in minutes.
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600">
            Answer a few prompts, choose the tone, and instantly generate a polished
            letter you can copy or download as a beautifully formatted PDF-ready
            layout. Designed for Hindi and English writers alike.
          </p>
        </header>
        <LetterComposer />
      </div>
    </div>
  );
}
