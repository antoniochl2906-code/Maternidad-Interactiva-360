"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, AlertTriangle, Users, Heart, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ImageCard from "@/components/ImageCard";

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-violet-50/80">
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 float-animation">
            <Phone className="w-32 h-32 text-primary" />
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
                  <Phone className="w-12 h-12 text-primary" />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Contacto / Emergencias
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Información de contacto y qué hacer en caso de emergencia
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Imagen de Contacto */}
        <ScrollReveal delay={0.05}>
          <div className="mb-12 max-w-4xl mx-auto">
            <ImageCard
              imageSrc="/CONTACTO.jpg"
              title="Contacto y Emergencias"
              description="Información de contacto y qué hacer en caso de emergencia"
            />
          </div>
        </ScrollReveal>

        {/* Link to Team */}
        <ScrollReveal delay={0.05}>
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 shadow-lg hover:shadow-xl transition-all bg-white/90 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/20">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Conoce a nuestro equipo médico</h3>
                    <p className="text-sm text-muted-foreground">Profesionales comprometidos con tu salud y la de tu bebé</p>
                  </div>
                </div>
                <Link href="/equipo-medico">
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                    Ver Equipo Médico
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Emergency Alert */}
        <ScrollReveal delay={0.1}>
          <Card className="mb-12 bg-red-50 border-red-300 border-2 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <CardTitle className="text-red-900 text-2xl">
                  ¿Tienes una emergencia?
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-lg text-red-800 font-semibold">
                  Si experimentas alguno de los signos de alarma, acude inmediatamente a:
                </p>
                <div className="bg-white rounded-lg p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold">Servicio de Emergencias</p>
                      <p className="text-sm text-muted-foreground">
                        Hospital o centro de salud más cercano
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold">Línea de Emergencias</p>
                      <p className="text-sm text-muted-foreground">
                        161 - SUMA (Servicio de Urgencias Médicas Ambulatorias)
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Mapa de Google Maps */}
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold mb-2 text-sm">Centros de salud cercanos:</p>
                  <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.5!2d-68.1195!3d-16.5000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDMwJzAwLjAiUyA2OMKwMDcnMTAuMiJX!5e0!3m2!1ses!2sbo!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mapa de centros de salud"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    * Mapa mostrando centros de salud y hospitales cercanos
                  </p>
                </div>
                
                <Button variant="destructive" size="lg" className="w-full">
                  <Phone className="mr-2 h-5 w-5" />
                  Llamar a Emergencias: 161 - SUMA
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Contact Information */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-primary" />
                  <CardTitle>Contacto Médico</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Users className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Equipo Médico</p>
                      <p className="text-muted-foreground">
                        Dr. Jose Luis Barriga Vera, Dra. Lucy Reyna Ariñez Mancilla, 
                        Dr. Nelson Mauricio Massy Ramos, Dra. Noemi Celina Mendoza Sarco, 
                        Dr. Hugo Antonio Chavez Lopez
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href="mailto:maternidadinteractiva306@outlook.es" className="text-primary hover:underline">
                      maternidadinteractiva306@outlook.es
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <a 
                      href="https://wa.me/59176284890" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      +591 76284890
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>🕒 Todos los días los 365 días del año</span>
                  </div>
                  <Link href="/equipo-medico">
                    <Button variant="outline" className="w-full mt-4">
                      Ver Equipo Médico Completo
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <CardTitle>Centro de Salud</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong>Hospital/Centro:</strong> Consulta con tu médico tratante
                  </p>
                  <p>
                    <strong>Dirección:</strong> Según tu centro de salud asignado
                  </p>
                  <p>
                    <strong>Teléfono de emergencias:</strong> 161 - SUMA
                  </p>
                  <p className="text-xs mt-4 text-amber-600">
                    * Para información específica de tu centro de salud, contacta a tu médico tratante
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>

        {/* What to do in emergency */}
        <ScrollReveal delay={0.3}>
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>¿Qué hacer en caso de emergencia?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="font-bold text-primary text-xl">1.</span>
                  <div>
                    <p className="font-semibold mb-1">Mantén la calma</p>
                    <p className="text-sm text-muted-foreground">
                      Respira profundamente y trata de mantener la calma.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="font-bold text-primary text-xl">2.</span>
                  <div>
                    <p className="font-semibold mb-1">Busca ayuda inmediata</p>
                    <p className="text-sm text-muted-foreground">
                      Acude al servicio de emergencias más cercano o llama una ambulancia.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="font-bold text-primary text-xl">3.</span>
                  <div>
                    <p className="font-semibold mb-1">Contacta a tu médico</p>
                    <p className="text-sm text-muted-foreground">
                      Si es posible, llama a tu médico mientras te diriges a emergencias.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="font-bold text-primary text-xl">4.</span>
                  <div>
                    <p className="font-semibold mb-1">Lleva información importante</p>
                    <p className="text-sm text-muted-foreground">
                      Lleva tu tarjeta de control prenatal, identificación y seguro médico.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="font-bold text-primary text-xl">5.</span>
                  <div>
                    <p className="font-semibold mb-1">No conduzcas si no es seguro</p>
                    <p className="text-sm text-muted-foreground">
                      Si estás sola y no puedes conducir, llama una ambulancia o pide ayuda.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}






