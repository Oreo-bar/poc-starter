import Anthropic from "@anthropic-ai/sdk";
import { dossiers } from "@/data/demo";
import { brand } from "@/config/brand";

/*
  ASSISTANT IA
  Avec ANTHROPIC_API_KEY (dans .env.local ou dans Vercel) : vraie réponse de Claude, en streaming.
  Sans clé : réponse simulée réaliste, pour que la démo fonctionne toujours.
*/

type Message = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `Tu es l'assistant IA intégré à l'application "${brand.appName}" de ${brand.clientName} (${brand.tagline}).
Tu aides les équipes à piloter leurs dossiers clients. Réponds en français, de façon concise, concrète et chiffrée.
Appuie toi uniquement sur les données ci dessous. Formate avec des listes courtes si utile, sans titres markdown.

Dossiers en cours (JSON) :
${JSON.stringify(dossiers)}`;

function mockAnswer(question: string) {
  const q = question.toLowerCase();
  if (q.includes("relanc") || q.includes("priorit")) {
    return `Trois dossiers méritent une action cette semaine :

1. DV-2474, Copropriété Le Parc (126 000 €) : vote en AG le 4 novembre. Préparer la présentation au conseil syndical dès maintenant.
2. DV-2481, Famille Lefèvre (14 800 €) : le devis vient d'être ouvert. Une relance jeudi, en insistant sur les 5 200 € d'aides, a de bonnes chances d'aboutir.
3. DV-2465, Famille Nguyen : accord MaPrimeRénov' en attente depuis 21 jours. Un appel à l'Anah éviterait de bloquer le démarrage.

Voulez vous que je prépare le message de relance pour la Famille Lefèvre ?`;
  }
  if (q.includes("aide") || q.includes("maprime")) {
    return `Sur les 12 dossiers suivis, les aides estimées totalisent 126 100 €, soit environ 34 % du montant des travaux.

Les plus gros montants concernent la Copropriété Le Parc (41 000 €), la SCI Horizon (24 500 €) et M. et Mme Bertin (19 800 €). Deux dossiers sont encore à qualifier : leurs aides restent à confirmer après visite technique.`;
  }
  return `Ce mois ci, 254 000 € ont été signés, en hausse de 7,6 % par rapport à septembre. Le pipeline atteint 338 000 €, porté surtout par l'isolation par l'extérieur et la rénovation globale.

Point de vigilance : 3 dossiers prioritaires sont encore au stade du devis ou de la qualification, pour un total de 202 800 €. Je peux vous proposer un plan de relance détaillé.`;
}

function streamText(text: string) {
  const encoder = new TextEncoder();
  const tokens = text.match(/\S+\s*/g) ?? [];
  return new ReadableStream({
    async start(controller) {
      for (const t of tokens) {
        controller.enqueue(encoder.encode(t));
        await new Promise((r) => setTimeout(r, 18 + Math.random() * 30));
      }
      controller.close();
    },
  });
}

export async function POST(request: Request) {
  const { messages } = (await request.json()) as { messages: Message[] };
  const last = messages.at(-1)?.content ?? "";
  const headers = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" };

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(streamText(mockAnswer(last)), { headers });
  }

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = client.messages.stream({
          model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5-5",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages,
        });
        for await (const event of response) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (error) {
        console.error(error);
        controller.enqueue(encoder.encode("Désolé, l'assistant est momentanément indisponible."));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers });
}
