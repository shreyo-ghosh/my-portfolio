import React from 'react';

export default function FreelanceAISolutions() {
  const projects = [
    {
      tags: ["NLP", "Automation"],
      title: "Legal Document Summarizer",
      clientType: "Legal Tech Startup (NDA)",
      desc: "Built a BERT-based pipeline to automatically extract clauses and summarize 50+ page legal contracts.",
      results: [
        "Reduced review time by 70%",
        "92% accuracy on entity extraction",
        "Deployed via Docker/AWS Lambda"
      ],
      tech: ["Python", "HuggingFace", "AWS"],
      cta: "View Case Study",
      href: "#"
    },
    {
      tags: ["Computer Vision", "Retail"],
      title: "Inventory Defect Detection",
      clientType: "E-commerce Manufacturer",
      desc: "Custom YOLOv8 model to detect manufacturing defects on assembly lines in real-time.",
      results: [
        "<100ms inference time",
        "Saved client ~$4k/month in waste"
      ],
      tech: ["PyTorch", "OpenCV", "Jetson Nano"],
      cta: "View Architecture",
      href: "#"
    },
    {
      tags: ["Analytics", "Finance"],
      title: "Customer Churn Prediction",
      clientType: "Fintech SaaS",
      desc: "XGBoost ensemble model to identify high-risk users before subscription renewal.",
      results: [
        "Identified 15% of at-risk revenue",
        "Integrated with HubSpot API"
      ],
      tech: ["Scikit-Learn", "Pandas", "FastAPI"],
      cta: "View Code (Public)",
      href: "#"
    }
  ];

  return (
    <section id="freelance-work" className="section-container">
      <h2 className="section-title">Freelance AI & Machine Learning Solutions</h2>
      <p className="section-subtitle">
        Delivering automated intelligence and data-driven insights for businesses.
      </p>

      <div className="projects-grid">
        {projects.map((p, index) => (
          <article className="project-card" key={index}>
            <div className="card-header">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className={
                    "tag " +
                    (t === "NLP"
                      ? "nlp"
                      : t === "Computer Vision"
                      ? "cv"
                      : t === "Analytics"
                      ? "analytics"
                      : "")
                  }
                >
                  {t}
                </span>
              ))}
            </div>
            <h3>{p.title}</h3>
            <p className="client-type">{p.clientType}</p>
            <p className="project-desc">{p.desc}</p>
            <ul className="results-list">
              {p.results.map((r, idx) => (
                <li key={idx}>✅ {r}</li>
              ))}
            </ul>
            <div className="tech-stack">
              {p.tech.map((t, idx) => (
                <span key={idx}>{t}</span>
              ))}
            </div>
            <a href={p.href} className="btn-case-study">
              {p.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
