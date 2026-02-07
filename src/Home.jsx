import { motion } from \"framer-motion\";
import FreelanceAISolutions from \"./components/FreelanceAISolutions\";
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
  Star,
  TrendingUp,
  ShieldAlert,
  ZapOff,
  DollarSign
} from \"lucide-react\";

const serviceIcons = {
  \"Remote IT Support & Troubleshooting\": Monitor,
  \"Cloud Setup & Optimization\": Cloud,
  \"DevOps & Automation\": Settings,
  \"Database Services\": Database,
  \"Security Hardening & Monitoring\": Shield,
  \"Website / Application Deployment\": Globe,
  \"Technical Writing & Documentation\": BookOpen,
  \"ERP / SaaS / API Integration\": Zap
};

const services = [
  {
    id: 1,
    title: \"Your Bills Are Out of Control\",
    icon: \"💸\",
    description: \"Our cloud costs exploded from $2K to $12K in six months. We're paying for resources we don't need and can't figure out how to optimize. We audit your entire infrastructure, eliminate wasteful spending, and architect systems that scale with demand—not ahead of it. Most clients save 40-60% in the first quarter alone.\",
    features: [
      \"Cut cloud costs 40-60%\",
      \"Expert help without $120K/year overhead\",
      \"Stop wasting 15+ hours on manual tasks\",
      \"Protect your data from disasters\"
    ]
  },
  {
    id: 2,
    title: \"You're Making Blind Decisions\",
    icon: \"📉\",
    description: \"We have tons of data but no insights. We can't predict demand, identify our best customers, or see problems before they become crises. We transform your scattered data into actionable intelligence. Build predictive models that forecast revenue, identify churn risks, and automate reporting.\",
    features: [
      \"Build custom AI for YOUR specific problems\",
      \"Forecast revenue with 85%+ accuracy\",
      \"Turn scattered data into usable intelligence\",
      \"Centralize data for company-wide insights\"
    ]
  },
  {
    id: 3,
    title: \"You Need Software But Can't Afford the Wait\",
    icon: \"⏰\",
    description: \"We have an idea that could transform our business, but developers quote us $150K and 9 months. We need something that works NOW. We build lean, functional applications that solve real problems fast. No bloat, no endless feature creep. Just working software that delivers ROI.\",
    features: [
      \"Launch new features without 3am emergencies\",
      \"Scalable systems: 100 to 100,000 users\",
      \"Professional web presence that converts\",
      \"Intuitive interfaces customers actually use\"
    ]
  },
  {
    id: 4,
    title: \"Nobody Can Find You Online\",
    icon: \"👻\",
    description: \"Our competitors rank on page one for everything. We're invisible. We're losing customers to businesses that aren't even as good as we are. We execute data-driven digital strategies that actually generate revenue. From SEO that ranks to campaigns that convert, every dollar is tracked and optimized.\",
    features: [
      \"Get found by customers searching right now\",
      \"Data-driven campaigns with measurable ROI\",
      \"Track every campaign to revenue, not hope\",
      \"Beat competitors who rank #1 on Google\"
    ]
  }
];

const retainerOptions = [
  {
    type: \"Hourly Support\",
    scope: \"Ad-hoc support or consulting, billed by the hour with no commitment.\",
    price: \"$40–$80/hr\",
    features: [
      \"✓ Perfect for emergency fixes and urgent issues\",
      \"✓ Quick consultations for expert guidance\",
      \"✓ One-off projects without long-term commitment\",
      \"✓ Get help immediately—no contracts, no delays\"
    ],
    context: \"Ideal for: Businesses with occasional tech needs or trying us out before committing to a retainer.\"
  },
  {
    type: \"Monthly Retainer\",
    scope: \"Priority support with dedicated hours. Like having an entire IT department for a fraction of the cost.\",
    price: \"$600–$2,000/month\",
    features: [
      \"✓ Priority same-day response for all issues\",
      \"✓ Dedicated team that knows your business\",
      \"✓ Proactive monitoring catches problems early\",
      \"✓ Monthly strategy sessions to align tech & goals\",
      \"✓ Save 15% vs hourly rates\",
      \"✓ Rollover up to 5 unused hours monthly\"
    ],
    context: \"Ideal for: Growing businesses that need reliable, ongoing technology partnership without the $200K+ cost of full-time senior tech staff.\"
  }
];

