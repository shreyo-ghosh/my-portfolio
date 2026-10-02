import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChatBot from "./ChatBot";

/* ─── STYLES ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&family=Share+Tech+Mono&display=swap');

:root{--bg:#0a0a0f;--bg2:#111118;--bg3:#181820;--border:rgba(255,255,255,.08);--amber:#f5a623;--amber2:#ff7a1a;--teal:#00c9b1;--text:#e8e8f0;--muted:#7a7a9a;--white:#ffffff}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'Instrument Sans',sans-serif;font-size:16px;line-height:1.6;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:.4}

@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

/* ─── NAV ─── */
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.1rem 4rem;background:rgba(10,10,15,.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--border)}
.nav-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:1.35rem;color:var(--white);text-decoration:none;display:flex;align-items:center;gap:.5rem}
.nav-logo .dot{width:8px;height:8px;background:var(--amber);border-radius:50%;animation:pulse 2s infinite}
.nav-logo-sub{font-family:'Instrument Sans',sans-serif;font-size:.62rem;font-weight:600;color:var(--muted);letter-spacing:.07em;text-transform:uppercase;align-self:flex-end;padding-bottom:2px;margin-left:2px}
.nav-links{display:flex;align-items:center;gap:2.2rem;list-style:none}
.nav-links a,.nav-links .nav-link-router{color:var(--muted);text-decoration:none;font-size:.88rem;font-weight:500;letter-spacing:.02em;transition:color .2s;cursor:pointer;background:none;border:none;padding:0;font-family:'Instrument Sans',sans-serif}
.nav-links a:hover,.nav-links .nav-link-router:hover{color:var(--white)}
.nav-blog{color:var(--teal)!important;font-weight:600!important}
.nav-blog:hover{color:#00e6cc!important}
.nav-cta{background:var(--amber)!important;color:#0a0a0f!important;padding:.5rem 1.2rem!important;border-radius:6px!important;font-weight:600!important;transition:background .2s,transform .1s!important}
.nav-cta:hover{background:var(--amber2)!important;transform:translateY(-1px);color:#0a0a0f!important}

/* hamburger */
.hamburger{display:none;background:transparent;border:1px solid var(--border);border-radius:7px;color:var(--text);cursor:pointer;padding:.4rem .7rem;font-size:1.1rem;line-height:1;transition:border-color .2s}
.hamburger:hover{border-color:rgba(255,255,255,.25)}
.mobile-menu{display:none;position:absolute;top:100%;left:0;right:0;background:rgba(10,10,15,.98);border-bottom:1px solid var(--border);padding:1.2rem 2rem 1.5rem;flex-direction:column;gap:.5rem;backdrop-filter:blur(20px)}
.mobile-menu.open{display:flex}
.mobile-menu a,.mobile-menu .nav-link-router{color:var(--muted);text-decoration:none;font-size:.9rem;font-weight:500;padding:.55rem 0;border-bottom:1px solid rgba(255,255,255,.04);transition:color .2s;background:none;border:none;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;text-align:left;font-family:'Instrument Sans',sans-serif}
.mobile-menu a:hover,.mobile-menu .nav-link-router:hover{color:var(--white)}
.mobile-menu .nav-blog{color:var(--teal)!important}
.mobile-menu .nav-cta{background:var(--amber)!important;color:#0a0a0f!important;border-radius:6px!important;border:none!important;padding:.65rem 1.2rem!important;font-weight:700!important;text-align:center;margin-top:.4rem}

/* ─── HERO ─── */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:9rem 4rem 5rem;position:relative;overflow:hidden}
.hero-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(245,166,35,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(245,166,35,.05) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse at center,black 30%,transparent 75%)}
.hero-glow{position:absolute;width:700px;height:700px;background:radial-gradient(circle,rgba(245,166,35,.1) 0%,transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
.hero-content{position:relative;z-index:1;text-align:center;max-width:920px}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.3);border-radius:8px;padding:.38rem .95rem;font-size:.78rem;color:var(--amber);font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-bottom:1.6rem;animation:fadeUp .6s ease both}
.mkt-toggle{display:inline-flex;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:8px;padding:3px;gap:2px;margin-bottom:1.2rem;animation:fadeUp .55s ease both}
.mtb{padding:.35rem .9rem;border-radius:6px;border:none;cursor:pointer;font-size:.75rem;font-weight:600;color:var(--muted);background:transparent;transition:all .2s;font-family:'Instrument Sans',sans-serif}
.mtb.on{background:var(--amber);color:#0a0a0f}
.hero h1{font-family:'Syne',sans-serif;font-size:clamp(2.8rem,7vw,5.5rem);font-weight:800;line-height:1.05;letter-spacing:-.03em;color:var(--white);animation:fadeUp .7s .1s ease both}
.hero h1 .accent{color:var(--amber)}.hero h1 .accent2{color:var(--teal)}
.hero-sub{font-size:1.1rem;color:var(--muted);max-width:560px;margin:1.4rem auto 2.2rem;line-height:1.7;animation:fadeUp .7s .2s ease both}
.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;animation:fadeUp .7s .3s ease both}
.hero-markets{display:flex;align-items:center;justify-content:center;gap:1.2rem;margin-top:1.8rem;font-size:.78rem;color:var(--muted);animation:fadeUp .7s .4s ease both;flex-wrap:wrap}
.hero-markets span{display:flex;align-items:center;gap:.3rem}
.mkt-dot{width:6px;height:6px;border-radius:50%;background:var(--amber);flex-shrink:0}

/* ─── BUTTONS ─── */
.btn-primary{background:var(--amber);color:#0a0a0f;padding:.85rem 2rem;border-radius:8px;font-weight:700;font-size:.95rem;text-decoration:none;border:none;cursor:pointer;transition:background .2s,transform .15s,box-shadow .2s;box-shadow:0 0 30px rgba(245,166,35,.25);display:inline-block;font-family:'Instrument Sans',sans-serif}
.btn-primary:hover{background:var(--amber2);transform:translateY(-2px);box-shadow:0 0 40px rgba(245,166,35,.35)}
.btn-secondary{background:transparent;color:var(--text);padding:.85rem 2rem;border-radius:8px;font-weight:600;font-size:.95rem;text-decoration:none;border:1px solid var(--border);transition:border-color .2s,transform .15s;display:inline-block}
.btn-secondary:hover{border-color:rgba(255,255,255,.25);transform:translateY(-2px)}

/* ─── STATS ─── */
.stats-bar{border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:var(--bg2);display:grid;grid-template-columns:repeat(4,1fr)}
.stat-item{padding:2.5rem 2rem;text-align:center;border-right:1px solid var(--border);transition:background .2s}
.stat-item:last-child{border-right:none}
.stat-item:hover{background:rgba(245,166,35,.04)}
.stat-num{font-family:'Syne',sans-serif;font-size:2.4rem;font-weight:800;color:var(--amber);display:block}
.stat-label{font-size:.82rem;color:var(--muted);letter-spacing:.03em;margin-top:.25rem}
.stats-note{text-align:center;padding:0.85rem 1.5rem 1.2rem;font-size:.75rem;color:var(--muted);background:var(--bg2);border-bottom:1px solid var(--border)}

/* ─── SECTION BASICS ─── */
section{padding:6rem 4rem;position:relative}
.section-tag{display:inline-block;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--amber);margin-bottom:1rem}
.section-title{font-family:'Syne',sans-serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:800;color:var(--white);line-height:1.15;letter-spacing:-.02em;max-width:700px}
.section-body{color:var(--muted);max-width:580px;margin-top:1rem;font-size:1.02rem;line-height:1.7}

/* ─── BRAND ─── */
.brand-section{background:var(--bg)}
.brand-hero-line{font-family:'Syne',sans-serif;font-size:clamp(1.5rem,3.5vw,2.4rem);font-weight:800;color:var(--white);line-height:1.2;letter-spacing:-.02em;margin:1.4rem 0 2.2rem;max-width:680px}
.brand-hero-line .hl-a{color:var(--amber)}.brand-hero-line .hl-t{color:var(--teal)}
.brand-name-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.4rem;margin-bottom:2.5rem}
.brand-card{background:var(--bg3);border:1px solid var(--border);border-radius:16px;padding:2rem;position:relative;overflow:hidden;transition:border-color .2s}
.brand-card:hover{border-color:rgba(245,166,35,.3)}
.brand-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--amber),var(--amber2))}
.brand-card.teal-card::before{background:linear-gradient(90deg,var(--teal),#00a896)}
.brand-card.teal-card:hover{border-color:rgba(0,201,177,.3)}
.brand-word{font-family:'Syne',sans-serif;font-size:2.2rem;font-weight:800;color:var(--amber);margin-bottom:.5rem}
.brand-card.teal-card .brand-word{color:var(--teal)}
.brand-word-meaning{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:.7rem}
.brand-word-desc{font-size:.88rem;color:var(--muted);line-height:1.6}
.brand-signals{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.9rem}
.bsig{font-size:.7rem;font-weight:600;padding:.18rem .5rem;border-radius:4px;background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.2);color:var(--amber)}
.brand-card.teal-card .bsig{background:rgba(0,201,177,.1);border-color:rgba(0,201,177,.2);color:var(--teal)}
.brand-name-grid{margin-bottom:0}

/* ─── MARKET SECTION ─── */
.market-section{background:var(--bg2)}
.market-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.4rem;margin-top:2.5rem}
.market-card{border-radius:20px;padding:2.2rem;position:relative;transition:transform .2s}
.market-card:hover{transform:translateY(-4px)}
.market-card.india-card{background:linear-gradient(160deg,rgba(255,153,0,.1),rgba(245,166,35,.04));border:1px solid rgba(255,153,0,.25)}
.market-card.global-card{background:linear-gradient(160deg,rgba(0,201,177,.1),rgba(0,150,136,.04));border:1px solid rgba(0,201,177,.25)}
.market-card-label{display:inline-block;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.22rem .65rem;border-radius:4px;margin-bottom:.8rem}
.india-card .market-card-label{background:rgba(255,153,0,.15);color:#ff9900}
.global-card .market-card-label{background:rgba(0,201,177,.15);color:var(--teal)}
.market-card-title{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;color:var(--white);margin-bottom:.25rem}
.market-card-subtitle{font-size:.8rem;color:var(--muted);margin-bottom:1.4rem;font-style:italic}
.market-feat{display:flex;align-items:flex-start;gap:.6rem;font-size:.83rem;color:var(--text);line-height:1.45;padding:.4rem 0;border-bottom:1px solid rgba(255,255,255,.05)}
.market-feat:last-of-type{border-bottom:none}
.market-feat::before{content:'→';flex-shrink:0;margin-top:1px}
.india-card .market-feat::before{color:#ff9900}
.global-card .market-feat::before{color:var(--teal)}
.market-feat strong{color:var(--white);font-weight:600}
.market-price{display:inline-flex;align-items:baseline;gap:.4rem;padding:.45rem .95rem;border-radius:8px;font-family:'Syne',sans-serif;font-weight:800;font-size:1.05rem;margin-top:.9rem}
.india-card .market-price{background:rgba(255,153,0,.15);color:#ff9900}
.global-card .market-price{background:rgba(0,201,177,.15);color:var(--teal)}
.market-price sub{font-size:.7rem;font-weight:400;font-family:'Instrument Sans',sans-serif;color:var(--muted)}

/* ─── PROBLEM ─── */
.problem-section{background:var(--bg2);display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center}
.problem-cards{display:grid;gap:1rem}
.problem-card{background:var(--bg3);border:1px solid var(--border);border-radius:12px;padding:1.4rem 1.6rem;display:flex;align-items:flex-start;gap:1rem;transition:border-color .2s}
.problem-card:hover{border-color:rgba(245,166,35,.25)}
.problem-icon{font-size:1.5rem;min-width:36px;margin-top:2px}
.problem-card h4{font-family:'Syne',sans-serif;font-weight:700;font-size:.95rem;color:var(--white);margin-bottom:.3rem}
.problem-card p{font-size:.85rem;color:var(--muted);line-height:1.5}

/* ─── SERVICES ─── */
.services-section{background:var(--bg)}
.services-header{text-align:center;margin-bottom:3.5rem}
.services-header .section-title{max-width:100%;margin:0 auto}
.services-header .section-body{margin:1rem auto 0;text-align:center}
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;background:var(--border);border:1px solid var(--border);border-radius:16px;overflow:hidden}
.service-card{background:var(--bg2);padding:2.2rem 2rem;transition:background .25s;position:relative;overflow:hidden}
.service-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--amber),var(--amber2));transform:scaleX(0);transition:transform .3s;transform-origin:left}
.service-card:hover::before{transform:scaleX(1)}
.service-card:hover{background:var(--bg3)}
.service-icon{font-size:2rem;margin-bottom:1rem;display:block}
.service-card h3{font-family:'Syne',sans-serif;font-weight:700;font-size:1.05rem;color:var(--white);margin-bottom:.6rem}
.service-card p{font-size:.85rem;color:var(--muted);line-height:1.6;margin-bottom:1rem}
.service-tag-list{display:flex;flex-wrap:wrap;gap:.4rem}
.stag{font-size:.72rem;font-weight:600;background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.2);color:var(--amber);border-radius:4px;padding:.2rem .5rem;letter-spacing:.02em}

