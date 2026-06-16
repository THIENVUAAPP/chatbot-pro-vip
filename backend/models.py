from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Subscription(Base):
    __tablename__ = "subscriptions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_name = Column(String) # Ví dụ: free, pro, enterprise
    status = Column(String) # active, expired
    expires_at = Column(DateTime)
    
class BotConfig(Base):
    __tablename__ = "bot_configs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    bot_name = Column(String)
    industry = Column(String)
    system_prompt = Column(String)
    is_active = Column(Boolean, default=True)
    voice_enabled = Column(Boolean, default=False)

class ApiKeyPool(Base):
    __tablename__ = "api_key_pool"
    id = Column(Integer, primary_key=True, index=True)
    provider = Column(String) # Ví dụ: gemini, elevenlabs
    api_key = Column(String, unique=True)
    tier = Column(String) # free_tier, paid_tier
    is_active = Column(Boolean, default=True)
    usage_count = Column(Integer, default=0)
