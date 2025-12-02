"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

const projectTypes = [
  { value: "", label: "Select type" },
  { value: "architecture", label: "Architecture" },
  { value: "art", label: "Art Projects" },
  { value: "personal", label: "Personal Projects" }
] as const;

const categories = {
  architecture: [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "institutional", label: "Institutional" },
    { value: "urban_planning", label: "Urban Planning" },
    { value: "interior", label: "Interior" },
    { value: "landscape", label: "Landscape" },
    { value: "renovation", label: "Renovation" }
  ],
  art: [
    { value: "painting", label: "Painting" },
    { value: "sculpture", label: "Sculpture" },
    { value: "digital", label: "Digital Art" },
    { value: "installation", label: "Installation" },
    { value: "photography", label: "Photography" },
    { value: "mixed_media", label: "Mixed Media" }
  ],
  personal: [
    { value: "writing", label: "Writing" },
    { value: "research", label: "Research" },
    { value: "experiment", label: "Experiment" },
    { value: "other", label: "Other" }
  ]
} as const;

type UploadState = {
  title: string;
  description: string;
  project_type: string;
  category: string;
  location: string;
  year: string;
  area: string;
  client: string;
};

export default function UploadPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<UploadState>({
    title: "",
    description: "",
    project_type: "",
    category: "",
    location: "",
    year: "",
    area: "",
    client: ""
  });
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const categoryOptions = useMemo(() => {
    if (!form.project_type) return [];
    return categories[form.project_type as keyof typeof categories] ?? [];
  }, [form.project_type]);

  const handleCoverChange = (files: FileList | null) => {
    if (!files?.[0]) return;
    const file = files[0];
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleGalleryChange = (files: FileList | null) => {
    if (!files) return;
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setGalleryPreviews((prev) => [...prev, ...previews]);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreviews((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title || !form.project_type || !coverPreview) {
      setMessage("Please add a title, project type, and cover image before publishing.");
      return;
    }

    setUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setMessage(
        "Project saved locally. Connect this form to a database or storage service to persist your submissions."
      );
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="mx-auto max-w-4xl px-6">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-8 text-dark">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="rounded-[32px] border-4 border-dark bg-white shadow-2xl">
          <div className="p-8 md:p-12">
            <h1 className="mb-2 text-3xl font-light tracking-tight text-dark md:text-4xl">Add New Project</h1>
            <p className="mb-10 text-dark/60">Share your work with the world. Hook this form to your backend to publish.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-sm font-medium tracking-wide text-dark">Cover Image *</label>
                {!coverPreview ? (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-4 border-dashed border-dark p-12 text-center transition-colors hover:bg-yellow/10">
                    <Upload className="mb-3 h-10 w-10 text-dark" />
                    <p className="font-light text-dark">Click to upload cover image</p>
                    <p className="mt-1 text-sm text-dark/60">JPG, PNG up to 10MB</p>
                    <input type="file" accept="image/*" onChange={(event) => handleCoverChange(event.target.files)} className="hidden" />
                  </label>
                ) : (
                  <div className="group relative">
                    <Image
                      src={coverPreview}
                      alt="Cover preview"
                      width={900}
                      height={400}
                      className="h-64 w-full rounded-2xl border-4 border-dark object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setCoverPreview(null)}
                      className="absolute right-3 top-3 rounded-full border-2 border-dark bg-red p-2 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-medium tracking-wide text-dark">Project Title *</label>
                  <Input
                    value={form.title}
                    onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                    placeholder="Modern Villa in the Hills"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium tracking-wide text-dark">Project Type *</label>
                  <Select
                    value={form.project_type}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        project_type: event.target.value,
                        category: ""
                      }))
                    }
                  >
                    {projectTypes.map((type) => (
                      <option key={type.value || "placeholder"} value={type.value} disabled={type.value === ""}>
                        {type.label}
                      </option>
                    ))}
                  </Select>
                </div>

                {categoryOptions.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium tracking-wide text-dark">Category</label>
                    <Select
                      value={form.category}
                      onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                    >
                      <option value="">Select category</option>
                      {categoryOptions.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                )}

                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-medium tracking-wide text-dark">Description</label>
                  <Textarea
                    value={form.description}
                    onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                    placeholder="Describe your project..."
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium tracking-wide text-dark">Location</label>
                  <Input
                    value={form.location}
                    onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                    placeholder="Los Angeles, CA"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium tracking-wide text-dark">Year</label>
                  <Input
                    value={form.year}
                    onChange={(event) => setForm((prev) => ({ ...prev, year: event.target.value }))}
                    placeholder="2024"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium tracking-wide text-dark">Area</label>
                  <Input
                    value={form.area}
                    onChange={(event) => setForm((prev) => ({ ...prev, area: event.target.value }))}
                    placeholder="4,900 sq ft"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium tracking-wide text-dark">Client</label>
                  <Input
                    value={form.client}
                    onChange={(event) => setForm((prev) => ({ ...prev, client: event.target.value }))}
                    placeholder="The Marinho Family"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium tracking-wide text-dark">Gallery Images</label>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {galleryPreviews.map((preview, index) => (
                    <div key={`${preview}-${index}`} className="group relative">
                      <Image
                        src={preview}
                        alt={`Gallery ${index + 1}`}
                        width={320}
                        height={320}
                        className="h-32 w-full rounded-xl border-2 border-dark object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute right-2 top-2 rounded-full border-2 border-dark bg-red p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                  <label className="flex h-32 cursor-pointer items-center justify-center rounded-xl border-4 border-dashed border-dark text-dark transition-colors hover:bg-yellow/10">
                    <Upload className="h-6 w-6" />
                    <input type="file" accept="image/*" multiple className="hidden" onChange={(event) => handleGalleryChange(event.target.files)} />
                  </label>
                </div>
              </div>

              {message && (
                <div
                  className={clsx(
                    "rounded-xl border-2 border-dark px-4 py-3 text-sm",
                    message.startsWith("Project saved") ? "bg-blue/10 text-dark" : "bg-red/10 text-dark"
                  )}
                >
                  {message}
                </div>
              )}

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                  disabled={uploading}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading} className="min-w-32 rounded-full">
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    "Publish Project"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

