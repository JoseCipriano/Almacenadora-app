
export const validateCantidad = (req, res, next) => {
    const { cantidad } = req.body;
    if (typeof cantidad !== 'number' || cantidad <= 0) {
      return res.status(400).json({ success: false, error: 'La cantidad debe ser un número mayor a 0' });
    }
    next();
  };
  