export default function Home() {
  return (
    <div className=\"min-h-screen bg-gradient-to-br from-gray-50 to-gray-100\">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className=\"bg-primary-gradient text-white py-20\"
      >
        <div className=\"max-w-6xl mx-auto px-6 text-center\">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className=\"inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20 text-sm font-medium\"
          >
             Available for new projects
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className=\"text-5xl md:text-6xl font-bold mb-6\"
          >
            Stop fighting technology. Start growing your business. 🚀
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className=\"text-xl md:text-2xl mb-8 text-primary-100 max-w-4xl mx-auto\"
          >
            Every hour you spend wrestling with tech issues is an hour you're not serving customers, closing deals, or scaling operations. We handle your entire technology stack so you can focus on what actually makes you money.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className=\"flex flex-wrap justify-center gap-4\"
          >
            <a href=\"#services\" className=\"bg-white px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center gap-2\" style={{color: '#2563eb'}}>
              See How We Help
            </a>
            <a href=\"mailto:shreyo.ghosh.dev@gmail.com\" className=\"border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all\">
              Get in Touch
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section - Keeping existing Numbers */}
      <section className=\"py-12 bg-white border-b border-gray-100\">
        <div className=\"max-w-6xl mx-auto px-6\">
          <div className=\"grid grid-cols-2 md:grid-cols-4 gap-8 text-center\">
            <div>
              <div className=\"text-3xl font-bold text-blue-600\">18+</div>
              <div className=\"text-sm text-gray-600\">Service Offerings</div>
            </div>
            <div>
              <div className=\"text-3xl font-bold text-blue-600\">4+</div>
              <div className=\"text-sm text-gray-600\">Domains of Expertise</div>
            </div>
            <div>
              <div className=\"text-3xl font-bold text-blue-600\">24/7</div>
              <div className=\"text-sm text-gray-600\">Priority Support</div>
            </div>
            <div>
              <div className=\"text-3xl font-bold text-blue-600\">$30/hr</div>
              <div className=\"text-sm text-gray-600\">Starting Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id=\"services\" className=\"py-20\">
        <div className=\"max-w-6xl mx-auto px-6\">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=\"text-center mb-16\"
          >
            <h2 className=\"text-4xl md:text-5xl font-bold text-gray-800 mb-4\">
              Business Challenges We Solve
            </h2>
            <p className=\"text-xl text-gray-600 max-w-3xl mx-auto\">
              Your obstacles. Our expertise. Real problems. Practical solutions.
            </p>
          </motion.div>

          <div className=\"grid md:grid-cols-2 gap-8\">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className=\"bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all\"
              >
                <div className=\"text-5xl mb-6\">{service.icon}</div>
                <h3 className=\"text-2xl font-bold text-gray-800 mb-4\">{service.title}</h3>
                <p className=\"text-gray-600 mb-6\">{service.description}</p>
                <ul className=\"space-y-3\">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className=\"flex items-center gap-2 text-gray-700\">
                      <Check size={18} className=\"text-green-500 flex-shrink-0\" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Why LaunchLayer section */}
      <section className=\"py-20 bg-gray-50\">
        <div className=\"max-w-6xl mx-auto px-6\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-4xl font-bold text-gray-800 mb-4\">Your full-stack partner, without the overhead</h2>
            <p className=\"text-xl text-gray-600 max-w-4xl mx-auto\">
              We cover the entire technology stack—from cloud infrastructure and AI through custom software to digital marketing and SEO. Stop coordinating between multiple vendors who blame each other when things break. One partner. One throat to choke. Zero excuses.
            </p>
          </div>
          
          <div className=\"grid md:grid-cols-3 gap-8 mb-16\">
            <div className=\"bg-white p-8 rounded-xl shadow-sm border border-gray-100\">
              <Shield className=\"text-blue-600 mb-4\" size={32} />
              <h3 className=\"text-xl font-bold mb-2\">We protect your business like it's our own</h3>
              <p className=\"text-gray-600 text-sm\">Enterprise-grade security on every project—because your success is our reputation, and one breach could destroy both our businesses.</p>
            </div>
            <div className=\"bg-white p-8 rounded-xl shadow-sm border border-gray-100\">
              <Zap className=\"text-blue-600 mb-4\" size={32} />
              <h3 className=\"text-xl font-bold mb-2\">Speed that beats enterprise agencies by months</h3>
              <p className=\"text-gray-600 text-sm\">While enterprise agencies take 6+ months, we deliver in weeks—because your competition isn't waiting, and every delay costs you market share.</p>
            </div>
            <div className=\"bg-white p-8 rounded-xl shadow-sm border border-gray-100\">
              <TrendingUp className=\"text-blue-600 mb-4\" size={32} />
              <h3 className=\"text-xl font-bold mb-2\">One accountable partner. Zero blame games.</h3>
              <p className=\"text-gray-600 text-sm\">Dedicated experts across cloud, AI, development, and marketing. When something breaks, there's no vendor finger-pointing—just us fixing it.</p>
            </div>
          </div>

          <div className=\"max-w-4xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-6\">
            <div className=\"flex gap-3\">
               <Check className=\"text-blue-600 flex-shrink-0\" />
               <div>
                  <span className=\"font-bold\">Transparent, no-surprise pricing:</span>
                  <p className=\"text-sm text-gray-600\">You know exactly what you're paying before we start—no scope creep, no surprise bills, no hidden fees.</p>
               </div>
            </div>
            <div className=\"flex gap-3\">
               <Check className=\"text-blue-600 flex-shrink-0\" />
               <div>
                  <span className=\"font-bold\">Flexible engagement models:</span>
                  <p className=\"text-sm text-gray-600\">Hourly for quick fixes, retainer for ongoing support, or custom enterprise—we adapt to your business, not the other way around.</p>
               </div>
            </div>
            <div className=\"flex gap-3\">
               <Check className=\"text-blue-600 flex-shrink-0\" />
               <div>
                  <span className=\"font-bold\">Full-stack expertise that actually integrates:</span>
                  <p className=\"text-sm text-gray-600\">ML & AI backed by cloud infrastructure expertise—we build systems that work together, not isolated solutions that create new problems.</p>
               </div>
            </div>
            <div className=\"flex gap-3\">
               <Check className=\"text-blue-600 flex-shrink-0\" />
               <div>
                  <span className=\"font-bold\">Marketing driven by data, not hope:</span>
                  <p className=\"text-sm text-gray-600\">Every campaign tracked to revenue, not vanity metrics—we prove ROI with real numbers or adjust the strategy.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retainer Options */}
      <section className=\"py-20\">
        <div className=\"max-w-5xl mx-auto px-6\">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=\"text-center mb-16\"
          >
            <h2 className=\"text-4xl font-bold text-gray-800 mb-4\">
              ⚡ Flexible Engagement Models
            </h2>
            <p className=\"text-xl text-gray-600\">
              Choose the support model that works best for your needs
            </p>
          </motion.div>
          <div className=\"grid md:grid-cols-2 gap-8\">
            {retainerOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className=\"bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 flex flex-col\"
              >
                <div className=\"text-center mb-6\">
                  <div className=\"text-2xl mb-4\">
                    {index === 0 ? <Clock className=\"mx-auto text-blue-600\" size={48} /> : <Calendar className=\"mx-auto text-blue-600\" size={48} />}
                  </div>
                  <h3 className=\"text-2xl font-bold text-gray-800 mb-2\">
                    {option.type}
                  </h3>
                  <div className=\"text-3xl font-bold text-gray-900 mb-3\">
                    {option.price}
                  </div>
                  <p className=\"text-gray-600\">
                    {option.scope}
                  </p>
                </div>
                
                <ul className=\"space-y-3 mb-8 flex-grow\">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className=\"flex items-center gap-2 text-gray-700 text-sm\">
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className=\"text-xs text-gray-500 mb-6 text-center italic font-medium\">
                   {option.context}
                </p>
                
                <button className=\"w-full py-4 rounded-lg font-bold transition-all bg-blue-600 text-white hover:bg-blue-700\">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Point Callouts */}
      <section className=\"py-16 bg-blue-600 text-white overflow-hidden\">
         <div className=\"max-w-6xl mx-auto px-6\">
            <div className=\"flex flex-wrap justify-center gap-8 md:gap-16\">
               <div className=\"flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg border border-white/20\">
                  <TrendingUp size={20} />
                  <span className=\"font-medium\">40-60% avg. cloud savings</span>
               </div>
               <div className=\"flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg border border-white/20\">
                  <Zap size={20} />
                  <span className=\"font-medium\">85%+ forecasting accuracy</span>
               </div>
               <div className=\"flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg border border-white/20\">
                  <Clock size={20} />
                  <span className=\"font-medium\">Weeks vs Months delivery</span>
               </div>
               <div className=\"flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg border border-white/20\">
                  <TrendingUp size={20} />
                  <span className=\"font-medium\">$3.50 ROI per $1 spent</span>
               </div>
            </div>
         </div>
      </section>

      {/* Contact Section */}
      <section className=\"py-20 bg-gray-900 text-white\">
        <div className=\"max-w-4xl mx-auto px-6 text-center\">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className=\"text-4xl font-bold mb-6\">
              Ready to solve your biggest technology challenge?
            </h2>
            <p className=\"text-xl text-gray-300 mb-12\">
              Tell us about your business challenge and we'll show you exactly how we can help. We typically respond within a few hours—because we know every day you wait costs you money.
            </p>
            
            <div className=\"flex flex-wrap justify-center gap-6 mb-12\">
              <a href=\"mailto:shreyo.ghosh.dev@gmail.com\" className=\"flex items-center gap-2 px-8 py-4 rounded-lg font-bold transition-all bg-white text-blue-600 hover:bg-gray-100\">
                <Mail size={20} />
                shreyo.ghosh.dev@gmail.com
              </a>
              <a href=\"tel:+919475123456\" className=\"flex items-center gap-2 px-8 py-4 rounded-lg font-bold transition-all bg-gray-800 border border-gray-700 hover:bg-gray-700\">
                <Phone size={20} />
                +91 94751 23456
              </a>
            </div>
            
            <div className=\"flex justify-center gap-8\">
              <a href=\"https://linkedin.com/in/shreyo-ghosh\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-gray-400 hover:text-white transition-all transform hover:scale-110\">
                <Linkedin size={32} />
              </a>
              <a href=\"https://github.com/shreyo-ghosh\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-gray-400 hover:text-white transition-all transform hover:scale-110\">
                <Github size={32} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className=\"bg-gray-950 text-gray-500 py-12 border-t border-gray-800\">
        <div className=\"max-w-6xl mx-auto px-6 text-center\">
          <div className=\"font-bold text-white text-2xl mb-4\">LaunchLayer</div>
          <p>© 2026 LaunchLayer. All rights reserved.</p>
          <p className=\"mt-2 text-sm\">
            Stop coordinating. Start growing. Professional IT solutions without the overhead.
          </p>
        </div>
      </footer>
    </div>
  );
}
