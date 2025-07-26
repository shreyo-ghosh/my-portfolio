
import { motion } from "framer-motion";
import { 
  Mail, 
  Linkedin, 
  Github, 
  Phone,
  Monitor,
  Cloud,
  Settings,
  Database,
  Shield,
  Globe,
  BookOpen,
  Zap,
  Clock,
  Calendar,
  Check,
  Star
} from "lucide-react";

const serviceIcons = {
  "Remote IT Support & Troubleshooting": Monitor,
  "Cloud Setup & Optimization": Cloud,
  "DevOps & Automation": Settings,
  "Database Services": Database,
  "Security Hardening & Monitoring": Shield,
  "Website / Application Deployment": Globe,
  "Technical Writing & Documentation": BookOpen,
  "ERP / SaaS / API Integration": Zap
};

const services = [
  {
    id: 1,
    title: "Remote IT Support & Troubleshooting",
    icon: "💻",
    packages: [
      {
        name: "Basic",
        description: "Fix 1 issue (system, email, network) – up to 30 mins",
        price: "$30",
        features: ["Single issue resolution", "Up to 30 minutes", "Remote support", "Basic troubleshooting"]
      },
      {
        name: "Standard",
        description: "Fix up to 3 issues, or 1-hour remote support session",
        price: "$60",
        features: ["Up to 3 issues", "1-hour session", "Priority support", "Follow-up included"]
      },
      {
        name: "Premium",
        description: "Dedicated 2-hour support, includes system audit",
        price: "$120",
        features: ["2-hour dedicated support", "System audit included", "Performance optimization", "Detailed report"]
      }
    ]
  },
  {
    id: 2,
    title: "Cloud Setup & Optimization",
    icon: "☁️",
    packages: [
      {
        name: "Basic",
        description: "Set up 1 service (e.g., EC2, S3, IAM roles)",
        price: "$75",
        features: ["Single service setup", "AWS/GCP/Azure", "Basic configuration", "Documentation"]
      },
      {
        name: "Standard",
        description: "Full environment setup (VPC, EC2, RDS, IAM)",
        price: "$200",
        features: ["Complete environment", "VPC configuration", "Database setup", "Security policies"]
      },
      {
        name: "Premium",
        description: "Multi-environment infra + cost optimization & monitoring",
        price: "$500+",
        features: ["Multi-environment setup", "Cost optimization", "Monitoring setup", "24/7 support"]
      }
    ]
  },
  {
    id: 3,
    title: "DevOps & Automation",
    icon: "⚙️",
    packages: [
      {
        name: "Basic",
        description: "CI/CD pipeline setup for one repo (GitHub Actions, GitLab CI)",
        price: "$100",
        features: ["Single repo pipeline", "GitHub Actions/GitLab CI", "Basic automation", "Testing integration"]
      },
      {
        name: "Standard",
        description: "Full pipeline + environment setup + Docker",
        price: "$250",
        features: ["Complete pipeline", "Docker integration", "Environment setup", "Deployment automation"]
      },
      {
        name: "Premium",
        description: "Scalable CI/CD + IaC (Terraform), alerting & docs",
        price: "$600+",
        features: ["Infrastructure as Code", "Terraform setup", "Advanced monitoring", "Complete documentation"]
      }
    ]
  },
  {
    id: 4,
    title: "Database Services",
    icon: "📊",
    packages: [
      {
        name: "Basic",
        description: "Simple queries / schema fixes / backups",
        price: "$40",
        features: ["Query optimization", "Schema fixes", "Basic backups", "Performance tuning"]
      },
      {
        name: "Standard",
        description: "Database optimization or migration",
        price: "$120",
        features: ["Database migration", "Performance optimization", "Index optimization", "Backup strategy"]
      },
      {
        name: "Premium",
        description: "DB design + tuning + backup strategy + docs",
        price: "$300+",
        features: ["Complete DB design", "Advanced tuning", "Comprehensive backup", "Full documentation"]
      }
    ]
  },
  {
    id: 5,
    title: "Security Hardening & Monitoring",
    icon: "🔐",
    packages: [
      {
        name: "Basic",
        description: "Audit of security settings for 1 server",
        price: "$50",
        features: ["Security audit", "Single server", "Basic hardening", "Vulnerability assessment"]
      },
      {
        name: "Standard",
        description: "Firewall setup + user access policies",
        price: "$150",
        features: ["Firewall configuration", "Access policies", "User management", "Security protocols"]
      },
      {
        name: "Premium",
        description: "End-to-end hardening + logging (CloudWatch/Sentry)",
        price: "$400+",
        features: ["Complete hardening", "Advanced logging", "Real-time monitoring", "Incident response"]
      }
    ]
  },
  {
    id: 6,
    title: "Website / Application Deployment",
    icon: "🌍",
    packages: [
      {
        name: "Basic",
        description: "Deploy static or WordPress site on VPS/cloud",
        price: "$60",
        features: ["Static site deployment", "WordPress setup", "Basic hosting", "Domain configuration"]
      },
      {
        name: "Standard",
        description: "Full deployment + DNS + SSL + performance check",
        price: "$150",
        features: ["Complete deployment", "DNS configuration", "SSL certificates", "Performance optimization"]
      },
      {
        name: "Premium",
        description: "CI/CD-based deployment with monitoring & rollback",
        price: "$350+",
        features: ["Automated deployment", "CI/CD integration", "Monitoring setup", "Rollback capabilities"]
      }
    ]
  },
  {
    id: 7,
    title: "Technical Writing & Documentation",
    icon: "📘",
    packages: [
      {
        name: "Basic",
        description: "1-page documentation or user guide",
        price: "$40",
        features: ["Single page doc", "User guide", "Basic formatting", "Quick turnaround"]
      },
      {
        name: "Standard",
        description: "Up to 5 pages or API documentation",
        price: "$120",
        features: ["Up to 5 pages", "API documentation", "Professional formatting", "Revision included"]
      },
      {
        name: "Premium",
        description: "Full product manual, SOPs, or technical proposal",
        price: "$300+",
        features: ["Complete manual", "SOPs creation", "Technical proposals", "Multiple revisions"]
      }
    ]
  },
  {
    id: 8,
    title: "ERP / SaaS / API Integration",
    icon: "🔁",
    packages: [
      {
        name: "Basic",
        description: "Connect and test one tool (e.g., Zapier, API key setup)",
        price: "$75",
        features: ["Single tool integration", "API setup", "Basic testing", "Connection verification"]
      },
      {
        name: "Standard",
        description: "End-to-end workflow integration",
        price: "$200",
        features: ["Complete workflow", "Multi-system integration", "Data synchronization", "Error handling"]
      },
      {
        name: "Premium",
        description: "Multi-system integration with error handling & support",
        price: "$500+",
        features: ["Complex integrations", "Advanced error handling", "Ongoing support", "Custom solutions"]
      }
    ]
  }
];

