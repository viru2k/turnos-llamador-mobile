export class Multimedia {

    id:string;
    archivo_nombre:string;
    archivo_nombre_original:string;
    archivo_descripcion:string;
    orden:string;
    fecha_carga:string;
    fecha_vencimiento:string;
    tiene_vencimiento:string;

    constructor( 
        id:string,
        archivo_nombre:string,
        archivo_nombre_original:string,
        archivo_descripcion:string,
        orden:string,
        fecha_carga:string,
        fecha_vencimiento:string,
        tiene_vencimiento:string
    ){
        this.id = id;
        this.archivo_nombre = archivo_nombre;
        this.archivo_nombre_original = archivo_nombre_original;
        this.archivo_descripcion = archivo_descripcion;
        this.orden = orden;
        this.fecha_carga = fecha_carga;
        this.fecha_vencimiento = fecha_vencimiento;
        this.tiene_vencimiento = tiene_vencimiento;
    }
}