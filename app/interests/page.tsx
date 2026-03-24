import PhotoGallery from "@/components/PhotoGallery";
import { getAllPhotos } from "@/lib/photos";

export default function InterestsPage() {
  const photos = getAllPhotos();

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Photography
          </p>
        </header>

        <div className="section-divider mt-7 pt-5">
          <PhotoGallery photos={photos} />
        </div>
      </div>
    </div>
  );
}
