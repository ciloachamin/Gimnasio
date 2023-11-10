from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routes.route_gimnasio import route_gimnasio

app = FastAPI(
    title="Gimnasio API",
    description="API para el manejo de un gimnasio",
    version="0.1",
    openapi_tags=[{
        "name": "Route GYM",
        "description": "Rutas para el manejo de un gimnasio"
    }]
    
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

@app.middleware("http")
async def add_cors_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
    return response

@app.get('/')
def index():
    return {"message": "Bienvenido a la API del gimnasio"}

@app.get('/api/v1/gimnasio')
def index():
    return {"message": "Bienvenido a la API del gimnasio"}

app.include_router(route_gimnasio, tags=["Route Gimnasio"], prefix="/api/v1/gimnasio")
