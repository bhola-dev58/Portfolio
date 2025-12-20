import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Github, Linkedin, Code2 } from "lucide-react";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "bhola.dev58@gmail.com",
      href: "mailto:bhola.dev58@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9198709984",
      href: "tel:+919198709984",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bangalore, Karnataka",
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/bhola-dev58",
      color: "hover:text-primary",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/bhya23cse",
      color: "hover:text-secondary",
    },
    {
      icon: Code2,
      label: "LeetCode",
      href: "https://leetcode.com/u/bhola-dev58",
      color: "hover:text-primary",
    },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 px-4">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Get In <span className="text-gradient">Touch</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 card-shadow bg-card/50 backdrop-blur-sm border-border/50">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="p-3 rounded-full bg-primary/10">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-foreground">{info.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
                    <div className="flex gap-4">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          className={`p-3 rounded-full bg-muted ${social.color} transition-all hover:scale-110`}
                        >
                          <social.icon className="w-5 h-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6">Let's Work Together</h3>
                  <p className="text-muted-foreground mb-6">
                    I'm currently looking for new opportunities and exciting projects.
                    Whether you have a question or just want to say hi, I'll try my best to get back to you!
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-effect"
                    asChild
                  >
                    <a href="mailto:bhola.dev58@gmail.com">Send Me an Email</a>
                  </Button>

                  <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-secondary">Current Status</h4>
                    <p className="text-sm text-muted-foreground">
                      🎓 B.E. Student at CMR Institute of Technology
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      💼 Open to internship and full-time opportunities
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      🚀 Available for freelance projects
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
