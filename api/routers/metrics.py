from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from ..db import get_db
from ..models import WesternIndian

router = APIRouter()

@router.get("/summary")
def get_summary_metrics(db: Session = Depends(get_db)):
    try:
        # 1. Total References
        total_references = db.query(WesternIndian).count()

        # 1.1 Met & Has References
        met_with_references = db.query(WesternIndian).filter(
            WesternIndian.met_status.like('Met%'),
            WesternIndian.reference_status == 'Yes'
        ).count()

        # 1.2 Met & Has No References
        met_no_references = db.query(WesternIndian).filter(
            WesternIndian.met_status.like('Met%'),
            WesternIndian.reference_status == 'No'
        ).count()

        # 1.3 Not Met & Has References
        not_met_with_references = db.query(WesternIndian).filter(
            WesternIndian.met_status == 'Not Met Both Years',
            WesternIndian.reference_status == 'Yes'
        ).count()

        # 1.4 Not Met & Has No References
        not_met_no_references = db.query(WesternIndian).filter(
            WesternIndian.met_status == 'Not Met Both Years',
            WesternIndian.reference_status == 'No'
        ).count()

        # 2. Met Data
        met_both_years = db.query(WesternIndian).filter(
            WesternIndian.met_status == 'Met in Both Years'
        ).count()

        met_2021_only = db.query(WesternIndian).filter(
            WesternIndian.met_status == 'Met in 2021 Only'
        ).count()

        met_2024_only = db.query(WesternIndian).filter(
            WesternIndian.met_status == 'Met in 2024 Only'
        ).count()

        not_met_both_years = db.query(WesternIndian).filter(
            WesternIndian.met_status == 'Not Met Both Years'
        ).count()

        # 3. Voters & Met Data
        total_met_2021 = db.query(WesternIndian).filter(
            WesternIndian.Met_2021.isnot(None)
        ).count()

        total_met_2024 = db.query(WesternIndian).filter(
            WesternIndian.VPD_Met_2024.isnot(None)
        ).count()

        total_voters = db.query(WesternIndian).count()

        # 4. ViShare Data
        total_vishare = db.query(WesternIndian).filter(
            WesternIndian.Vishare.isnot(None)
        ).count()

        met_with_vishare = db.query(WesternIndian).filter(
            WesternIndian.Vishare.isnot(None),
            WesternIndian.met_status.like('Met%')
        ).count()

        met_no_vishare = db.query(WesternIndian).filter(
            WesternIndian.Vishare.is_(None),
            WesternIndian.met_status.like('Met%')
        ).count()

        not_met_with_vishare = db.query(WesternIndian).filter(
            WesternIndian.Vishare.isnot(None),
            WesternIndian.met_status == 'Not Met Both Years'
        ).count()

        not_met_no_vishare = db.query(WesternIndian).filter(
            WesternIndian.Vishare.is_(None),
            WesternIndian.met_status == 'Not Met Both Years'
        ).count()

        # Return all metrics in a dictionary
        return {
            "total_references": total_references,
            "met_with_references": met_with_references,
            "met_no_references": met_no_references,
            "not_met_with_references": not_met_with_references,
            "not_met_no_references": not_met_no_references,
            "met_both_years": met_both_years,
            "met_2021_only": met_2021_only,
            "met_2024_only": met_2024_only,
            "not_met_both_years": not_met_both_years,
            "total_met_2021": total_met_2021,
            "total_met_2024": total_met_2024,
            "total_voters": total_voters,
            "total_vishare": total_vishare,
            "met_with_vishare": met_with_vishare,
            "met_no_vishare": met_no_vishare,
            "not_met_with_vishare": not_met_with_vishare,
            "not_met_no_vishare": not_met_no_vishare,
        }

    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail="Database error occurred.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
