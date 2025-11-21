"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: string;
  children?: NavLink[];
};

const navLinks: NavLink[] = [
  { href: "/", label: "Inicio" },
  {
    href: "/controles-prenatales",
    label: "Controles Prenatales",
    children: [
      { href: "/controles-prenatales", label: "Controles Prenatales" },
      { href: "/que-se-hace-en-cada-control", label: "Qué se hace en cada control" },
      { href: "/ecografias", label: "Ecografías" },
      { href: "/laboratorios", label: "Laboratorios" },
    ],
  },
  { href: "/calculadoras", label: "Calculadoras" },
  {
    href: "/signos-de-alarma",
    label: "Guías y Seguridad",
    children: [
      { href: "/signos-de-alarma", label: "Signos de Alarma" },
      { href: "/riesgos-frecuentes", label: "Riesgos Frecuentes" },
    ],
  },
  { href: "/faq", label: "FAQ" },
  {
    href: "/contacto",
    label: "Contacto",
    children: [
      { href: "/contacto", label: "Contacto / Emergencias" },
      { href: "/equipo-medico", label: "Equipo Médico" },
    ],
  },
  { href: "/discusion-cientifica", label: "Discusión Científica" },
];

interface DropdownMenuProps {
  link: NavLink;
  onClose?: () => void;
}

function DropdownMenu({ link, onClose }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  if (!link.children) {
    return (
      <Link href={link.href} onClick={onClose}>
        <Button
          variant="ghost"
          className="text-sm font-medium text-gray-700 hover:text-primary hover:bg-secondary/50"
        >
          {link.label}
        </Button>
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      <Button
        variant="ghost"
        className="text-sm font-medium text-gray-700 hover:text-primary hover:bg-secondary/50"
      >
        {link.label}
        <ChevronDown
          className={cn(
            "ml-1 h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-1 w-56 rounded-md border bg-white shadow-lg py-1 z-50"
          >
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary/50 hover:text-primary transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface MobileDropdownProps {
  link: NavLink;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function MobileDropdown({ link, isOpen, onToggle, onClose }: MobileDropdownProps) {
  if (!link.children) {
    return (
      <Link
        href={link.href}
        onClick={onClose}
        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-secondary/50 hover:text-primary rounded-md transition-colors"
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 hover:bg-secondary/50 hover:text-primary rounded-md transition-colors"
      >
        <span>{link.label}</span>
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-90"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-6 py-1 space-y-1">
              {link.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-secondary/50 hover:text-primary rounded-md transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<number, boolean>>({});

  const toggleMobileDropdown = (index: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setOpenDropdowns({});
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary">Maternidad</span>
              <span className="text-xs text-muted-foreground">Interactiva 360</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <DropdownMenu key={index} link={link} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-1 py-4">
                {navLinks.map((link, index) => (
                  <MobileDropdown
                    key={index}
                    link={link}
                    isOpen={openDropdowns[index] || false}
                    onToggle={() => toggleMobileDropdown(index)}
                    onClose={closeMobileMenu}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}






