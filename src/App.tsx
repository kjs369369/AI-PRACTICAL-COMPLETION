/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  User, 
  Video, 
  FileText, 
  MessageSquare, 
  ExternalLink, 
  Chrome, 
  Gift, 
  BookOpen, 
  Download, 
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  Globe,
  Youtube
} from 'lucide-react';

// --- Types ---
interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}

// --- Components ---

const GlassCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl ${className}`}
  >
    {children}
  </motion.div>
);

const Section = ({ title, icon, children, id }: SectionProps) => (
  <section id={id} className="py-16 px-4 max-w-7xl mx-auto">
    <div className="flex items-center gap-3 mb-10">
      <div className="p-3 bg-royal-blue rounded-lg text-white">
        {icon}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase italic">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const LinkButton = ({ href, label, icon: Icon, variant = 'primary' }: { href: string, label: string, icon?: any, variant?: 'primary' | 'secondary' | 'outline' }) => {
  const baseStyles = "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-500/30",
    secondary: "bg-royal-blue text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30",
    outline: "border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
  };

  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variants[variant]}`}
    >
      {Icon && <Icon size={18} />}
      {label}
      <ExternalLink size={14} className="opacity-50" />
    </motion.a>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '과정안내', id: 'info' },
    { name: '녹화본/요약', id: 'recordings' },
    { name: '강의자료', id: 'materials' },
    { name: '도구/확장', id: 'tools' },
    { name: '후기선물', id: 'gift' },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500 selection:text-white font-sans overflow-x-hidden">
      {/* Background Kinetic Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-royal-blue/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-lg py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter italic flex items-center gap-2"
          >
            <span className="text-red-600">AI</span> 실무 완성
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className="text-sm font-medium hover:text-red-500 transition-colors uppercase tracking-widest"
              >
                {item.name}
              </a>
            ))}
            <LinkButton href="https://vizskill-forge.lovable.app" label="후기선물" variant="primary" />
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navItems.map((item) => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold uppercase italic"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-6">
                <LinkButton href="https://vizskill-forge.lovable.app" label="후기선물" variant="primary" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Kinetic Typography */}
      <header className="relative h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none uppercase italic mb-6">
            AI <span className="text-red-600">PRACTICAL</span><br />
            COMPLETION
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-widest text-white/70 mb-10 uppercase">
            실무 완성 클래스 1기 — AICLab 김진수 소장
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 cursor-pointer">
              <Calendar size={20} />
              2026. 03. 21 / 04. 04
            </motion.div>
            <LinkButton href="https://kinetic-mind-flow.lovable.app/" label="과정안내 바로가기" variant="secondary" icon={ArrowRight} />
          </div>
        </motion.div>

        {/* Floating Text Background */}
        <div className="absolute inset-0 overflow-hidden select-none opacity-5 pointer-events-none flex flex-col justify-around">
          <div className="text-[20vh] font-black whitespace-nowrap animate-marquee">AI WORKSHOP AI WORKSHOP AI WORKSHOP AI WORKSHOP</div>
          <div className="text-[20vh] font-black whitespace-nowrap animate-marquee-reverse text-red-600">PRACTICAL SKILLS PRACTICAL SKILLS PRACTICAL SKILLS</div>
          <div className="text-[20vh] font-black whitespace-nowrap animate-marquee">AICLAB KIM JIN SU AICLAB KIM JIN SU AICLAB KIM JIN SU</div>
        </div>
      </header>

      {/* Instructor Section */}
      <Section title="Instructor" icon={<User />} id="instructor">
        <GlassCard className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-red-600 to-royal-blue flex items-center justify-center text-5xl font-black italic">
            KJ
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-bold mb-2">김진수 소장</h3>
            <p className="text-white/60 mb-6 text-lg">AICLab 소장 | AI 실무 전문가</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <LinkButton href="https://www.aiclab.kr/" label="강사 소개 링크" variant="outline" icon={Globe} />
              <div className="flex items-center gap-4 text-white/50 text-sm">
                <span className="flex items-center gap-1"><Phone size={14} /> 010-8921-9536</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* Recordings & Summaries */}
      <Section title="Recordings & Summaries" icon={<Video />} id="recordings">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: "1회차-01", 
              video: "https://youtu.be/f5sECfdtjNc", 
              summary: "https://lilys.ai/digest/8688097/9826443?s=1&noteVersionId=6304180&include_suggestion=true" 
            },
            { 
              title: "1회차-02", 
              video: "https://youtu.be/1Z68TbMHi1Q", 
              summary: "https://lilys.ai/digest/8688104/9827420?s=1&noteVersionId=6305194&include_suggestion=true" 
            },
            { 
              title: "1회차-03", 
              video: "https://youtu.be/falU6N09iTw", 
              summary: "https://lilys.ai/digest/8688105/9827446?s=1&noteVersionId=6305221&include_suggestion=true" 
            }
          ].map((item, idx) => (
            <GlassCard key={idx} className="flex flex-col gap-4">
              <h4 className="text-xl font-bold text-red-500">{item.title}</h4>
              <div className="flex flex-col gap-2">
                <LinkButton href={item.video} label="녹화본 보기" variant="outline" icon={Youtube} />
                <LinkButton href={item.summary} label="요약본 보기" variant="outline" icon={FileText} />
              </div>
            </GlassCard>
          ))}
        </div>
        <div className="mt-8">
          <GlassCard className="flex flex-col md:flex-row items-center justify-between gap-6 bg-royal-blue/20">
            <div className="flex items-center gap-4">
              <MessageSquare className="text-royal-blue" size={32} />
              <div>
                <h4 className="text-xl font-bold">강의 채팅 로그</h4>
                <p className="text-white/60">실시간 질의응답 및 소통 기록</p>
              </div>
            </div>
            <LinkButton href="https://docs.google.com/document/d/1w8vE9LJXEXZoioK4a6TvDg5yaGMB9gru12g8oyuHVVU/edit?usp=sharing" label="구글 문서 확인" variant="secondary" />
          </GlassCard>
        </div>
      </Section>

      {/* Materials & Resources */}
      <Section title="Materials & Resources" icon={<BookOpen />} id="materials">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard className="border-l-4 border-l-red-600">
            <h4 className="text-2xl font-bold mb-4">프롬프트 실습 자료</h4>
            <p className="text-white/60 mb-6">주제탐색, 설정, 분석, 질문설계, 시각화 연계 프롬프트</p>
            <LinkButton href="https://ai-workshop-guide-six.vercel.app/" label="실습 웹페이지" variant="primary" />
          </GlassCard>
          
          <GlassCard className="border-l-4 border-l-royal-blue">
            <h4 className="text-2xl font-bold mb-4">노트북LM 실습</h4>
            <p className="text-white/60 mb-6">실습용 프롬프트 및 AI 활용 가이드</p>
            <div className="flex flex-col gap-3">
              <LinkButton href="https://prompt-craft-studio-493.lovable.app/" label="프롬프트 웹페이지" variant="secondary" />
              <LinkButton href="https://notebooklm.google/" label="NotebookLM 바로가기" variant="outline" />
            </div>
          </GlassCard>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard>
            <h5 className="font-bold mb-3 flex items-center gap-2"><ArrowRight size={16} /> 채팅결과 사례</h5>
            <LinkButton href="https://chatgpt.com/share/69be2cc6-8e14-8002-8c76-23704303b118" label="ChatGPT 사례" variant="outline" />
          </GlassCard>
          <GlassCard>
            <h5 className="font-bold mb-3 flex items-center gap-2"><ArrowRight size={16} /> 슬라이드 설계 데이터</h5>
            <LinkButton href="https://docs.google.com/document/d/1ARBoAEm8wAorQVTLZic5RNF3AVwWqHeTuTIm2zMM-Ls/edit?usp=sharing" label="더미데이터 20개" variant="outline" />
          </GlassCard>
          <GlassCard>
            <h5 className="font-bold mb-3 flex items-center gap-2"><ArrowRight size={16} /> 엔트로픽 무료 강의</h5>
            <div className="flex flex-col gap-2">
              <LinkButton href="https://news.hada.io/topic?id=27118" label="강의 사이트 안내" variant="outline" />
              <LinkButton href="https://anthropic.skilljar.com/claude-101" label="Claude 101" variant="outline" />
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* Chrome Extensions & Tools */}
      <Section title="Chrome Extensions & Tools" icon={<Chrome />} id="tools">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "ChatGPT to PDF", url: "https://chromewebstore.google.com/detail/chatgpt-to-pdf-by-pdfcrow/ccjfggejcoobknjolglgmfhoeneafhhm" },
            { name: "NotebookLM 웹 가져오기", url: "https://chromewebstore.google.com/detail/notebooklm-web-importer/ijdefdijdmghafocfmmdojfghnpelnfn?utm_source=item-share-cb" },
            { name: "YouTube to NotebookLM", url: "https://chromewebstore.google.com/detail/youtube-to-notebooklm/kobncfkmjelbefaoohoblamnbackjggk?utm_source=item-share-cb" },
            { name: "NotebookLM Link Automator", url: "https://chromewebstore.google.com/detail/notebooklm-youtube-link-s/idkdddfdfhlgjleoieidjhmgmopacdli?utm_source=item-share-cb" },
            { name: "NotebookLM AI Sidebar", url: "https://chromewebstore.google.com/detail/notebooklm-ai-sidebar/dgenbagabmmjpfjlbcnnlmpopipdapjo?utm_source=item-share-cb" },
            { name: "NotebookLM Tools", url: "https://chromewebstore.google.com/detail/notebooklm-tools/hiibkpjljigehlnnecbgehkhfibmahjn?utm_source=item-share-cb" },
            { name: "BananaNL", url: "https://chromewebstore.google.com/detail/%F0%9F%8D%8C-banananl/mjennffndagebhgcbeblffhgooohling" },
          ].map((ext, idx) => (
            <motion.a 
              key={idx}
              href={ext.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="p-4 border border-white/10 rounded-xl flex justify-between items-center group"
            >
              <span className="font-medium group-hover:text-red-500 transition-colors">{ext.name}</span>
              <Download size={16} className="opacity-30 group-hover:opacity-100" />
            </motion.a>
          ))}
        </div>

        <div className="mt-12">
          <h4 className="text-2xl font-bold mb-6 italic uppercase tracking-tighter">Skills Marketplace & More</h4>
          <div className="flex flex-wrap gap-4">
            <LinkButton href="https://github.com/anthropics/skills?tab=readme-ov-file" label="Anthropic Skills GitHub" variant="outline" />
            <LinkButton href="https://skills.sh/" label="Skills.sh" variant="outline" />
            <LinkButton href="https://skillsmp.com/" label="SkillsMP" variant="outline" />
            <LinkButton href="https://www.skillhub.club/" label="SkillHub" variant="outline" />
            <LinkButton href="https://www.genspark.ai/invite_member?invite_code=NDUxYzk1YjNMYWJmOUw1ZWQzTGIxNDBMYmYxNTg1N2E0ZjM4" label="Genspark 초대 (1,000크레딧)" variant="secondary" />
          </div>
        </div>
      </Section>

      {/* Special Gift Section */}
      <Section title="Special Gift" icon={<Gift />} id="gift">
        <GlassCard className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[80px] -mr-32 -mt-32 group-hover:bg-red-600/40 transition-all duration-700" />
          <div className="relative z-10 text-center py-10">
            <h3 className="text-4xl md:text-6xl font-black italic uppercase mb-6 tracking-tighter">
              후기 선물을 <span className="text-red-600">준비했어요!</span>
            </h3>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              특강 요약본, 핵심 프롬프트, 필수 도구 모음, 창업 시장 트렌드 분석 프로세스까지 모두 담았습니다.
            </p>
            <LinkButton href="https://vizskill-forge.lovable.app" label="후기 선물 페이지 바로가기" variant="primary" />
          </div>
        </GlassCard>
      </Section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="text-3xl font-black tracking-tighter italic mb-6">
              AIC<span className="text-red-600">Lab</span>
            </div>
            <p className="text-white/50 max-w-md mb-8">
              인공지능 실무 교육의 새로운 패러다임. 
              주제탐색부터 시각화까지, AI를 활용한 실무 완성 프로세스를 제안합니다.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Youtube size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Globe size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Mail size={18} /></a>
            </div>
          </div>
          <div className="flex flex-col md:items-end justify-center">
            <div className="text-right">
              <h5 className="text-lg font-bold mb-4 uppercase tracking-widest text-red-600">Contact & Inquiry</h5>
              <p className="text-2xl font-bold mb-2">AICLab 김진수 소장</p>
              <p className="text-white/60 text-xl mb-4">010-8921-9536</p>
              <p className="text-white/40 text-sm">© 2026 AICLab. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          display: inline-block;
          animation: marquee-reverse 40s linear infinite;
        }
        .bg-royal-blue {
          background-color: #0048BA;
        }
        .text-royal-blue {
          color: #0048BA;
        }
      `}</style>
    </div>
  );
}
