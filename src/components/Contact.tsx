import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Github, Linkedin, Code2, Send, Copy, Check, MessageSquare } from "lucide-react";
import { useProfile, messages as messagesApi } from "@/lib/api";
import { toast } from "sonner";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: profile } = useProfile();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!profile) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactInfo = [
    { icon: MessageSquare, label: "WhatsApp Direct", value: "+91-7483509984", href: "https://wa.me/917483509984?text=Hi%20Bhola,%20I%20reviewed%20your%20portfolio%20bhola-yadav.com.np!", copyable: true },
    { icon: Mail, label: "Personal Email", value: profile.email_personal, href: `mailto:${profile.email_personal}`, copyable: true },
    { icon: Mail, label: "College Email", value: profile.email_college, href: `mailto:${profile.email_college}`, copyable: true },
    { icon: Phone, label: "Phone (India)", value: profile.phone_in, href: `tel:${profile.phone_in}`, copyable: true },
    { icon: MapPin, label: "Temporary Address", value: profile.address_temp, href: null, copyable: false },
    { icon: MapPin, label: "Permanent Address", value: profile.address_perm, href: null, copyable: false },
  ];

  const socialLinks = [
    { icon: MessageSquare, label: "WhatsApp", href: "https://wa.me/917483509984", color: "hover:text-emerald-500" },
    { icon: Github, label: "GitHub", href: profile.github, color: "hover:text-primary" },
    { icon: Linkedin, label: "LinkedIn", href: profile.linkedin, color: "hover:text-secondary" },
    { icon: Code2, label: "LeetCode", href: profile.leetcode, color: "hover:text-primary" },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 px-4">
      <div className="container mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 card-shadow bg-card/85 backdrop-blur-sm border-border/60">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-card-foreground">Contact Information</h3>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex items-start gap-4 group">
                        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all shrink-0"><info.icon className="w-5 h-5 text-primary" /></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground font-medium">{info.label}</p>
                          <div className="flex items-center gap-2">
                            {info.href ? (
                              <a href={info.href} className="text-foreground hover:text-primary transition-colors font-medium break-all">{info.value}</a>
                            ) : (
                              <p className="text-foreground font-medium">{info.value}</p>
                            )}
                            {info.copyable && (
                              <button
                                onClick={() => handleCopy(info.value, info.label)}
                                className="p-1 text-muted-foreground hover:text-primary transition-colors rounded"
                                title={`Copy ${info.label}`}
                                aria-label={`Copy ${info.label}`}
                              >
                                {copiedField === info.label ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4 text-card-foreground">Connect With Me</h4>
                    <div className="flex gap-4">
                      {socialLinks.map((social, index) => (
                        <motion.a key={index} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} className={`p-3 rounded-full bg-muted/60 ${social.color} transition-all border border-border/40`} aria-label={social.label}>
                          <social.icon className="w-5 h-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-card-foreground">Let's Work Together</h3>
                  <p className="text-muted-foreground mb-6">I'm currently open for Software Engineering and AI opportunities. Send me a message directly!</p>
                  <ContactForm />
                  <div className="mt-8 p-6 bg-muted/40 rounded-xl border border-border/40">
                    <h4 className="font-semibold mb-2 text-secondary">Current Status</h4>
                    <p className="text-sm text-muted-foreground font-medium">🎓 {profile.status_text}</p>
                    <p className="text-sm text-muted-foreground font-medium mt-1">💼 {profile.open_for}</p>
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

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await messagesApi.create({ name, email, message });
      if (error) throw new Error(error);
      toast.success("Message sent successfully! I will reply soon.");
      setName(""); setEmail(""); setMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error("Message saved. You can also email bhola.dev58@gmail.com directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2"><Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-background/60 border-border/60" /></div>
      <div className="space-y-2"><Input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-background/60 border-border/60" /></div>
      <div className="space-y-2"><Textarea placeholder="Your Message..." value={message} onChange={(e) => setMessage(e.target.value)} required className="bg-background/60 border-border/60 min-h-[120px]" /></div>
      <Button type="submit" className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" disabled={loading}>{loading ? "Sending..." : <>Send Message <Send size={16} /></>}</Button>
    </form>
  );
};