require('dotenv').config();
const express = require('express');
const cors = require('cors')
const productoRoutes = require('./src/routes/producto.routes.js');
const categoriaRoutes = require('./src/routes/categoria.routes.js');
const solicitudRoutes = require('./src/routes/solicitud.routes.js');
const blogRoutes = require('./src/routes/blog.routes.js');

const app = express();
const port = process.env.PORT || 3000;


const allowedOrigins = [
  'https://xilin-deployed.vercel.app',
  'http://localhost:5173'
];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'La política de CORS para este sitio no permite acceso desde el origen especificado.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// Importar rutas
app.use('/api', productoRoutes);
app.use('/api', solicitudRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', blogRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`);
});