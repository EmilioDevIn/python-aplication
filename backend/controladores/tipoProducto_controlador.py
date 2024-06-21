from flask import  jsonify,request  #,Flask# del modulo flask importar la clase Flask y los métodos jsonify,request
from proyecto.app import app, db,ma
from modelos.tipoProducto_modelo import *

class TipoproductoSchema(ma.Schema):
    class Meta:
        fields=('id','nombre')

tipoProducto_schema=TipoproductoSchema()            # El objeto tipoproducto_schema es para traer un tipoproducto
tipoProductos_schema=TipoproductoSchema(many=True)  # El objeto tipoproductos_schema es para traer multiples registros de tipoproducto

# crea los endpoint o rutas (json)
@app.route('/tipoproductos',methods=['GET'])
def get_TipoProductos():
    all_tipoProductos=Tipoproducto.query.all()         # el metodo query.all() lo hereda de db.Model
    result=tipoProductos_schema.dump(all_tipoProductos)  # el metodo dump() lo hereda de ma.schema y
                                               # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla

@app.route('/tipoproductos/<id>',methods=['GET'])
def get_tipoProducto(id):
    tipoProducto=Tipoproducto.query.get(id)
    return tipoProducto_schema.jsonify(tipoProducto)   # retorna el JSON de un tipoproducto recibido como parametro

@app.route('/tipoproductos/<id>',methods=['DELETE'])
def delete_TipoProducto(id):
    tipoProducto=Tipoproducto.query.get(id)
    db.session.delete(tipoProducto)
    db.session.commit()
    return tipoProducto_schema.jsonify(tipoProducto)   # me devuelve un json con el registro eliminado


'''@app.route('/tipoproductos', methods=['POST']) # crea ruta o endpoint
def create_TipoProducto():
    #print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    
    tipoproducto=Tipoproducto(nombre)
    db.session.add(tipoproducto)
    db.session.commit()
    return tipoProducto_schema.jsonify(tipoproducto)
'''

@app.route('/tipoproductos', methods=['POST']) # crea ruta o endpoint
def create_tipoproducto():
    nombre=request.json['nombre']    
    new_tipoproducto=Tipoproducto(nombre)
    db.session.add(new_tipoproducto)
    db.session.commit()
    return tipoProducto_schema.jsonify(new_tipoproducto)

@app.route('/tipoproductos/<id>' ,methods=['PUT'])
def update_TipoProducto(id):
    tipoProducto=Tipoproducto.query.get(id)
    tipoProducto.nombre=request.json['nombre']
    db.session.commit()
    return tipoProducto_schema.jsonify(tipoProducto)


