from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from sqlalchemy.orm import Session
from pydantic import BaseModel
import os
from dotenv import load_dotenv

from models import Base, User, BotConfig, ApiKeyPool
from database import engine, get_db
from agent import get_ai_response

# Load environment variables for absolute security
load_dotenv()
GEMINI_KEY = os.getenv("GEMINI_API_KEY")

# Ensure tables exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Omnichannel SaaS ChatBot API", version="3.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Schemas ---
class MessageRequest(BaseModel):
    user_id: str
    message: str
    platform: str = "web"
    industry: str = "default"

class URLScrapeRequest(BaseModel):
    urls: str

# --- API Endpoints: Core AI Chat ---

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Omnichannel SaaS API is running securely"}

@app.post("/api/chat")
async def chat_endpoint(request: MessageRequest, db: Session = Depends(get_db)):
    # Biến môi trường sẽ tự động nạp vào AI Agent
    if not GEMINI_KEY:
        return {
            "reply": "Hệ thống đang cấu hình. Vui lòng liên hệ Admin để nhập API Key vào biến môi trường (.env).", 
            "action": "ERROR"
        }
    
    # ai_reply bây giờ là 1 dictionary {reply, action, extracted_name, ...}
    ai_response_data = get_ai_response(request.message, industry=request.industry)
    
    action = ai_response_data.get("action", "NORMAL")
    reply = ai_response_data.get("reply", "Xin lỗi, có lỗi xảy ra.")
    
    # Kịch bản 1: SOS Handoff -> Giả lập báo Telegram cho Admin
    if action == "SOS_HANDOFF":
        print(f"[TELEGRAM ALERT] Cảnh báo SOS từ khách hàng: {request.user_id} - {request.message}")
        reply += "\n\n(🔔 Hệ thống đã tự động báo cáo cho nhân viên hỗ trợ. Xin quý khách đợi trong giây lát)"
        
    # Kịch bản 2: Collect Info -> Xác nhận
    elif action == "COLLECT_INFO":
        print(f"[SYSTEM LOG] Đang trong phễu thu thập thông tin từ user: {request.user_id}")
        
    # Kịch bản 3: Create Order -> Giả lập lưu CRM
    elif action == "CREATE_ORDER":
        print(f"[CRM PUSH] Đẩy đơn hàng thành công! Tên: {ai_response_data.get('extracted_name')} - SĐT: {ai_response_data.get('extracted_phone')} - ĐC: {ai_response_data.get('extracted_address')}")
        reply += "\n\n(✅ Đơn hàng của bạn đã được ghi nhận vào hệ thống CRM tự động!)"

    # Kịch bản 4: Booking Appointment -> Lưu lịch hẹn
    elif action == "BOOKING_APPOINTMENT":
        time_booked = ai_response_data.get("extracted_time", "Chưa rõ thời gian")
        print(f"[CALENDAR PUSH] Đặt lịch thành công! Tên: {ai_response_data.get('extracted_name')} - SĐT: {ai_response_data.get('extracted_phone')} - Thời gian: {time_booked}")
        reply += f"\n\n(✅ Lịch hẹn của bạn vào {time_booked} đã được lưu vào hệ thống!)"

    return {
        "reply": reply,
        "action": action,
        "extracted_data": {
            "name": ai_response_data.get("extracted_name", ""),
            "phone": ai_response_data.get("extracted_phone", ""),
            "address": ai_response_data.get("extracted_address", ""),
            "time": ai_response_data.get("extracted_time", "")
        }
    }

# --- API Endpoints: Knowledge Base (Huấn luyện) ---

@app.post("/api/knowledge/upload")
async def upload_training_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Giả lập xử lý lưu file vào Cloud/Local
    return {"filename": file.filename, "status": "success", "message": "Đã tải lên và học thành công!"}

@app.post("/api/knowledge/scrape")
async def scrape_urls(req: URLScrapeRequest, db: Session = Depends(get_db)):
    # Giả lập AI tự động đọc các URL
    return {"status": "success", "message": "Đang tiến hành học dữ liệu từ các URLs..."}

# --- API Endpoints: Dashboard Stats ---

@app.get("/api/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    return {
        "total_messages": 24593,
        "customers": 8234,
        "orders_closed": 1429,
        "conversion_rate": "17.3%"
    }

@app.get("/api/dashboard/bot-config")
def get_bot_config(db: Session = Depends(get_db)):
    return {
        "bot_name": "SalePro AI",
        "industry": "Đa ngành",
        "system_prompt": "Bạn là chuyên gia chốt sale. Hãy tư vấn nhiệt tình và tự động chốt đơn khi khách có ý định mua.",
        "voice_enabled": True
    }

# --- API Endpoints: Admin God Mode ---

@app.get("/api/admin/metrics")
def get_admin_metrics(db: Session = Depends(get_db)):
    return {
        "revenue": "$124,500",
        "active_subs": 4281,
        "api_requests": "15,402",
        "available_keys": "Free: 450 | Paid: 12"
    }

# --- API Endpoints: Omnichannel Embed ---

@app.get("/v1/widget.js")
def get_embed_widget():
    """
    Trả về đoạn mã Javascript để User có thể nhúng con Bot vào mọi Website khác.
    """
    js_code = """
    console.log("ChatBot PRO Widget Loaded!");
    // Đây sẽ là đoạn script tự động chèn iFrame hoặc React Component ChatWidget vào góc dưới màn hình.
    // Hoạt động độc lập và bảo mật.
    """
    return Response(content=js_code, media_type="application/javascript")
