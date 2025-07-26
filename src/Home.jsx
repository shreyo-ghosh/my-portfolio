
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800">Shreyo Ghosh</h1>
          <p className="text-lg text-gray-600 mt-2">
            DevOps Engineer | Cloud Consultant | Technical Writer
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="mailto:shreyo@example.com">
              <Button variant="outline"><Mail className="w-4 h-4 mr-2" /> Email</Button>
            </a>
            <a href="https://linkedin.com/in/shreyo" target="_blank">
              <Button variant="outline"><Linkedin className="w-4 h-4 mr-2" /> LinkedIn</Button>
            </a>
            <a href="https://github.com/shreyo" target="_blank">
              <Button variant="outline"><Github className="w-4 h-4 mr-2" /> GitHub</Button>
            </a>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Cloud & DevOps",
                desc: "AWS, GCP, CI/CD pipelines, Kubernetes, Terraform, cost optimization."
              },
              {
                title: "Technical Support",
                desc: "API debugging, infrastructure monitoring, database issue resolution."
              },
              {
                title: "Automation & Scripting",
                desc: "Shell, Python scripts for backups, monitoring, deployments."
              },
              {
                title: "Technical Writing",
                desc: "API docs, SOPs, whitepapers, internal playbooks."
              },
              {
                title: "Website Deployment",
                desc: "Cloud-hosted websites with DNS, SSL, CI/CD integration."
              },
              {
                title: "ERP/SaaS Integration",
                desc: "Connect systems like SAP, Dynamics, or CRMs using APIs."
              }
            ].map((s, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Me</h2>
          <p className="text-gray-700 leading-relaxed">
            I'm an experienced DevOps engineer and cloud consultant with a passion for automation, problem solving,
            and clear technical communication. With 8+ years of experience across startups and enterprises,
            I specialize in building resilient systems and helping clients streamline operations with modern
            infrastructure tools. Available for freelance, contract, or consultative projects.
          </p>
        </motion.section>
      </div>
    </main>
  );
}
