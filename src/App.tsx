/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ChevronRight, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ArrowRight, 
  CheckCircle2, 
  Brain, 
  Zap, 
  Users, 
  Shield, 
  Target, 
  TrendingUp, 
  MessageSquare,
  Eye,
  Cpu,
  Lock,
  ArrowUpRight,
  Quote,
  BookOpen
} from 'lucide-react';
import mermaid from 'mermaid';

// --- Types ---
interface NavItem {
  label: string;
  href: string;
}

// --- Components ---

const Navbar = ({ isDark, toggleDark, onOpenModal }: { isDark: boolean; toggleDark: () => void; onOpenModal: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: '首页', href: '#home' },
    { label: '产品价值', href: '#value' },
    { label: '应用场景', href: '#scenarios' },
    { label: '核心能力', href: '#capabilities' },
    { label: '常见问题', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg py-4 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white dark:bg-black rounded-full" />
          </div>
          <span className="text-xl font-bold tracking-tighter font-serif">TrueSelf</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-sm font-medium hover:text-blue-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button 
            onClick={toggleDark}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={onOpenModal}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full text-sm font-bold hover:opacity-80 transition-all"
          >
            预约演示
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleDark}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-neutral-900 border-b dark:border-neutral-800 p-6 flex flex-col gap-4 md:hidden"
          >
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium"
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={onOpenModal}
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-bold mt-4"
            >
              预约演示
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            面向关键人物的数字分身系统
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-8">
            不是复制你的话，<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              而是复制你的判断。
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-xl leading-relaxed">
            真我 Agent（TrueSelf）将你的价值观、决策逻辑、表达风格与思维方式，沉淀为一个可调用、可协同、可进化的 AI Agent。
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onOpenModal}
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform group"
            >
              立即体验 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onOpenModal}
              className="border border-neutral-200 dark:border-neutral-800 px-8 py-4 rounded-full font-bold hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              预约 1 对 1 演示
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-8 text-sm font-medium text-neutral-500">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> 持续在线</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> 高度拟真</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> 持续进化</span>
          </div>
        </motion.div>

        <motion.div 
          style={{ y: y1, opacity }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse" />
            <div className="absolute inset-4 border border-neutral-200 dark:border-neutral-800 rounded-full" />
            <div className="absolute inset-12 border border-neutral-200 dark:border-neutral-800 rounded-full opacity-50" />
            
            {/* Abstract "Self" Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-80 bg-neutral-200 dark:bg-neutral-800 rounded-full mix-blend-overlay opacity-50 blur-2xl" />
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="relative z-10 w-48 h-48 bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl flex items-center justify-center border dark:border-neutral-800"
              >
                <Brain size={64} className="text-blue-500" />
              </motion.div>
              
              {/* Floating elements */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border dark:border-neutral-800 flex items-center justify-center"
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.sin(i) * 20, 0]
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + (i % 2) * 60}%`
                  }}
                >
                  {i === 0 && <Zap size={20} className="text-yellow-500" />}
                  {i === 1 && <MessageSquare size={20} className="text-green-500" />}
                  {i === 2 && <Shield size={20} className="text-red-500" />}
                  {i === 3 && <Users size={20} className="text-purple-500" />}
                  {i === 4 && <TrendingUp size={20} className="text-blue-500" />}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 glass-card p-6 rounded-2xl max-w-[240px]">
            <p className="text-sm italic font-serif leading-relaxed">
              "让 AI 更像你，而不是让你更像 AI。"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const BrandVision = () => {
  return (
    <section className="section-padding bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-12 leading-tight">
            我们相信，AI 时代最重要的，<br />
            不是更像机器，而是让机器更像你。
          </h2>
          <div className="space-y-6 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed text-left md:text-center">
            <p>
              每一个真正卓越的创始人、CEO、投资人、专家与高价值个体，最有价值的从来不是信息本身，而是他看待世界的方式、做出判断的逻辑，以及影响他人的能力。
            </p>
            <p>
              过去，这些最珍贵的能力只能存在于个人身上，难以被沉淀，难以被传承，也难以被组织真正调用。
            </p>
            <p className="font-bold text-neutral-900 dark:text-white">
              而在 AI 时代，那些没有被数字化的经验，会逐渐流失；那些没有被结构化的判断，将无法被放大。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProductDefinition = () => {
  const cards = [
    {
      title: "认知沉淀",
      desc: "把隐性的经验、价值观与决策逻辑，沉淀为结构化资产。",
      icon: <Brain className="text-blue-500" />
    },
    {
      title: "影响力放大",
      desc: "让你的判断力在不同场景中并行工作，实现影响力的指数级放大。",
      icon: <Zap className="text-yellow-500" />
    },
    {
      title: "组织传承",
      desc: "将关键人物的决策模型转化为组织资产，不因人员流动而流失。",
      icon: <Target className="text-purple-500" />
    }
  ];

  return (
    <section id="value" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card p-10 rounded-3xl group hover:border-blue-500/50 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyNow = () => {
  const reasons = [
    {
      title: "内容不再稀缺，判断才稀缺",
      desc: "当所有人都能用 AI 批量生成内容时，真正拉开差距的是你独特的价值观与判断力。"
    },
    {
      title: "没有被数字化的能力，无法被放大",
      desc: "如果你的经验只能存在于你自己身上，它就无法规模化，无法传承，也无法形成复利。"
    },
    {
      title: "未来的竞争，是“人 + Agent”的竞争",
      desc: "未来最强的个人与组织，不是最努力的，而是最早把关键人物能力系统化的人。"
    },
    {
      title: "认知资产会成为新的核心资产",
      desc: "未来最值钱的，不只是数据、流量，而是能对这些数据进行高质量判断的认知模型。"
    }
  ];

  return (
    <section id="why" className="section-padding bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-3xl md:text-7xl font-serif font-bold tracking-tighter">
            为什么是现在？
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <div key={i} className="p-8 border border-neutral-800 rounded-3xl hover:bg-neutral-900 transition-colors">
              <div className="text-neutral-500 font-mono mb-8">0{i+1}</div>
              <h3 className="text-xl font-bold mb-4">{r.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Scenarios = () => {
  const scenarios = [
    {
      title: "你无法事事亲自到场",
      desc: "你不可能参与每一场会议、每一次沟通。但你的风格、标准与逻辑，应该始终在线。",
      summary: "让你的判断持续在场，而不是只能等你出现。"
    },
    {
      title: "团队总听懂你的话，却做不出你的决策",
      desc: "团队往往学会了复述观点，却没有真正学会你的判断框架与取舍逻辑。",
      summary: "把你的经验，从“你知道”变成“团队会用”。"
    },
    {
      title: "你的个人影响力难以规模化输出",
      desc: "内容、演讲、观点都依赖本人，团队很难稳定复制你的表达风格与说服路径。",
      summary: "让你的表达从手工模式，升级为系统化放大。"
    },
    {
      title: "组织需要传承，而不是只靠记忆",
      desc: "创始人的管理哲学、价值观与关键判断，不应在时间中逐渐流失。",
      summary: "把关键人物能力，沉淀为组织真正可继承的资产。"
    }
  ];

  return (
    <section id="scenarios" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            当这些场景发生时，<br />你会真正需要一个真我 Agent。
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {scenarios.map((s, i) => (
            <div key={i} className="group p-10 rounded-3xl border dark:border-neutral-800 hover:shadow-2xl transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-sm">{i+1}</span>
                  {s.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border-l-4 border-blue-500">
                <p className="font-bold text-neutral-900 dark:text-white">{s.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Capabilities = () => {
  const modules = [
    { title: "价值观与身份对齐", icon: <Brain />, desc: "从使命感、身份认同到长期主义原则，让系统先理解你的底层立场。" },
    { title: "观察方式与趋势敏感度", icon: <Eye />, desc: "学习你的信息偏好、行业敏感点、识人标准与机会判断方式。" },
    { title: "决策逻辑与权衡模型", icon: <Cpu />, desc: "从第一性原理到底线逻辑，帮助系统更接近你的判断路径。" },
    { title: "语言风格与说服路径", icon: <MessageSquare />, desc: "保留你的词汇习惯、表达结构与情绪张力，让内容更像你本人。" },
    { title: "边界控制与风险约束", icon: <Lock />, desc: "越像你，越需要边界。知道什么不能说、什么不能做。" }
  ];

  return (
    <section id="capabilities" className="section-padding bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">真我 Agent 如何构建“像你”的数字分身？</h2>
        </div>

        <div className="flex flex-col gap-6">
          {modules.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-8 p-8 glass-card rounded-3xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0">
                {m.icon}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">{m.title}</h3>
                <p className="text-neutral-500">{m.desc}</p>
              </div>
              <div className="hidden lg:block text-neutral-300 dark:text-neutral-700 font-serif text-6xl italic">
                0{i+1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Visualization = ({ isDark }: { isDark: boolean }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (chartRef.current) {
        try {
          // Initialize mermaid with current theme
          mermaid.initialize({ 
            startOnLoad: false, 
            theme: 'base',
            themeVariables: {
              fontFamily: 'Noto Serif SC',
              fontSize: '15px',
              primaryColor: '#C5A365',
              primaryTextColor: '#ffffff',
              secondaryColor: '#C5A3651A',
              secondaryTextColor: '#ffffff',
              tertiaryColor: '#C5A365',
              tertiaryTextColor: '#ffffff',
              primaryBorderColor: '#C5A365',
              lineColor: '#C5A365',
              textColor: '#ffffff',
              mainBkg: 'transparent',
              nodeBorder: '#C5A365',
              clusterBkg: 'transparent',
              clusterBorder: '#C5A365',
              edgeLabelBackground: 'transparent',
              nodeTextColor: '#ffffff'
            },
            securityLevel: 'loose',
          });

          const id = `mermaid-svg-${Math.random().toString(36).substring(2, 11)}`;
          const { svg } = await mermaid.render(id, `
            graph TD
              Human["👤 关键人物 (人类本体)"] --> |结构化访谈与语料提炼| Core{"真我 Agent 五层架构"}
              
              Core --> Heart["❤️ 一层：价值观与身份对齐"]
              Core --> Eye["👁️ 二层：趋势敏感度建模"]
              Core --> Brain["🧠 三层：决策逻辑与权衡"]
              Core --> Mouth["💬 四层：语言风格复现"]
              Core --> Shield["🛡️ 五层：边界与风险约束"]
              
              Heart & Eye & Brain & Mouth & Shield --> Twin["♾️ 高保真数字分身"]
              Twin --> Asset["💎 跨越物理时间的组织认知资产"]
              
              classDef default fill:none,stroke:#C5A365,stroke-width:1px,rx:8px,ry:8px;
              classDef primary fill:#C5A3651A,stroke:#C5A365,stroke-width:2px,rx:8px,ry:8px;
              
              class Human,Asset primary;
          `);
          chartRef.current.innerHTML = svg;
        } catch (error) {
          console.error("Mermaid render error:", error);
          chartRef.current.innerHTML = `<p class="text-red-500">可视化加载失败，请刷新页面重试。</p>`;
        }
      }
    };
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(renderChart, 100);
    return () => clearTimeout(timer);
  }, [isDark]);

  return (
    <section id="how" className="py-24 bg-neutral-900 text-white dark:bg-black transition-colors duration-500 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#C5A365 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">五层漏斗认知架构</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto font-light">
            如何构建“像你”的数字分身？我们从底层价值观到表层表达，建立了一套严格的系统架构。
          </p>
        </div>

        {/* Mermaid 关系图 */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-8 flex justify-center overflow-x-auto">
          <div ref={chartRef} className="text-center w-full min-w-[600px]" />
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "真我 Agent 和普通 AI 助手有什么区别？", a: "普通 AI 助手主要基于通用模型提供标准化回答。真我 Agent 更关注对关键人物的价值观、判断逻辑、表达风格与决策模型进行深度建模。" },
    { q: "真我 Agent 会不会替代本人？", a: "不会。真我 Agent 的核心价值不是替代，而是放大。它帮助用户减少重复消耗、沉淀关键能力，但最终关键判断仍然属于本人。" },
    { q: "适合哪些类型的用户？", a: "尤其适合创始人、CEO、企业家、投资人、高层管理者、个人 IP、顾问、教练及需要进行经验传承的关键角色。" },
    { q: "如何保证内容边界与安全性？", a: "真我 Agent 在构建过程中会加入明确的价值边界、表达边界与风险约束机制，确保系统在“像你”的同时，也具备可控性与安全性。" }
  ];

  return (
    <section id="faq" className="section-padding bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-12 text-center">常见问题</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <span className="font-bold">{faq.q}</span>
                <ChevronRight className={`transition-transform ${openIndex === i ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-neutral-500 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-black text-white rounded-[3rem] p-12 md:p-24 overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">
              把你最值钱的部分，<br />沉淀成 AI 时代的长期资产。
            </h2>
            <p className="text-neutral-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              不是每个人都需要一个真我 Agent。但每一个希望放大自己、传承自己、让组织真正理解自己的人，都值得拥有一个属于自己的数字分身系统。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={onOpenModal}
                className="bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform"
              >
                立即体验
              </button>
              <button 
                onClick={onOpenModal}
                className="border border-white/20 px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                预约专属咨询
              </button>
            </div>
            <p className="mt-8 text-sm text-neutral-500">限量开放首批深度共创席位</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FurtherReading = () => {
  const books = [
    { title: "《第二大脑》", author: "Tiago Forte", desc: "关于如何构建个人知识管理系统，是认知沉淀的基础。" },
    { title: "《原则》", author: "Ray Dalio", desc: "将决策逻辑结构化的最佳实践，与真我 Agent 理念高度契合。" },
    { title: "《AI 时代的人类价值》", author: "相关论文/书籍", desc: "探讨在机器智能普及时代，人类独特判断力的不可替代性。" },
    { title: "《数字分身：未来生存指南》", author: "趋势研究", desc: "分析数字分身技术对个人影响力和社会结构的深远影响。" },
    { title: "《组织传承与文化底座》", author: "管理学经典", desc: "探讨如何将创始人精神转化为组织制度与文化资产。" }
  ];

  return (
    <section className="section-padding border-t dark:border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <BookOpen className="text-blue-500" />
          <h2 className="text-2xl font-serif font-bold">延伸阅读</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, i) => (
            <div key={i} className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800">
              <h3 className="font-bold mb-2">{book.title}</h3>
              <p className="text-xs text-neutral-400 mb-4">{book.author}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{book.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 pt-20 pb-10 border-t dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-full" />
              <span className="text-2xl font-bold font-serif">TrueSelf 真我 Agent</span>
            </div>
            <p className="text-neutral-500 max-w-sm mb-8">
              让 AI 更像你。你的判断，不该只存在于你本人身上。
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">导航</h4>
            <ul className="space-y-4 text-neutral-500 text-sm">
              <li><a href="#home" className="hover:text-blue-500">首页</a></li>
              <li><a href="#value" className="hover:text-blue-500">产品价值</a></li>
              <li><a href="#scenarios" className="hover:text-blue-500">应用场景</a></li>
              <li><a href="#faq" className="hover:text-blue-500">常见问题</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">联系我们</h4>
            <ul className="space-y-4 text-neutral-500 text-sm">
              <li>邮箱: contact@trueself.cn</li>
              <li>微信: Trueself_Agent</li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400">
          <p>© 2026 TrueSelf Agent. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">隐私政策</a>
            <a href="#" className="hover:underline">用户协议</a>
            <a href="#" className="hover:underline">版权声明</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-[2rem] p-8 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold mb-2">预约专属演示</h3>
              <p className="text-neutral-500 text-sm mb-8">扫描二维码或通过以下方式联系我们</p>
              
                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl mb-8 flex justify-center">
                <img 
                  src="/qrcode.png" 
                  alt="Contact QR Code" 
                  className="w-48 h-48 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest">微信</p>
                    <p className="font-bold">Trueself_Agent</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest">邮箱</p>
                    <p className="font-bold">contact@trueself.cn</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen font-sans">
      <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} onOpenModal={() => setIsModalOpen(true)} />
      
      <main>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <BrandVision />
        <ProductDefinition />
        <WhyNow />
        <Scenarios />
        <Capabilities />
        <Visualization isDark={isDark} />
        
        {/* Simplified Process Section */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-16 text-center">如何拥有你的真我 Agent？</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "深度认知采样", desc: "结构化访谈与语料分析，提取价值观与思维框架。" },
                { step: "02", title: "知识提取建模", desc: "将零散经验转化为结构化认知资产。" },
                { step: "03", title: "场景化部署", desc: "围绕团队协同与内容输出进行适配。" },
                { step: "04", title: "一致性进化", desc: "持续校准，让系统不断贴近真实的你。" }
              ].map((item, i) => (
                <div key={i} className="relative p-8 rounded-3xl border dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                  <div className="text-4xl font-serif font-bold text-blue-500/20 mb-4">{item.step}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                  {i < 3 && <ChevronRight className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-neutral-300" />}
                </div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform"
              >
                预约顾问咨询
              </button>
            </div>
          </div>
        </section>

        <FAQ />
        <FurtherReading />
        <CTA onOpenModal={() => setIsModalOpen(true)} />
      </main>

      <Footer />
      
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
