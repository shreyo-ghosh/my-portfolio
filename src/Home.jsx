import { motion } from "framer-motion";
import FreelanceAISolutions from "./components/FreelanceAISolutions";
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
    description: "Expert technical support for system issues, network problems, and software troubleshooting. Available on-demand for quick resolution.",
    features: [
      "30-minute response time",
      "Remote desktop access",
      "Multi-platform support",
      "24/7 emergency support available"
    ]
  },
  {
    id: 2,
    title: "Cloud Setup & Optimization",
    icon: "☁️",
    description: "Professional cloud infrastructure setup and optimization for AWS, Azure, and Google Cloud Platform with cost-effective solutions.",
    features: [
      "Cloud migration assistance",
      "Infrastructure as Code",
      "Cost optimization strategies",
      "Security best practices"
    ]
  },
  {
    id: 3,
    title: "DevOps & Automation",
    icon: "⚙️",
    description: "End-to-end CI/CD pipeline implementation with automated testing, deployment, and infrastructure management.",
    features: [
      "GitHub Actions / GitLab CI",
      "Docker & Kubernetes",
      "Infrastructure automation",
      "Monitoring & alerting"
    ]
  },
  {
    id: 4,
    title: "Database Services",
    icon: "📊",
    description: "Comprehensive database design, optimization, migration, and performance tuning for all major database systems.",
    features: [
      "Database design & architecture",
      "Query optimization",
      "Backup & recovery strategies",
      "Migration services"
    ]
  },
  {
    id: 5,
    title: "Security Hardening & Monitoring",
    icon: "🔐",
    description: "Complete security assessment, hardening, and continuous monitoring to protect your infrastructure and data.",
    features: [
      "Security audits & assessments",
      "Firewall & access control",
      "Real-time monitoring",
      "Incident response planning"
    ]
  },
  {
    id: 6,
    title: "Website / Application Deployment",
    icon: "🌐",
    description: "Professional deployment of web applications and static sites with SSL, CDN, and performance optimization.",
    features: [
      "Multi-cloud deployment",
      "CI/CD integration",
      "Performance optimization",
      "SSL & security configuration"
    ]
  },
  {
    id: 7,
    title: "Technical Writing & Documentation",
    icon: "📖",
    description: "Clear, professional technical documentation including user guides, API docs, and architecture diagrams.",
    features: [
      "User guides & tutorials",
      "API documentation",
      "Technical specifications",
      "Architecture diagrams"
    ]
  },
  {
    id: 8,
    title: "ERP / SaaS / API Integration",
    icon: "🔄",
    description: "Seamless integration between business systems, APIs, and third-party services with custom automation workflows.",
    features: [
      "Multi-system integration",
      "API development & integration",
      "Webhook automation",
      "Data synchronization"
    ]
  }
];

const retainerOptions = [
  {
    type: "Hourly Support",
    scope: "Ad-hoc consulting and troubleshooting",
    price: "$40–$80/hr",
    features: [
      "Flexible scheduling",
      "Pay as you go",
      "No long-term commitment",
      "Quick response times"
    ]
  },
  {
    type: "Monthly Retainer",
    scope: "Priority support with dedicated hours",
    price: "$600–$2,000/month",
    features: [
      "20–40 hours included",
      "Priority response",
      "Monthly planning calls",
      "Proactive monitoring"
    ]
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
        className="bg-primary-gradient text-white py-20"
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
            <a href="mailto:shreyo.ghosh.dev@gmail.com" className="bg-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2" style={{color: '#2563eb'}}>
              <Mail size={20} />
              Get Started
            </a>
            <a href="#services" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white transition-all">
              View Services
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Overview - Redesigned as Project Cards */}
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
              Services That Deliver Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From infrastructure setup to ongoing support, I provide comprehensive IT solutions tailored to your business needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = serviceIcons[service.title] || Monitor;
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{service.icon}</div>
                    <IconComponent size={24} className="text-gray-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check size={14} className="text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects / Portfolio - Using FreelanceAISolutions */}
      <FreelanceAISolutions />

      {/* Retainer Options */}
      <section className="py-20 bg-primary-light">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              ⚡ Flexible Engagement Models
            </h2>
            <p className="text-xl text-gray-600">
              Choose the support model that works best for your needs
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
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-center mb-6">
                  <div className="text-2xl mb-2">
                    {index === 0 ? <Clock className="mx-auto" size={48} style={{color: '#2563eb'}} /> : <Calendar className="mx-auto" size={48} style={{color: '#2563eb'}} />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {option.type}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-3">
                    {option.price}
                  </div>
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
                
                <button className="w-full py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800">
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
              <a href="mailto:shreyo.ghosh.dev@gmail.com" className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all bg-white text-blue-600 hover:bg-gray-100">
                <Mail size={20} />
                shreyo.ghosh.dev@gmail.com
              </a>
              <a href="tel:+919475123456" className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all bg-gray-700 hover:bg-gray-600">
                <Phone size={20} />
                +91 94751 23456
              </a>
            </div>
            
            <div className="flex justify-center gap-4">
              <a href="https://linkedin.com/in/shreyo-ghosh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/shreyo-ghosh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all">
                <Github size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>© 2026 IT Services Portfolio. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Professional IT solutions for businesses of all sizes.
          </p>
        </div>
      </footer>
    </div>
  );
}
