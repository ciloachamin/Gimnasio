
declare module "member-info" {

    interface MemberInfo {
        pla_id: number,                 
        mem_id: number,                 
        mem_name: string,               
        mem_lastname: string,           
        mem_code: string,               
        mem_phone: string,              
        mem_email: string,              
        mem_location: string,           
        mem_password: string,           
        pro_id: number,                 
        inv_id: number,                 
        pro_name: string,               
        pro_description: string,        
        pro_cost: string,               
        pro_stock: number,              
        pro_category: string,           
        pro_duration: null,             
        pro_benefits: string,           
        mbs_id: number,                 
        rou_id: null,                   
        mbs_start_date: string,         
        mbs_due_date: string,           
        mbs_state: boolean,             
        res_id: number,                 
        res_date: string,               
        res_hour: string,               
        res_state: boolean,             
        last_reservation_date: string,  
        reservation_state: boolean,     
        reservation_hour: string,       
        membership_state: boolean,      
        membership_name: string,        
        is_membership_available: boolean 
    }
  }
  