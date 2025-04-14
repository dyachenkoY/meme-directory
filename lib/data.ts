export interface Meme {
  id: number;
  title: string;
  image: string;
  likes: number;
}

export const defaultMemes: Meme[] = [
  {
    id: 1,
    title: "It's a secret...",
    image: "https://i.imgur.com/G9CPXWu.jpeg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 2,
    title: "IT Memes",
    image: "https://i.imgur.com/5n3KM9Z.jpeg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 3,
    title: "Funky dump",
    image: "https://i.imgur.com/RirhsgH.jpeg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 4,
    title: "LOL",
    image: "https://i.imgur.com/BBD652e.jpeg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 5,
    title: "Green vine snakes don't bite. They do better: theyjudge you.",
    image: "https://i.imgur.com/uF5qC4L.jpeg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 6,
    title: "I'm certain of it",
    image: "https://i.imgur.com/oKywm1D.png",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 7,
    title: "Good Information",
    image: "https://i.imgur.com/gUzwHBa.jpeg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 8,
    title: "Funny dog meme",
    image: "https://i.imgur.com/LrdB4Xz.jpeg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 9,
    title: "Steak sauce is important!",
    image: "https://i.imgur.com/CscWej8.jpeg",
    likes: Math.floor(Math.random() * 100),
  },
  {
    id: 10,
    title: "HAPPY NATIONAL SIBLINGS DAY",
    image: "https://i.imgur.com/V0tepfq.jpeg",
    likes: Math.floor(Math.random() * 100),
  },
];
