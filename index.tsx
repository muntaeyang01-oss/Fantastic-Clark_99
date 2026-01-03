
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- TYPES ---
interface Post {
  id: string;
  title: string;
  content: string;
  category: 'Event' | 'Notice' | 'Guide';
  date: string;
  imageUrl?: string;
}

interface SiteConfig {
  siteName: string;
  slogan: string;
  heroDescription: string;
  telegramLink: string;
  kakaoLink: string;
}

interface Inquiry {
  id: string;
  name: string;
  contact: string;
  message: string;
  status: 'Pending' | 'Completed';
  date: string;
}

type ViewMode = 'Public' | 'Admin';

// --- CONSTANTS ---
const INITIAL_CONFIG: SiteConfig = {
  siteName: "FANTASTIC CLARK",
  slogan: "전 세계 프리미엄 카지노의 정점, 당신의 품격에 맞는 최고의 파트너",
  heroDescription: "FANTASTIC CLARK은 필리핀 및 해외 주요 거점 최고의 VIP 전용 에이전시입니다. 24시간 실시간 케어 시스템과 안전한 보안 환경을 제공합니다.",
  telegramLink: "https://t.me/fantastic_clark",
  kakaoLink: "https://kakao.com/fantastic_clark",
};

const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    title: "신규 회원 첫 입금 20% 보너스 이벤트",
    content: "FANTASTIC CLARK에 새로 가입하신 회원님들을 위해 첫 입금 시 최대 20%의 보너스를 즉시 지급해 드립니다. 지금 바로 최고의 혜택을 경험하세요.",
    category: "Event",
    date: "2024-05-20",
    imageUrl: "https://images.unsplash.com/photo-1596838132731-dd36aae527ec?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    title: "VIP 골프 & 호텔 패키지 안내",
    content: "클락 지역 최고의 골프장과 5성급 호텔 숙박권을 포함한 VIP 전용 투어 패키지를 운영 중입니다. 에이전시를 통해 예약 시 특별 할인가가 적용됩니다.",
    category: "Guide",
    date: "2024-05-18",
    imageUrl: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    title: "시스템 점검 및 보안 업데이트 공지",
    content: "안정적인 서비스 이용을 위해 매주 수요일 새벽 3시부터 5시까지 정기 시스템 점검이 진행됩니다. 이용에 참고 부탁드립니다.",
    category: "Notice",
    date: "2024-05-15",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
  }
];

// --- COMPONENTS ---

