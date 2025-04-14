import type React from "react";
import type { Meme } from "@/lib/data";

import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalFooter } from "@heroui/modal";
import { Input } from "@heroui/input";
import Image from "next/image";

interface MemeEditModalProps {
  meme: Meme | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (meme: Meme) => void;
}

export function MemeEditModal({
  meme,
  open,
  onOpenChange,
  onSave,
}: MemeEditModalProps) {
  const [formState, setFormState] = useState<Meme | null>(null);
  const [errors, setErrors] = useState<{
    title?: string;
    image?: string;
    likes?: string;
  }>({});

  useEffect(() => {
    if (meme) {
      setFormState(meme);
      setErrors({});
    }
  }, [meme]);

  if (!formState) return null;

  const validateForm = () => {
    const newErrors: {
      title?: string;
      image?: string;
      likes?: string;
    } = {};

    if (!formState.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formState.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formState.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formState.image.trim()) {
      newErrors.image = "Image URL is required";
    } else {
      try {
        new URL(formState.image);
      } catch {
        newErrors.image = "Must be a valid URL";
      }
    }

    const likesNum = Number(formState.likes);

    if (isNaN(likesNum)) {
      newErrors.likes = "Likes must be a number";
    } else if (likesNum < 0) {
      newErrors.likes = "Likes cannot be negative";
    } else if (likesNum > 99) {
      newErrors.likes = "Likes must be less than 100";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formState);
      onOpenChange(false);
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={onOpenChange}>
      <ModalContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <ModalHeader className="text-lg font-semibold">Edit Meme</ModalHeader>
          <div className="grid gap-4 px-6 pb-4">
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-gray-600" htmlFor="id">
                ID
              </label>
              <Input disabled id="id" value={`${formState.id}`} />
            </div>

            <div className="grid gap-1.5">
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor="title"
              >
                Title
              </label>
              <Input
                className={errors.title ? "border-danger" : ""}
                id="title"
                value={formState.title}
                onChange={(e) =>
                  setFormState({ ...formState, title: e.target.value })
                }
              />
              {errors.title && (
                <p className="text-danger text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div className="grid gap-1.5">
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor="image"
              >
                Image URL
              </label>
              <Input
                className={errors.image ? "border-danger" : ""}
                id="image"
                value={formState.image}
                onChange={(e) =>
                  setFormState({ ...formState, image: e.target.value })
                }
              />
              {errors.image && (
                <p className="text-danger text-sm mt-1">{errors.image}</p>
              )}

              {formState.image && !errors.image && (
                <div className="aspect-video mt-2 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  <Image
                    alt={formState.title}
                    className="object-contain max-h-full"
                    height={150}
                    src={formState.image}
                    width={300}
                    onError={() =>
                      setErrors({
                        ...errors,
                        image: "Unable to load image from URL",
                      })
                    }
                  />
                </div>
              )}
            </div>

            <div className="grid gap-1.5">
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor="likes"
              >
                Likes
              </label>
              <Input
                className={errors.likes ? "border-danger" : ""}
                id="likes"
                max={99}
                min={0}
                type="number"
                value={`${formState.likes}`}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    likes: Number.parseInt(e.target.value) || 0,
                  })
                }
              />
              {errors.likes && (
                <p className="text-danger text-sm mt-1">{errors.likes}</p>
              )}
            </div>
          </div>

          <ModalFooter className="px-6 pb-4">
            <Button
              type="button"
              variant="light"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
