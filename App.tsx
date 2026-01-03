
import React, { useState, useEffect } from 'react';
import { ViewMode, SiteConfig, Post, Inquiry } from './types';
import { INITIAL_CONFIG, INITIAL_POSTS, INITIAL_INQUIRIES } from './constants';
import PublicView from './components/PublicView';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('Public');
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);

  // Persistence (Mock DB using LocalStorage)
  useEffect(() => {
    const savedConfig = localStorage.getItem('fc_config');
    const savedPosts = localStorage.getItem('fc_posts');
    const savedInquiries = localStorage.getItem('fc_inquiries');

    if (savedConfig) setConfig(JSON.parse(savedConfig));
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
  }, []);

  const updateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem('fc_config', JSON.stringify(newConfig));
  };

  const updatePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    localStorage.setItem('fc_posts', JSON.stringify(newPosts));
  };

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('fc_inquiries', JSON.stringify(updated));
    alert('문의가 접수되었습니다. 곧 담당자가 연락드리겠습니다.');
  };

  const handleInquiryAction = (id: string, action: 'Complete' | 'Delete') => {
    let updated;
    if (action === 'Delete') {
      updated = inquiries.filter(i => i.id !== id);
    } else {
      updated = inquiries.map(i => i.id === id ? { ...i, status: 'Completed' } : i);
    }
    setInquiries(updated);
    localStorage.setItem('fc_inquiries', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen">
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
          onSaveConfig={updateConfig}
          onUpdatePosts={updatePosts}
          onInquiryAction={handleInquiryAction}
          onSwitchToPublic={() => setViewMode('Public')}
        />
      )}
    </div>
  );
};

export default App;
