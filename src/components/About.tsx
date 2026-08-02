import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { useProfile, useEducation } from "@/lib/api";
import { Education } from "@/lib/initialData";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: profileData } = useProfile();
  const { data: education = [] } = useEducation();

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Initial theme check for LeetCode card
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "catppuccin");

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          setTheme(isDark ? "dark" : "catppuccin");
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh]">
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
            <Card className="p-8 card-shadow bg-card/85 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-all">
              <h3 className="text-2xl font-bold mb-4 text-primary">Career Objective</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Final-year Computer Science and Engineering student at <span className="text-foreground font-semibold">CMR Institute of Technology, Bengaluru</span> with hands-on experience in full-stack development, applied Generative AI, and technical training. Built and shipped production-ready platforms including <span className="text-foreground font-semibold">Smart Coach LMS</span> and <span className="text-foreground font-semibold">CareMate-AI</span>. Seeking SDE & Full-Stack Engineering roles in Bangalore & Remote.
              </p><br />
              <h3 className="text-xl mb-2 text-primary font-bold">LeetCode Activity</h3>
              <div className="mt-2">
                <a
                  href="https://leetcode.com/u/bhola-dev58/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={`https://leetcard.jacoblin.cool/bhola-dev58?ext=heatmap&theme=${theme}&width=600`}
                    alt="LeetCode Stats"
                    className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  />
                </a>
              </div>
            </Card>

            <Card className="p-8 card-shadow bg-card/85 backdrop-blur-sm border-border/60 hover:border-secondary/50 transition-all">
              <h3 className="text-2xl font-bold mb-6 text-secondary">Education</h3>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-secondary via-primary to-secondary/20" />

                <div className="space-y-8">
                  {education.map((edu: Education, index: number) => (
                    <div key={edu.id} className="relative pl-12">
                      <div className={`absolute left-3 top-1 w-4 h-4 rounded-full border-4 border-background shadow-lg z-10 ${index % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`} />
                      <div className="space-y-1">
                        <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-1 ${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                          {edu.period}
                        </div>
                        <h4 className="font-semibold text-card-foreground flex items-center gap-2">
                          <GraduationCap className={`w-4 h-4 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                          {edu.institution}
                        </h4>
                        <p className="text-sm text-muted-foreground">{edu.degree}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-8 card-shadow bg-card/85 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-all md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-primary">Personal Details</h3>
              {profileData && (
                <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                  <div>
                    <p><span className="font-semibold text-foreground">Temporary Address:</span> {profileData.address_temp}</p>
                    <p><span className="font-semibold text-foreground">Permanent Address:</span> {profileData.address_perm}</p>
                    <p><span className="font-semibold text-foreground">Personal Email:</span> {profileData.email_personal}</p>
                    <p><span className="font-semibold text-foreground">College Email:</span> {profileData.email_college}</p>
                    <p><span className="font-semibold text-foreground">Phone (India):</span> {profileData.phone_in}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold text-foreground">Date of Birth:</span> 12th July, 2001</p>
                    <p><span className="font-semibold text-foreground">Languages:</span> English, Hindi, Nepali</p>
                    <p><span className="font-semibold text-foreground">Status:</span> {profileData.status_text}</p>
                    <p><span className="font-semibold text-foreground">Availability:</span> {profileData.open_for}</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
