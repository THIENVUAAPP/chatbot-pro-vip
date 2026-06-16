"use client";

import { Save, UploadCloud, Link as LinkIcon, Mic } from "lucide-react";

export default function BotConfigPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Quản lý Bot AI</h1>
        <p className="text-gray-400">Huấn luyện và cấu hình tính cách cho nhân viên sale AI của bạn.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><BotIcon /> Cấu hình cơ bản</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Tên Bot</label>
                <input type="text" defaultValue="SalePro Assistant" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Ngành nghề</label>
                <select className="w-full bg-[#150f24] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none appearance-none">
                  <option>Thời trang & Mỹ phẩm</option>
                  <option>Bất động sản</option>
                  <option>Công nghệ & Điện tử</option>
                  <option>Dịch vụ / Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Prompt Lõi (Tính cách & Nhiệm vụ)</label>
                <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors resize-none" defaultValue={"Bạn là chuyên viên tư vấn cao cấp. Hãy luôn xưng 'em' và gọi khách là 'anh/chị'. Nhiệm vụ của bạn là chốt đơn càng nhanh càng tốt."} />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Mic className="w-5 h-5 text-purple-400"/> Voice AI (Cấu hình Giọng nói)</h2>
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white shadow-lg">VIP PRO</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
                <div>
                  <p className="font-medium text-white">Kích hoạt Voice AI</p>
                  <p className="text-sm text-gray-400">Cho phép bot nghe và nói chuyện trực tiếp với khách hàng.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Chọn Giọng (ElevenLabs)</label>
                <select className="w-full bg-[#150f24] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none appearance-none">
                  <option>Giọng Nữ Ngọt Ngào (Thảo)</option>
                  <option>Giọng Nam Trầm Ấm (Hoàng)</option>
                  <option>Giọng Chuyên Nghiệp (Hà Nội)</option>
                  <option>Giọng Tự Nhiên (Sài Gòn)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-bold mb-4">Nguồn Kiến Thức (Knowledge Base)</h2>
            <p className="text-sm text-gray-400 mb-6">Cung cấp dữ liệu để Bot học hỏi thông tin sản phẩm của bạn.</p>
            
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/20 hover:bg-white/5 transition-colors text-gray-300">
                <LinkIcon className="w-4 h-4" /> Crawl từ Website
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/20 hover:bg-white/5 transition-colors text-gray-300">
                <UploadCloud className="w-4 h-4" /> Tải lên File (PDF/TXT/CSV)
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-sm font-medium text-white mb-3">Dữ liệu đã nạp (2)</h3>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-white/5 flex justify-between items-center text-sm">
                  <span className="text-gray-300 truncate">banggia_sp_2026.pdf</span>
                  <span className="text-emerald-400 text-xs">Đã huấn luyện</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex justify-between items-center text-sm">
                  <span className="text-gray-300 truncate">https://myshop.com/products</span>
                  <span className="text-emerald-400 text-xs">Đã huấn luyện</span>
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> Lưu Cấu Hình
          </button>
        </div>
      </div>
    </div>
  );
}

function BotIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>;
}
