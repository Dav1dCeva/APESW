import { CrudCliente } from "./service/servicio";

const crud:CrudCliente=new CrudCliente();

function controlar_error(error:string,resolve:string){
    if (error){
        console.log(error)
    }
    console.log(resolve) 
}

crud.crear({id:1,nombre:"Juan",telefono:"600112233",direccion:"Flavio Reyes"});
crud.crear({id:2,nombre:"Ana",telefono:"600445566",direccion:"Calle Falsa 123"});
crud.crear({id:3,nombre:"Pedro",telefono:"600778899",direccion:"Avenida Siempre Viva"});

console.log(crud.listar());

crud.actualizar(2,{id:2,nombre:"Ana Maria",telefono:"600445566",direccion:"Calle Falsa 123"});

console.log(crud.listar());

crud.borrar(3,controlar_error);

console.log(crud.listar());