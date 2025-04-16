import express from 'express';
import patientRoutes from './routes/patients';

const app = express();
app.use(express.json());

app.use('/api/patients', patientRoutes);

const PORT = 5100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
