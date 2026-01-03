
import React, { useState } from 'react';
import { SiteConfig, Post, Inquiry } from '../types';

interface PublicViewProps {
  config: SiteConfig;
  posts: Post[];
  onSwitchToAdmin: () => void;
  onSubmitInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
}

const PublicView: React.FC<PublicViewProps> = ({ config, posts, onSwitchToAdmin, onSubmitInquiry }) => {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) {
      alert('이름과 연락처를 입력해주세요.');
      return;
    }
    onSubmitInquiry(formData);
    setFormData({ name: '', contact: '', message: '' });
  };

  return (
    <div className="flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter text-white">
            <span className="text-purple-500">FANTASTIC</span> CLARK
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-gray-300">
            <a href="#about" className="hover:text-purple-400 transition">About</a>
            <a href="#events" className="hover:text-purple-400 transition">Events</a>
            <a href="#guide" className="hover:text-purple-400 transition">Guide</a>
            <a href="#contact" className="hover:text-purple-400 transition">Contact</a>
          </div>
          <button 
            onClick={onSwitchToAdmin}
            className="text-[10px] text-gray-700 hover:text-gray-500 uppercase"
          >
            Admin
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract Purple Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/30 blur-[150px] rounded-full"></div>
        
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
            Premium <span className="text-purple-gradient">Casino Agency</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
            {config.slogan}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="px-10 py-4 bg-purple-gradient rounded-full font-semibold glow-purple hover:scale-105 transition-all">
              상담 예약하기
            </a>
            <a href={config.telegramLink} target="_blank" className="px-10 py-4 border border-purple-500/50 rounded-full font-semibold hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2">
              Telegram 채널
            </a>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-purple-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats/About Section */}
      <section id="about" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 rounded-2xl bg-black border border-white/5">
              <div className="text-4xl font-bold text-purple-400 mb-2">99.9%</div>
              <div className="text-gray-500 uppercase tracking-widest text-sm">신뢰성 및 보안</div>
            </div>
            <div className="p-8 rounded-2xl bg-black border border-white/5">
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-500 uppercase tracking-widest text-sm">실시간 상담 지원</div>
            </div>
            <div className="p-8 rounded-2xl bg-black border border-white/5">
              <div className="text-4xl font-bold text-purple-400 mb-2">10+</div>
              <div className="text-gray-500 uppercase tracking-widest text-sm">글로벌 파트너십</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Sections */}
      <section id="events" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">Latest <span className="text-purple-400">Promotions</span></h2>
              <p className="text-gray-400">FANTASTIC CLARK만의 차별화된 멤버십 혜택을 확인하세요.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map(post => (
              <div key={post.id} className="group bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={post.imageUrl || 'https://picsum.photos/seed/default/600/400'} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 bg-purple-900/50 text-purple-300 text-[10px] rounded-full uppercase tracking-tighter">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-purple-400 transition">{post.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {post.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="contact" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 leading-tight">상담을 통해 더 특별한<br /><span className="text-purple-400 text-5xl">VIP 혜택</span>을 경험하세요.</h2>
              <p className="text-gray-400 mb-12 text-lg">
                간편 상담 신청을 남겨주시면 담당 에이전트가 10분 내로 연락 드립니다. 카카오톡 혹은 텔레그램을 통한 다이렉트 상담도 항시 가능합니다.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email Address</div>
                    <div className="text-white">support@fantasticclark.com</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black p-10 rounded-3xl border border-white/10 shadow-2xl">
              <form onSubmit={handleSumbit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">성함</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="홍길동"
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">연락처 (카톡/텔레 가능)</label>
                  <input 
                    type="text" 
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    placeholder="010-0000-0000 / @ID"
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">상담 내용 (선택)</label>
                  <textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition"
                    placeholder="문의하실 내용을 입력해 주세요."
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-purple-gradient rounded-xl font-bold glow-purple hover:opacity-90 transition">
                  상담 신청하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-8">
            <span className="text-purple-500">FANTASTIC</span> CLARK
          </div>
          <div className="flex justify-center gap-8 mb-12 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Partner Program</a>
          </div>
          <p className="text-gray-600 text-xs">
            © 2024 FANTASTIC CLARK CASINO AGENCY. ALL RIGHTS RESERVED.<br />
            본 웹사이트는 필리핀 PAGCOR 인증 파트너 에이전시입니다.
          </p>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <a 
          href={config.telegramLink}
          className="w-16 h-16 bg-[#26A5E4] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition active:scale-95"
          target="_blank"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.35-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.36-.49.99-.75 3.86-1.68 6.43-2.78 7.73-3.31 3.67-1.49 4.44-1.75 4.93-1.76.11 0 .35.03.5.16.13.1.17.24.18.33-.01.07-.01.15-.01.22z"/></svg>
        </a>
        <a 
          href={config.kakaoLink}
          className="w-16 h-16 bg-[#FEE500] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition active:scale-95"
          target="_blank"
        >
          <svg className="w-8 h-8 text-[#3c1e1e]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.707 4.8 4.316 6.091l-1.091 4.022 4.605-3.054c.382.036.77.056 1.17.056 4.97 0 9-3.185 9-7.115S16.97 3 12 3z"/></svg>
        </a>
      </div>
    </div>
  );
};

export default PublicView;
