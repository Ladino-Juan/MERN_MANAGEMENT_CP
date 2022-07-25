const mongoose = require('mongoose');
const { Schema } = mongoose

const PacienteSchema = new Schema({
    nombre: {type: String, required: false},
    apellido: {type: String, required: false},
    email: {type: String, required: false},
    cel: {type: String, required: false},
    fecha_i: {type: String, format: Date, required: false},
    ultima_c: {type: String, format: Date, required: false},
    proxima_c: {type: String, format: Date, required: false},
    procedimiento: {type: String, required: false},
    causa_na: {type: String, required: false},
    hora: {type: String, required: false},
    estado: {type: String, required: false}
})

module.exports = mongoose.model('Paciente', PacienteSchema);