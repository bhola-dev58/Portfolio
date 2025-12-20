import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  { name: "Flipkart GRID 6.0 Participant", platform: "Unstop" },
  { name: "React E-Commerce Platform Masterclass", platform: "Scaler" },
  { name: "Web Development Internship", platform: "Prodigy Infotech" },
  { name: "Azure 303 for Beginners", platform: "Microsoft" },
  { name: "JavaScript Full-Stack Development", platform: "Online Course" },
  { name: "Full-Stack Web Development Mastery", platform: "Udemy" },
  { name: "Programming with JAVA", platform: "NPTEL" },
];

export const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="min-h-screen flex items-center py-20 px-4">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Certifications & <span className="text-gradient">Achievements</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all h-full group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-all">
                      <Award className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">
                        {cert.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{cert.platform}</p>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 card-shadow">
              <h3 className="text-xl font-bold mb-3 text-primary">Hobbies & Interests</h3>
              <p className="text-muted-foreground">Chess • Traveling • Playing</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
