export interface Tienda {
    id?: string;
    uid : string;
    nombre : string;
    direccion: string;
    correo : string;
    telefono : string;
    estado : string;
    logo : string;
    position: {latitude:number,
              longitude:number};
    
  }
  