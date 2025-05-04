
export const validateProducto = (req, res, next) => {
    const { producto } = req.body;
    if (!producto || producto.trim() === '') {
      return res.status(400).json({ success: false, error: 'El ID del producto es obligatorio' });
    }
    next();
  };
  