
import React, { useState } from 'react';
import { SiteConfig, Post, Inquiry } from '../types';

interface AdminDashboardProps {
  config: SiteConfig;
  posts: Post[];
  inquiries: Inquiry[];
  onSaveConfig: (config: SiteConfig) => void;
  onUpdatePosts: (posts: Post[]) => void;
  onInquiryAction: (id: string, action: 'Complete' | 'Delete') => void;
  onSwitchToPublic: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  config, posts, inquiries, onSaveConfig, onUpdatePosts, onInquiryAction, onSwitchToPublic 
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'settings' | 'inquiries'>('inquiries');
  const [localConfig, setLocalConfig] = useState<SiteConfig>(config);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handlePostSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    
    let updated;
    if (posts.find(p => p.id === editingPost.id)) {
      updated = posts.map(p => p.id === editingPost.id ? editingPost : p);
    } else {
      updated = [{ ...editingPost, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] }, ...posts];
    }
    onUpdatePosts(updated);
    setEditingPost(null);
  };

  const deletePost = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      onUpdatePosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-zinc-950 flex flex-col p-6">
        <div className="text-xl font-bold mb-10 text-purple-400">ADMIN PANEL</div>
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'inquiries' ? 'bg-purple-900/30 text-purple-400' : 'hover:bg-white/5 text-gray-500'}`}
          >
            문의 내역 {inquiries.filter(i => i.status === 'Pending').length > 0 && <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">!</span>}
          </button>
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'posts' ? 'bg-purple-900/30 text-purple-400' : 'hover:bg-white/5 text-gray-500'}`}
          >
            게시글 관리
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'settings' ? 'bg-purple-900/30 text-purple-400' : 'hover:bg-white/5 text-gray-500'}`}
          >
            사이트 설정
          </button>
        </nav>
        <button 
          onClick={onSwitchToPublic}
          className="mt-auto w-full p-4 border border-white/10 rounded-xl hover:bg-white/5 transition text-sm flex items-center justify-center gap-2"
        >
          사이트로 돌아가기
        </button>
      </aside>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto p-12 bg-black">
        {activeTab === 'inquiries' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">고객 문의 관리</h2>
            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <div className="text-gray-500 text-center py-20 bg-zinc-900 rounded-3xl border border-white/5">접수된 문의가 없습니다.</div>
              ) : (
                inquiries.map(inquiry => (
                  <div key={inquiry.id} className="p-6 bg-zinc-900 rounded-2xl border border-white/5 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold">{inquiry.name}</span>
                        <span className="text-gray-500 text-sm">{inquiry.contact}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${inquiry.status === 'Pending' ? 'bg-amber-900/30 text-amber-400' : 'bg-emerald-900/30 text-emerald-400'}`}>
                          {inquiry.status}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2">{inquiry.message}</p>
                      <div className="text-xs text-gray-600">{inquiry.date}</div>
                    </div>
                    <div className="flex gap-2">
                      {inquiry.status === 'Pending' && (
                        <button 
                          onClick={() => onInquiryAction(inquiry.id, 'Complete')}
                          className="px-4 py-2 bg-emerald-600 text-sm rounded-lg hover:bg-emerald-500"
                        >
                          완료
                        </button>
                      )}
                      <button 
                        onClick={() => onInquiryAction(inquiry.id, 'Delete')}
                        className="px-4 py-2 bg-red-900/30 text-red-400 text-sm rounded-lg hover:bg-red-900/50"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">게시글/이벤트 관리</h2>
              <button 
                onClick={() => setEditingPost({ id: '', title: '', content: '', category: 'Event', date: '', imageUrl: '' })}
                className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition"
              >
                새 글 작성
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {posts.map(post => (
                <div key={post.id} className="p-6 bg-zinc-900 rounded-2xl border border-white/5 flex items-center gap-6">
                  <img src={post.imageUrl} className="w-20 h-20 rounded-xl object-cover" alt="" />
                  <div className="flex-1">
                    <div className="text-xs text-purple-400 mb-1">{post.category}</div>
                    <div className="text-lg font-bold mb-1">{post.title}</div>
                    <div className="text-sm text-gray-500">{post.date}</div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingPost(post)}
                      className="px-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5"
                    >
                      수정
                    </button>
                    <button 
                      onClick={() => deletePost(post.id)}
                      className="px-4 py-2 bg-red-900/30 text-red-400 text-sm rounded-lg hover:bg-red-900/50"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {editingPost && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
                <div className="bg-zinc-900 w-full max-w-2xl p-10 rounded-3xl border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]">
                  <h3 className="text-2xl font-bold mb-8">게시글 편집</h3>
                  <form onSubmit={handlePostSave} className="space-y-6">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">제목</label>
                      <input 
                        className="w-full bg-black border border-white/10 p-4 rounded-xl focus:outline-none focus:border-purple-500" 
                        value={editingPost.title}
                        onChange={e => setEditingPost({...editingPost, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500 mb-2">카테고리</label>
                        <select 
                          className="w-full bg-black border border-white/10 p-4 rounded-xl focus:outline-none"
                          value={editingPost.category}
                          onChange={e => setEditingPost({...editingPost, category: e.target.value as any})}
                        >
                          <option value="Event">Event</option>
                          <option value="Notice">Notice</option>
                          <option value="Guide">Guide</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-2">이미지 URL</label>
                        <input 
                          className="w-full bg-black border border-white/10 p-4 rounded-xl" 
                          value={editingPost.imageUrl}
                          onChange={e => setEditingPost({...editingPost, imageUrl: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">내용</label>
                      <textarea 
                        rows={6}
                        className="w-full bg-black border border-white/10 p-4 rounded-xl focus:outline-none" 
                        value={editingPost.content}
                        onChange={e => setEditingPost({...editingPost, content: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="flex-1 py-4 bg-purple-600 rounded-xl font-bold hover:bg-purple-500">저장하기</button>
                      <button type="button" onClick={() => setEditingPost(null)} className="flex-1 py-4 bg-zinc-800 rounded-xl font-bold hover:bg-zinc-700">취소</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">사이트 환경 설정</h2>
            <div className="bg-zinc-900 border border-white/5 rounded-3xl p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">사이트 이름</label>
                  <input 
                    className="w-full bg-black border border-white/10 p-4 rounded-xl" 
                    value={localConfig.siteName}
                    onChange={e => setLocalConfig({...localConfig, siteName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">메인 슬로건</label>
                  <input 
                    className="w-full bg-black border border-white/10 p-4 rounded-xl" 
                    value={localConfig.slogan}
                    onChange={e => setLocalConfig({...localConfig, slogan: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">히어로 섹션 설명</label>
                <textarea 
                  rows={3}
                  className="w-full bg-black border border-white/10 p-4 rounded-xl" 
                  value={localConfig.heroDescription}
                  onChange={e => setLocalConfig({...localConfig, heroDescription: e.target.value})}
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Telegram 링크</label>
                  <input 
                    className="w-full bg-black border border-white/10 p-4 rounded-xl text-blue-400" 
                    value={localConfig.telegramLink}
                    onChange={e => setLocalConfig({...localConfig, telegramLink: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">KakaoTalk 링크</label>
                  <input 
                    className="w-full bg-black border border-white/10 p-4 rounded-xl text-yellow-400" 
                    value={localConfig.kakaoLink}
                    onChange={e => setLocalConfig({...localConfig, kakaoLink: e.target.value})}
                  />
                </div>
              </div>
              <button 
                onClick={() => {
                  onSaveConfig(localConfig);
                  alert('설정이 저장되었습니다.');
                }}
                className="w-full py-4 bg-purple-gradient rounded-xl font-bold"
              >
                설정 일괄 업데이트
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
