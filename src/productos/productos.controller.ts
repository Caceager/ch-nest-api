import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {ProductosService} from "./productos.service";

interface Producto {
    name: string;
    price: number;
    url: string;
}
@Controller('productos')
export class ProductosController {
    private readonly productosService: ProductosService;
    constructor(productosService: ProductosService) {
        this.productosService = productosService;
    }
    @Get()
    @HttpCode(HttpStatus.OK)
    async obtenerProductos(@Query('frase') frase: string) {
        return await this.productosService.cargar_productos();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async agregarProducto(@Body() data: Producto) {
        const product = {
            nombre: data.name,
            precio: data.price,
            imagen: data.url,
        }
        return await this.productosService.guardar_producto(product);
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async obtenerProductoId(@Param("id") idObjeto: number) {
        return await this.productosService.cargarProducto(idObjeto);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    async borrarProductoId(@Param("id") idObjeto: number) {
        return await this.productosService.borrarProducto(idObjeto);
    }

}