/* ─── CAPABILITIES ─── */
.cap-section{background:var(--bg2)}
.cap-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-top:2.5rem}
.cap-card{background:var(--bg3);border:1px solid var(--border);border-radius:14px;padding:1.6rem 1.3rem;transition:border-color .2s,transform .2s}
.cap-card:hover{border-color:rgba(245,166,35,.35);transform:translateY(-3px)}
.cap-kicker{font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--amber);margin-bottom:.55rem}
.cap-card h3{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;color:var(--white);margin-bottom:.55rem;line-height:1.25}
.cap-card p{font-size:.8rem;color:var(--muted);line-height:1.55}
.lead-strip{margin-top:2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.lead-card{background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:1.5rem 1.6rem;display:flex;flex-direction:column;gap:.6rem;text-decoration:none;transition:border-color .2s,transform .2s}
.lead-card:hover{border-color:rgba(245,166,35,.4);transform:translateY(-2px)}
.lead-card.teal:hover{border-color:rgba(0,201,177,.4)}
.lead-card h4{font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;color:var(--white)}
.lead-card p{font-size:.85rem;color:var(--muted);line-height:1.5;flex:1}
.lead-card span{font-size:.85rem;font-weight:700;color:var(--amber)}
.lead-card.teal span{color:var(--teal)}

/* ─── USE CASES ─── */
.usecase-section{background:var(--bg2)}
.usecase-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-top:3rem}
.usecase-card{background:var(--bg3);border:1px solid var(--border);border-radius:16px;overflow:hidden}
.usecase-header{background:linear-gradient(135deg,rgba(245,166,35,.15),rgba(0,201,177,.1));border-bottom:1px solid var(--border);padding:1.5rem 1.8rem;display:flex;align-items:center;gap:1rem}
.uc-emoji{font-size:2rem}
.usecase-header h3{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;color:var(--white)}
.usecase-header span{font-size:.78rem;color:var(--muted)}
.usecase-body{padding:1.8rem}
.uc-scenario{background:rgba(255,255,255,.04);border-left:3px solid var(--amber);padding:.9rem 1rem;border-radius:0 6px 6px 0;margin-bottom:1rem;font-size:.88rem;color:var(--muted);font-style:italic}
.uc-label{font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;font-weight:700;color:var(--amber);margin-bottom:.4rem}
.uc-result{font-size:.88rem;color:var(--text);line-height:1.6}
.uc-metrics{display:flex;gap:1rem;margin-top:1.2rem}
.uc-metric{flex:1;background:rgba(0,201,177,.07);border:1px solid rgba(0,201,177,.2);border-radius:8px;padding:.7rem .8rem;text-align:center}
.uc-metric strong{display:block;font-family:'Syne',sans-serif;font-size:1.3rem;color:var(--teal);font-weight:800}
.uc-metric span{font-size:.72rem;color:var(--muted)}

/* ─── INDUSTRIES ─── */
.industries-section{background:var(--bg)}
.industries-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:3rem}
.industry-card{background:var(--bg3);border:1px solid var(--border);border-radius:12px;padding:1.6rem 1.4rem;transition:border-color .2s,transform .2s;cursor:default}
.industry-card:hover{border-color:rgba(245,166,35,.3);transform:translateY(-3px)}
.ind-emoji{font-size:2rem;margin-bottom:.8rem;display:block}
.industry-card h4{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;color:var(--white);margin-bottom:.4rem}
.industry-card p{font-size:.8rem;color:var(--muted);line-height:1.5}
.ind-badge{display:inline-block;margin-top:.7rem;font-size:.68rem;font-weight:700;letter-spacing:.04em;padding:.2rem .55rem;border-radius:4px;text-transform:uppercase}
.ind-india{background:rgba(255,153,0,.15);color:#ff9900}
.ind-global{background:rgba(0,201,177,.15);color:var(--teal)}
.ind-both{background:rgba(245,166,35,.15);color:var(--amber)}

/* ─── HOW IT WORKS ─── */
.hiw-section{background:var(--bg2)}
.hiw-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;margin-top:3.5rem;position:relative}
.hiw-steps::before{content:'';position:absolute;top:30px;left:calc(16.6% + 1rem);right:calc(16.6% + 1rem);height:1px;background:linear-gradient(90deg,var(--amber),transparent,var(--teal));z-index:0}
.hiw-step{position:relative;z-index:1;background:var(--bg3);border:1px solid var(--border);border-radius:14px;padding:2rem 1.6rem 1.8rem}
.step-num{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;margin-bottom:1.2rem}
.step-num.s1{background:rgba(245,166,35,.15);color:var(--amber);border:1px solid rgba(245,166,35,.3)}
.step-num.s2{background:rgba(255,122,26,.15);color:var(--amber2);border:1px solid rgba(255,122,26,.3)}
.step-num.s3{background:rgba(0,201,177,.15);color:var(--teal);border:1px solid rgba(0,201,177,.3)}
.hiw-step h3{font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;color:var(--white);margin-bottom:.6rem}
.hiw-step p{font-size:.85rem;color:var(--muted);line-height:1.6}

