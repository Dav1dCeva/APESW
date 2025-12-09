import { CrudServicio } from "./service/servicio";

const crud:CrudServicio=new CrudServicio();

function controlar_error(error:string,resolve:string){
    if (error){
        console.log(error)
    }
    console.log(resolve) 
}


crud.crear({id:1,nombre:"Paseo",precio:15});
crud.crear({id:2,nombre:"Corte de pelo",precio:20});
crud.crear({id:3,nombre:"Vacunacion",precio:30});

console.log(crud.consultar(1));
console.log(crud.consultar(2));
console.log(crud.consultar(3));

crud.actualizar(1,{id:1,nombre:"Paseo largo",precio:25});
console.log(crud.consultar(1));
crud.borrar(2,controlar_error);
