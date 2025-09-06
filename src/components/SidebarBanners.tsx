import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";

type Banner = {
  id: number;
  title?: string;
  subtitle?: string;
  button_text?: string;
  button_url?: string;
  background_image_url?: string;
  text_color?: string;
  background_color?: string;
  priority?: number;
};

export default function SidebarBanners({
  slug,
  className,
}: { slug?: string; className?: string }) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const controller = useMemo(() => new AbortController(), []);

  useEffect(() => {
    const url = slug
      ? `/api/v1/banners?position=sidebar_left&company_slug=${slug}`
      : `/api/v1/banners?position=sidebar_left`;

    axios
      .get(url, { signal: controller.signal as any })
      .then((r) => setBanners((r.data || []).sort(
        (a: Banner, b: Banner) => (b.priority ?? 0) - (a.priority ?? 0)
      )))
      .catch((err) => {
        if (err?.name !== "AbortError") console.warn("Banners:", err);
      });

    return () => controller.abort();
  }, [slug]);

  if (!banners.length) return null;

  return (
    <aside className={cn("md:sticky md:top-24 space-y-4", className)}>
      {banners.map((b) => (
        <article
          key={b.id}
          className="rounded-xl overflow-hidden border bg-white shadow-sm"
          style={{ color: b.text_color || undefined, backgroundColor: b.background_color || undefined }}
        >
          {b.background_image_url && (
            <img
              src={b.background_image_url}
              alt={b.title || "Banner"}
              loading="lazy"
              decoding="async"
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-4 space-y-2">
            {b.title && <h3 className="text-sm font-semibold">{b.title}</h3>}
            {b.subtitle && <p className="text-xs text-muted-foreground">{b.subtitle}</p>}
            {b.button_url && (
              <a
                href={b.button_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={b.title || "Abrir banner"}
                className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {b.button_text || "Saiba mais"}
              </a>
            )}
          </div>
        </article>
      ))}
    </aside>
  );
}