const retainerOptions = [
  {
    type: "Hourly",
    scope: "Ad-hoc support or consulting",
    price: "$30–$70/hr",
    features: ["Flexible scheduling", "Pay as needed", "No commitment", "Quick response"]
  },
  {
    type: "Monthly Retainer",
    scope: "10–20 hours of priority support/month",
    price: "$400–$1,000/month",
    features: ["Priority support", "Dedicated hours", "Cost savings", "Regular maintenance"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            IT Services & Solutions 💻
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-primary-100"
          >
            Professional IT Support | Cloud Solutions | DevOps & Automation
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="mailto:contact@example.com" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2">
              <Mail size={20} />
              Get Started
            </a>
            <a href="#services" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-300">
              View Services
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Overview */}
      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Complete IT Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From remote troubleshooting to enterprise cloud architecture, I provide comprehensive IT services tailored to your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {services.map((service, index) => {
              const IconComponent = serviceIcons[service.title] || Monitor;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="service-card p-6 text-center"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Starting from {service.packages[0].price}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Service Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Service Packages & Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the package that best fits your needs
            </p>
          </motion.div>

          <div className="space-y-20">
            {services.map((service, serviceIndex) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: serviceIndex * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-4xl">{service.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-800">
                    {service.title}
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {service.packages.map((pkg, pkgIndex) => (
                    <motion.div
                      key={pkgIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: pkgIndex * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className={`package-card p-6 ${pkgIndex === 1 ? 'ring-2 ring-primary-300 scale-105' : ''}`}
                    >
                      <div className="text-center mb-6">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">
                          {pkg.name}
                        </h4>
                        <div className="price-tag mb-3">{pkg.price}</div>
                        <p className="text-gray-600 text-sm">
                          {pkg.description}
                        </p>
                      </div>
                      
                      <ul className="space-y-3">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                            <Check size={16} className="text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <button className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300">
                        Choose {pkg.name}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Retainer Options */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              ⚡ Hourly & Monthly Options
            </h2>
            <p className="text-xl text-gray-600">
              Flexible support models for ongoing needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {retainerOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="text-center mb-6">
                  <div className="text-2xl mb-2">
                    {index === 0 ? <Clock className="mx-auto text-primary-600" size={48} /> : <Calendar className="mx-auto text-primary-600" size={48} />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {option.type}
                  </h3>
                  <div className="price-tag mb-3">{option.price}</div>
                  <p className="text-gray-600">
                    {option.scope}
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-gray-700">
                      <Check size={16} className="text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss your IT needs and find the perfect solution for your business.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a href="mailto:contact@example.com" className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300">
                <Mail size={20} />
                contact@example.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300">
                <Phone size={20} />
                +1 (234) 567-890
              </a>
            </div>
            
            <div className="flex justify-center gap-4">
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Github size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2024 IT Services Portfolio. All rights reserved.</p>
          <p className="mt-2 text-sm">Professional IT solutions for businesses of all sizes.</p>
        </div>
      </footer>
    </div>
  );
}
