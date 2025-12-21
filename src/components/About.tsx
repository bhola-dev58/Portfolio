import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-4">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            About <span className="text-gradient">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 card-shadow bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all">
              <h3 className="text-2xl font-bold mb-4 text-primary">Career Objective</h3>
              <p className="text-muted-foreground leading-relaxed">
                To obtain a challenging position in Software Engineering where I can leverage my
                expertise in Java, Python, and Web Development to contribute to organizational
                success while enhancing my professional growth.
              </p>
              <div className="mt-6">
                <img
                  src="https://leetcard.jacoblin.cool/bhola-dev58?ext=heatmap&width=600"
                  alt="LeetCode Stats"
                  className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </Card>

            <Card className="p-8 card-shadow bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all">
              <h3 className="text-2xl font-bold mb-6 text-secondary">Education</h3>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-secondary via-primary to-secondary/20" />

                <div className="space-y-8">
                  {/* University */}
                  <div className="relative pl-12">
                    <div className="absolute left-3 top-1 w-4 h-4 rounded-full bg-secondary border-4 border-background shadow-lg z-10" />
                    <div className="space-y-1">
                      <div className="inline-block px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-1">
                        2023 - 2027
                      </div>
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-secondary" />
                        CMR Institute of Technology
                      </h4>
                      <p className="text-sm text-muted-foreground">B.E. in Computer Science and Engineering</p>
                      <p className="text-sm text-muted-foreground">CGPA: 7.2/10 (till 4th sem)</p>
                    </div>
                  </div>

                  {/* 12th Grade */}
                  <div className="relative pl-12">
                    <div className="absolute left-3 top-1 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg z-10" />
                    <div className="space-y-1">
                      <div className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1">
                        2021
                      </div>
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        Shree Susanskrit Secondary School
                      </h4>
                      <p className="text-sm text-muted-foreground">12th Grade - Science (Technical and Vocational)</p>
                      <p className="text-sm text-muted-foreground">78%</p>
                    </div>
                  </div>

                  {/* 10th Grade */}
                  <div className="relative pl-12">
                    <div className="absolute left-3 top-1 w-4 h-4 rounded-full bg-primary/60 border-4 border-background shadow-lg z-10" />
                    <div className="space-y-1">
                      <div className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1">
                        2019
                      </div>
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary/60" />
                        Shree Susanskrit Secondary School
                      </h4>
                      <p className="text-sm text-muted-foreground">10th Standard - Science (Technical and Vocational)</p>
                      <p className="text-sm text-muted-foreground">80%</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 card-shadow bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-primary">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                <div>
                  <p><span className="font-semibold text-foreground">Temporary Address:</span> Bangalore, Karnataka India</p>
                  <p><span className="font-semibold text-foreground">Permanent Address:</span> Marchwari-3, Rupandehi Nepal</p>
                  <p><span className="font-semibold text-foreground">Personal Email:</span> bhola.dev58@gmail.com</p>
                  <p><span className="font-semibold text-foreground">College Email:</span> bhya23cs@cmrit.ac.in</p>
                  <p><span className="font-semibold text-foreground">Phone (IN):</span> +91 9198709984</p>
                  <p><span className="font-semibold text-foreground">Phone (NP):</span> +977 9864567310</p>
                </div>
                <div>
                  <p><span className="font-semibold text-foreground">Date of Birth:</span> 12th July, 2001</p>
                  <p><span className="font-semibold text-foreground">Nationality:</span> Nepali</p>
                  <p><span className="font-semibold text-foreground">Languages:</span> English, Hindi, Nepali</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
