"use client";

import { motion } from "framer-motion";
import { Bot, Zap, Shield, Sparkles, ArrowRight, Play, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030014] text-white overflow-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 backdrop-blur-md bg-[#030014]/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ChatBot<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">PRO</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link href="#features" className="hover:text-white transition-colors">Tính năng</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Bảng giá</Link>
            <Link href="#testimonials" className="hover:text-white transition-colors">Khách hàng</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Đăng nhập</Link>
            <Link href="/dashboard" className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Dùng thử miễn phí
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-300 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Đột phá AI 2026 - Công nghệ Voice AI Thế Hệ Mới</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Tự động hóa bán hàng với <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Siêu AI Chốt Sale
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Không chỉ là Chatbot. Đây là một nhân viên Sale xuất sắc làm việc 24/7, có khả năng giao tiếp bằng giọng nói siêu thực, hiểu ý định và chốt khách hàng ngay lập tức.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              Bắt đầu miễn phí ngay <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-md">
              <Play className="w-5 h-5" /> Xem Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="py-24 px-6 bg-[#050505] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Đẳng Cấp Của Một <span className="text-purple-400">Chuyên Gia</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Thay thế hoàn toàn quy trình chăm sóc khách hàng thủ công bằng hệ thống AI tiên tiến nhất.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-yellow-400" />}
              title="Phản hồi tức thì 0.1s"
              desc="Xử lý hàng vạn tin nhắn cùng lúc. Khách hàng không bao giờ phải chờ đợi."
            />
            <FeatureCard 
              icon={<Bot className="w-8 h-8 text-indigo-400" />}
              title="Voice AI Siêu Thực"
              desc="Giao tiếp bằng giọng nói truyền cảm, có ngữ điệu, không thể phân biệt với người thật."
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-emerald-400" />}
              title="Bảo mật & Tự động thanh toán"
              desc="Tự động tạo mã QR, chốt đơn và nhận thông báo thanh toán an toàn tuyệt đối."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030014] to-[#0a0118] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Đầu tư nhỏ, <span className="text-pink-400">Lợi nhuận khổng lồ</span></h2>
            <p className="text-gray-400 text-lg">Lựa chọn gói phù hợp với quy mô doanh nghiệp của bạn.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Starter"
              price="Miễn phí"
              desc="Trải nghiệm sức mạnh của AI chốt sale."
              features={["1 Chatbot", "Mô hình AI Tiêu chuẩn", "1,000 tin nhắn/tháng", "Hỗ trợ cộng đồng"]}
            />
            <PricingCard 
              title="Pro VIP"
              price="499.000đ"
              period="/tháng"
              desc="Dành cho các shop đang tăng trưởng mạnh."
              features={["3 Chatbot", "Mô hình AI Cao cấp (Gemini 1.5 Pro)", "Không giới hạn tin nhắn", "Voice AI (10h/tháng)", "Tự động tạo QR Thanh toán", "Hỗ trợ ưu tiên 24/7"]}
              isPopular
            />
            <PricingCard 
              title="Enterprise"
              price="Liên hệ"
              desc="Giải pháp tùy chỉnh cho doanh nghiệp lớn."
              features={["Không giới hạn Chatbot", "Huấn luyện AI riêng (Fine-tuning)", "Voice AI Không giới hạn", "API Key Pool riêng biệt", "Triển khai Server nội bộ (On-premise)"]}
            />
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <footer className="border-t border-white/10 bg-[#02000a] py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Sẵn sàng để x10 doanh thu?</h2>
          <Link href="/dashboard" className="inline-block px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all hover:scale-105">
            Bắt đầu dùng thử ngay
          </Link>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingCard({ title, price, period, desc, features, isPopular }: { title: string, price: string, period?: string, desc: string, features: string[], isPopular?: boolean }) {
  return (
    <div className={`p-8 rounded-3xl border ${isPopular ? 'bg-gradient-to-b from-purple-900/40 to-indigo-900/20 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)] relative transform md:-translate-y-4' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
          PHỔ BIẾN NHẤT
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-6 h-10">{desc}</p>
      <div className="mb-8">
        <span className="text-4xl font-extrabold">{price}</span>
        {period && <span className="text-gray-400">{period}</span>}
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link href="/dashboard" className={`block w-full py-3 rounded-xl text-center font-bold transition-all ${isPopular ? 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
        Chọn gói này
      </Link>
    </div>
  );
}
