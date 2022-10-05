import { Injectable } from '@nestjs/common';
import {products as modeloProducto} from './modeloProductos';

@Injectable()
export class ProductosService {
    constructor(){

    }
    async guardar_producto(producto){
        const id = Number(await this.getLastId())
        producto = {
            ...producto,
            id,
        }
        const productoSaveModel = new modeloProducto(producto);
        await productoSaveModel.save();
        return producto;
    }
    async cargar_productos(){
        return modeloProducto.find({});
    }

    async cargarProducto(id){
        return await modeloProducto.find({id}) || [];
    }
    async borrarProducto(id) {
        return modeloProducto.deleteOne({id});
    }
    async getLastId() {
        const lastProduct = await modeloProducto.find({}).sort({id: -1});
        return lastProduct[0]?.id + 1 || 1;
    }
}
