"use client";

import { useState } from "react";
import { X, MapPin, Calendar, Camera } from "lucide-react";
import Image from "next/image";
import type { Photo } from "@/lib/photos";

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      {/* 瀑布流布局 */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg border border-border/40 bg-card animate-waterfall break-inside-avoid mb-3"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <div
              className="relative w-full"
              style={{ height: `${photo.height}px` }}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="20vw"
              />
              {/* 悬停遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="text-sm font-semibold mb-1">{photo.title}</h3>
                  <p className="text-xs opacity-90">{photo.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 详情弹窗 */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </>
  );
}

// 照片详情弹窗组件
function PhotoModal({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full max-h-[90vh] bg-card rounded-xl border border-border/40 overflow-hidden shadow-2xl animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-all duration-200 hover:scale-110"
          aria-label="关闭"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col lg:flex-row max-h-[90vh]">
          {/* 左侧：图片展示区 */}
          <div className="lg:flex-1 relative bg-black flex items-center justify-center min-h-[50vh] lg:min-h-full">
            <Image
              src={photo.src}
              alt={photo.title}
              width={1200}
              height={photo.height}
              className="max-w-full max-h-[85vh] object-contain"
              priority
            />
          </div>

          {/* 右侧：信息展示区 */}
          <div className="lg:w-96 p-6 lg:p-8 bg-card overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{photo.title}</h2>

            <div className="space-y-4">
              {/* 拍摄地点 */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">拍摄地点</p>
                  <p className="font-medium">{photo.location}</p>
                </div>
              </div>

              {/* 拍摄时间 */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">拍摄时间</p>
                  <p className="font-medium">{photo.date}</p>
                </div>
              </div>

              {/* 相机信息 */}
              <div className="flex items-start gap-3">
                <Camera className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">拍摄器材</p>
                  <p className="font-medium">{photo.camera}</p>
                  {photo.lens && (
                    <p className="text-sm text-muted-foreground mt-1">
                      镜头：{photo.lens}
                    </p>
                  )}
                </div>
              </div>

              {/* 作品描述 */}
              <div className="pt-4 border-t border-border/40">
                <p className="text-sm text-muted-foreground mb-2">作品描述</p>
                <p className="text-sm leading-relaxed">{photo.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
