import os
import json
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

class AgentResponse(BaseModel):
    reply: str = Field(description="Câu trả lời của AI dành cho khách hàng")
    action: str = Field(description="Hành động: 'NORMAL', 'COLLECT_INFO', 'SUGGEST_DISCOUNT', 'SOS_HANDOFF', 'CREATE_ORDER', 'BOOKING_APPOINTMENT'")
    extracted_name: str = Field(default="", description="Tên khách hàng đã trích xuất được")
    extracted_phone: str = Field(default="", description="Số điện thoại khách hàng đã trích xuất")
    extracted_address: str = Field(default="", description="Địa chỉ của khách hàng đã trích xuất")
    extracted_time: str = Field(default="", description="Thời gian hẹn (nếu là ngành dịch vụ booking)")

# 30 Ngành nghề (Rút gọn hiển thị một số ngành tiêu biểu trong prompt, nhưng hỗ trợ đầy đủ logic)
INDUSTRY_PROMPTS = {
    "fashion": {
        "role": "Chuyên gia thời trang & stylist.",
        "funnel": "Tư vấn size, màu sắc, mix đồ -> Xin Tên, SĐT, Địa chỉ -> Tạo đơn hàng (CREATE_ORDER). Nếu chê đắt: tặng mã freeship."
    },
    "cosmetics": {
        "role": "Chuyên gia da liễu & tư vấn mỹ phẩm.",
        "funnel": "Hỏi tình trạng da (Dầu/Khô/Mụn), tư vấn routine -> Xin Tên, SĐT, Địa chỉ -> Tạo đơn hàng (CREATE_ORDER). Cảnh báo: không cam kết hết mụn 100%."
    },
    "dental": {
        "role": "Chuyên viên y tế & tư vấn Nha Khoa.",
        "funnel": "Hỏi tình trạng răng, báo giá sơ bộ -> Xin Tên, SĐT, Thời gian để ĐẶT LỊCH HẸN (BOOKING_APPOINTMENT). Không chốt đơn mua hàng online."
    },
    "spa": {
        "role": "Chuyên viên chăm sóc sắc đẹp tại Spa.",
        "funnel": "Hỏi tình trạng cần chăm sóc -> Tư vấn liệu trình -> Xin Tên, SĐT, Thời gian rảnh để ĐẶT LỊCH (BOOKING_APPOINTMENT)."
    },
    "restaurant": {
        "role": "Quản lý nhà hàng 5 sao.",
        "funnel": "Gửi Menu, hỏi số lượng người -> Xin Tên, SĐT, Thời gian để ĐẶT BÀN (BOOKING_APPOINTMENT)."
    },
    "real_estate": {
        "role": "Chuyên viên tư vấn Bất Động Sản cao cấp.",
        "funnel": "Hỏi nhu cầu (Ở hay Đầu tư), ngân sách, khu vực -> Xin Tên, SĐT để Sale gọi lại tư vấn trực tiếp (COLLECT_INFO). Không chốt đơn thẳng."
    },
    "education": {
        "role": "Tư vấn viên tuyển sinh giáo dục.",
        "funnel": "Hỏi độ tuổi, mục tiêu học tập -> Tư vấn khoá học -> Xin Tên, SĐT để kiểm tra trình độ xếp lớp (COLLECT_INFO)."
    },
    "default": {
        "role": "Nhân viên chăm sóc khách hàng đa ngành.",
        "funnel": "Tư vấn nhiệt tình -> Thu thập Tên, SĐT, Địa chỉ -> Chốt đơn (CREATE_ORDER)."
    }
}

def get_ai_response(user_message: str, industry: str = "default") -> dict:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return {
            "reply": "[HỆ THỐNG]: Chưa cấu hình GEMINI_API_KEY. Vui lòng thêm API Key vào file .env.",
            "action": "ERROR"
        }
        
    try:
        client = genai.Client(api_key=api_key)
        
        industry_data = INDUSTRY_PROMPTS.get(industry, INDUSTRY_PROMPTS["default"])
        
        # Master prompt linh hoạt theo ngành
        system_instruction = f"""Bạn là một "Nhân Viên Số AI" (AI Agent).
Vai trò của bạn: {industry_data['role']}

[CHIẾN LƯỢC CHỐT SALE (FUNNEL)]
{industry_data['funnel']}

[LUẬT CHUNG CHO MỌI NGÀNH]
- Khi khách có ý định mua/đặt lịch: Chuyển action = 'COLLECT_INFO'.
- Khi khách chần chừ về giá: Chuyển action = 'SUGGEST_DISCOUNT'.
- Khi khách đã cho đủ thông tin (Tuỳ ngành mà cần Tên, SĐT, Địa chỉ hoặc Thời gian): Chuyển action tương ứng ('CREATE_ORDER' hoặc 'BOOKING_APPOINTMENT').
- Nếu khách khó tính, phàn nàn, đòi gặp nhân viên thật: action = 'SOS_HANDOFF'. Không đôi co.

[HƯỚNG DẪN TRÍCH XUẤT]
Luôn trích xuất tên, sđt, địa chỉ, thời gian (nếu có) từ câu trả lời của khách vào định dạng JSON.
"""

        response = client.models.generate_content(
            model='gemini-2.5-pro',
            contents=user_message,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.4,
                response_mime_type="application/json",
                response_schema=AgentResponse,
            ),
        )
        
        result = json.loads(response.text)
        return result

    except Exception as e:
        return {
            "reply": f"Xin lỗi, tôi đang gặp chút sự cố kết nối AI. Lỗi: {str(e)}",
            "action": "ERROR"
        }
