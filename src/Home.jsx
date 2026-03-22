import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ─── STYLES ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Sans:wght@400;500;600&display=swap');

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
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.3);border-radius:100px;padding:.38rem .95rem;font-size:.78rem;color:var(--amber);font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-bottom:1.8rem;animation:fadeUp .6s ease both}
.mkt-toggle{display:inline-flex;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:100px;padding:3px;gap:2px;margin-bottom:1.4rem;animation:fadeUp .55s ease both}
.mtb{padding:.3rem .85rem;border-radius:100px;border:none;cursor:pointer;font-size:.75rem;font-weight:600;color:var(--muted);background:transparent;transition:all .2s;font-family:'Instrument Sans',sans-serif}
.mtb.on{background:var(--amber);color:#0a0a0f}
.hero h1{font-family:'Syne',sans-serif;font-size:clamp(2.8rem,7vw,5.5rem);font-weight:800;line-height:1.05;letter-spacing:-.03em;color:var(--white);animation:fadeUp .7s .1s ease both}
.hero h1 .accent{color:var(--amber)}.hero h1 .accent2{color:var(--teal)}
.tagline-block{margin:1.6rem auto;animation:fadeUp .7s .2s ease both}
.tagline-primary{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;color:var(--white);letter-spacing:-.01em;margin-bottom:.3rem}
.tagline-divider{display:flex;align-items:center;gap:12px;justify-content:center;margin-bottom:.3rem}
.tagline-divider span{height:1px;width:48px;background:rgba(255,255,255,.12)}
.tagline-divider small{font-size:.68rem;color:var(--muted);letter-spacing:.08em;text-transform:uppercase}
.tagline-secondary{font-size:.95rem;color:var(--muted);font-style:italic}
.hero-sub{font-size:1.08rem;color:var(--muted);max-width:600px;margin:.9rem auto 2.2rem;line-height:1.7;animation:fadeUp .7s .3s ease both}
.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;animation:fadeUp .7s .4s ease both}
.hero-markets{display:flex;align-items:center;justify-content:center;gap:1.2rem;margin-top:1.6rem;font-size:.78rem;color:var(--muted);animation:fadeUp .7s .5s ease both;flex-wrap:wrap}
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
.tagline-showcase{background:var(--bg2);border:1px solid var(--border);border-radius:20px;padding:2.5rem;text-align:center;position:relative;overflow:hidden;margin-bottom:2.5rem}
.tagline-showcase::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(245,166,35,.08),transparent 60%);pointer-events:none}
.tl-label{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:1rem}
.tl-main{font-family:'Syne',sans-serif;font-size:clamp(1.3rem,3vw,2rem);font-weight:800;color:var(--white);letter-spacing:-.02em;margin-bottom:.5rem}
.tl-main .a{color:var(--amber)}
.tl-sep{font-size:.7rem;color:var(--muted);margin:.6rem 0;letter-spacing:.08em;text-transform:uppercase}
.tl-alt{font-family:'Syne',sans-serif;font-size:clamp(1rem,2vw,1.4rem);font-weight:700;color:rgba(255,255,255,.45)}
.tl-exp{font-size:.82rem;color:var(--muted);margin-top:1rem;max-width:480px;margin-left:auto;margin-right:auto;line-height:1.6}
.brand-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem}
.brand-why-card{background:var(--bg3);border:1px solid var(--border);border-radius:12px;padding:1.5rem;transition:border-color .2s,transform .2s}
.brand-why-card:hover{border-color:rgba(245,166,35,.25);transform:translateY(-3px)}
.brand-why-icon{font-size:1.5rem;margin-bottom:.7rem}
.brand-why-card h4{font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem;color:var(--white);margin-bottom:.4rem}
.brand-why-card p{font-size:.8rem;color:var(--muted);line-height:1.55}

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
.avail-badge{display:inline-flex;align-items:center;gap:.5rem;background:rgba(0,201,177,.1);border:1px solid rgba(0,201,177,.25);padding:.5rem 1rem;border-radius:100px;font-size:.8rem;color:var(--teal);font-weight:600;margin-top:2rem}
.avail-dot{width:7px;height:7px;background:var(--teal);border-radius:50%;animation:pulse 2s infinite}

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
  .problem-section,.usecase-grid,.tools-intro,.contact-section,.market-grid{grid-template-columns:1fr;gap:2rem}
  .services-grid,.pricing-grid{grid-template-columns:1fr}
  .industries-grid{grid-template-columns:repeat(2,1fr)}
  .hiw-steps{grid-template-columns:1fr}.hiw-steps::before{display:none}
  footer{grid-template-columns:1fr 1fr;gap:2rem}
  .form-row{grid-template-columns:1fr}
  .hero{padding:7rem 1.5rem 3rem}
  .cta-box{padding:2.5rem 1.5rem}
  .footer-bottom{flex-direction:column;gap:.8rem;padding:1.2rem 1.5rem;text-align:center}
  .brand-name-grid{grid-template-columns:1fr}
  .brand-why-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:600px){
  .industries-grid{grid-template-columns:1fr 1fr}
  footer{grid-template-columns:1fr}
  .cta-box h2{font-size:1.8rem}
  .brand-why-grid{grid-template-columns:1fr}
  .pricing-dual{flex-direction:column;gap:.2rem}
}
`;

/* ─── DATA ─── */
const SERVICES = [
  { icon: "🤖", title: "AI Workflow Automation", desc: "Connect apps, emails, WhatsApp, ERP and databases into automated pipelines that run without human input.", tags: ["n8n", "Make.com", "Zapier", "Low-cost"] },
  { icon: "💬", title: "AI Chatbot & Assistants", desc: "Deploy AI assistants on your website, WhatsApp, or internal portal to handle queries and support 24/7.", tags: ["GPT-4o", "Claude", "WhatsApp API"] },
  { icon: "📊", title: "AI Reporting & Analytics", desc: "Turn scattered data into auto-generated dashboards. Ask business questions in plain English.", tags: ["Power BI", "Looker", "LLM Analytics"] },
  { icon: "📄", title: "Document Intelligence & OCR", desc: "Extract data from invoices, POs, forms, and PDFs automatically — zero manual keying.", tags: ["Invoice AI", "OCR", "ERP Integration"] },
  { icon: "🔗", title: "Systems Integration & API", desc: "Connect your CRM, ERP, accounting tools, logistics platforms and e-commerce systems.", tags: ["REST APIs", "Tally", "SAP/Zoho"] },
  { icon: "🚀", title: "AI Lead Generation", desc: "Build AI-driven sales funnels, automated email sequences, and lead scoring systems.", tags: ["CRM Automation", "Email AI", "LinkedIn AI"] },
];

const USE_CASES = [
  { emoji: "🏭", title: "Manufacturing — Purchase Order Processing", sub: "India · SME · 50 employees", problem: '"3 people whose entire job is receiving supplier emails, reading POs, and updating Excel. All day."', solution: "We built an AI pipeline that reads incoming emails, extracts PO details, updates their ERP, and sends confirmations — all without human input.", metrics: [{ val: "90%", label: "Less manual work" }, { val: "3hrs→5min", label: "Processing time" }, { val: "₹4L/yr", label: "Labour cost saved" }] },
  { emoji: "🏥", title: "Healthcare Clinic — Patient Scheduling", sub: "Global · Mid-sized clinic · 20 staff", problem: '"Our receptionist spends 4 hours daily on appointment reminders and we still have 30% no-shows."', solution: "We deployed a WhatsApp AI that sends personalized reminders, answers FAQs, and allows patients to confirm or reschedule — updating the scheduling system automatically.", metrics: [{ val: "45%", label: "No-shows reduced" }, { val: "4hrs", label: "Receptionist freed" }, { val: "24/7", label: "Patient support" }] },
  { emoji: "🛒", title: "E-commerce Brand — Customer Support AI", sub: "India D2C · 200+ orders/day", problem: '"150+ customer messages a day. Our 2 support agents are overwhelmed, response time is 12+ hours."', solution: "We integrated an AI chatbot trained on their FAQs, connected to their order system. Resolves 80% of queries instantly.", metrics: [{ val: "80%", label: "Queries auto-resolved" }, { val: "2min", label: "Avg response time" }, { val: "4.8★", label: "Support rating" }] },
  { emoji: "🏗️", title: "Real Estate — Lead Qualification & Nurturing", sub: "UK / UAE Market", problem: '"We get 200 enquiries monthly but agents can only call 40. The rest go cold."', solution: "We built an AI funnel: instant response to every enquiry, AI qualification scoring, only the top 30% passed to agents — pre-qualified and warm.", metrics: [{ val: "3×", label: "More leads worked" }, { val: "60%", label: "Agent time saved" }, { val: "28%", label: "Conversion uplift" }] },
];

const INDUSTRIES = [
  { emoji: "🏭", title: "Manufacturing & Supply Chain", desc: "PO processing, inventory tracking, supplier coordination, quality alerts.", badge: "ind-india", badgeText: "India Market" },
  { emoji: "🛒", title: "E-Commerce & D2C Brands", desc: "Customer support bots, order automation, returns processing, reviews AI.", badge: "ind-both", badgeText: "India + Global" },
  { emoji: "🏥", title: "Healthcare & Clinics", desc: "Appointment bots, patient follow-ups, prescription reminders, billing workflows.", badge: "ind-both", badgeText: "India + Global" },
  { emoji: "🏦", title: "Finance, CA & Legal Firms", desc: "Document extraction, compliance checklists, client onboarding, invoice AI.", badge: "ind-india", badgeText: "India Market" },
  { emoji: "🏠", title: "Real Estate", desc: "Lead qualification funnels, WhatsApp AI, property matching bots, CRM automation.", badge: "ind-both", badgeText: "India + Global" },
  { emoji: "🎓", title: "EdTech & Coaching", desc: "Student enquiry bots, admission funnels, fee reminders, performance dashboards.", badge: "ind-india", badgeText: "India Market" },
  { emoji: "🚚", title: "Logistics & 3PL", desc: "Tracking automation, delivery notifications, vendor communication, dispute AI.", badge: "ind-global", badgeText: "Global / GCC" },
  { emoji: "🧑‍💼", title: "HR & Recruitment", desc: "Resume screening AI, interview scheduling bots, onboarding automation, payroll alerts.", badge: "ind-global", badgeText: "Global Outsourcing" },
];

const BRAND_WHY = [
  { icon: "🌍", title: "Global yet pronounceable", desc: "Works perfectly in English, Hindi, and every major market from Mumbai to Manchester." },
  { icon: "🏗️", title: "\"Layer\" signals depth", desc: "Building blocks, tech stacks, capability layers — it says we're engineers, not chatbot sellers." },
  { icon: "🚀", title: "\"Launch\" signals speed", desc: "Clients launch automations in weeks. The name promises momentum." },
  { icon: "🔁", title: "A positioning statement", desc: "\"We lay the AI layer under your business\" — the name IS the pitch." },
  { icon: "🎯", title: "Domain-friendly", desc: "Clean, modern, not overused. Works for .com, .in, or .ai domains." },
  { icon: "💡", title: "Scales with ambition", desc: "Works as a consultancy today and a 50-person agency tomorrow." },
];

const MKT_COPY = {
  both: { h1: <>Your Business.<br /><span className="accent">Automated.</span><br /><span className="accent2">Elevated.</span></>, tl: "Work Less. Automate More. Grow Faster.", sub: "We replace repetitive manual work with AI-powered workflows — so your team stops firefighting and starts scaling. Intelligent automation in weeks, not months." },
  india: { h1: <>Your Business.<br /><span className="accent">Automated.</span><br /><span className="accent2">₹ Saved.</span></>, tl: "काम कम। Automate ज़्यादा। बढ़ो और तेज़।", sub: "We replace manual work — Excel copy-paste, WhatsApp follow-ups, invoice entry — with AI pipelines that run while you sleep. Affordable pricing in ₹. WhatsApp-first support. Tally & Zoho integrations." },
  global: { h1: <>Your Business.<br /><span className="accent">Automated.</span><br /><span className="accent2">ROI Proven.</span></>, tl: "Work Less. Automate More. Grow Faster.", sub: "We replace repetitive manual work with AI-powered workflows proven to deliver 3–5× ROI within the first month. SLA-backed delivery. International compliance. USD pricing with full data security." },
};

/* ─── COMPONENT ─── */
export default function Home() {
  const [market, setMarket] = useState("both");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "ll-home-css";
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => { const s = document.getElementById("ll-home-css"); if (s) s.remove(); };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget.closest(".contact-form");
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    if (!name || !email) { alert("Please fill in your name and email."); return; }
    e.currentTarget.textContent = "✅ Booked! We'll be in touch within 24 hours.";
    e.currentTarget.style.background = "var(--teal)";
    e.currentTarget.disabled = true;
  };

  const mkt = MKT_COPY[market];

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">
          <span>LaunchLayer</span>
          <span className="dot" />
          <span className="nav-logo-sub">The AI layer your business was missing</span>
        </a>
        <ul className="nav-links">
          <li><a href="#why-launchlayer">Why Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#industries">Industries</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><Link to="/blog" className="nav-blog">Blog Agent</Link></li>
          <li><a href="#contact" className="nav-cta">Book Free Audit →</a></li>
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          {menuOpen ? "✕" : "☰"}
        </button>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <a href="#why-launchlayer" onClick={closeMenu}>Why Us</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#industries" onClick={closeMenu}>Industries</a>
          <a href="#pricing" onClick={closeMenu}>Pricing</a>
          <Link to="/blog" className="nav-blog" onClick={closeMenu}>Blog Agent</Link>
          <a href="#contact" className="nav-cta" onClick={closeMenu}>Book Free Audit →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="mkt-toggle">
            {[["both","All Markets"],["india","India"],["global","Global"]].map(([id,label]) => (
              <button key={id} className={`mtb ${market===id?"on":""}`} onClick={() => setMarket(id)}>{label}</button>
            ))}
          </div>
          <div className="hero-badge">AI Automation Agency · India &amp; Global</div>
          <h1>{mkt.h1}</h1>
          <div className="tagline-block">
            <div className="tagline-primary">{mkt.tl}</div>
            <div className="tagline-divider"><span /><small>or put it this way</small><span /></div>
            <div className="tagline-secondary">"The AI Layer Your Business Was Missing."</div>
          </div>
          <p className="hero-sub">{mkt.sub}</p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">Book Free AI Audit →</a>
            <a href="#use-cases" className="btn-secondary">See Real Results</a>
          </div>
          <div className="hero-markets">
            {["India","UAE","UK","USA","Australia"].map((c,i) => (
              <span key={c}><span className="mkt-dot" />{c}{i < 4 ? "" : ""}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {[["200+","Hours saved per client/month"],["70%","Cost reduction on manual tasks"],["$30/hr","Starting engagement rate"],["2 Wks","Average time to first live automation"]].map(([n,l]) => (
          <div className="stat-item" key={n}><span className="stat-num">{n}</span><span className="stat-label">{l}</span></div>
        ))}
      </div>

      {/* BRAND POSITIONING */}
      <section className="brand-section" id="why-launchlayer">
        <span className="section-tag">Why LaunchLayer</span>
        <div className="brand-hero-line">
          We don't just <span className="hl-a">launch</span> your automations —<br />
          we build the <span className="hl-t">AI layer</span> your entire business runs on.
        </div>
        <div className="brand-name-grid">
          <div className="brand-card">
            <div className="brand-word">Launch</div>
            <div className="brand-word-meaning">Speed · Momentum · Results</div>
            <div className="brand-word-desc">We move fast. Clients go from "I have this problem" to "it's live and automated" in weeks — not months of planning. Launch means we ship real things quickly.</div>
            <div className="brand-signals">{["Speed","Growth","Action","Impact"].map(s => <span key={s} className="bsig">{s}</span>)}</div>
          </div>
          <div className="brand-card teal-card">
            <div className="brand-word">Layer</div>
            <div className="brand-word-meaning">Depth · Infrastructure · Scalability</div>
            <div className="brand-word-desc">Think of us as a new intelligent layer added under your business — handling repetitive work so every layer above it performs better.</div>
            <div className="brand-signals">{["Tech Depth","Building Blocks","Stacked Capabilities","Foundation"].map(s => <span key={s} className="bsig">{s}</span>)}</div>
          </div>
        </div>
        <div className="tagline-showcase">
          <div className="tl-label">Our Brand Taglines</div>
          <div className="tl-main">Work Less. <span className="a">Automate More.</span> Grow Faster.</div>
          <div className="tl-sep">— or —</div>
          <div className="tl-alt">"The AI Layer Your Business Was Missing."</div>
          <div className="tl-exp">Both taglines speak directly to the pain — too much manual work, not enough growth — and promise the solution in one line. No buzzwords. No vague promises.</div>
        </div>
        <span className="section-tag" style={{ marginBottom: "1rem" }}>Why the name works</span>
        <div className="brand-why-grid">
          {BRAND_WHY.map(w => (
            <div className="brand-why-card" key={w.title}>
              <div className="brand-why-icon">{w.icon}</div>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MARKET STRATEGY */}
      <section className="market-section" id="markets">
        <span className="section-tag">Our Market Strategy</span>
        <h2 className="section-title">One agency. Two markets.<br />Completely different plays.</h2>
        <p className="section-body">We serve Indian SMEs and global businesses simultaneously — with a tailored approach for each. Same quality, different language and entry points.</p>
        <div className="market-grid">
          <div className="market-card india-card">
            <div className="market-card-label">India Market</div>
            <div className="market-card-title">India</div>
            <div className="market-card-subtitle">Manufacturing · CA Firms · D2C · EdTech</div>
            <div className="market-feat"><strong>Lead with cost savings in ₹</strong> — Indian decision-makers respond to clear rupee ROI, not abstract percentages.</div>
            <div className="market-feat"><strong>WhatsApp-first communication</strong> — all support, updates, and follow-ups over WhatsApp.</div>
            <div className="market-feat"><strong>Native integrations</strong> — Tally, Zoho Books, GST-aware workflows baked in.</div>
            <div className="market-feat"><strong>Jargon-free language</strong> — plain Hindi/English so every business owner gets it.</div>
            <div className="market-feat"><strong>Local case studies</strong> — Mumbai CA firm, Pune manufacturer, Delhi D2C brand.</div>
            <div className="market-price">₹33,000<sub>/month · Growth Plan</sub></div>
          </div>
          <div className="market-card global-card">
            <div className="market-card-label">Global Market</div>
            <div className="market-card-title">Global</div>
            <div className="market-card-subtitle">UAE · UK · USA · Australia · GCC</div>
            <div className="market-feat"><strong>Lead with ROI and hours saved</strong> — global clients want measurable business impact and benchmark data.</div>
            <div className="market-feat"><strong>Emphasise data security</strong> — GDPR awareness, NDA-first, enterprise-grade compliance docs.</div>
            <div className="market-feat"><strong>USD pricing, international billing</strong> — Stripe/PayPal, proper cross-border contracts.</div>
            <div className="market-feat"><strong>International compliance</strong> — UAE labour law, UK GDPR, US data handling awareness.</div>
            <div className="market-feat"><strong>Context-specific case studies</strong> — UAE logistics, UK real estate, Australian healthcare.</div>
            <div className="market-price">$400<sub>/month · Growth Plan</sub></div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem-section" id="problem">
        <div>
          <span className="section-tag">The Real Problem</span>
          <h2 className="section-title">Your team is talented. But buried in tasks AI could handle.</h2>
          <p className="section-body">Every hour spent on copy-paste, manual reports, and data entry is an hour not spent on strategy and growth. We've seen it across every industry.</p>
          <br />
          <p className="section-body" style={{ fontSize: "0.9rem" }}><strong style={{ color: "var(--white)" }}>Real example:</strong> A trading company in Mumbai had 3 staff spending 4 hours daily updating Excel from emails and WhatsApp messages. We automated it. Those same staff now handle 3× more client accounts.</p>
        </div>
        <div className="problem-cards">
          {[["📋","Manual Data Entry Hell","Teams spend hours copying data between spreadsheets, emails, and systems — automatable in days."],["⏰","Slow Report Generation","Monthly reports that take hours to compile can be auto-generated and delivered on schedule."],["📨","Lost Leads & Follow-ups","Inquiries that fall through the cracks — an AI can respond, qualify, and route leads 24/7."],["🔍","Data Scattered Everywhere","ERP here, WhatsApp there, email somewhere else. AI can unify, clean, and make data instantly queryable."]].map(([icon,title,desc]) => (
            <div className="problem-card" key={title}><span className="problem-icon">{icon}</span><div><h4>{title}</h4><p>{desc}</p></div></div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="services-header">
          <span className="section-tag">What We Do</span>
          <h2 className="section-title">Six pillars of AI-powered transformation</h2>
          <p className="section-body">Practical, affordable automation — no data science degree required from your team.</p>
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
        <span className="section-tag">Real Use Cases</span>
        <h2 className="section-title">What AI automation looks like in the real world</h2>
        <p className="section-body">Not theory. Actual scenarios from businesses like yours — across India and globally.</p>
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
                <div className="uc-label" style={{ marginTop: "1rem" }}>The AI Solution</div>
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
        <h2 className="section-title">Industries &amp; Departments We Target</h2>
        <p className="section-body">We focus on businesses where manual repetitive work is highest and AI ROI is fastest.</p>
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
        <span className="section-tag">Our Process</span>
        <h2 className="section-title">From pain point to live automation in 3 steps</h2>
        <div className="hiw-steps">
          {[{n:"01",c:"s1",t:"Free AI Audit (30 mins)",d:"We do a free call to understand your current workflows. You leave with a clear automation priority map — even if you don't hire us."},{n:"02",c:"s2",t:"Build & Test (1–2 weeks)",d:"We build your first automation using low-cost, proven tools — n8n, Make.com, GPT-4o. Live prototype within 5–10 business days."},{n:"03",c:"s3",t:"Go Live & Measure ROI",d:"We deploy, monitor, and measure. You see hours saved and cost reduction in real numbers. Happy? We expand to the next automation."}].map(s => (
            <div className="hiw-step" key={s.n}><div className={`step-num ${s.c}`}>{s.n}</div><h3>{s.t}</h3><p>{s.d}</p></div>
          ))}
        </div>
      </section>

      {/* TOOLS */}
      <section className="tools-section" id="tools">
        <div className="tools-intro">
          <div>
            <span className="section-tag">Cost-Smart AI Stack</span>
            <h2 className="section-title">Powerful AI tools. Surprisingly affordable.</h2>
            <p className="section-body">You don't need a ₹50L budget to start with AI. We use a stack that delivers enterprise-grade results at startup prices. Start lean, prove ROI, then scale.</p>
            <br />
            <p className="section-body" style={{ fontSize: "0.88rem", color: "var(--muted)" }}>n8n can be self-hosted on a $5/month server and automate hundreds of workflows — the same capability that costs $500+/month on enterprise tools.</p>
          </div>
          <div className="tools-grid">
            {[["🔧 n8n","FREE*"],["⚙️ Make.com","$9/mo"],["🤖 GPT-4o","Pay/use"],["💬 Voiceflow","Free tier"],["📊 Metabase","FREE"],["📧 Brevo","Free tier"],["🔌 Zapier","$20/mo"],["📦 Supabase","Free tier"],["☁️ Vercel","FREE"]].map(([name,cost]) => (
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
            <p className="pricing-desc">Perfect for one-off automations and quick fixes. Pay only for what you need.</p>
            <ul className="pricing-features">{["Single workflow automation build","Integration with 1–2 apps","Testing & handover documentation","1 week of post-launch support","Free 30-min audit call included"].map(f => <li key={f}>{f}</li>)}</ul>
            <a href="#contact" className="pricing-btn">Start with Hourly →</a>
          </div>
          <div className="pricing-card featured">
            <div className="featured-tag">Most Popular</div>
            <h3>Growth</h3>
            <div className="pricing-dual"><span className="price-usd">$400<sub>/mo</sub></span><span className="price-inr">₹33,000<sub>/mo</sub></span></div>
            <p className="pricing-desc">10–20 hrs/month of dedicated automation + consulting. Best for growing SMEs.</p>
            <ul className="pricing-features">{["Up to 3 workflow automations/month","AI chatbot setup & management","Monthly performance review & ROI report","Priority WhatsApp support","Dedicated solutions consultant","GST invoice for India available"].map(f => <li key={f}>{f}</li>)}</ul>
            <a href="#contact" className="pricing-btn feat-btn">Book Free Audit First →</a>
          </div>
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <div className="pricing-dual"><span className="price-usd" style={{ fontSize: "1.8rem" }}>Custom</span></div>
            <p className="pricing-desc">Full-stack AI transformation for larger businesses with complex workflows.</p>
            <ul className="pricing-features">{["Unlimited workflow scope","Full ERP/CRM/API integration","AI agents & custom LLM builds","Dedicated team pod","SLA-backed delivery","NDAs & enterprise security","International compliance support"].map(f => <li key={f}>{f}</li>)}</ul>
            <a href="#contact" className="pricing-btn">Talk to Us →</a>
          </div>
        </div>
        <div className="pricing-note">Indian clients billed in ₹ with GST invoices · Global clients billed in $ via Stripe or bank transfer</div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="contact-info">
          <span className="section-tag">Let's Talk</span>
          <h3>Get your free AI Audit. No sales pitch. Just insights.</h3>
          <p className="section-body">We'll spend 30 minutes understanding your business and tell you exactly where AI can save you time and money — even if you don't hire us. Zero pressure.</p>
          <br />
          {[{icon:"📧",label:"Email",content:<a href="mailto:launchlayer.techh@gmail.com">launchlayer.techh@gmail.com</a>},{icon:"💬",label:"WhatsApp (India)",content:<a href="https://wa.me/919831014716">+91 98310 14716</a>},{icon:"🌐",label:"Serving",content:<span style={{color:"var(--text)",fontSize:"0.9rem"}}>India · UAE · UK · USA · Australia</span>}].map(item => (
            <div className="contact-item" key={item.label}>
              <div className="contact-icon">{item.icon}</div>
              <div className="contact-detail"><h5>{item.label}</h5>{item.content}</div>
            </div>
          ))}
          <div className="avail-badge"><span className="avail-dot" />Currently accepting new projects</div>
        </div>
        <div className="contact-form">
          <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--white)", marginBottom: "1.5rem" }}>Book your free AI Audit</h4>
          <div className="form-row">
            <div className="form-group"><label>Your Name</label><input type="text" placeholder="Rahul Sharma" /></div>
            <div className="form-group"><label>Business Name</label><input type="text" placeholder="Sharma Exports Pvt Ltd" /></div>
          </div>
          <div className="form-group"><label>Email</label><input type="email" placeholder="rahul@company.com" /></div>
          <div className="form-group">
            <label>Industry</label>
            <select>
              <option value="">Select your industry...</option>
              {["Manufacturing & Supply Chain","E-Commerce / D2C","Healthcare / Clinic","Finance / CA / Legal","Real Estate","EdTech / Coaching","Logistics / 3PL","HR / Recruitment","Other"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Preferred billing</label>
            <select>
              <option value="">Select...</option>
              <option>INR — ₹ with GST invoice (India)</option>
              <option>USD — $ via Stripe or bank transfer (Global)</option>
            </select>
          </div>
          <div className="form-group"><label>What's your biggest time-wasting manual process?</label><textarea placeholder="e.g. We manually copy data from emails to Excel every day, takes 3 hours..." /></div>
          <button className="btn-primary" style={{ width: "100%", border: "none", fontSize: "1rem", padding: "0.9rem", cursor: "pointer" }} onClick={handleSubmit}>Book Free 30-min Audit →</button>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box">
          <h2>The AI layer your business was missing.</h2>
          <div className="cta-tagline">Work Less. Automate More. Grow Faster.</div>
          <p>Join businesses across India and the globe that have replaced manual work with AI that actually delivers ROI — in weeks, not years.</p>
          <a href="#contact" className="btn-primary" style={{ display: "inline-block" }}>Book Free AI Audit →</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-brand">
          <h3>LaunchLayer</h3>
          <div className="footer-tagline">Work Less. Automate More. Grow Faster.</div>
          <p>AI automation agency serving Indian SMEs and global businesses. We replace manual work with intelligent workflows — the AI layer your business was missing.</p>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>{["AI Workflow Automation","AI Chatbots","Reporting & Analytics","Document Intelligence","Systems Integration","Lead Gen Automation"].map(s => <li key={s}><a href="#services">{s}</a></li>)}</ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#why-launchlayer">Why LaunchLayer</a></li>
            <li><a href="#markets">Our Markets</a></li>
            <li><a href="#use-cases">Case Studies</a></li>
            <li><a href="#how-it-works">Our Process</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:launchlayer.techh@gmail.com">launchlayer.techh@gmail.com</a></li>
            <li><a href="https://wa.me/919831014716">WhatsApp India</a></li>
            <li><a href="#contact">Book a Call</a></li>
            <li>
              <Link to="/blog" className="footer-link">Blog Agent</Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <p>© 2026 LaunchLayer · "The AI Layer Your Business Was Missing."</p>
        <span className="footer-serving">Serving India · UAE · UK · USA · Australia</span>
      </div>
    </>
  );
}
