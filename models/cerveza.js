const { Schema, model } = require('mongoose');

const CervezaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: { //Referencia a Usuarios
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    cerveceria: { //Referencia a Usuarios
        type: Schema.Types.ObjectId,
        ref: 'Cerveceria',
        required: true
    },
}); //, { collection: 'cervezas' });

CervezaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Cerveza', CervezaSchema);