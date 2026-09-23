from sqlalchemy import Column, String, Boolean, Integer, Float, Text
from app.database import Base

class DBHouseholdSession(Base):
    __tablename__ = "household_sessions"

    session_id = Column(String, primary_key=True, index=True)
    family_type = Column(String, nullable=True)
    occupation = Column(String, nullable=True)
    monthly_income = Column(Integer, nullable=True)
    family_size = Column(Integer, nullable=True)
    district = Column(String, nullable=True)
    welfare_registration = Column(Boolean, nullable=True)
    occupation_document = Column(Boolean, nullable=True)
    language = Column(String, default="ml")

class DBScheme(Base):
    __tablename__ = "schemes"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    name_ml = Column(String)
    description = Column(Text)
    description_ml = Column(Text)
    target_group = Column(String)
    eligibility_rules_json = Column(Text)  # JSON string of rules
    required_documents_json = Column(Text)  # JSON list
    required_documents_ml_json = Column(Text)
    application_method = Column(String)
    application_method_ml = Column(String)
    application_location = Column(String)
    application_location_ml = Column(String)
    source = Column(String, default="Demo Rules Engine")
    status = Column(String, default="active")
    is_demo = Column(Boolean, default=True)

class DBApplicationCentre(Base):
    __tablename__ = "application_centres"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    name_ml = Column(String)
    district = Column(String)
    address = Column(Text)
    address_ml = Column(Text)
    services_json = Column(Text)
    services_ml_json = Column(Text)
    opening_hours = Column(String)
    opening_hours_ml = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    phone = Column(String)
    is_demo = Column(Boolean, default=True)
