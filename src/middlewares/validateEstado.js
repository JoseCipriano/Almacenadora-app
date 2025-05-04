
export const validateEstado = (req, res, next) => {
    const { estado } = req.body;
    if (!estado || !['Entrada', 'Salida'].includes(estado)) {
      return res.status(400).json({ success: false, error: 'El estado debe ser "Entrada" o "Salida"' });
    }
    next();
  };
  