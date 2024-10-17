from sqlalchemy import Column, String, BigInteger, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class WesternIndian(Base):
    __tablename__ = "western_indian"
    
    MRN = Column(BigInteger, primary_key=True, index=True)
    Name = Column(Text)
    Met_2021 = Column(String)  # Make sure this matches exactly
    VPD_Met_2024 = Column(String)
    Vishare = Column(String)
    REF1 = Column(Text)
    REF2 = Column(Text)
    REF3 = Column(Text)
    REF_4 = Column(Text)
    met_status = Column(String(50))
    reference_status = Column(String(5))