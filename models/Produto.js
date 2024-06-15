const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Produto = new Schema({
    nome: {
        type: String,
        required: true
    },    
    descricao: {
        type: String,
        required: true
    },
    peso: {
        type: Number,
        require: true
    }
});

mongoose.model("produtos", Produto);
