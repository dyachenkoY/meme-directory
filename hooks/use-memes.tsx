"use client";

import { useState, useEffect } from "react";

import { type Meme, defaultMemes } from "@/lib/data";

const MEME_VERSION = "v3";

export function useMemes() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedMemes = localStorage.getItem("memes");
    const storedVersion = localStorage.getItem("memes_version");

    if (!storedMemes || storedVersion !== MEME_VERSION) {
      localStorage.setItem("memes", JSON.stringify(defaultMemes));
      localStorage.setItem("memes_version", MEME_VERSION);
      setMemes(defaultMemes);
    } else {
      setMemes(JSON.parse(storedMemes));
    }

    setIsLoaded(true);
  }, []);

  const updateMeme = (updatedMeme: Meme) => {
    const updatedMemes = memes.map((meme) =>
      meme.id === updatedMeme.id ? updatedMeme : meme,
    );

    setMemes(updatedMemes);
    localStorage.setItem("memes", JSON.stringify(updatedMemes));
  };

  return {
    memes,
    updateMeme,
    isLoaded,
  };
}
