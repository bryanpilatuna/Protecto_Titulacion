export interface Notificaciones {
    id?: string;
    respuesta: string;
    visualizar: string;
    fecha: Date;
    tipo:string;
    idusuario:string;
    idtipo:string;
    idtienda:string;
    color:string;
}

export interface NotificacionesTienda {
    id?: string;
    visualizar: string;
    fecha: Date;
    tipo:string;
    idusuario:string;
    idtienda:string;
}


