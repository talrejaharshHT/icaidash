# api/routers/members.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from ..db import get_db
from ..models import WesternIndian

router = APIRouter()

@router.post("/fetch_members", status_code=200)
def fetch_members(mrn_list: list[int], db: Session = Depends(get_db)):
    try:
        if not mrn_list:
            raise HTTPException(status_code=400, detail="No MRN provided.")

        members = db.query(WesternIndian).filter(WesternIndian.MRN.in_(mrn_list)).all()
        if not members:
            raise HTTPException(status_code=404, detail="No members found.")

        return members

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Database error.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
