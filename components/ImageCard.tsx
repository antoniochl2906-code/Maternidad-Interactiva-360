"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  imageSrc: string;
  title?: string;
  description?: string;
  className?: string;
  delay?: number;
}

export default function ImageCard({ 
  imageSrc, 
  title, 
  description, 
  className,
  delay = 0 
}: ImageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-violet-50/80 border-2 border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out group">
          {/* Imagen */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-xl bg-gradient-to-br from-primary/20 to-secondary/20">
            <img
              src={imageSrc}
              alt={title || "Imagen"}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              style={{ display: 'block' }}
              loading="lazy"
              onLoad={(e) => {
                const target = e.target as HTMLImageElement;
                const placeholder = target.parentElement?.querySelector('.image-placeholder') as HTMLElement;
                if (placeholder) {
                  placeholder.style.display = 'none';
                }
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.parentElement?.querySelector('.image-placeholder') as HTMLElement;
                if (placeholder) {
                  placeholder.style.display = 'flex';
                  const text = placeholder.querySelector('p');
                  if (text) {
                    text.textContent = 'Imagen no disponible';
                  }
                }
              }}
            />
            {/* Placeholder mientras carga */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 image-placeholder">
              <p className="text-muted-foreground">Cargando...</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Contenido (solo si hay título o descripción) */}
          {(title || description) && (
            <CardContent className="p-6 text-center">
              {title && (
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm md:text-base text-muted-foreground">
                  {description}
                </p>
              )}
            </CardContent>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
}

