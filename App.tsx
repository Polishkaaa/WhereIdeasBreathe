import React, { useState, useEffect, useRef } from 'react';
import { Mail, MessageSquare, TrendingUp, BarChart3, Users, Edit3, Target, Zap, Award, Clock, CheckCircle, Home, X, ExternalLink, Star, Activity, Brain, Lightbulb, Code, PenTool, ArrowRight, Sparkles, MousePointer2 } from 'lucide-react';

export default function App() {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [clickEffect, setClickEffect] = useState({ x: 0, y: 0, show: false });
  const [typingText, setTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  const fullText = "Telegram Content Producer";

  const channels = [
    {
      name: "WB Insider",
      subscribers: "30K",
      description: "Секреты продаж на Wildberries",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop&crop=center",
      url: "https://t.me/wb_insider_volt",
      fullDescription: "Эксклюзивные инсайты и стратегии для продавцов на Wildberries. Разбираем кейсы, делимся секретами ранжирования и методами увеличения продаж.",
      stats: {
        growth: "400% за год",
        engagement: "18%",
        posts: "250+ постов"
      }
    },
    {
      name: "VoltAbuz", 
      subscribers: "12K",
      description: "Контент и продюсирование",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop&crop=center",
      url: "https://t.me/voltabuz",
      fullDescription: "Авторский канал о создании контента, продюсировании и развитии личного бренда. Практические советы от опытного контент-мейкера.",
      stats: {
        growth: "200% за 8 месяцев",
        engagement: "15%",
        posts: "180+ постов"
      }
    },
    {
      name: "Durov Projects",
      subscribers: "500K+",
      description: "Официальные каналы Telegram",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop&crop=center",
      url: "https://t.me/durov",
      fullDescription: "Работа над контент-стратегией официальных каналов Telegram. Опыт создания контента для аудитории в полмиллиона человек.",
      stats: {
        growth: "Стабильный рост",
        engagement: "25%",
        posts: "Конфиденциально"
      }
    },
    {
      name: "Tech Analytics",
      subscribers: "18K",
      description: "Аналитика и тренды",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&crop=center",
      url: "https://t.me/tech_analytics_volt",
      fullDescription: "Глубокая аналитика технологических трендов, обзоры стартапов и инсайты из мира технологий. Еженедельные дайджесты и прогнозы.",
      stats: {
        growth: "150% за 6 месяцев",
        engagement: "12%",
        posts: "120+ постов"
      }
    }
  ];

  const skills = [
    {
      name: "Контент-стратегия",
      level: 100,
      icon: <Brain className="w-5 h-5" />,
      description: "Разработка долгосрочных стратегий контента, анализ аудитории и планирование контент-плана"
    },
    {
      name: "TGStat & Аналитика",
      level: 90,
      icon: <BarChart3 className="w-5 h-5" />,
      description: "Работа с TGStat, анализ метрик, A/B тестирование и оптимизация контента"
    },
    {
      name: "Копирайтинг",
      level: 95,
      icon: <PenTool className="w-5 h-5" />,
      description: "Создание продающих текстов, адаптация тона под аудиторию, сторителлинг"
    },
    {
      name: "Дизайн & Figma",
      level: 75,
      icon: <Code className="w-5 h-5" />,
      description: "Создание визуального контента, работа с Figma, базовый UI/UX дизайн"
    },
    {
      name: "SMM & Продвижение",
      level: 80,
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Органическое продвижение, кросс-промо, работа с блогерами и инфлюенсерами"
    },
    {
      name: "Продюсирование",
      level: 85,
      icon: <Lightbulb className="w-5 h-5" />,
      description: "Управление проектами, координация команды, планирование контент-стратегии"
    }
  ];

  // Typing animation effect
  useEffect(() => {
    if (typingIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypingText(fullText.slice(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, fullText]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Click effect
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickEffect({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true
    });
    setTimeout(() => setClickEffect(prev => ({ ...prev, show: false })), 600);
  };

  // Intersection Observer для анимаций
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const isVisible = (sectionId) => visibleSections.has(sectionId);

  return (
    <div className="min-h-screen bg-[#111111] text-[#FAFAFA] font-sans relative overflow-hidden">
      {/* Animated cursor follower */}
      <div 
        className="fixed w-6 h-6 border-2 border-[#7C83FF]/30 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: isHovering ? 'scale(2)' : 'scale(1)',
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#7C83FF]/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Enhanced background pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, #7C83FF 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, #7C83FF 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, #7C83FF 1px, transparent 1px),
            linear-gradient(45deg, transparent 48%, #7C83FF 49%, #7C83FF 51%, transparent 52%)
          `,
          backgroundSize: '400px 400px, 350px 350px, 450px 450px, 100px 100px',
          backgroundPosition: '0 0, 100px 100px, 200px 200px, 0 0'
        }}></div>
      </div>

      {/* Hero Section - Moved up without avatar */}
      <section className="px-6 py-12 text-center relative z-10" data-animate id="hero">
        <div className={`max-w-sm mx-auto transition-all duration-1000 ${isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Animated accent line */}
          <div className="relative mx-auto mb-8">
            <div className="w-1 h-16 bg-gradient-to-b from-transparent via-[#7C83FF] to-transparent mx-auto animate-pulse"></div>
            <Sparkles className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 text-[#7C83FF] animate-spin" style={{animationDuration: '3s'}} />
          </div>
          
          <h1 className="text-3xl mb-2 animate-pulse">
            Максим Васильев
          </h1>
          <div className="text-[#7C83FF] text-lg mb-2 hover:scale-110 transition-transform duration-300">
            Volt26
          </div>
          <div className="text-[#888888] mb-8 h-6 flex items-center justify-center">
            <span className="border-r-2 border-[#7C83FF] animate-pulse">
              {typingText}
            </span>
          </div>
          
          <div className="space-y-4">
            <a 
              href="https://t.me/volt26" 
              className="flex items-center justify-center gap-3 text-[#EDEDED] hover:text-[#7C83FF] transition-all duration-300 hover:scale-105 hover:translate-x-2 group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <MessageSquare size={20} className="group-hover:animate-bounce" />
              @volt26
              <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="mailto:maksimvasa8@gmail.com" 
              className="flex items-center justify-center gap-3 text-[#EDEDED] hover:text-[#7C83FF] transition-all duration-300 hover:scale-105 hover:translate-x-2 group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Mail size={20} className="group-hover:animate-bounce" />
              maksimvasa8@gmail.com
              <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section with enhanced animations */}
      <section className="px-6 py-16 bg-[#0D0D0D] relative z-10" data-animate id="about">
        <div className={`max-w-sm mx-auto transition-all duration-1000 delay-200 ${isVisible('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl mb-6 text-center relative">
            Обо мне
            <span className="absolute -top-2 -right-2 w-2 h-2 bg-[#7C83FF] rounded-full animate-ping"></span>
          </h2>
          <p className="text-[#EDEDED] leading-relaxed text-center mb-8 hover:text-[#FAFAFA] transition-colors duration-300">
            Создаю и развиваю Telegram-каналы с упором на контент, стиль и органический рост. 
            Работаю на пересечении текста, аналитики и медиастратегии.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Award, text: "Креативность" },
              { icon: Home, text: "Надёжность" },
              { icon: CheckCircle, text: "Результат" },
              { icon: Clock, text: "Пунктуальность" }
            ].map((item, index) => (
              <div 
                key={index}
                className="text-center p-4 border border-[#333] rounded-lg hover:border-[#7C83FF] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#7C83FF]/20 group relative overflow-hidden cursor-pointer"
                onClick={handleClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#7C83FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <item.icon className="w-6 h-6 mx-auto mb-2 text-[#7C83FF] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <div className="text-sm relative z-10">{item.text}</div>
                {clickEffect.show && (
                  <div 
                    className="absolute pointer-events-none"
                    style={{ left: clickEffect.x, top: clickEffect.y }}
                  >
                    <div className="w-4 h-4 border-2 border-[#7C83FF] rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels Showcase with enhanced interactivity */}
      <section className="py-16 relative z-10" data-animate id="channels">
        <div className={`max-w-sm mx-auto px-6 transition-all duration-1000 delay-300 ${isVisible('channels') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl mb-8 text-center relative">
            Мои каналы
            <Activity className="absolute -right-8 top-0 w-5 h-5 text-[#7C83FF] animate-pulse" />
          </h2>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-6 pb-4" style={{width: 'max-content'}}>
            {channels.map((channel, index) => (
              <div 
                key={index} 
                className="w-64 bg-[#0D0D0D] border border-[#333] rounded-lg overflow-hidden hover:border-[#7C83FF] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#7C83FF]/20 flex-shrink-0 cursor-pointer group relative"
                onClick={() => {
                  setSelectedChannel(channel);
                  handleClick(arguments[0]);
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="h-32 bg-gradient-to-br from-[#7C83FF]/20 to-[#333]/20 relative overflow-hidden">
                  <img 
                    src={channel.image} 
                    alt={channel.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-[#7C83FF] rounded-full animate-pulse"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg mb-1 group-hover:text-[#7C83FF] transition-colors">{channel.name}</h3>
                  <p className="text-[#888888] text-sm mb-3 group-hover:text-[#EDEDED] transition-colors">{channel.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-[#7C83FF] text-sm font-medium">{channel.subscribers} подписчиков</div>
                    <ExternalLink size={16} className="text-[#7C83FF] group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section className="px-6 py-16 bg-[#0D0D0D] relative z-10" data-animate id="skills">
        <div className={`max-w-sm mx-auto transition-all duration-1000 delay-400 ${isVisible('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl mb-8 text-center relative">
            Навыки
            <Star className="absolute -right-6 -top-1 w-4 h-4 text-[#7C83FF] animate-spin" style={{animationDuration: '4s'}} />
          </h2>
          
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-[#111111] border border-[#333] rounded-lg p-4 hover:border-[#7C83FF] transition-all duration-300 hover:shadow-lg hover:shadow-[#7C83FF]/10 group relative overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#7C83FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="text-[#7C83FF] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium group-hover:text-[#7C83FF] transition-colors">{skill.name}</span>
                      <span className="text-[#7C83FF] text-sm animate-pulse">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-[#333] rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#7C83FF] via-[#6B73E6] to-[#7C83FF] h-2 rounded-full transition-all duration-1000 ease-out relative"
                        style={{
                          width: isVisible('skills') ? `${skill.level}%` : '0%',
                          backgroundSize: '200% 100%',
                          animation: 'gradient-shift 2s ease-in-out infinite alternate'
                        }}
                      >
                        <div className="absolute right-0 top-0 w-2 h-2 bg-white rounded-full opacity-50 animate-ping"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[#888888] text-sm group-hover:text-[#EDEDED] transition-colors relative z-10">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section className="px-6 py-16 relative z-10" data-animate id="projects">
        <div className={`max-w-sm mx-auto transition-all duration-1000 delay-500 ${isVisible('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl mb-8 text-center relative">
            Проекты
            <Target className="absolute -left-6 top-0 w-5 h-5 text-[#7C83FF] animate-pulse" />
          </h2>
          
          <div className="space-y-6">
            {[
              { title: "WB Insider", desc: "Канал о продажах на Wildberries с аудиторией 30K+ подписчиков. Помогаю селлерам увеличивать продажи.", stats: ["30K подписчиков", "400% рост"] },
              { title: "VoltAbuz", desc: "Авторский канал о продюсировании и создании контента. Делюсь инсайтами и кейсами из практики.", stats: ["12K подписчиков", "15% вовлечённость"] },
              { title: "Сотрудничество с Павлом Дуровым", desc: "Работал над контент-стратегией для официальных каналов Telegram. Опыт работы с топ-менеджментом.", stats: ["Официальные каналы", "Топ уровень"] }
            ].map((project, index) => (
              <div 
                key={index}
                className="bg-[#0D0D0D] border border-[#333] rounded-lg p-6 hover:border-[#7C83FF] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#7C83FF]/20 group relative overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7C83FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-lg mb-2 group-hover:text-[#7C83FF] transition-colors">{project.title}</h3>
                <p className="text-[#888888] text-sm mb-4 group-hover:text-[#EDEDED] transition-colors">
                  {project.desc}
                </p>
                <div className="flex gap-4 text-sm">
                  {project.stats.map((stat, i) => (
                    <span key={i} className="text-[#7C83FF] animate-pulse" style={{animationDelay: `${i * 0.2}s`}}>{stat}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Reviews Section */}
      <section className="px-6 py-16 relative z-10" data-animate id="reviews">
        <div className={`max-w-sm mx-auto transition-all duration-1000 delay-600 ${isVisible('reviews') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl mb-8 text-center">Отзывы</h2>
          
          <div className="space-y-8">
            {[
              { text: "Максим создал для нас канал с нуля и довёл до 20K подписчиков за полгода. Отличное качество контента.", author: "Алексей Смирнов, CEO DigitalBoost" },
              { text: "Профессиональный подход к аналитике и стратегии. Рекомендую для серьёзных проектов.", author: "Екатерина Николаева, Founder ContentLab" },
              { text: "Результат превзошёл ожидания. Канал стал генерировать лиды уже через месяц работы.", author: "Дмитрий Козлов, CMO GrowthMedia" }
            ].map((review, index) => (
              <div 
                key={index}
                className="border-l-2 border-[#7C83FF] pl-4 hover:pl-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#7C83FF]/10 group relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute -left-1 top-0 w-2 h-2 bg-[#7C83FF] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <p className="italic text-[#EDEDED] mb-3 group-hover:text-[#FAFAFA] transition-colors">
                  "{review.text}"
                </p>
                <div className="text-sm text-[#888888] group-hover:text-[#7C83FF] transition-colors">— {review.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="px-6 py-16 bg-[#0D0D0D] text-center relative z-10" data-animate id="contact">
        <div className={`max-w-sm mx-auto transition-all duration-1000 delay-700 ${isVisible('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl mb-6 relative">
            Открыт к проектам
            <MousePointer2 className="absolute -right-8 -top-1 w-5 h-5 text-[#7C83FF] animate-bounce" />
          </h2>
          <p className="text-[#888888] mb-8 hover:text-[#EDEDED] transition-colors duration-300">
            Готов обсудить ваш проект и помочь с развитием Telegram-канала
          </p>
          
          <a 
            href="https://t.me/volt26" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#7C83FF] to-[#6B73E6] text-white px-8 py-3 rounded-lg hover:from-[#6B73E6] hover:to-[#7C83FF] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#7C83FF]/30 group relative overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <MessageSquare size={20} className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            Написать в Telegram
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          
          <div className="mt-8 pt-8 border-t border-[#333]">
            <div className="text-[#888888] text-sm mb-4 hover:text-[#EDEDED] transition-colors">
              © 2025 Максим Васильев. Все права защищены.
            </div>
            
            {/* Developer Contact - simplified */}
            <a 
              href="https://t.me/polishkaaa_v" 
              className="inline-flex items-center gap-2 text-[#7C83FF] hover:text-[#6B73E6] transition-all duration-300 text-sm hover:scale-105 group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <MessageSquare size={16} className="group-hover:animate-bounce" />
              @polishkaaa_v
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Modal for Channel Details */}
      {selectedChannel && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#111111] border border-[#7C83FF]/50 rounded-lg max-w-sm w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#7C83FF]/20 animate-slideIn">
            <div className="relative">
              <img 
                src={selectedChannel.image} 
                alt={selectedChannel.name}
                className="w-full h-48 object-cover"
              />
              <button 
                onClick={() => setSelectedChannel(null)}
                className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-all duration-300 hover:scale-110 hover:rotate-90"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#111111] to-transparent"></div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl mb-2 animate-pulse">{selectedChannel.name}</h3>
              <p className="text-[#7C83FF] text-sm mb-4 flex items-center gap-2">
                <Users size={16} />
                {selectedChannel.subscribers} подписчиков
              </p>
              
              <p className="text-[#EDEDED] mb-6 leading-relaxed">
                {selectedChannel.fullDescription}
              </p>
              
              <div className="space-y-3 mb-6 bg-[#0D0D0D] rounded-lg p-4">
                {Object.entries(selectedChannel.stats).map(([key, value], index) => (
                  <div key={key} className="flex justify-between hover:bg-[#111111] p-2 rounded transition-colors">
                    <span className="text-[#888888] capitalize">{key === 'growth' ? 'Рост' : key === 'engagement' ? 'Вовлечённость' : 'Контент'}:</span>
                    <span className="text-[#7C83FF] font-medium">{value}</span>
                  </div>
                ))}
              </div>
              
              <a 
                href={selectedChannel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#7C83FF] to-[#6B73E6] text-white py-3 px-4 rounded-lg hover:from-[#6B73E6] hover:to-[#7C83FF] transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <MessageSquare size={20} className="group-hover:animate-bounce" />
                Перейти к каналу
                <ExternalLink size={16} className="group-hover:rotate-45 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}