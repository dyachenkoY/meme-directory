"use client";

import type { Meme } from "@/lib/data";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Edit } from "lucide-react";

import { useMemes } from "../hooks/use-memes";

import { MemeEditModal } from "./meme-edit-modal";

export function TableView() {
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableColumn className="w-[100px]">ID</TableColumn>
            <TableColumn className="w-[100px]">Title</TableColumn>
            <TableColumn className="w-[100px]">Likes</TableColumn>
            <TableColumn className="w-[100px]">Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {memes.map((meme) => (
              <TableRow key={meme.id}>
                <TableCell className="font-medium">{meme.id}</TableCell>
                <TableCell>{meme.title}</TableCell>
                <TableCell>{meme.likes}</TableCell>
                <TableCell>
                  <Button variant="light" onClick={() => handleEditClick(meme)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
