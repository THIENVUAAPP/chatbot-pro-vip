"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, UploadCloud, Link as LinkIcon, Mic, Store, 
  X, CheckCircle2, Pencil, Trash2, Video, Image as ImageIcon, Sparkles 
} from "lucide-react";
import { useState } from "react";

export default function BotConfigPage() {
  const [botConfig, setBotConfig] = useState({
    bot_name: "Assistant Pro",
    voice_enabled: true,
    response_mode: "both", // "text", "voice", "both"
    selected_voice: "Thảo Ngọt Ngào (ElevenLabs)",
    system_prompt: "Bạn là chuyên viên tư vấn cao cấp. Hãy luôn xưng 'em' và gọi khách là 'anh/chị'.",
    logo_url: "",
    avatar_url: "",
    video_avatar_url: ""
  });

  const [selectedIndustry, setSelectedIndustry] = useState("fashion");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [industries, setIndustries] = useState<any[]>([
    { id: "fashion", name: "Thời Trang & Quần Áo", desc: "Tư vấn size, mix đồ, chốt sale nhanh", icon: "👗", color: "from-pink-500 to-rose-500", agent: "Fashion AI Agent", skills: "Tư vấn size, Chốt đơn, Tung mã giảm giá", prompt: "Bạn là chuyên gia tư vấn thời trang. Hãy chốt đơn nhanh." },
    { id: "cosmetics", name: "Mỹ Phẩm & Skincare", desc: "Soi da, tư vấn liệu trình, chốt đơn", icon: "💄", color: "from-rose-400 to-red-500", agent: "Cosmetics AI Agent", skills: "Tư vấn liệu trình, Soi da, Bán chéo mỹ phẩm", prompt: "Bạn là chuyên gia skincare. Hãy tư vấn liệu trình và chốt đơn." },
    { id: "dental", name: "Nha Khoa", desc: "Khám răng, niềng răng, chốt Đặt Lịch", icon: "🦷", color: "from-cyan-400 to-blue-500", agent: "Dental AI Agent", skills: "Đặt lịch hẹn, Tư vấn răng miệng", prompt: "Bạn là trợ lý nha khoa. Hãy đặt lịch hẹn khám răng." },
    { id: "spa", name: "Spa & Làm Đẹp", desc: "Chăm sóc da, massage, chốt Đặt Lịch", icon: "💆‍♀️", color: "from-fuchsia-500 to-purple-600", agent: "Spa AI Agent", skills: "Đặt lịch hẹn, Tư vấn dịch vụ massage", prompt: "Bạn là trợ lý spa. Hãy đặt lịch chăm sóc da." },
    { id: "clinic", name: "Phòng Khám Bệnh", desc: "Tư vấn bệnh lý cơ bản, chốt Khám", icon: "🏥", color: "from-red-500 to-red-700", agent: "Clinic AI Agent", skills: "Hẹn khám bệnh, Hỏi triệu chứng cơ bản", prompt: "Bạn là trợ lý y tế. Hãy tư vấn bệnh lý cơ bản." },
    { id: "real_estate", name: "Bất Động Sản", desc: "Tư vấn dự án, xin SĐT Sale gọi lại", icon: "🏢", color: "from-amber-500 to-orange-600", agent: "Property AI Agent", skills: "Thu thập SĐT khách quan tâm, Tư vấn căn hộ", prompt: "Bạn là chuyên viên bất động sản. Hãy thu thập SĐT để gọi lại." }
  ]);

  const [trainedFiles, setTrainedFiles] = useState([
    { name: "banggia_sanpham_2026.pdf", type: "pdf", size: "1.2 MB", status: "Đã huấn luyện" },
    { name: "kichban_chotsale.csv", type: "csv", size: "240 KB", status: "Đã huấn luyện" }
  ]);

  const handleDeleteIndustry = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa kịch bản ngành nghề này?")) {
      const updated = industries.filter(ind => ind.id !== id);
      setIndustries(updated);
      if (selectedIndustry === id && updated.length > 0) {
        setSelectedIndustry(updated[0].id);
      }
    }
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase();
      const allowed = ["pdf", "csv", "txt", "docx", "xlsx"];
      if (!allowed.includes(extension)) {
        alert("Chỉ hỗ trợ file PDF, CSV, TXT, DOCX, XLSX!");
        return;
      }
      setTrainedFiles([...trainedFiles, {
        name: file.name,
        type: extension,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        status: "Đang phân tích..."
      }]);
      setTimeout(() => {
        setTrainedFiles(prev => prev.map(f => f.name === file.name ? { ...f, status: "Đã huấn luyện" } : f));
      }, 3000);
    }
  };

  const handleAvatarUpload = (type: string, e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBotConfig(prev => ({ ...prev, [type]: reader.result as string }));
      };
      reader.readAsDataURL(file);
      alert(`Đã tải lên tệp cho Bot làm ${type === 'logo_url' ? 'Logo' : type === 'avatar_url' ? 'Avatar Ảnh' : 'Avatar Video'}!`);
    }
  };

  const handleApplyIndustry = (ind: any) => {
    setSelectedIndustry(ind.id);
    setBotConfig(prev => ({
      ...prev,
      system_prompt: ind.prompt || prev.system_prompt
    }));
    alert("Đã áp dụng kịch bản: " + ind.name);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Quản Lý Trợ Lý Bot AI</h1>
        <p className="text-gray-400 mt-2">Cấu hình linh hồn AI, tải lên tài liệu học tập, thiết lập avatar đa phương tiện và giọng nói ElevenLabs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Basic Config and Avatar Uploads */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Config */}
          <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">⚙️ Cấu Hình Trợ Lý Lõi</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Tên Trợ Lý Bot</label>
                <input 
                  type="text" 
                  value={botConfig.bot_name} 
                  onChange={e => setBotConfig({ ...botConfig, bot_name: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Chế Độ Trả Lời</label>
                <select 
                  value={botConfig.response_mode}
                  onChange={e => setBotConfig({ ...botConfig, response_mode: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none"
                >
                  <option value="both">Hỏi gì trả lời cả Text và Voice (Hội thoại thoại)</option>
                  <option value="text">Chỉ trả lời bằng Text (Văn bản)</option>
                  <option value="voice">Chỉ trả lời bằng Voice (Cuộc gọi thoại)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">System Prompt (Chỉ thị hành vi & kịch bản)</label>
              <textarea 
                rows={5} 
                value={botConfig.system_prompt}
                onChange={e => setBotConfig({ ...botConfig, system_prompt: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none resize-none leading-relaxed" 
              />
            </div>
          </div>

          {/* Voice configuration */}
          <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 space-y-4">
            <h2 className="text-xl font-bold flex items-center justify-between text-white">
              <span className="flex items-center gap-2"><Mic className="text-purple-400"/> Voice AI (Cấu hình Giọng nói)</span>
              <span className="px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/30 rounded text-[10px] font-bold text-yellow-500">VIP PRO</span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Đọc Giọng Trực Tuyến (ElevenLabs)</label>
                <select 
                  value={botConfig.selected_voice}
                  onChange={e => setBotConfig({ ...botConfig, selected_voice: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none"
                >
                  <option>Thảo Ngọt Ngào (Giọng Nữ Việt Nam)</option>
                  <option>Hà Nội Trầm Ấm (Giọng Nam Bắc)</option>
                  <option>Sài Gòn Tự Nhiên (Giọng Nữ Nam)</option>
                </select>
              </div>
              <div className="flex items-end pb-1">
                <button 
                  onClick={() => alert("Đang phát thử giọng AI...")}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold transition-all"
                >
                  🔊 Phát Thử Giọng Mẫu
                </button>
              </div>
            </div>
          </div>

          {/* Avatar & Logo Uploads */}
          <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">🎨 Đại Diện Thương Hiệu Cho Bot</h2>
            <div className="grid grid-cols-3 gap-6">
              
              {/* Logo Upload */}
              <div className="bg-black/50 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center relative">
                <div className="w-16 h-16 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-3 overflow-hidden">
                  {botConfig.logo_url ? <img src={botConfig.logo_url} className="w-full h-full object-cover" /> : <Sparkles className="w-6 h-6 text-gray-500" />}
                </div>
                <h4 className="text-xs font-bold text-white mb-1">Logo Doanh Nghiệp</h4>
                <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 px-3 rounded-lg text-[10px] transition-colors mt-2">
                  Tải Lên
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleAvatarUpload("logo_url", e)} />
                </label>
              </div>

              {/* Avatar Image Upload */}
              <div className="bg-black/50 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center relative">
                <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-3 overflow-hidden">
                  {botConfig.avatar_url ? <img src={botConfig.avatar_url} className="w-full h-full object-cover" /> : <ImageIcon className="w-6 h-6 text-gray-500" />}
                </div>
                <h4 className="text-xs font-bold text-white mb-1">Ảnh Avatar Bot</h4>
                <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 px-3 rounded-lg text-[10px] transition-colors mt-2">
                  Tải Lên
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleAvatarUpload("avatar_url", e)} />
                </label>
              </div>

              {/* Avatar Video Upload */}
              <div className="bg-black/50 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center relative">
                <div className="w-16 h-16 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-3 overflow-hidden">
                  {botConfig.video_avatar_url ? (
                    <video src={botConfig.video_avatar_url} className="w-full h-full object-cover" autoPlay loop muted />
                  ) : (
                    <Video className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <h4 className="text-xs font-bold text-white mb-1">Avatar Video</h4>
                <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 px-3 rounded-lg text-[10px] transition-colors mt-2">
                  Tải Lên Video
                  <input type="file" accept="video/*" className="hidden" onChange={e => handleAvatarUpload("video_avatar_url", e)} />
                </label>
              </div>

            </div>
          </div>

          {/* Industries selection (CRUD) */}
          <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">💼 Kho Kịch Bản Ngành Nghề (Dynamic Templates)</h2>
            <div className="grid grid-cols-2 gap-4">
              {industries.map(ind => (
                <div 
                  key={ind.id}
                  onClick={() => handleApplyIndustry(ind)}
                  className={`p-4 rounded-2xl border cursor-pointer relative group transition-all duration-300 ${selectedIndustry === ind.id ? 'bg-white/10 border-blue-500 shadow-lg' : 'bg-black/40 border-white/5 hover:border-white/20'}`}
                >
                  <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-black/85 p-1 rounded-lg">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setEditData(ind); setShowCustomModal(true); }}
                      className="p-1 hover:text-cyan-400"
                    >
                      <Pencil size={12} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteIndustry(ind.id); }}
                      className="p-1 hover:text-red-400"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  
                  <div className="flex gap-3 items-center mb-2">
                    <span className="text-2xl">{ind.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm text-white">{ind.name}</h4>
                      <p className="text-[10px] text-gray-400">🤖 {ind.agent}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-snug">{ind.desc}</p>
                  <div className="text-[10px] text-emerald-400 mt-2 font-medium">⚡ Skill: {ind.skills}</div>
                </div>
              ))}
              
              <div 
                onClick={() => { setEditData(null); setShowCustomModal(true); }}
                className="p-4 rounded-2xl border border-dashed border-white/20 bg-black/40 hover:border-blue-500 flex flex-col items-center justify-center cursor-pointer min-h-[120px] text-center"
              >
                <span className="text-2xl text-gray-400">+</span>
                <span className="font-bold text-xs text-gray-300 mt-1">Tạo Ngành Mới</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Knowledge Base Upload */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">📚 Nguồn Kiến Thức (Knowledge)</h2>
              <p className="text-xs text-gray-400">Huấn luyện Bot bằng việc nạp các tài liệu văn bản, bảng tính sản phẩm, hoặc hướng dẫn chốt sale.</p>
            </div>
            
            {/* Upload Area for all extensions */}
            <div className="border border-dashed border-white/20 rounded-2xl p-6 text-center hover:border-blue-500 hover:bg-white/5 transition-all relative">
              <UploadCloud className="w-10 h-10 mx-auto text-gray-500 mb-3" />
              <p className="text-xs font-bold text-white mb-1">Kéo thả hoặc click để upload</p>
              <p className="text-[10px] text-gray-500 mb-4">Hỗ trợ PDF, CSV, TXT, DOCX, XLSX</p>
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all inline-block">
                Chọn Tài Liệu
                <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.csv,.txt,.docx,.xlsx" />
              </label>
            </div>

            {/* List of uploaded files */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-xs font-bold text-white">Dữ liệu đã nạp ({trainedFiles.length})</h4>
              {trainedFiles.map((file, i) => (
                <div key={i} className="p-3 bg-black/50 border border-white/5 rounded-xl flex justify-between items-center">
                  <div className="overflow-hidden pr-2">
                    <p className="text-xs font-bold text-white truncate">{file.name}</p>
                    <p className="text-[10px] text-gray-500">{file.size} • .{file.type.toUpperCase()}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${file.status === 'Đã huấn luyện' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                    {file.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => alert("Đã lưu toàn bộ cấu hình AI Agent thành công!")}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
          >
            💾 Lưu Cấu Hình AI Agent
          </button>
        </div>

      </div>

      {/* Add/Edit Industry Modal */}
      <AnimatePresence>
        {showCustomModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-lg p-6 space-y-4"
            >
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Store className="text-blue-400" size={20}/> {editData ? "Sửa Kịch Bản Ngành Nghề" : "Thêm Ngành Nghề Mới"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 mb-1.5">Tên Ngành</label>
                  <input 
                    type="text" 
                    defaultValue={editData?.name} 
                    id="ind_name"
                    placeholder="Ví dụ: Bán Yến Sào..." 
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 mb-1.5">Mô Tả Ngắn</label>
                  <input 
                    type="text" 
                    defaultValue={editData?.desc} 
                    id="ind_desc"
                    placeholder="Ví dụ: Tư vấn liệu trình, chốt đơn..." 
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 mb-1.5">Tên AI Agent</label>
                  <input 
                    type="text" 
                    defaultValue={editData?.agent} 
                    id="ind_agent"
                    placeholder="Ví dụ: YếnSào AI Expert" 
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 mb-1.5">Kỹ Năng Hỗ Trợ (Skills)</label>
                  <input 
                    type="text" 
                    defaultValue={editData?.skills} 
                    id="ind_skills"
                    placeholder="Đặt lịch, Tư vấn giá, Bán sỉ..." 
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 mb-1.5">Chỉ Thị System Prompt</label>
                <textarea 
                  rows={4}
                  defaultValue={editData?.prompt} 
                  id="ind_prompt"
                  placeholder="Kịch bản AI phải xưng em gọi khách là anh chị..." 
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white focus:border-blue-500 outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowCustomModal(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all text-xs"
                >
                  Hủy
                </button>
                <button 
                  onClick={() => {
                    const name = (document.getElementById("ind_name") as HTMLInputElement).value;
                    const desc = (document.getElementById("ind_desc") as HTMLInputElement).value;
                    const agent = (document.getElementById("ind_agent") as HTMLInputElement).value;
                    const skills = (document.getElementById("ind_skills") as HTMLInputElement).value;
                    const prompt = (document.getElementById("ind_prompt") as HTMLTextAreaElement).value;
                    if(!name) return;
                    if (editData) {
                      setIndustries(prev => prev.map(ind => ind.id === editData.id ? { ...ind, name, desc, agent, skills, prompt } : ind));
                    } else {
                      setIndustries([...industries, { id: "custom_" + Date.now(), name, desc, agent, skills, prompt, icon: "✨", color: "from-cyan-600 to-blue-700" }]);
                    }
                    setShowCustomModal(false);
                    setEditData(null);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all text-xs"
                >
                  Lưu Lại
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
