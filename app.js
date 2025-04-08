import express from 'express'
import flowers from './data/flowers.js'

const app =express()

app.use(express.json())

app.listen(3030,()=>{
    console.log("szerver fut")
})

app.get('/flowers',(req,res)=>{
    res.status(200).json(flowers)
})

app.get('/flowers/:id',(req,res)=>{
    const id=req.params.id
    if(id<0 || id>flowers.length){
        res.status(404).json({message:"Cannot find flower"})
    }
})

app.post('/flowers', (req, res) => {
    const { name, species, price, isAvaiable } = req.body;
    if (!name || !species || !price || isAvaiable === null) {
        return res.status(400).json({ message: "Missing data" });
    };
    const newFlower = { name, species, price, isAvaiablen };
    flowers.push(newFlower);
    res.status(201).json(newFlower);
});

app.put('/flowers/:id', (req, res) => {
    const id = req.params.id;
    if (id < 0 || id >= flowers.length) {
        return res.status(404).json({ message: 'Flower not found!' });
    };
    const { name, species, price, isAvaiable } = req.body;
    if (!name || !species || !price || isAvaiable === null) {
        return res.status(400).json({ message: 'Missing data!' });
    };
    flowers[id] = { name, species, price, isAvaiable };
    res.status(200).json(flowers[id]);
});

app.delete("/flowers/:id", (req, res)=>{
    const id = req.params.id
    if (id<0 || id >= flowers.length){
        return res.status(404).json({message:"flower not found"})
}
flowers.splice(id,1)
res.status(200).json({message:"flower deleted"})
})