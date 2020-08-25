import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface datosDonacion{
    id?: string;
    iddonante: string;
    fechadonacion: Date;
    nombretienda: string;
    estado: string;
    descripcion: string;
    aprobacion: boolean;  
}
