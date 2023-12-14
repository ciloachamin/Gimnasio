from typing import Optional
from pydantic import BaseModel

class Attendance(BaseModel):
    att_id: Optional[int] = None
    pla_id: int
    mem_id: int
    att_entry: str
    att_exit: Optional[str] = None

class Details(BaseModel):
    det_id: Optional[int] = None
    inv_id: int
    det_description: str
    det_price: float
    det_amount: int

class Donations(BaseModel):
    don_id: Optional[int] = None
    mem_id: Optional[int] = None
    don_date: str
    don_amount: float
    don_name: str
    don_price: float

class Exercise(BaseModel):
    exe_id: Optional[int] = None
    rou_id: int
    exe_name: Optional[str] = None
    exe_set: Optional[int] = None
    exe_reps: Optional[int] = None

class Invoice(BaseModel):
    inv_id: Optional[int] = None
    mem_id: int
    inv_date: str
    inv_number: int
    inv_total: float

class Manage(BaseModel):
    pla_id: int
    own_id: int

class Member(BaseModel):
    mem_id: Optional[int] = None
    pla_id: int
    mem_name: str
    mem_lastname: str
    mem_code: str
    mem_phone: str
    mem_email: str
    mem_location: str
    mem_password: str

class Membership(BaseModel):
    mbs_id: Optional[int] = None
    rou_id: Optional[int] = None
    mem_id: int
    pro_id: int
    mbs_start_date: str
    mbs_due_date: str
    mbs_state: Optional[bool] = None

class Owner(BaseModel):
    own_id: Optional[int] = None
    own_name: str
    own_lastname: str
    own_email: str
    own_password: str
    own_role: str

class Place(BaseModel):
    pla_id: Optional[int] = None
    pla_name: str
    pla_location: str
    pla_schedule: str
    pla_classschedule: str
    pla_type: str

class Product(BaseModel):
    pro_id: Optional[int] = None
    inv_id: int
    pro_name: str
    pro_description: str
    pro_cost: float
    pro_stock: int
    pro_category: str
    pro_duration: Optional[int] = None
    pro_benefits: Optional[str] = None

class Reservation(BaseModel):
    res_id: Optional[int] = None
    mem_id: int
    pla_id: int
    res_date: str
    res_hour: str
    res_state: bool

class Routine(BaseModel):
    rou_id: Optional[int] = None
    mbs_id: int
    rou_type: Optional[str] = None
    rou_name: Optional[str] = None

class CampoAmplio(BaseModel):
    ca_id: Optional[int] = None
    ca_nombre: str
    ca_descripcion: str

class CampoEspecifico(BaseModel):
    ce_id: Optional[int] = None
    ce_nombre: str
    ce_descripcion: str
    ca_id: int
