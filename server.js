require('dotenv').config();
const express = require('express');
const cors = require('cors')
const productoRoutes = require('./src/routes/producto.routes.js');
const categoriaRoutes = require('./src/routes/categoria.routes.js');
const solicitudRoutes = require('./src/routes/solicitud.routes.js');
const blogRoutes = require('./src/routes/blog.routes.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
/* const corsOptions = {
  origin: 'https://montacargas-client.vercel.app' 
};
app.use(cors(corsOptions)); */
// Middleware para que el servidor entienda JSON
app.use(express.json());

// Importar rutas
app.use('/api', productoRoutes);
app.use('/api', solicitudRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', blogRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`);
});