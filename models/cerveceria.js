const { Schema, model } = require('mongoose');

const CerveceriaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: { //Referencia a Usuarios
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'cervecerias' });

CerveceriaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Cerveceria', CerveceriaSchema);