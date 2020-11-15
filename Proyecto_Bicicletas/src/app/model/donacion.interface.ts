export interface datosDonacion{
    id?: string;
    iddonante: string;
    fechadonacion: Date;
    fechasolicitud:Date;
    estado: string;
    descripcion: string;
    aprobacion: boolean;  
    idtienda:string;
    anular:boolean;
    modo:string;
    direccion:string;
    telefono:string;

}
