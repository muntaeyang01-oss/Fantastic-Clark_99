
import { Post, SiteConfig, Inquiry } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  siteName: "FANTASTIC CLARK",
  slogan: "전 세계 프리미엄 카지노의 정점, 당신의 품격에 맞는 최고의 파트너",
  heroDescription: "FANTASTIC CLARK은 필리핀 및 해외 주요 거점 최고의 VIP 전용 에이전시입니다. 안전하고 차별화된 맞춤형 서비스를 제공합니다.",
  telegramLink: "https://t.me/fantastic_clark",
  kakaoLink: "https://kakao.com/fantastic_clark",
  primaryColor: "#8A2BE2",
  secondaryColor: "#A020F0",
};

export const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    title: "신규 회원 첫 입금 20% 보너스 이벤트",
    content: "FANTASTIC CLARK에 새로 가입하신 회원님들을 위해 첫 입금 시 최대 20%의 보너스를 즉시 지급해 드립니다. 지금 바로 최고의 혜택을 경험하세요.",
    category: "Event",
    date: "2024-05-20",
    imageUrl: "https://picsum.photos/seed/casino1/800/400"
  },
  {
    id: "2",
    title: "VIP 골프 & 호텔 패키지 안내",
    content: "클락 지역 최고의 골프장과 5성급 호텔 숙박권을 포함한 VIP 전용 투어 패키지를 운영 중입니다. 에이전시를 통해 예약 시 특별 할인가가 적용됩니다.",
    category: "Guide",
    date: "2024-05-18",
    imageUrl: "https://picsum.photos/seed/golf/800/400"
  },
  {
    id: "3",
    title: "시스템 점검 및 보안 업데이트 공지",
    content: "안정적인 서비스 이용을 위해 매주 수요일 새벽 3시부터 5시까지 정기 시스템 점검이 진행됩니다. 이용에 참고 부탁드립니다.",
    category: "Notice",
    date: "2024-05-15",
    imageUrl: "https://picsum.photos/seed/security/800/400"
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "1",
    name: "홍길동",
    contact: "010-1234-5678",
    message: "VIP 멤버십 가입 조건이 궁금합니다.",
    status: "Pending",
    date: "2024-05-21"
  }
];
