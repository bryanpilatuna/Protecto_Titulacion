export interface datosDonacion{
    id?: string;
    iddonante: string;
    fechadonacion: Date;
    estado: string;
    descripcion: string;
    aprobacion: boolean;  
    idtienda:string;
    anular:boolean;
    modo:string;
}
