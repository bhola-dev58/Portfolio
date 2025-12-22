import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Profile {
  email_personal: string;
  email_college: string;
  phone_in: string;
  phone_np: string;
  address_temp: string;
  address_perm: string;
}

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [profile, setProfile] = useState<Profile | null>(null);
  const [education, setEducation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingEducation, setLoadingEducation] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Fetch Profile
      const { data: profileData } = await supabase.from("profile").select("*").single();
      if (profileData) setProfile(profileData);
      setLoading(false);

      // Fetch Education
      const { data: educationData } = await supabase.from("education").select("*").order("id", { ascending: true });
      if (educationData) setEducation(educationData);
      setLoadingEducation(false);
    }
    fetchData();
  }, []);

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
                expertise to contribute to organizational success while enhancing my professional growth.
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
                  {loadingEducation ? (
                    <p className="pl-12 text-muted-foreground">Loading education...</p>
                  ) : education.length === 0 ? (
                    <p className="pl-12 text-muted-foreground">No education details found.</p>
                  ) : (
                    education.map((edu) => (
                      <div key={edu.id} className="relative pl-12">
                        <div className={`absolute left-3 top-1 w-4 h-4 rounded-full border-4 border-background shadow-lg z-10 ${edu.id % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`} />
                        <div className="space-y-1">
                          <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-1 ${edu.id % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                            {edu.period}
                          </div>
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <GraduationCap className={`w-4 h-4 ${edu.id % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                            {edu.institution}
                          </h4>
                          <p className="text-sm text-muted-foreground">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">{edu.score}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-8 card-shadow bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-primary">Personal Details</h3>
              {loading ? (
                <p className="text-muted-foreground">Loading profile...</p>
              ) : profile ? (
                <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                  <div>
                    <p><span className="font-semibold text-foreground">Temporary Address:</span> {profile.address_temp}</p>
                    <p><span className="font-semibold text-foreground">Permanent Address:</span> {profile.address_perm}</p>
                    <p><span className="font-semibold text-foreground">Personal Email:</span> {profile.email_personal}</p>
                    <p><span className="font-semibold text-foreground">College Email:</span> {profile.email_college}</p>
                    <p><span className="font-semibold text-foreground">Phone (IN):</span> {profile.phone_in}</p>
                    <p><span className="font-semibold text-foreground">Phone (NP):</span> {profile.phone_np}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold text-foreground">Date of Birth:</span> 12th July, 2001</p>
                    <p><span className="font-semibold text-foreground">Nationality:</span> Nepali</p>
                    <p><span className="font-semibold text-foreground">Languages:</span> English, Hindi, Nepali</p>
                  </div>
                </div>
              ) : (
                <p className="text-destructive">Failed to load profile.</p>
              )}
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
