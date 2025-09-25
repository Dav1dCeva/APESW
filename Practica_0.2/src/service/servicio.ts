import { IServicio } from "../domain/servicio";

const servicios: IServicio[] = [];

export class CrudServicio{
    constructor(){

    }

    crear(nuevoServicio:IServicio){
        servicios.push(nuevoServicio);
    }

    actualizar(id:number,nuevoServicio:IServicio){

        let idx_viejo_servicio=servicios.findIndex((sre)=>sre.id==id);
        if (idx_viejo_servicio==-1){
            console.log("No se ha encontrado el servicio");
            return;
        }
        servicios.splice(idx_viejo_servicio,1)
        servicios.push(nuevoServicio);

    }

    borrar(id:number,callback_error:CallableFunction){
        let msg;
        let msg_resolve;
        let idx_servicio=servicios.findIndex((sre)=>sre.id==id);
        if (idx_servicio==-1){
            msg="No se ha encontrado el servicio";
        }
        else{
            servicios.splice(idx_servicio,1)
            msg_resolve="Se ha borrado el servicio";
        }
        callback_error(msg)

    }

    consultar(id:number){

        let idx_servicio=servicios.find((sre)=>sre.id==id);
        if (!idx_servicio){
            throw new Error("No se ha encontrado el servicio");
        }
        return idx_servicio;
    }
}