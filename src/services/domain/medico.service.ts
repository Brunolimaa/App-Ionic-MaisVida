import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { MedicoDTO } from "../../models/medico.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class MedicoService {

    constructor(public http: HttpClient){

    }

    findAll() : Observable<MedicoDTO[]> {
        return this.http.get<MedicoDTO[]>(`${API_CONFIG.baseUrl}/medicos`);
    }

    insert(obj : MedicoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/medicos`,
            obj, 
            {
                observe : 'response',
                responseType: 'text'
            }
        )
    }

    findByMedico(id : string){
        return this.http.get(`${API_CONFIG.baseUrl}/medicos/${id}`);
    }

    update(id : string, obj : MedicoDTO){
       // return this.http.put(`${API_CONFIG.baseUrl}/medicos/${id}`, );
        return this.http.put(`${API_CONFIG.baseUrl}/medicos/${id}`, obj,
         {  
             observe : 'response',
             responseType: 'text' 
        });

    }
}