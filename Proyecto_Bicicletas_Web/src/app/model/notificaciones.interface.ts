export interface Notificaciones {
    id?: string;
    respuesta: string;
    visualizar: string;
    fecha: Date;
    tipo:string;
    idusuario:string;
    idtipo:string;
    color:string;
    idtienda:string;
}
export interface Notificacionesdonacion {
    id?: string;
    respuesta: string;
    visualizar: string;
    fecha: Date;
    tipo:string;
    idusuario:string;
    iddonacion:string;
}
export interface NotificacionesTienda {
    id?: string;
    visualizar: string;
    fecha: Date;
    tipo:string;
    idusuario:string;
    idtienda:string;
}