/* ─── TOOLS ─── */
.tools-section{background:var(--bg)}
.tools-intro{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center}
.tools-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.8rem}
.tool-pill{background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:.8rem 1rem;font-size:.82rem;font-weight:600;color:var(--text);display:flex;align-items:center;gap:.5rem;transition:border-color .2s}
.tool-pill:hover{border-color:rgba(245,166,35,.3)}
.t-cost{margin-left:auto;font-size:.68rem;color:var(--teal);font-weight:700}

/* ─── PRICING ─── */
.pricing-section{background:var(--bg2)}
.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
.pricing-card{background:var(--bg3);border:1px solid var(--border);border-radius:16px;padding:2.2rem;position:relative;transition:transform .2s}
.pricing-card:hover{transform:translateY(-4px)}
.pricing-card.featured{border-color:var(--amber);background:linear-gradient(160deg,rgba(245,166,35,.06),var(--bg3))}
.featured-tag{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--amber);color:#0a0a0f;font-size:.72rem;font-weight:700;padding:.25rem .9rem;border-radius:100px;letter-spacing:.05em;text-transform:uppercase}
.pricing-card h3{font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:1rem}
.pricing-dual{display:flex;align-items:baseline;gap:.6rem;margin-bottom:.3rem;flex-wrap:wrap}
.price-usd{font-family:'Syne',sans-serif;font-size:2.2rem;font-weight:800;color:var(--white);line-height:1}
.price-usd sub{font-size:.9rem;color:var(--muted);font-weight:400}
.price-inr{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;color:var(--amber);opacity:.7}
.price-inr sub{font-size:.75rem;font-weight:400}
.pricing-desc{font-size:.82rem;color:var(--muted);margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid var(--border)}
.pricing-features{list-style:none;display:flex;flex-direction:column;gap:.6rem;margin-bottom:2rem}
.pricing-features li{font-size:.85rem;color:var(--text);display:flex;align-items:flex-start;gap:.6rem}
.pricing-features li::before{content:'✓';color:var(--teal);font-weight:700;min-width:14px}
.pricing-btn{width:100%;padding:.85rem;border-radius:8px;border:1px solid var(--border);background:transparent;color:var(--text);font-family:'Instrument Sans',sans-serif;font-weight:600;font-size:.9rem;cursor:pointer;transition:all .2s;text-decoration:none;display:block;text-align:center}
.pricing-btn:hover{border-color:rgba(255,255,255,.25);background:rgba(255,255,255,.04)}
.pricing-btn.feat-btn{background:var(--amber);border-color:var(--amber);color:#0a0a0f;font-weight:700}
.pricing-btn.feat-btn:hover{background:var(--amber2);border-color:var(--amber2)}
.pricing-note{text-align:center;margin-top:1.2rem;font-size:.8rem;color:var(--muted)}

/* ─── CONTACT ─── */
.contact-section{background:var(--bg);display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start}
.contact-form{background:var(--bg3);border:1px solid var(--border);border-radius:16px;padding:2.5rem}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
.form-group{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem}
.form-group label{font-size:.8rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}
.form-group input,.form-group select,.form-group textarea{background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:8px;padding:.8rem 1rem;color:var(--text);font-family:'Instrument Sans',sans-serif;font-size:.9rem;outline:none;transition:border-color .2s;width:100%}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:rgba(245,166,35,.5)}
.form-group textarea{resize:vertical;min-height:100px}
.form-group select option{background:#1a1a25}
.contact-info{padding-top:1rem}
.contact-info h3{font-family:'Syne',sans-serif;font-size:1.8rem;font-weight:800;color:var(--white);margin-bottom:1rem}
.contact-item{display:flex;align-items:center;gap:1rem;margin-bottom:1.2rem}
.contact-icon{width:40px;height:40px;background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.2);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem}
.contact-detail h5{font-size:.78rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.15rem}
.contact-detail a{color:var(--text);font-size:.9rem;text-decoration:none}
.contact-detail a:hover{color:var(--amber)}
.avail-badge{display:inline-flex;align-items:center;gap:.5rem;background:rgba(0,201,177,.1);border:1px solid rgba(0,201,177,.25);padding:.5rem 1rem;border-radius:8px;font-size:.8rem;color:var(--teal);font-weight:600;margin-top:2rem}
.avail-dot{width:7px;height:7px;background:var(--teal);border-radius:50%;animation:pulse 2s infinite}
.form-actions{display:flex;flex-direction:column;gap:.75rem}
.form-hint{font-size:.78rem;color:var(--muted);text-align:center;line-height:1.5}
.form-hint a{color:var(--amber);text-decoration:none}
.form-success{background:rgba(0,201,177,.1);border:1px solid rgba(0,201,177,.3);border-radius:12px;padding:1.5rem;text-align:center}
.form-success h4{font-family:'Syne',sans-serif;color:var(--teal);margin-bottom:.5rem;font-size:1.1rem}
.form-success p{color:var(--muted);font-size:.9rem;line-height:1.6}
.btn-ghost{background:transparent;color:var(--muted);padding:.65rem 1rem;border-radius:8px;font-weight:600;font-size:.85rem;border:1px solid var(--border);cursor:pointer;font-family:'Instrument Sans',sans-serif;transition:border-color .2s,color .2s}
.btn-ghost:hover{border-color:rgba(255,255,255,.25);color:var(--white)}
.uc-disclaimer{font-size:.85rem;color:var(--muted);margin-top:.75rem;max-width:580px;line-height:1.55}

/* ─── CTA ─── */
.cta-section{background:var(--bg);text-align:center;padding:7rem 4rem}
.cta-box{max-width:740px;margin:0 auto;background:linear-gradient(135deg,rgba(245,166,35,.1),rgba(0,201,177,.07));border:1px solid rgba(245,166,35,.2);border-radius:24px;padding:4rem;position:relative;overflow:hidden}
.cta-box::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(245,166,35,.15),transparent 65%);pointer-events:none}
.cta-box h2{font-family:'Syne',sans-serif;font-size:2.4rem;font-weight:800;color:var(--white);letter-spacing:-.02em;margin-bottom:.5rem}
.cta-tagline{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;color:var(--amber);margin-bottom:1rem}
.cta-box p{color:var(--muted);margin-bottom:2rem;font-size:1rem}

/* ─── FOOTER ─── */
footer{background:var(--bg);border-top:1px solid var(--border);padding:3rem 4rem;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:3rem}
.footer-brand h3{font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem;color:var(--white);margin-bottom:.35rem}
.footer-tagline{font-size:.78rem;color:var(--amber);font-weight:700;margin-bottom:.65rem}
.footer-brand p{font-size:.82rem;color:var(--muted);line-height:1.6}
.footer-col h4{font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:1rem}
.footer-col ul{list-style:none;display:flex;flex-direction:column;gap:.5rem}
.footer-col ul li a,.footer-col ul li .footer-link{font-size:.85rem;color:var(--muted);text-decoration:none;transition:color .2s;cursor:pointer;background:none;border:none;padding:0;font-family:'Instrument Sans',sans-serif}
.footer-col ul li a:hover,.footer-col ul li .footer-link:hover{color:var(--white)}
.footer-bottom{border-top:1px solid var(--border);padding:1.4rem 4rem;background:var(--bg);display:flex;align-items:center;justify-content:space-between}
.footer-bottom p{font-size:.8rem;color:var(--muted)}
.footer-serving{font-size:.78rem;color:var(--muted)}

