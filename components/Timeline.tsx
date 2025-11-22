"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface TimelineItem {
  title: string;
  description: string;
  week?: string;
  month?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  orientation?: "vertical" | "horizontal";
}

export default function Timeline({ items, orientation = "vertical" }: TimelineProps) {
  if (orientation === "horizontal") {
    return (
      <div className="relative">
        <div className="flex overflow-x-auto pb-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-64 mr-4"
            >
              <div className="bg-card rounded-lg border p-4 h-full">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    {item.week && (
                      <p className="text-sm font-semibold text-primary mb-1">
                        {item.week}
                      </p>
                    )}
                    {item.month && (
                      <p className="text-sm font-semibold text-primary mb-1">
                        {item.month}
                      </p>
                    )}
                    <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex items-start space-x-4"
          >
            {/* Circle */}
            <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="flex-1 bg-card rounded-lg border p-4">
              {item.week && (
                <p className="text-sm font-semibold text-primary mb-1">
                  {item.week}
                </p>
              )}
              {item.month && (
                <p className="text-sm font-semibold text-primary mb-1">
                  {item.month}
                </p>
              )}
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}









