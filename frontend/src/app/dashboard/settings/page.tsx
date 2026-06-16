"use client";

import { motion } from "framer-motion";
import { Save, UploadCloud, Building, User, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    admin_name: "Nguyễn Quốc Thiện",
    brand_name: "Thượng Đỉnh Yến Sào",
    brand_desc: "Chuyên cung cấp các loại tổ yến thô, yến tinh chế cao cấp đạt tiêu chuẩn xuất khẩu.",
    logo_url: ""
  });

  const [saved, setSaved] = useState(false);

  const handleLogoUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, logo_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    alert("Đã lưu thông tin hồ sơ doanh nghiệp thành công!");
  };

  return (
    <div className="space-y-8 pb-10 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Cài Đặt Hồ Sơ Doanh Nghiệp</h1>
        <p className="text-gray-400 mt-2">Quản lý hồ sơ doanh nghiệp của bạn, thiết lập tên quản trị viên, thương hiệu và logo đại diện hiển thị trên trang hồ sơ.</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 space-y-6">
        
        {/* Logo and uploads */}
        <div className="flex items-center gap-6 pb-6 border-b border-white/5">
          <div className="w-24 h-24 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
            {profile.logo_url ? (
              <img src={profile.logo_url} className="w-full h-full object-cover" />
            ) : (
              <Building className="w-10 h-10 text-gray-500" />
            )}
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-white text-base">Logo Thương Hiệu</h3>
            <p className="text-xs text-gray-400">Khuyên dùng ảnh hình vuông tỷ lệ 1:1, dung lượng không quá 2MB.</p>
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all inline-block">
              Tải Lên Logo
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </label>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5">
                <User size={14} /> Tên Admin / Quản Trị Viên
              </label>
              <input 
                type="text" 
                value={profile.admin_name}
                onChange={e => setProfile({ ...profile, admin_name: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5">
                <Building size={14} /> Tên Thương Hiệu / Doanh Nghiệp
              </label>
              <input 
                type="text" 
                value={profile.brand_name}
                onChange={e => setProfile({ ...profile, brand_name: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5">
              <FileText size={14} /> Mô Tả Doanh Nghiệp
            </label>
            <textarea 
              rows={4}
              value={profile.brand_desc}
              onChange={e => setProfile({ ...profile, brand_desc: e.target.value })}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none resize-none leading-relaxed" 
            />
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 flex items-center justify-between">
          <div>
            {saved && (
              <span className="text-xs text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Thay đổi của bạn đã được ghi nhận.
              </span>
            )}
          </div>
          <button 
            onClick={handleSave}
            className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2 text-sm"
          >
            <Save size={18} /> Lưu Thay Đổi
          </button>
        </div>

      </div>
    </div>
  );
}