/* ─── RESPONSIVE ─── */
@media(max-width:900px){
  nav{padding:1rem 1.5rem}
  .nav-links{display:none}
  .hamburger{display:block}
  section{padding:4rem 1.5rem}
  .stats-bar{grid-template-columns:repeat(2,1fr)}
  .problem-section,.usecase-grid,.tools-intro,.contact-section,.market-grid,.lead-strip{grid-template-columns:1fr;gap:2rem}
  .services-grid,.pricing-grid{grid-template-columns:1fr}
  .cap-grid{grid-template-columns:1fr 1fr}
  .industries-grid{grid-template-columns:repeat(2,1fr)}
  .hiw-steps{grid-template-columns:1fr}.hiw-steps::before{display:none}
  footer{grid-template-columns:1fr 1fr;gap:2rem}
  .form-row{grid-template-columns:1fr}
  .hero{padding:7rem 1.5rem 3rem}
  .cta-box{padding:2.5rem 1.5rem}
  .footer-bottom{flex-direction:column;gap:.8rem;padding:1.2rem 1.5rem;text-align:center}
  .brand-name-grid{grid-template-columns:1fr}
}
@media(max-width:600px){
  .industries-grid,.cap-grid{grid-template-columns:1fr}
  footer{grid-template-columns:1fr}
  .cta-box h2{font-size:1.8rem}
  .pricing-dual{flex-direction:column;gap:.2rem}
  .hud-readout{font-size:.62rem;gap:.6rem}
}

