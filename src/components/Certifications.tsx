import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Award, ExternalLink } from "lucide-react";
import { useCertifications } from "@/lib/api";
import { Certification } from "@/lib/initialData";

export const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: certifications = [] } = useCertifications();

  return (
    <section id="certifications" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh]">
      <div className="container mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Certifications & <span className="text-gradient">Achievements</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {certifications.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground">No certifications found.</p>
            ) : (
              certifications.map((cert: Certification, index: number) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <a href={cert.url || "#"} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <Card className="p-6 card-shadow bg-card/90 backdrop-blur-sm border-2 border-border hover:border-secondary/80 hover:shadow-secondary/25 hover:shadow-2xl transition-all duration-300 h-full group cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-all"><Award className="w-6 h-6 text-secondary" /></div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">{cert.name}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </a>
                </motion.div>
              ))
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-card/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-border hover:border-primary/80 shadow-xl hover:shadow-primary/20 transition-all duration-300">
              <h3 className="text-xl font-bold mb-3 text-primary">Hobbies & Interests</h3>
              <p className="text-muted-foreground font-medium">Chess • Traveling • Open Source</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
