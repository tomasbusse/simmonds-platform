import { action } from "./_generated/server";
import { v } from "convex/values";

// Generate audio using ElevenLabs
export const generateAudio = action({
  args: {
    text: v.string(),
    voiceId: v.optional(v.string()), // Default to Rachel voice
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      throw new Error("ElevenLabs API key not configured");
    }

    // Use Rachel voice by default (clear, professional female voice)
    const voiceId = args.voiceId || "21m00Tcm4TlvDq8ikWAM";

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": apiKey,
          },
          body: JSON.stringify({
            text: args.text,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      // Get audio as base64
      const audioBuffer = await response.arrayBuffer();
      const base64Audio = Buffer.from(audioBuffer).toString('base64');

      return {
        audioData: `data:audio/mpeg;base64,${base64Audio}`,
        voiceId,
      };
    } catch (error) {
      console.error("Error generating audio:", error);
      throw new Error(`Failed to generate audio: ${error}`);
    }
  },
});

// Generate audio for a question
export const generateQuestionAudio = action({
  args: {
    questionId: v.id("questions"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      throw new Error("ElevenLabs API key not configured");
    }

    const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel voice

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": apiKey,
          },
          body: JSON.stringify({
            text: args.text,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      const audioBuffer = await response.arrayBuffer();
      const base64Audio = Buffer.from(audioBuffer).toString('base64');
      const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;

      // TODO: Store audio content in database when needed
      // For now, just return the audio URL

      return audioUrl;
    } catch (error) {
      console.error("Error generating question audio:", error);
      throw new Error(`Failed to generate audio: ${error}`);
    }
  },
});

// Get available voices
export const getVoices = action({
  args: {},
  handler: async (ctx) => {
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      throw new Error("ElevenLabs API key not configured");
    }

    try {
      const response = await fetch("https://api.elevenlabs.io/v1/voices", {
        headers: {
          "xi-api-key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.voices;
    } catch (error) {
      console.error("Error fetching voices:", error);
      throw new Error(`Failed to fetch voices: ${error}`);
    }
  },
});