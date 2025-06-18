from fastapi import APIRouter
from tetroweb.backend.leaderboard.rest.fastapi import router as leaderboard_router

endpoint = APIRouter(prefix="/api/v1")

endpoint.include_router(leaderboard_router, prefix="/leaderboard", tags=["leaderboard"])
