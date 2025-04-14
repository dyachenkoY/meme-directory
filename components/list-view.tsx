"use client";

import type { Meme } from "@/lib/data";

import { useState } from "react";
import { HeartIcon, ExternalLink, Edit } from "lucide-react";
import NextImage from "next/image";
import { Image } from "@heroui/image";
import { Card, CardHeader, CardFooter, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";

import { useMemes } from "@/hooks/use-memes";
import { MemeEditModal } from "@/components/meme-edit-modal";

export function ListView() {
  const { memes, updateMeme, isLoaded } = useMemes();
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditClick = (meme: Meme) => {
    setSelectedMeme(meme);
    setModalOpen(true);
  };

  if (!isLoaded) {
    return (
      <div className="text-center py-12">
        <p>Loading memes...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {memes.map((meme) => (
          <Card key={meme.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative overflow-hidden">
              <Image
                alt={meme.title}
                as={NextImage}
                className="absolute inset-0 w-full h-full object-cover"
                height={200}
                src={meme.image || "/placeholder.svg"}
                width={300}
              />
            </div>
            <CardHeader className="p-4 pb-0">{meme.title}</CardHeader>
            <CardBody className="p-4 pt-2">
              <div className="flex items-center text-muted-foreground">
                <HeartIcon className="h-4 w-4 mr-1 text-red-500" />
                <span>{meme.likes} likes</span>
              </div>
            </CardBody>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <a
                className="text-sm flex items-center text-blue-500 hover:underline"
                href={meme.image}
                rel="noopener noreferrer"
                target="_blank"
              >
                View <ExternalLink className="h-3 w-3 ml-1" />
              </a>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleEditClick(meme)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <MemeEditModal
        meme={selectedMeme}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={updateMeme}
      />
    </>
  );
}
