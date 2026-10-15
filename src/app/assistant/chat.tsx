"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Quels dossiers dois je relancer en priorité ?",
  "Combien représentent les aides estimées ?",
  "Résume l'activité du mois",
];

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: answer }]);
      }
    } catch {
      setMessages([...next, { role: "assistant", content: "Une erreur est survenue, réessayez." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="flex h-[calc(100dvh-280px)] min-h-[480px] flex-col overflow-hidden">
      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 md:px-8">
        {messages.length === 0 && (
          <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center text-center">
            <span className="grid size-12 place-items-center rounded-md bg-pastel-green">
              <Sparkles className="size-5" strokeWidth={1.75} />
            </span>
            <h2 className="mt-5 text-2xl">Comment puis je vous aider ?</h2>
            <p className="mt-2 text-muted-foreground">
              L&apos;assistant connaît vos dossiers en cours et répond en quelques secondes.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="cursor-pointer rounded-sm border border-border bg-background px-3 py-2 text-sm transition-colors hover:border-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={cn("flex animate-in-up", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] whitespace-pre-wrap rounded-md px-4 py-3 leading-relaxed",
                m.role === "user" ? "bg-foreground text-background" : "border border-border bg-background",
              )}
            >
              {m.content || (
                <span className="inline-flex gap-1 py-1">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
                      style={{ animationDelay: `${d * 120}ms` }}
                    />
                  ))}
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-border bg-background/60 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question..."
          className="h-11 flex-1 bg-transparent px-3 text-[15px] outline-none placeholder:text-muted-foreground"
        />
        <Button type="submit" size="icon" disabled={loading || !input.trim()} aria-label="Envoyer">
          <ArrowUp />
        </Button>
      </form>
    </Card>
  );
}
