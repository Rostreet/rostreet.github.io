import PhotoGallery from "@/components/PhotoGallery";
import { getAllPhotos } from "@/lib/photos";

export default function InterestsPage() {
  const photos = getAllPhotos();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* 页面说明 */}
      <div className="mb-6 text-center animate-fade-in">
        <p className="text-sm text-muted-foreground">光与影</p>
      </div>

      <PhotoGallery photos={photos} />
    </div>
  );
}
