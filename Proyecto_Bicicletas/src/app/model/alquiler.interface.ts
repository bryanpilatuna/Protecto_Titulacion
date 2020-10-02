export interface datosAlquiler{
    id?: string;
    idusuario: string;
    idtienda: string;
    fechadevolucion: Date;
    fechaalquiler: Date;
    bicicleta: string;
    fecha: Date;  
    aprobacion: boolean; 
    anular:boolean;
}
