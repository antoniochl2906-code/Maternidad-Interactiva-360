"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  MessageCircle, 
  Linkedin, 
  Stethoscope,
  Heart,
  User,
  Sparkles
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: number;
  name: string;
  specialty: string;
  description: string;
  services: string[];
  email: string;
  whatsapp: string;
  linkedin?: string;
  photo: string;
  color: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Jose Luis Barriga Vera",
    specialty: "Ginecólogo Obstetra",
    description: "Especialista en atención prenatal, parto y puerperio. Con amplia experiencia en el seguimiento del embarazo de bajo y alto riesgo, brindando atención integral y personalizada a cada paciente.",
    services: [
      "Control prenatal",
      "Ecografías obstétricas",
      "Atención del parto",
      "Seguimiento postparto"
    ],
    email: "barriguitajl@hotmail.com",
    whatsapp: "72048108",
    photo: "/api/placeholder/200/200",
    color: "from-pink-200 to-rose-200"
  },
  {
    id: 2,
    name: "Dra. Lucy Reyna Ariñez Mancilla",
    specialty: "Ginecóloga Obstetra",
    description: "Dedicada a la salud materno-fetal con enfoque en medicina preventiva. Especialista en el manejo de embarazos de alto riesgo y atención integral de la mujer durante el embarazo.",
    services: [
      "Medicina materno-fetal",
      "Embarazos de alto riesgo",
      "Medicina preventiva",
      "Atención ginecológica"
    ],
    email: "lucyreinita@yahoo.com",
    whatsapp: "72047122",
    photo: "/api/placeholder/200/200",
    color: "from-purple-200 to-violet-200"
  },
  {
    id: 3,
    name: "Dr. Nelson Mauricio Massy Ramos",
    specialty: "Médico General",
    description: "Profesional comprometido con la atención primaria y la salud integral. Experiencia en el seguimiento de pacientes embarazadas y atención de salud general de la familia.",
    services: [
      "Atención primaria",
      "Control de salud general",
      "Medicina preventiva",
      "Atención familiar"
    ],
    email: "massymauricio@gmail.com",
    whatsapp: "75725169",
    photo: "/api/placeholder/200/200",
    color: "from-blue-200 to-cyan-200"
  },
  {
    id: 4,
    name: "Dra. Noemi Celina Mendoza Sarco",
    specialty: "Médico Salubrista",
    description: "Especialista en salud pública con enfoque en salud materno-infantil. Dedicada a la promoción de la salud, prevención de enfermedades y mejora de la calidad de vida de las familias.",
    services: [
      "Salud pública",
      "Promoción de la salud",
      "Prevención de enfermedades",
      "Salud materno-infantil"
    ],
    email: "noemi.cms@gmail.com",
    whatsapp: "72597484",
    photo: "/api/placeholder/200/200",
    color: "from-green-200 to-emerald-200"
  },
  {
    id: 5,
    name: "Dr. Hugo Antonio Chavez Lopez",
    specialty: "Médico General",
    description: "Profesional de la salud con experiencia en atención integral. Comprometido con la educación en salud y el bienestar de los pacientes, especialmente en el área de salud materno-infantil.",
    services: [
      "Atención médica integral",
      "Educación en salud",
      "Medicina preventiva",
      "Atención de salud general"
    ],
    email: "antoniochl2906@gmail.com",
    whatsapp: "75301333",
    linkedin: "https://www.linkedin.com/in/chávez-lopez-hugo-antonio",
    photo: "/api/placeholder/200/200",
    color: "from-amber-200 to-orange-200"
  }
];

export default function EquipoMedicoPage() {
  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/591${phone}`, '_blank');
  };

  const handleLinkedIn = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-violet-50/80 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 float-animation">
            <Stethoscope className="w-32 h-32 text-primary" />
          </div>
          <div className="absolute bottom-10 right-10 float-animation" style={{ animationDelay: "2s" }}>
            <Heart className="w-24 h-24 text-secondary" />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="inline-block mb-4"
              >
                <div className="p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
                  <User className="w-12 h-12 text-primary" />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Nuestro Equipo Médico
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Profesionales comprometidos con tu salud y la de tu bebé
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <ScrollReveal key={member.id} delay={index * 0.1} direction="up">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl bg-white/90 backdrop-blur-sm">
                  {/* Foto y gradiente */}
                  <div className={cn("relative h-48 bg-gradient-to-br", member.color)}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center overflow-hidden border-4 border-white">
                          <User className="w-20 h-20 text-primary" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 shadow-lg">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="text-center pt-6">
                    <CardTitle className="text-xl mb-2">{member.name}</CardTitle>
                    <CardDescription className="text-base font-semibold text-primary">
                      {member.specialty}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Servicios:</p>
                      <ul className="space-y-1">
                        {member.services.map((service, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                            <Sparkles className="w-3 h-3 text-primary" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-2 pt-4 border-t">
                      <Button
                        onClick={() => handleEmail(member.email)}
                        variant="outline"
                        className="w-full justify-start gap-2 hover:bg-primary/10 hover:border-primary"
                      >
                        <Mail className="w-4 h-4" />
                        Enviar Email
                      </Button>
                      <Button
                        onClick={() => handleWhatsApp(member.whatsapp)}
                        variant="outline"
                        className="w-full justify-start gap-2 hover:bg-green-50 hover:border-green-300 hover:text-green-700"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </Button>
                      {member.linkedin && (
                        <Button
                          onClick={() => handleLinkedIn(member.linkedin!)}
                          variant="outline"
                          className="w-full justify-start gap-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                        >
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Información adicional */}
        <ScrollReveal delay={0.3}>
          <Card className="mt-8 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Comprometidos con tu bienestar</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nuestro equipo multidisciplinario está dedicado a brindarte la mejor atención durante tu embarazo. 
                Cada profesional aporta su experiencia y conocimiento para asegurar que recibas cuidados de la más alta calidad. 
                No dudes en contactarnos para cualquier consulta o duda que tengas.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}

