"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Loader2, X } from "lucide-react";
import { ACCEPT_ATTRIBUTE, MAX_UPLOADS_PER_LEAD } from "@/lib/uploads";
import { formatBytes } from "@/lib/format";

export type UploadedAttachment = {
  url: string;
  filename: string;
  contentType: string;
  size: number;
};

/**
 * Optional photo upload on the quote form.
 *
 * A photo of the dashboard light, the leak, or the worn tire turns a vague
 * "something's wrong" into something the shop can actually price. It also
 * shortens the phone call that follows.
 */
export function PhotoUpload({
  attachments,
  onChange,
}: {
  attachments: UploadedAttachment[];
  onChange: (attachments: UploadedAttachment[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const remaining = MAX_UPLOADS_PER_LEAD - attachments.length;

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);

    const selected = Array.from(files).slice(0, remaining);
    if (files.length > remaining) {
      setError(`You can attach up to ${MAX_UPLOADS_PER_LEAD} photos.`);
    }

    setUploading((count) => count + selected.length);

    // Uploaded one at a time rather than in parallel — a phone on a weak
    // connection handles a single request far better than five at once.
    for (const file of selected) {
      try {
        const body = new FormData();
        body.append("file", file);

        const response = await fetch("/api/upload", { method: "POST", body });
        const result = (await response.json()) as
          | ({ ok: true } & UploadedAttachment)
          | { ok: false; error: string };

        if (!response.ok || !result.ok) {
          setError("error" in result ? result.error : "That photo couldn't be uploaded.");
        } else {
          const { ok: _ok, ...attachment } = result;
          onChange([...attachments, attachment].slice(0, MAX_UPLOADS_PER_LEAD));
        }
      } catch {
        setError("Upload failed. Check your connection and try again.");
      } finally {
        setUploading((count) => Math.max(0, count - 1));
      }
    }

    // Allow re-picking the same file after a removal.
    if (inputRef.current) inputRef.current.value = "";
  }

  function remove(url: string) {
    onChange(attachments.filter((attachment) => attachment.url !== url));
  }

  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold text-ink-800">
        Add a photo
        <span className="ml-1.5 font-normal text-ink-500">(optional)</span>
      </p>
      <p className="mb-3 text-sm text-ink-500">
        A picture of the warning light, the leak, or the worn part helps us quote it accurately
        before you even drive over.
      </p>

      {attachments.length > 0 && (
        <ul className="mb-3 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {attachments.map((attachment) => (
            <li key={attachment.url} className="group relative">
              <div className="relative aspect-square overflow-hidden rounded-md border border-ink-200 bg-ink-50">
                <Image
                  src={attachment.url}
                  alt={attachment.filename}
                  fill
                  sizes="120px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <button
                type="button"
                onClick={() => remove(attachment.url)}
                className="absolute -right-1.5 -top-1.5 flex size-7 items-center justify-center rounded-full border border-ink-300 bg-white text-ink-700 shadow-card transition-colors hover:bg-bad-50 hover:text-bad-700"
                aria-label={`Remove ${attachment.filename}`}
              >
                <X className="size-3.5" aria-hidden />
              </button>
              <p className="mt-1 truncate text-[0.6875rem] text-ink-500">
                {formatBytes(attachment.size)}
              </p>
            </li>
          ))}
        </ul>
      )}

      {remaining > 0 && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading > 0}
          className="flex w-full items-center justify-center gap-2.5 rounded-md border border-dashed border-ink-300 bg-ink-50/60 px-4 py-4 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-800 disabled:opacity-60"
        >
          {uploading > 0 ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Uploading {uploading} photo{uploading === 1 ? "" : "s"}…
            </>
          ) : (
            <>
              <Camera className="size-4" aria-hidden />
              {attachments.length === 0 ? "Take or choose a photo" : "Add another photo"}
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTRIBUTE}
        multiple
        // capture is intentionally omitted: on a phone the OS picker still
        // offers the camera, and forcing it blocks people who already have the
        // photo in their library.
        onChange={(event) => void handleFiles(event.target.files)}
        className="hidden"
      />

      {error && (
        <p className="mt-2 text-sm text-bad-700" role="status">
          {error}
        </p>
      )}
    </div>
  );
}
