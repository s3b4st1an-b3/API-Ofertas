import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

//MIDEWARSE
app.use(cors());
app.use(express.json());

//CONEXION A MONGODB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));


//MODELO DE LA OFERTA
const ofertaSchema = new mongoose.Schema({
    nombre:  {type:String, required:true}   ,
    precio: {type:Number, required:true},
    municipio:  {type:String, required:true},
    nombContacto:  {type:String, required:true},
    celular:  {type:String, required:true}
});

const Oferta = mongoose.model('Oferta', ofertaSchema); 

//METODOS

//GET - OBTENER TODAS LAS OFERTAS
app.get('/ofertas',async(req,res)=>{
    const ofertas = await Oferta.find();
    res.json(ofertas);
});

//GET - OBTENER UNA OFERTA POR ID
app.get('/ofertas/:id',async(req,res)=>{
    const oferta = await Oferta.findById(req.params.id);
    res.json(oferta);
});


//POST - CREAR UNA NUEVA OFERTA
app.post('/ofertas',async(req,res)=>{
    const nuevaOferta = new Oferta(req.body);
    await nuevaOferta.save();
    res.json('Oferta creada');
});

//PUT - ACTUALIZAR UNA OFERTA
app.put('/ofertas/:id',async(req,res)=>{
    const ofertaActualizada = await Oferta.findByIdAndUpdate(
        req.params.id, req.body, {new:true});
    res.json(ofertaActualizada);
});

//DELETE - ELIMINAR UNA OFERTA
app.delete('/ofertas/:id',async(req,res)=>{
    await Oferta.findByIdAndDelete(req.params.id);
    res.json('Oferta eliminada');
});


//SERVIDOR
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto en: http://localhost:${process.env.PORT}`)
})
