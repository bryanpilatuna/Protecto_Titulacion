import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface datosDonacion{
    id?: string;
    iddonante: string;
    fechadonacion: Date;
    estado: string;
    descripcion: string;
    aprobacion: boolean;  
    idtienda:string;
}
