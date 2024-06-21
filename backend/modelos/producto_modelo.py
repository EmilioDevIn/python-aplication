from proyecto.app import app, db   #,ma
from sqlalchemy import Column, ForeignKey, Integer, Table
from sqlalchemy.orm import declarative_base, relationship

# defino las tablas
class Producto(db.Model):   # la clase Producto hereda de db.Model    
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    precio=db.Column(db.Integer)
    stock=db.Column(db.Integer)
    tipoproducto = db.Column(db.Integer, db.ForeignKey("tipoproducto.id"), nullable=False)
    #tipoproducto = db.relationship('tipoproducto', backref='funciones')
    imagen=db.Column(db.String(400))
    def __init__(self,nombre,precio,stock,tipoproducto,imagen):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.precio=precio
        self.stock=stock
        self.tipoproducto=tipoproducto
        self.imagen=imagen

with app.app_context():
    db.create_all()  # aqui crea todas las tablas
#  ************************************************************

