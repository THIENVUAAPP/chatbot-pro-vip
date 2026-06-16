"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Crown, Zap, Shield, Sparkles } from "lucide-react";
import { useState } from "react";

export default function BillingPage() {
  const [isVIP, setIsVIP] = useState(false);

  const plans = [
    {
      title: "Starter",
      price: "Miễn Phí",
      desc: "Trải nghiệm sức mạnh của AI chốt sale cơ bản.",
      features: ["1 Chatbot", "Mô hình AI tiêu chuẩn (Gemini Flash)", "1.000 tin nhắn/tháng", "Hỗ trợ qua group cộng đồng"],
      color: "from-zinc-800 to-zinc-900",
      buttonText: "Đang Sử Dụng",
      popular: false
    },
    {
      title: "VIP Pro",
      price: "499.000đ",
      period: "/ tháng",
      desc: "Dành cho các cửa hàng, doanh nghiệp đang tăng trưởng mạnh.",
      features: ["3 Chatbot", "Mô hình AI cao cấp nhất (Gemini Pro)", "Không giới hạn tin nhắn", "Voice AI (10h đàm thoại/tháng)", "Upload file, video avatar cho Bot", "Hỗ trợ ưu tiên 24/7"],
      color: "from-blue-600/30 to-indigo-600/20 border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.2)]",
      buttonText: "Nâng Cấp VIP PRO",
      popular: true
    },
    {
      title: "Enterprise",
      price: "Liên hệ",
      desc: "Giải pháp tối ưu hóa riêng biệt cho doanh nghiệp lớn.",
      features: ["Không giới hạn Chatbot", "Huấn luyện AI riêng (Fine-tuning)", "Voice AI Không giới hạn", "Tích hợp API key riêng biệt", "Hỗ trợ kỹ thuật 1-1 chuyên sâu"],
      color: "from-purple-900/40 to-pink-900/20 border-purple-500/30",
      buttonText: "Liên Hệ Doanh Nghiệp",
      popular: false
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Thanh Toán & Gói Dịch Vụ</h1>
          <p className="text-gray-400 mt-2">Nâng cấp gói VIP Pro để kích hoạt tính năng Voice AI, upload tài liệu lớn và tùy chỉnh avatar video cho bot.</p>
        </div>
        {isVIP && (
          <span className="flex items-center gap-1.5 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl text-sm font-bold text-yellow-500 shadow-md">
            <Crown size={16} /> Gói VIP Đang Kích Hoạt
          </span>
        )}
      </div>

      {/* Grid of Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`p-8 rounded-3xl border ${plan.popular ? plan.color : 'bg-[#0a0a0a] border-white/5 hover:border-white/10'} relative flex flex-col justify-between min-h-[500px] transition-all duration-300`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <Sparkles size={12} /> KHUYÊN DÙNG
              </div>
            )}
            
            <div>
              <h3 className="text-2xl font-black text-white flex items-center gap-2">
                {plan.popular && <Crown className="text-yellow-400" size={24} />}
                {plan.title}
              </h3>
              <p className="text-xs text-gray-500 mt-2 min-h-[32px]">{plan.desc}</p>
              
              <div className="my-8">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-400 text-sm">{plan.period}</span>}
              </div>

              <ul className="space-y-4">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-gray-300">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => {
                if (plan.popular) {
                  if (confirm("Xác nhận nâng cấp gói VIP Pro giá 499.000đ/tháng?")) {
                    setIsVIP(true);
                    alert("Chúc mừng! Bạn đã nâng cấp gói VIP PRO thành công.");
                  }
                } else if (plan.title === "Enterprise") {
                  alert("Chúng tôi đã tiếp nhận yêu cầu! Đội ngũ tư vấn sẽ liên hệ lại qua thông tin tài khoản của bạn.");
                }
              }}
              className={`w-full py-4 rounded-2xl text-center font-bold text-sm transition-all mt-8 ${plan.popular ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30' : plan.title === "Starter" ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10 text-white'}`}
            >
              {plan.title === "Starter" ? plan.buttonText : isVIP && plan.popular ? "Đang Sử Dụng (VIP)" : plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Security note */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex items-center gap-4 max-w-2xl">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 shrink-0">
          <Shield size={24} />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">Giao dịch an toàn tuyệt đối</h4>
          <p className="text-xs text-gray-500 mt-1">Hệ thống thanh toán bảo mật liên kết với Stripe & Paypal. Dữ liệu tài chính của bạn được mã hóa hoàn toàn SSL 256-bit.</p>
        </div>
      </div>
    </div>
  );
}