/* ─── JARVIS HUD ─── */
.hud-page{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.hud-hex{position:absolute;inset:0;opacity:.28;background:
  radial-gradient(ellipse at 50% 18%, transparent 10%, rgba(10,10,15,.55) 72%),
  repeating-linear-gradient(0deg, transparent 0 22px, rgba(0,201,177,.07) 22px 23px),
  repeating-linear-gradient(60deg, transparent 0 22px, rgba(0,201,177,.07) 22px 23px),
  repeating-linear-gradient(120deg, transparent 0 22px, rgba(245,166,35,.05) 22px 23px)}
.hud-bloom{position:absolute;width:52vw;height:52vw;left:24vw;top:8vh;background:radial-gradient(circle, rgba(0,201,177,.16), transparent 68%);filter:blur(8px);transform:translate(calc(var(--hud-x, 0) * 36px), calc(var(--hud-y, 0) * 28px));transition:transform .35s ease-out}
.hud-floor{position:absolute;left:-8%;right:-8%;bottom:-6%;height:42%;opacity:.22;background:
  linear-gradient(to top, rgba(0,0,0,.8), transparent 70%),
  repeating-linear-gradient(to right, rgba(0,201,177,.45) 0 1px, transparent 1px 48px),
  repeating-linear-gradient(to bottom, rgba(0,201,177,.35) 0 1px, transparent 1px 36px);
  transform:perspective(520px) rotateX(64deg);transform-origin:center bottom}
.hud-scan{position:absolute;left:0;right:0;height:140px;background:linear-gradient(to bottom, transparent, rgba(0,201,177,.09), transparent);animation:hudSweep 8.5s linear infinite}
.hud-frame{position:absolute;width:54px;height:54px;border:2px solid rgba(0,201,177,.7);z-index:2}
.hud-frame.tl{top:86px;left:18px;border-right:0;border-bottom:0}
.hud-frame.tr{top:86px;right:18px;border-left:0;border-bottom:0}
.hud-frame.bl{bottom:14px;left:14px;border-right:0;border-top:0}
.hud-frame.br{bottom:14px;right:14px;border-left:0;border-top:0}
.hero{flex-direction:column}
.hero-stage{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center}
.hud-reactor{position:absolute;z-index:2;width:168px;height:168px;right:36px;top:34%;margin-top:-84px;transform:translate(calc(var(--hud-x, 0) * -14px), calc(var(--hud-y, 0) * -10px));transition:transform .35s ease-out}
.hud-verb{position:absolute;z-index:2;right:36px;top:calc(34% + 92px);width:168px;margin:0;text-align:center}
.hud-orb{width:100%;height:100%}
.hud-track{fill:none;stroke:#00c9b1;stroke-width:1.2;opacity:.55}
.hud-track.thin{stroke-width:.7;opacity:.35}
.hud-track.dash{stroke-dasharray:8 10}
.hud-ticks line{stroke:#7aefff;stroke-width:1.4}
.spin-slow{transform-origin:200px 200px;transform-box:view-box;animation:spin 26s linear infinite}
.spin-rev{transform-origin:200px 200px;transform-box:view-box;animation:spin 14s linear infinite reverse}
.hud-reactor.awake .spin-slow,.hud-reactor.awake .spin-rev{animation-duration:2.2s}
.hud-core{position:absolute;inset:31%;border-radius:50%;background:radial-gradient(circle at 38% 32%, #fff 0%, #b8f7ff 16%, #00c9b1 46%, #043a4c 100%);box-shadow:0 0 42px rgba(0,201,177,.75), inset 0 0 16px #fff}
.hud-reactor.awake .hud-core{box-shadow:0 0 70px rgba(245,166,35,.85), inset 0 0 16px #fff}
.hud-iris{position:absolute;inset:30%;border-radius:50%;background:#01060a;box-shadow:inset 0 0 14px #00c9b1}
.hud-verb{font-family:'Share Tech Mono',monospace;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--amber);text-shadow:0 0 12px rgba(245,166,35,.45)}
.hud-readout{position:relative;z-index:2;display:flex;justify-content:center;gap:1.4rem;flex-wrap:wrap;margin-top:1.6rem;font-family:'Share Tech Mono',monospace;font-size:.72rem;letter-spacing:.14em;color:#7aefff}
.hud-readout span{display:inline-flex;align-items:center;gap:.45rem}
.hud-live{width:7px;height:7px;border-radius:50%;background:#5ee0a8;box-shadow:0 0 10px #5ee0a8;animation:pulse 2s infinite}
section,.stats-bar,.stats-note,footer,.footer-bottom{position:relative;z-index:1;background:transparent}
.brand-section,.services-section,.industries-section,.tools-section,.contact-section,.cta-section,
.market-section,.cap-section,.usecase-section,.hiw-section,.pricing-section,.problem-section,.stats-bar,.stats-note,footer,.footer-bottom{background:transparent}
.brand-card,.cap-card,.service-card,.problem-card,.industry-card,.pricing-card,.usecase-card,.market-card,.hiw-step,.tool-pill,.lead-card{transition:border-color .2s, transform .2s, box-shadow .25s, background .25s}
.brand-card:hover,.cap-card:hover,.service-card:hover,.problem-card:hover,.industry-card:hover,.pricing-card:hover,.usecase-card:hover,.market-card:hover,.hiw-step:hover,.tool-pill:hover,.lead-card:hover{box-shadow:0 0 28px rgba(0,201,177,.14), inset 0 0 28px rgba(0,201,177,.05)}
@keyframes hudSweep{0%{top:-20%}100%{top:110%}}
@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:900px){
  .hud-reactor{position:relative;right:auto;top:auto;margin:0 auto .4rem;width:120px;height:120px;transform:none}
  .hud-verb{position:relative;right:auto;top:auto;width:auto;margin:0 0 .8rem}
  .hud-frame{display:none}
}
@media (prefers-reduced-motion: reduce){
  .hud-scan,.spin-slow,.spin-rev,.hud-live,.nav-logo .dot{animation:none}
  .hud-bloom,.hud-reactor{transform:none}
}

/* ─── ONE CANVAS + QUIET TYPE ─── */
body{background:#070b10;font-size:15px}
nav{background:rgba(7,11,16,.55);border-bottom:1px solid rgba(140,210,220,.14)}
.hero-grid-bg{display:none}
.hero{padding:6.25rem 5vw 2.75rem;min-height:88vh}
.hero-content{max-width:38rem}
.hero h1{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:clamp(2.15rem,3.3vw,3.05rem);line-height:1.08;letter-spacing:-.02em}
.hero-sub{font-size:.98rem;max-width:34rem;margin:1rem auto 1.5rem;line-height:1.65}
.section-tag,.cap-kicker,.uc-label,.footer-col h4,.form-group label,.brand-word-meaning,.market-card-label{font-family:"Share Tech Mono",ui-monospace,monospace;font-weight:400;letter-spacing:.14em;font-size:.68rem}
h2.section-title,.section-title,.brand-hero-line,.contact-info h3,.cta-box h2,.footer-brand h3,.nav-logo,.brand-word,.stat-num,.price-usd,.price-inr,.market-card-title,.cap-card h3,.service-card h3,.problem-card h4,.industry-card h4,.hiw-step h3,.usecase-header h3,.lead-card h4,.pricing-card h3,.form-success h4{font-family:"Instrument Serif",Georgia,serif;font-weight:400;letter-spacing:-.02em}
.section-title{font-size:clamp(1.5rem,2vw,1.9rem);line-height:1.2;max-width:16em}
.section-body{font-size:.96rem;line-height:1.65}
.brand-hero-line{font-size:clamp(1.3rem,1.8vw,1.65rem);line-height:1.3;max-width:22em}
.brand-word{font-size:1.65rem}
.stat-num{font-size:1.55rem}
.stat-item{padding:1.35rem 1rem}
section{padding:4rem 5vw}
.cta-section{padding:4rem 5vw}
.cta-box{padding:2.4rem 2rem}
.cta-box h2{font-size:1.75rem}
.contact-info h3{font-size:1.45rem}
.price-usd{font-size:1.75rem}
.nav-logo{font-size:1.2rem}
.services-grid{background:transparent;border:none;gap:.9rem;overflow:visible}
.brand-card,.cap-card,.problem-card,.industry-card,.pricing-card,.usecase-card,.hiw-step,.lead-card,.contact-form,.service-card,.tool-pill,.cta-box{background:rgba(8,16,24,.46);backdrop-filter:blur(14px);border:1px solid rgba(140,210,220,.16)}
.pricing-card.featured{background:rgba(8,16,24,.62);border-color:rgba(245,166,35,.45)}
.usecase-header{background:transparent}
`;

/* ─── DATA ─── */
const CAPABILITIES = [
  { kicker: "Agentic AI", title: "AI agents that do the work", desc: "Multi-step agents that research, decide, call tools, and complete jobs — not chatbots that only answer questions." },
  { kicker: "MLOps", title: "From notebook to production", desc: "Pipelines, model versioning, CI/CD for ML, monitoring, and rollback — so AI ships and stays alive in prod." },
  { kicker: "AIRE", title: "AI Reliability Engineering", desc: "Evals, guardrails, observability, and failure playbooks. Treat AI systems like production infrastructure, not demos." },
  { kicker: "FDE", title: "Forward Deployed Engineers", desc: "We embed with your team, sit in the workflows, and ship working systems in your stack — not slide decks." },
  { kicker: "Cost Control", title: "Cloud & AI spend reduction", desc: "Find waste in AWS/GCP/Azure and LLM bills. Right-size infra, cache, route models, and cut cost without killing quality." },
];

const SERVICES = [
  { icon: "🤖", title: "Agentic AI & Workflow Automation", desc: "Design agents and pipelines that connect apps, email, WhatsApp, ERP, and APIs — then execute multi-step work without human babysitting.", tags: ["Agents", "n8n", "Tools", "APIs"] },
  { icon: "💸", title: "Cloud & AI Cost Reduction", desc: "Audit infra and LLM usage. Cut idle spend, pick cheaper models where safe, and put budgets/alerts in place so AI scales profitably.", tags: ["FinOps", "LLM Routing", "AWS/GCP/Azure"] },
  { icon: "⚙️", title: "MLOps & Model Lifecycle", desc: "Productionize experiments: training/inference pipelines, feature stores, registries, canary deploys, and drift detection.", tags: ["CI/CD", "Monitoring", "Deploy"] },
  { icon: "🛡️", title: "AIRE — Production AI Reliability", desc: "Harden AI before and after launch: eval suites, prompt/version control, hallucination checks, incident response, and SLAs.", tags: ["Evals", "Guardrails", "Observability"] },
  { icon: "🧑‍💻", title: "FDE Embeds & Delivery Pods", desc: "A Forward Deployed Engineer joins your squad to discover, build, and hand over — velocity of a product team, accountability of a partner.", tags: ["Embed", "Ship", "Handover"] },
  { icon: "💬", title: "Assistants, Docs & Integrations", desc: "Customer/support agents, OCR & document intelligence, CRM/ERP wiring, and dashboards your ops team will actually use.", tags: ["WhatsApp", "OCR", "Tally/Zoho"] },
];

const USE_CASES = [
  { emoji: "🏭", title: "Manufacturing — Agent-led PO Processing", sub: "India · SME · Ops automation", problem: '"3 people spend all day reading supplier emails and updating Excel."', solution: "An agent reads inbound mail, extracts PO fields, updates ERP, and sends confirmations — with human review only on exceptions.", metrics: [{ val: "90%", label: "Less manual work*" }, { val: "3hrs→5min", label: "Cycle time*" }, { val: "₹4L/yr", label: "Labour saved*" }] },
  { emoji: "☁️", title: "SaaS Scale-up — Cloud & LLM Cost Cut", sub: "Global · Product / Eng", problem: '"Our AWS + OpenAI bill doubled and nobody can explain why."', solution: "Cost audit across cloud and model usage: right-sized instances, caching, cheaper-model routing for low-risk calls, and spend alerts.", metrics: [{ val: "25–40%", label: "Bill reduction*" }, { val: "2 wks", label: "To first cuts*" }, { val: "Clear", label: "Cost ownership*" }] },
  { emoji: "🧪", title: "AI Pilot → Production (MLOps + AIRE)", sub: "Mid-market · Stuck PoC", problem: '"We have a demo that works in a notebook. It dies the moment real users touch it."', solution: "FDE embeds to productionize: pipelines, evals, monitoring, rollback. The pilot becomes a reliable service with owners and SLAs.", metrics: [{ val: "Prod", label: "Not another PoC*" }, { val: "Evals", label: "Before every ship*" }, { val: "On-call", label: "Failure playbooks*" }] },
  { emoji: "🏗️", title: "Real Estate — Agentic Lead Qualification", sub: "UK / UAE Market", problem: '"200 enquiries a month; agents only work 40. The rest go cold."', solution: "An agent responds instantly, scores intent, books meetings, and hands only warm leads to humans — CRM updated automatically.", metrics: [{ val: "3×", label: "Leads worked*" }, { val: "60%", label: "Agent time saved*" }, { val: "28%", label: "Conversion uplift*" }] },
];

const INDUSTRIES = [
  { emoji: "🏭", title: "Manufacturing & Supply Chain", desc: "PO agents, inventory signals, supplier coordination, quality alerts.", badge: "ind-india", badgeText: "India Market" },
  { emoji: "🛒", title: "E-Commerce & D2C", desc: "Support agents, order automation, returns, review workflows.", badge: "ind-both", badgeText: "India + Global" },
  { emoji: "💻", title: "SaaS & Product Teams", desc: "MLOps, AIRE, FDE embeds, cloud/LLM FinOps for scaling AI features.", badge: "ind-global", badgeText: "Global / Tech" },
  { emoji: "🏦", title: "Finance, CA & Legal", desc: "Document extraction, compliance checklists, onboarding, invoice AI.", badge: "ind-india", badgeText: "India Market" },
  { emoji: "🏥", title: "Healthcare & Clinics", desc: "Scheduling agents, follow-ups, billing workflows, reliable assistants.", badge: "ind-both", badgeText: "India + Global" },
  { emoji: "🏠", title: "Real Estate", desc: "Lead qualification agents, WhatsApp AI, CRM automation.", badge: "ind-both", badgeText: "India + Global" },
  { emoji: "🚚", title: "Logistics & 3PL", desc: "Tracking automation, vendor comms, dispute agents, cost dashboards.", badge: "ind-global", badgeText: "Global / GCC" },
  { emoji: "🧑‍💼", title: "HR & Shared Services", desc: "Screening agents, scheduling, onboarding automation, payroll alerts.", badge: "ind-global", badgeText: "Global Outsourcing" },
];

const CONTACT_EMAIL = "launchlayer.techh@gmail.com";
const WHATSAPP_NUMBER = "919831014716";
const JARVIS_WEBHOOK = import.meta.env.VITE_JARVIS_WEBHOOK_URL || "";

const MKT_COPY = {
  both: {
    h1: <>Ship AI that<br /><span className="accent">works in prod.</span><br /><span className="accent2">Not just demos.</span></>,
    badge: "Agentic AI · MLOps · AIRE · FDE · Cost Control",
    sub: "LaunchLayer is the AI layer for businesses that are done with pilots. We embed, ship agents, harden reliability, and cut cloud/AI waste — so you save money and move faster.",
  },
  india: {
    h1: <>Automate busywork.<br /><span className="accent">Cut cloud waste.</span><br /><span className="accent2">Grow in ₹.</span></>,
    badge: "AI systems for Indian SMEs & scale-ups",
    sub: "From WhatsApp agents and Tally workflows to cloud/AI cost cuts — priced in ₹, WhatsApp-first support, shipped by engineers who sit in your process.",
  },
  global: {
    h1: <>FDEs who ship.<br /><span className="accent">Agents that run.</span><br /><span className="accent2">Bills that drop.</span></>,
    badge: "Production AI for UAE · UK · USA · Australia",
    sub: "Forward Deployed Engineers, MLOps, and AI Reliability Engineering — so your AI features leave the lab. Plus FinOps on cloud and LLM spend.",
  },
};

/* ─── COMPONENT ─── */
export default function Home() {
  const [market, setMarket] = useState("both");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    industry: "",
    billing: "",
    helpWith: "",
    process: "",
  });

  const [clock, setClock] = useState("--:--:--");
  const [coreAwake, setCoreAwake] = useState(false);

  useEffect(() => {
    let style = document.getElementById("ll-home-css");
    if (!style) {
      style = document.createElement("style");
      style.id = "ll-home-css";
      document.head.appendChild(style);
    }
    style.textContent = CSS;
  });

  useEffect(() => {
    const tick = () => {
      setClock(new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date()));
    };
    tick();
    const id = setInterval(tick, 1000);
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty("--hud-x", x.toFixed(3));
      document.documentElement.style.setProperty("--hud-y", y.toFixed(3));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      clearInterval(id);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const updateField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const buildLeadMessage = () =>
    [
      "Hi LaunchLayer — I'd like a free consult.",
      "",
      `Name: ${form.name}`,
      form.business ? `Business: ${form.business}` : null,
      `Email: ${form.email}`,
      form.helpWith ? `Looking for: ${form.helpWith}` : null,
      form.industry ? `Industry: ${form.industry}` : null,
      form.billing ? `Billing: ${form.billing}` : null,
      form.process ? `Context: ${form.process}` : null,
    ]
      .filter(Boolean)
      .join("\n");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      alert("Please fill in your name and email.");
      return;
    }
    setSubmitting(true);
    const message = buildLeadMessage();
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

    try {
      if (formspreeId) {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: form.name,
            business: form.business,
            email: form.email,
            industry: form.industry,
            billing: form.billing,
            helpWith: form.helpWith,
            process: form.process,
            _subject: `LaunchLayer lead — ${form.helpWith || "Consult"} — ${form.name}`,
          }),
        });
        if (!res.ok) throw new Error("Formspree failed");
      }
      if (JARVIS_WEBHOOK) {
        await fetch(JARVIS_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            event: "lead_handoff",
            source: "launchlayer.in contact form",
            pageUrl: window.location.href,
            lead: {
              name: form.name,
              email: form.email,
              company: form.business,
              need: form.helpWith,
              notes: form.process,
              billing: form.billing,
              industry: form.industry,
            },
          }),
        }).catch(() => {});
      }
      if (!formspreeId && !JARVIS_WEBHOOK) {
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }
      setFormStatus("sent");
    } catch {
      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`LaunchLayer lead — ${form.name}`)}&body=${encodeURIComponent(message)}`;
      window.location.href = mailto;
      setFormStatus("sent");
    } finally {
      setSubmitting(false);
    }
  };

  const openEmailFallback = () => {
    const message = buildLeadMessage();
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`LaunchLayer lead — ${form.name || "New lead"}`)}&body=${encodeURIComponent(message)}`;
  };

  const mkt = MKT_COPY[market];

  const ticks = Array.from({ length: 36 }, (_, i) => i * 10);

  return (
    <>
      <div className="hud-page" aria-hidden="true">
        <div className="hud-hex" />
        <div className="hud-bloom" />
      </div>
      {/* NAV */}
      <nav>
        <a href="/" className="nav-logo">
          <img src="/logo-mark.svg" alt="" width="32" height="32" style={{ borderRadius: 8, flexShrink: 0 }} />
          <span>LaunchLayer</span>
          <span className="dot" />
          <span className="nav-logo-sub">AI that ships. Spend that drops.</span>
        </a>
        <ul className="nav-links">
          <li><a href="#capabilities">Capabilities</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#use-cases">Results</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><Link to="/blog" className="nav-blog">Blog</Link></li>
          <li><a href="#contact" className="nav-cta">Book Free Audit →</a></li>
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          {menuOpen ? "✕" : "☰"}
        </button>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <a href="#capabilities" onClick={closeMenu}>Capabilities</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#use-cases" onClick={closeMenu}>Results</a>
          <a href="#pricing" onClick={closeMenu}>Pricing</a>
          <Link to="/blog" className="nav-blog" onClick={closeMenu}>Blog</Link>
          <a href="#contact" className="nav-cta" onClick={closeMenu}>Book Free Audit →</a>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="hero"
        onMouseEnter={() => setCoreAwake(true)}
        onMouseLeave={() => setCoreAwake(false)}
      >
        <div className="hud-floor" aria-hidden="true" />
        <div className="hud-scan" aria-hidden="true" />
        <span className="hud-frame tl" aria-hidden="true" />
        <span className="hud-frame tr" aria-hidden="true" />
        <span className="hud-frame bl" aria-hidden="true" />
        <span className="hud-frame br" aria-hidden="true" />
        <div className="hero-grid-bg" />
        <div className="hero-glow" />
        <div className={`hud-reactor ${coreAwake ? "awake" : ""}`} aria-hidden="true">
            <svg className="hud-orb" viewBox="0 0 400 400">
              <circle className="hud-track" cx="200" cy="200" r="188" />
              <circle className="hud-track dash spin-slow" cx="200" cy="200" r="168" />
              <circle className="hud-track thin spin-rev" cx="200" cy="200" r="148" />
              <g className="hud-ticks spin-slow">
                {ticks.map((angle) => (
                  <line key={angle} x1="200" y1="16" x2="200" y2="30" transform={`rotate(${angle} 200 200)`} />
                ))}
              </g>
            </svg>
            <div className="hud-core"><span className="hud-iris" /></div>
          </div>
        <p className="hud-verb">{coreAwake ? "Systems tracking · ready to ship" : "Online · waiting for a signal"}</p>
        <div className="hero-stage">
        <div className="hero-content">
          <div className="mkt-toggle" role="group" aria-label="Market focus">
            {[["both","All Markets"],["india","India"],["global","Global"]].map(([id,label]) => (
              <button key={id} type="button" className={`mtb ${market===id?"on":""}`} onClick={() => setMarket(id)}>{label}</button>
            ))}
          </div>
          <div className="hero-badge">{mkt.badge}</div>
          <h1>{mkt.h1}</h1>
          <p className="hero-sub">{mkt.sub}</p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">Book Free AI Audit →</a>
            <a href="#capabilities" className="btn-secondary">See how we ship</a>
          </div>
          <div className="hero-markets">
            {["India","UAE","UK","USA","Australia"].map((c) => (
              <span key={c}><span className="mkt-dot" />{c}</span>
            ))}
          </div>
        </div>
        </div>
        <div className="hud-readout">
          <span><i className="hud-live" /> Sys online</span>
          <span>IST {clock}</span>
          <span>{coreAwake ? "Tracking pointer" : "Layer active"}</span>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {[["25–40%","Typical cloud/AI bill cut*"],["2 Wks","To first live system*"],["Prod","PoCs hardened with AIRE"],["FDE","Engineers who embed & ship"]].map(([n,l]) => (
          <div className="stat-item" key={l}><span className="stat-num">{n}</span><span className="stat-label">{l}</span></div>
        ))}
      </div>
      <p className="stats-note">*Illustrative of engagements like yours — we confirm targets in a free audit before any build.</p>

      {/* BRAND POSITIONING */}
      <section className="brand-section" id="why-launchlayer">
        <span className="section-tag">Why LaunchLayer</span>
        <div className="brand-hero-line">
          Most AI projects stall as demos.<br />
          We <span className="hl-a">launch</span> production systems — and build the <span className="hl-t">AI layer</span> your ops, product, and finance teams can trust.
        </div>
        <div className="brand-name-grid">
          <div className="brand-card">
            <div className="brand-word">Launch</div>
            <div className="brand-word-meaning">Ship · Embed · Measure</div>
            <div className="brand-word-desc">FDEs sit inside your workflows, ship agents and pipelines in weeks, and leave you with something running — not a deck of recommendations.</div>
            <div className="brand-signals">{["FDE embeds","Agentic AI","Weeks not quarters"].map(s => <span key={s} className="bsig">{s}</span>)}</div>
          </div>
          <div className="brand-card teal-card">
            <div className="brand-word">Layer</div>
            <div className="brand-word-meaning">Reliability · Cost · Scale</div>
            <div className="brand-word-desc">MLOps + AIRE keep AI alive in production. FinOps on cloud and LLMs keeps the bill honest as you scale usage.</div>
            <div className="brand-signals">{["MLOps","AIRE","Cloud & AI FinOps"].map(s => <span key={s} className="bsig">{s}</span>)}</div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="cap-section" id="capabilities">
        <span className="section-tag">Capabilities</span>
        <h2 className="section-title">The skills behind the AI layer</h2>
        <p className="section-body">Automation alone is table stakes. We win when agents ship, spend drops, and production stops breaking.</p>
        <div className="cap-grid">
          {CAPABILITIES.map((c) => (
            <div className="cap-card" key={c.kicker}>
              <div className="cap-kicker">{c.kicker}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="lead-strip">
          <a href="#contact" className="lead-card" onClick={() => setForm((f) => ({ ...f, helpWith: "Free AI Opportunity Audit" }))}>
            <h4>Free AI Opportunity Audit</h4>
            <p>30 minutes. We map where agents, automation, or reliability work will pay back fastest — even if you don't hire us.</p>
            <span>Book the audit →</span>
          </a>
          <a href="#contact" className="lead-card teal" onClick={() => setForm((f) => ({ ...f, helpWith: "Free Cloud & AI Cost Snapshot" }))}>
            <h4>Free Cloud & AI Cost Snapshot</h4>
            <p>Quick read on AWS/GCP/Azure and LLM waste. Leave with 3–5 concrete cut opportunities and owners.</p>
            <span>Request cost snapshot →</span>
          </a>
        </div>
      </section>

      {/* MARKET STRATEGY */}
      <section className="market-section" id="markets">
        <span className="section-tag">Who we help</span>
        <h2 className="section-title">One partner. Two buyer realities.</h2>
        <p className="section-body">Indian operators who need busywork gone and ₹ ROI — and global product/ops teams who need production AI plus lower cloud bills.</p>
        <div className="market-grid">
          <div className="market-card india-card">
            <div className="market-card-label">India</div>
            <div className="market-card-title">SMEs & operators</div>
            <div className="market-card-subtitle">Manufacturing · CA · D2C · Services</div>
            <div className="market-feat"><strong>Lead with ₹ savings</strong> — labour hours and tool waste, not jargon.</div>
            <div className="market-feat"><strong>WhatsApp-first delivery</strong> — updates and support where your team already lives.</div>
            <div className="market-feat"><strong>Local stack</strong> — Tally, Zoho, GST-aware workflows, bilingual clarity.</div>
            <div className="market-feat"><strong>Agents on real ops</strong> — POs, leads, support, docs — shipped by an FDE mindset.</div>
            <div className="market-price">From ₹33,000<sub>/month · Growth</sub></div>
          </div>
          <div className="market-card global-card">
            <div className="market-card-label">Global</div>
            <div className="market-card-title">Product, platform & ops</div>
            <div className="market-card-subtitle">UAE · UK · USA · Australia · GCC</div>
            <div className="market-feat"><strong>Kill the PoC graveyard</strong> — MLOps + AIRE to make AI production-grade.</div>
            <div className="market-feat"><strong>FDE embeds</strong> — engineers in your standups, shipping in your repo.</div>
            <div className="market-feat"><strong>Cloud & LLM FinOps</strong> — measurable bill reduction with quality intact.</div>
            <div className="market-feat"><strong>Security-aware delivery</strong> — NDA-first, GDPR awareness, clear ownership.</div>
            <div className="market-price">From $400<sub>/month · Growth · Enterprise custom</sub></div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem-section" id="problem">
        <div>
          <span className="section-tag">The Real Problem</span>
          <h2 className="section-title">Three ways AI is failing your P&amp;L right now.</h2>
          <p className="section-body">Manual work still eats headcount. Cloud and model bills climb without owners. Pilots impress leadership and then never reach production.</p>
          <br />
          <p className="section-body" style={{ fontSize: "0.9rem" }}><strong style={{ color: "var(--white)" }}>What we fix:</strong> We replace busywork with agents, put FinOps on cloud/AI spend, and use FDE + MLOps + AIRE so systems stay up after launch day.</p>
        </div>
        <div className="problem-cards">
          {[["📋","Busywork that never dies","Copy-paste, follow-ups, and report wrangling still own your team's calendar — agents can take the first 80%."],["💸","Cloud & AI bill shock","Idle infra, oversized instances, and unrouted LLM calls quietly burn budget with no FinOps owner."],["🧪","Pilots stuck in demo mode","Notebooks and slideware don't survive real users. Without MLOps and AIRE, AI never becomes a product."],["🕳️","No one to ship with you","Vendors throw architecture. You need an FDE who embeds, builds, and hands over working systems."]].map(([icon,title,desc]) => (
            <div className="problem-card" key={title}><span className="problem-icon">{icon}</span><div><h4>{title}</h4><p>{desc}</p></div></div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="services-header">
          <span className="section-tag">What We Deliver</span>
          <h2 className="section-title">From agents to reliability to lower bills</h2>
          <p className="section-body">One partner for automation, production AI, and cost control — scoped to your stack and market.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map(s => (
            <div className="service-card" key={s.title}>
              <span className="service-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="service-tag-list">{s.tags.map(t => <span className="stag" key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="usecase-section" id="use-cases">
        <span className="section-tag">Example Outcomes</span>
        <h2 className="section-title">What shipping the AI layer looks like</h2>
        <p className="section-body">Illustrative scenarios across ops automation, cost control, and productionising AI.</p>
        <p className="uc-disclaimer">Example outcomes for similar projects — not guarantees. Every engagement starts with a free audit against your real systems and bills.</p>
        <div className="usecase-grid">
          {USE_CASES.map(uc => (
            <div className="usecase-card" key={uc.title}>
              <div className="usecase-header">
                <span className="uc-emoji">{uc.emoji}</span>
                <div><h3>{uc.title}</h3><span>{uc.sub}</span></div>
              </div>
              <div className="usecase-body">
                <div className="uc-label">The Problem</div>
                <div className="uc-scenario">{uc.problem}</div>
                <div className="uc-label" style={{ marginTop: "1rem" }}>How we tackle it</div>
                <p className="uc-result">{uc.solution}</p>
                <div className="uc-metrics">{uc.metrics.map(m => <div className="uc-metric" key={m.label}><strong>{m.val}</strong><span>{m.label}</span></div>)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="industries-section" id="industries">
        <span className="section-tag">Who We Serve</span>
        <h2 className="section-title">Where ROI shows up fastest</h2>
        <p className="section-body">Operators drowning in repetitive work — and product teams ready to take AI from pilot to production.</p>
        <div className="industries-grid">
          {INDUSTRIES.map(ind => (
            <div className="industry-card" key={ind.title}>
              <span className="ind-emoji">{ind.emoji}</span>
              <h4>{ind.title}</h4>
              <p>{ind.desc}</p>
              <span className={`ind-badge ${ind.badge}`}>{ind.badgeText}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="hiw-section" id="how-it-works">
        <span className="section-tag">How we work</span>
        <h2 className="section-title">Audit → Embed &amp; build → Operate</h2>
        <div className="hiw-steps">
          {[
            { n: "01", c: "s1", t: "Free audit (30 mins)", d: "Map workflows, cloud/AI spend, and pilot risk. You leave with a priority list — automation, agents, FinOps, or AIRE — even if you don't hire us." },
            { n: "02", c: "s2", t: "FDE embeds & ships (1–3 weeks)", d: "A Forward Deployed Engineer builds in your environment: agents, pipelines, cost fixes. Working system first — documentation and handover with it." },
            { n: "03", c: "s3", t: "MLOps + AIRE in production", d: "Monitoring, evals, guardrails, and cost alerts so the system stays reliable and the bill stays sane as usage grows." },
          ].map(s => (
            <div className="hiw-step" key={s.n}><div className={`step-num ${s.c}`}>{s.n}</div><h3>{s.t}</h3><p>{s.d}</p></div>
          ))}
        </div>
      </section>

      {/* TOOLS */}
      <section className="tools-section" id="tools">
        <div className="tools-intro">
          <div>
            <span className="section-tag">Stack we ship with</span>
            <h2 className="section-title">Pragmatic tools. Production discipline.</h2>
            <p className="section-body">Lean automation where it wins. Full MLOps and cloud FinOps where your product and bill demand it. We pick for ROI, not resume keywords.</p>
            <br />
            <p className="section-body" style={{ fontSize: "0.88rem", color: "var(--muted)" }}>Example: self-hosted n8n for ops workflows, model routing to cut LLM spend, and eval harnesses so agent changes don't silently regress.</p>
          </div>
          <div className="tools-grid">
            {[["n8n / Make","Automate"],["Agents & tools","Ship"],["OpenAI / Claude","LLMs"],["AWS / GCP / Azure","Cloud"],["LangSmith / evals","AIRE"],["Docker / CI","MLOps"],["Power BI / Metabase","Insight"],["Supabase / Vercel","Ship fast"],["WhatsApp API","India ops"]].map(([name,cost]) => (
              <div className="tool-pill" key={name}>{name}<span className="t-cost">{cost}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span className="section-tag">Simple Pricing</span>
          <h2 className="section-title" style={{ margin: "0 auto", textAlign: "center" }}>Start small. Scale as you grow.</h2>
          <p className="section-body" style={{ textAlign: "center", margin: "1rem auto 0" }}>No long-term lock-in. No surprise bills. Billing in USD and INR.</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Starter</h3>
            <div className="pricing-dual"><span className="price-usd">$30<sub>/hr</sub></span><span className="price-inr">₹2,500<sub>/hr</sub></span></div>
            <p className="pricing-desc">One-off builds and quick fixes. Ideal when you need a single workflow shipped fast.</p>
            <ul className="pricing-features">{["Single workflow automation build","Integration with 1–2 apps","Testing & handover documentation","1 week of post-launch support","Free 30-min audit call included"].map(f => <li key={f}>{f}</li>)}</ul>
            <a href="#contact" className="pricing-btn">Start with Hourly →</a>
          </div>
          <div className="pricing-card featured">
            <div className="featured-tag">Best value</div>
            <h3>Growth</h3>
            <div className="pricing-dual"><span className="price-usd">$400<sub>/mo</sub></span><span className="price-inr">₹33,000<sub>/mo</sub></span></div>
            <p className="pricing-desc">~10–20 hrs/month reserved for you — lower effective rate than hourly, plus ongoing support.</p>
            <ul className="pricing-features">{["Up to 3 workflow automations/month","AI chatbot setup & management","Monthly performance review & ROI report","Priority WhatsApp support","Dedicated solutions consultant","GST invoice for India available"].map(f => <li key={f}>{f}</li>)}</ul>
            <a href="#contact" className="pricing-btn feat-btn">Book Free Audit First →</a>
          </div>
          <div className="pricing-card">
            <h3>Enterprise / FDE</h3>
            <div className="pricing-dual"><span className="price-usd" style={{ fontSize: "1.8rem" }}>Custom</span></div>
            <p className="pricing-desc">Embedded engineers for agent platforms, MLOps, AIRE, and multi-cloud FinOps.</p>
            <ul className="pricing-features">{["FDE embed or dedicated pod","Agentic systems + MLOps","AIRE: evals, guardrails, SLAs","Cloud & LLM cost programme","NDAs & security-aware delivery","International compliance support"].map(f => <li key={f}>{f}</li>)}</ul>
            <a href="#contact" className="pricing-btn" onClick={() => setForm((f) => ({ ...f, helpWith: "Enterprise / FDE engagement" }))}>Talk to Us →</a>
          </div>
        </div>
        <div className="pricing-note">Indian clients billed in ₹ with GST invoices · Global clients billed in $ via Stripe or bank transfer · Growth retainer typically works out cheaper per hour than Starter</div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="contact-info">
          <span className="section-tag">Let's Talk</span>
          <h3>Free audit or cost snapshot. Clear next steps. No pitch theatre.</h3>
          <p className="section-body">Tell us whether you need agents, a stuck PoC fixed, or cloud/AI spend cut. We'll spend 30 minutes on your reality and send a priority map — even if you don't hire us.</p>
          <br />
          {[{icon:"📧",label:"Email",content:<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>},{icon:"💬",label:"WhatsApp (India)",content:<a href={`https://wa.me/${WHATSAPP_NUMBER}`}>+91 98310 14716</a>},{icon:"🌐",label:"Serving",content:<span style={{color:"var(--text)",fontSize:"0.9rem"}}>India · UAE · UK · USA · Australia</span>}].map(item => (
            <div className="contact-item" key={item.label}>
              <div className="contact-icon">{item.icon}</div>
              <div className="contact-detail"><h5>{item.label}</h5>{item.content}</div>
            </div>
          ))}
          <div className="avail-badge"><span className="avail-dot" />Currently accepting new projects</div>
        </div>
        <div className="contact-form">
          <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--white)", marginBottom: "1.5rem" }}>Book a free consult</h4>
          {formStatus === "sent" ? (
            <div className="form-success">
              <h4>Request ready</h4>
              <p>We opened WhatsApp (or your email app) with your details filled in. Send the message and we'll reply within 24 hours.</p>
              <button type="button" className="btn-ghost" style={{ marginTop: "1rem" }} onClick={() => setFormStatus("idle")}>Submit another request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label htmlFor="ll-name">Your Name</label><input id="ll-name" type="text" placeholder="Rahul Sharma" value={form.name} onChange={updateField("name")} required autoComplete="name" /></div>
                <div className="form-group"><label htmlFor="ll-business">Business Name</label><input id="ll-business" type="text" placeholder="Sharma Exports Pvt Ltd" value={form.business} onChange={updateField("business")} autoComplete="organization" /></div>
              </div>
              <div className="form-group"><label htmlFor="ll-email">Email</label><input id="ll-email" type="email" placeholder="rahul@company.com" value={form.email} onChange={updateField("email")} required autoComplete="email" /></div>
              <div className="form-group">
                <label htmlFor="ll-help">What do you need help with?</label>
                <select id="ll-help" value={form.helpWith} onChange={updateField("helpWith")}>
                  <option value="">Select...</option>
                  {[
                    "Free AI Opportunity Audit",
                    "Free Cloud & AI Cost Snapshot",
                    "Agentic AI / workflow automation",
                    "MLOps / productionise a pilot",
                    "AIRE — reliability & evals",
                    "FDE embed / delivery pod",
                    "Enterprise / FDE engagement",
                    "Not sure — advise me",
                  ].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ll-industry">Industry</label>
                <select id="ll-industry" value={form.industry} onChange={updateField("industry")}>
                  <option value="">Select your industry...</option>
                  {["Manufacturing & Supply Chain","E-Commerce / D2C","SaaS / Product","Healthcare / Clinic","Finance / CA / Legal","Real Estate","Logistics / 3PL","HR / Shared Services","Other"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ll-billing">Preferred billing</label>
                <select id="ll-billing" value={form.billing} onChange={updateField("billing")}>
                  <option value="">Select...</option>
                  <option value="INR — ₹ with GST invoice (India)">INR — ₹ with GST invoice (India)</option>
                  <option value="USD — $ via Stripe or bank transfer (Global)">USD — $ via Stripe or bank transfer (Global)</option>
                </select>
              </div>
              <div className="form-group"><label htmlFor="ll-process">What's broken, expensive, or stuck in demo mode?</label><textarea id="ll-process" placeholder="e.g. LLM bill spiked; PoC never reached prod; team still copy-pastes POs from email..." value={form.process} onChange={updateField("process")} /></div>
              <div className="form-actions">
                <button className="btn-primary" style={{ width: "100%", border: "none", fontSize: "1rem", padding: "0.9rem", cursor: "pointer" }} type="submit" disabled={submitting}>
                  {submitting ? "Opening…" : (import.meta.env.VITE_FORMSPREE_ID ? "Book Free Consult →" : "Send via WhatsApp →")}
                </button>
                {!import.meta.env.VITE_FORMSPREE_ID && (
                  <p className="form-hint">
                    Prefer email?{" "}
                    <button type="button" onClick={openEmailFallback} style={{ background: "none", border: "none", color: "var(--amber)", cursor: "pointer", font: "inherit", padding: 0, textDecoration: "underline" }}>
                      Send to {CONTACT_EMAIL}
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box">
          <h2>AI that ships. Spend that drops.</h2>
          <div className="cta-tagline">Agents · MLOps · AIRE · FDE · FinOps</div>
          <p>Join operators and product teams who replaced busywork, unstuck pilots, and cut cloud/AI waste — in weeks, not years.</p>
          <a href="#contact" className="btn-primary" style={{ display: "inline-block" }}>Book Free Consult →</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-brand">
          <h3>LaunchLayer</h3>
          <div className="footer-tagline">AI that ships. Spend that drops.</div>
          <p>Agentic systems, MLOps, AIRE, Forward Deployed Engineers, and cloud/AI cost reduction — production AI for India and global markets.</p>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>{["Agentic AI","Cloud & AI Cost Reduction","MLOps","AIRE","FDE Embeds","Automations & Integrations"].map(s => <li key={s}><a href="#services">{s}</a></li>)}</ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#capabilities">Capabilities</a></li>
            <li><a href="#markets">Who we help</a></li>
            <li><a href="#use-cases">Example outcomes</a></li>
            <li><a href="#how-it-works">How we work</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`}>WhatsApp India</a></li>
            <li><a href="https://www.linkedin.com/company/143744064/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="#contact">Book a Call</a></li>
            <li>
              <Link to="/blog" className="footer-link">Blog</Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <p>© 2026 LaunchLayer · AI that ships. Spend that drops.</p>
        <span className="footer-serving">Serving India · UAE · UK · USA · Australia</span>
      </div>
      <ChatBot />
    </>
  );
}
