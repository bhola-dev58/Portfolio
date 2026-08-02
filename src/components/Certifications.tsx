import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Award, ExternalLink, X, Eye } from "lucide-react";
import { useCertifications } from "@/lib/api";
import { Certification } from "@/lib/initialData";

export const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: certifications = [] } = useCertifications();
  const [previewCert, setPreviewCert] = useState<{ title: string; issuer: string; url: string } | null>(null);

  return (
    <section id="certifications" className="py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
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
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card
                    onClick={() => {
                      if (cert.url) {
                        setPreviewCert({ title: cert.name, issuer: cert.issuer, url: cert.url });
                      }
                    }}
                    className="p-6 card-shadow bg-card/90 backdrop-blur-sm border-2 border-border hover:border-secondary/80 hover:shadow-secondary/25 hover:shadow-2xl transition-all duration-300 h-full group cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-all">
                        <Award className="w-6 h-6 text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-secondary transition-colors break-words">
                          {cert.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs font-semibold text-secondary">
                      <span className="inline-flex items-center gap-1 group-hover:underline">
                        <Eye className="w-3.5 h-3.5" /> Preview Certificate
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-secondary transition-colors" />
                    </div>
                  </Card>
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

      {/* Interactive Certificate PDF / Image Preview Modal */}
      <AnimatePresence>
        {previewCert && (
          <div
            onClick={() => setPreviewCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-card border-2 border-border shadow-2xl rounded-2xl p-4 md:p-5 max-h-[82vh] flex flex-col justify-between cursor-default"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{previewCert.title}</h3>
                  <p className="text-xs text-muted-foreground font-medium">Issued by: {previewCert.issuer}</p>
                </div>
                <button
                  onClick={() => setPreviewCert(null)}
                  className="p-1.5 rounded-full bg-muted/80 hover:bg-muted text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Document / Image / iframe Embed */}
              <div className="flex-1 w-full min-h-[45vh] max-h-[52vh] rounded-xl overflow-hidden bg-slate-950/60 border border-border/80 flex items-center justify-center p-1.5 relative">
                {/\.(jpg|jpeg|png|webp|gif|svg)($|\?)/i.test(previewCert.url) ? (
                  <img
                    src={previewCert.url}
                    alt={previewCert.title}
                    className="max-h-[50vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
                  />
                ) : /\.pdf($|\?)/i.test(previewCert.url) ? (
                  <iframe
                    src={`${previewCert.url}#toolbar=0&navpanes=0&view=Fit`}
                    className="w-full h-full min-h-[50vh] rounded-lg border-0"
                    title={previewCert.title}
                  />
                ) : (
                  <iframe
                    src={previewCert.url}
                    className="w-full h-full min-h-[50vh] rounded-lg border-0"
                    title={previewCert.title}
                  />
                )}
              </div>

              {/* Modal Footer Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border mt-3">
                <p className="text-[11px] text-muted-foreground">Click button to open original link in new tab.</p>
                <a
                  href={previewCert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 shadow-md text-xs transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open Verification Link
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