const AdminDashboard = ({ config, posts, inquiries, onSaveConfig, onUpdatePosts, onInquiryAction, onSwitchToPublic }: any) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'settings' | 'inquiries'>('inquiries');
  const [localConfig, setLocalConfig] = useState(config);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handlePostSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    let updated;
    if (posts.find((p: any) => p.id === editingPost.id)) {
      updated = posts.map((p: any) => p.id === editingPost.id ? editingPost : p);
    } else {
      updated = [{ ...editingPost, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] }, ...posts];
    }
    onUpdatePosts(updated);
    setEditingPost(null);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <aside className="w-64 border-r border-purple-900/20 bg-zinc-950 flex flex-col p-6">
        <div className="text-xl font-bold mb-10 text-purple-500 tracking-tighter">FC ADMIN</div>
        <nav className="flex-1 space-y-2">
          {['inquiries', 'posts', 'settings'].map((tab: any) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left p-4 rounded-xl transition capitalize ${activeTab === tab ? 'bg-purple-900/30 text-purple-400' : 'hover:bg-white/5 text-gray-500'}`}
            >
              {tab === 'inquiries' ? '문의 내역' : tab === 'posts' ? '게시물 관리' : '사이트 설정'}
            </button>
          ))}
        </nav>
        <button onClick={onSwitchToPublic} className="mt-auto w-full p-4 border border-purple-900/30 rounded-xl hover:bg-purple-900/10 transition text-sm">사이트로 가기</button>
      </aside>
      <main className="flex-1 overflow-y-auto p-12 bg-black">
        {activeTab === 'inquiries' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">고객 문의 내역</h2>
            <div className="space-y-4">
              {inquiries.map((inq: any) => (
                <div key={inq.id} className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-lg">{inq.name}</span>
                      <span className="text-gray-500 text-sm">{inq.contact}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${inq.status === 'Pending' ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'}`}>{inq.status}</span>
                    </div>
                    <p className="text-gray-400">{inq.message}</p>
                  </div>
                  <div className="flex gap-2">
                    {inq.status === 'Pending' && <button onClick={() => onInquiryAction(inq.id, 'Complete')} className="px-4 py-2 bg-emerald-600 rounded-lg text-sm">완료</button>}
                    <button onClick={() => onInquiryAction(inq.id, 'Delete')} className="px-4 py-2 bg-red-900/30 text-red-500 rounded-lg text-sm">삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'posts' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">게시물 관리</h2>
              <button onClick={() => setEditingPost({ id: '', title: '', content: '', category: 'Event', date: '', imageUrl: '' })} className="px-6 py-2 bg-purple-600 rounded-lg font-bold">글쓰기</button>
            </div>
            <div className="grid gap-4">
              {posts.map((post: any) => (
                <div key={post.id} className="p-4 bg-zinc-900/50 border border-white/5 rounded-2xl flex items-center gap-6">
                  <img src={post.imageUrl} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="text-xs text-purple-400">{post.category}</div>
                    <div className="font-bold">{post.title}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingPost(post)} className="px-4 py-2 border border-white/10 rounded-lg text-sm">수정</button>
                    <button onClick={() => onUpdatePosts(posts.filter((p:any) => p.id !== post.id))} className="px-4 py-2 text-red-500 text-sm">삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-zinc-900/50 p-8 rounded-3xl border border-white/5">
            <h2 className="text-2xl font-bold mb-8">기본 설정</h2>
            <div className="space-y-6">
              <div><label className="text-sm text-gray-500 block mb-2">에이전시 이름</label><input className="w-full bg-black border border-white/10 p-4 rounded-xl" value={localConfig.siteName} onChange={e => setLocalConfig({...localConfig, siteName: e.target.value})} /></div>
              <div><label className="text-sm text-gray-500 block mb-2">슬로건</label><input className="w-full bg-black border border-white/10 p-4 rounded-xl" value={localConfig.slogan} onChange={e => setLocalConfig({...localConfig, slogan: e.target.value})} /></div>
              <div><label className="text-sm text-gray-500 block mb-2">Telegram</label><input className="w-full bg-black border border-white/10 p-4 rounded-xl" value={localConfig.telegramLink} onChange={e => setLocalConfig({...localConfig, telegramLink: e.target.value})} /></div>
              <div><label className="text-sm text-gray-500 block mb-2">KakaoTalk</label><input className="w-full bg-black border border-white/10 p-4 rounded-xl" value={localConfig.kakaoLink} onChange={e => setLocalConfig({...localConfig, kakaoLink: e.target.value})} /></div>
              <button onClick={() => onSaveConfig(localConfig)} className="w-full py-4 bg-purple-600 rounded-xl font-bold mt-4">저장하기</button>
            </div>
          </div>
        )}
      </main>

      {editingPost && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center p-6">
          <form onSubmit={handlePostSave} className="bg-zinc-900 p-8 rounded-3xl border border-white/10 w-full max-w-lg space-y-4">
            <h3 className="text-xl font-bold mb-4">게시물 편집</h3>
            <input className="w-full bg-black p-4 rounded-xl border border-white/10" placeholder="제목" value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value})} required />
            <select className="w-full bg-black p-4 rounded-xl border border-white/10" value={editingPost.category} onChange={e => setEditingPost({...editingPost, category: e.target.value as any})}>
              <option value="Event">Event</option><option value="Notice">Notice</option><option value="Guide">Guide</option>
            </select>
            <input className="w-full bg-black p-4 rounded-xl border border-white/10" placeholder="이미지 URL" value={editingPost.imageUrl} onChange={e => setEditingPost({...editingPost, imageUrl: e.target.value})} />
            <textarea className="w-full bg-black p-4 rounded-xl border border-white/10 h-32" placeholder="내용" value={editingPost.content} onChange={e => setEditingPost({...editingPost, content: e.target.value})} required />
            <div className="flex gap-4">
              <button type="submit" className="flex-1 py-4 bg-purple-600 rounded-xl font-bold">저장</button>
              <button type="button" onClick={() => setEditingPost(null)} className="flex-1 py-4 bg-zinc-800 rounded-xl">취소</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const PublicView = ({ config, posts, onSwitchToAdmin, onSubmitInquiry }: any) => {
  const [form, setForm] = useState({ name: '', contact: '', message: '' });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter italic">
            <span className="text-purple-500">FANTASTIC</span> CLARK
          </div>
          <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
            <a href="#about" className="hover:text-purple-400 transition">About</a>
            <a href="#events" className="hover:text-purple-400 transition">Events</a>
            <a href="#contact" className="hover:text-purple-400 transition">Contact</a>
          </div>
          <button onClick={onSwitchToAdmin} className="text-[10px] opacity-20 hover:opacity-100 transition">ADMIN</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center px-6">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_50%_50%,#3b0764,transparent_70%)]"></div>
        <div className="relative text-center max-w-4xl">
          <div className="inline-block px-4 py-1.5 mb-6 border border-purple-500/30 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-bold tracking-widest uppercase animate-pulse">
            Exclusive Casino Agency
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
            CHASE THE <br /><span className="text-purple-gradient">ULTIMATE</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            {config.slogan}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#contact" className="px-12 py-5 bg-purple-gradient rounded-full font-black glow-purple hover:scale-105 transition-all text-sm uppercase tracking-widest">
              Consultation
            </a>
            <a href={config.telegramLink} className="px-12 py-5 border border-white/10 rounded-full font-black hover:bg-white/5 transition text-sm uppercase tracking-widest">
              Telegram
            </a>
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl font-black mb-4 tracking-tight">FEATURED <span className="text-purple-500">PROMOTIONS</span></h2>
            <div className="w-20 h-1 bg-purple-500"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {posts.map((post: any) => (
              <div key={post.id} className="group bg-black rounded-[2rem] overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-500">
                <div className="h-64 overflow-hidden relative">
                   <img src={post.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                   <div className="absolute top-6 left-6 px-3 py-1 bg-purple-600 text-[10px] font-bold rounded-full uppercase tracking-tighter">{post.category}</div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-purple-400 transition">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">{post.content}</p>
                  <div className="text-[10px] text-zinc-700 font-bold tracking-widest">{post.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section id="contact" className="py-32 bg-black">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-zinc-950 rounded-[3rem] p-12 md:p-20 border border-white/5 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10 text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6">BECOME A <span className="text-purple-500">VIP</span></h2>
              <p className="text-gray-500">전문 에이전트가 당신만을 위한 맞춤형 서비스를 설계해 드립니다.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); onSubmitInquiry(form); setForm({name:'', contact:'', message:''}); }} className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input placeholder="Name" className="w-full bg-black border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-purple-500 transition" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                <input placeholder="Contact (ID/Number)" className="w-full bg-black border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-purple-500 transition" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} required />
              </div>
              <textarea placeholder="Message" className="w-full bg-black border border-white/10 rounded-2xl p-5 h-40 focus:outline-none focus:border-purple-500 transition" value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
              <button className="w-full py-6 bg-purple-gradient rounded-2xl font-black glow-purple uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all">Submit Inquiry</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center text-gray-600">
        <div className="text-xl font-black mb-8 italic text-white">FANTASTIC CLARK</div>
        <p className="text-xs uppercase tracking-widest">&copy; 2024 FANTASTIC CLARK AGENT. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

// --- MAIN APP ---

const App = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('Public');
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const savedConfig = localStorage.getItem('fc_config');
    const savedPosts = localStorage.getItem('fc_posts');
    const savedInquiries = localStorage.getItem('fc_inquiries');
    if (savedConfig) setConfig(JSON.parse(savedConfig));
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
  }, []);

  const handleInquiryAction = (id: string, action: 'Complete' | 'Delete') => {
    let updated;
    if (action === 'Delete') updated = inquiries.filter(i => i.id !== id);
    else updated = inquiries.map(i => i.id === id ? { ...i, status: 'Completed' as const } : i);
    setInquiries(updated);
    localStorage.setItem('fc_inquiries', JSON.stringify(updated));
  };

  const addInquiry = (inquiry: any) => {
    const newInq: Inquiry = { ...inquiry, id: Date.now().toString(), status: 'Pending', date: new Date().toLocaleDateString() };
    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('fc_inquiries', JSON.stringify(updated));
    alert('문의가 성공적으로 접수되었습니다.');
  };

  return (
    <div>
      {viewMode === 'Public' ? (
        <PublicView 
          config={config} 
          posts={posts} 
          onSwitchToAdmin={() => setViewMode('Admin')} 
          onSubmitInquiry={addInquiry}
        />
      ) : (
        <AdminDashboard 
          config={config} 
          posts={posts} 
          inquiries={inquiries}
          onSaveConfig={(c: any) => { setConfig(c); localStorage.setItem('fc_config', JSON.stringify(c)); alert('저장되었습니다.'); }}
          onUpdatePosts={(p: any) => { setPosts(p); localStorage.setItem('fc_posts', JSON.stringify(p)); }}
          onInquiryAction={handleInquiryAction}
          onSwitchToPublic={() => setViewMode('Public')}
        />
      )}
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
