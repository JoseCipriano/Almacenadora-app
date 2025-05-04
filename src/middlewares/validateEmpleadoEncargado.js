
export const validateEmpleadoEncargado = (req, res, next) => {
    const { empleadoEncargado } = req.body;
    if (!empleadoEncargado || empleadoEncargado.trim() === '') {
      return res.status(400).json({ success: false, error: 'El campo empleado encargado es obligatorio' });
    }
    next();
  };
  