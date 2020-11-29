export interface Tienda {
    id?: string;
    uid : string;
    nombre : string;
    direccion: string;
    correo : string;
    telefono : string;
    estado : string;
    auxilio: string;
    logo : string;
    position: {latitude:number,
              longitude:number};
    
  }
  
  export interface datosTiendas{
    id?: string;
    nombre: string;
    direccion: string;
    telefono: number;
    tipo: string;
    logo: string;
    correo: string;
    estado: string;  
}