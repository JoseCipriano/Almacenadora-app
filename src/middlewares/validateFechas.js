
export const validateFechas = (req, res, next) => {
    const { estado, fechaEntrada, fechaSalida, destino } = req.body;
    if (estado === 'Entrada' && !fechaEntrada) {
      return res.status(400).json({ success: false, error: 'Debe ingresar la fecha de entrada para movimientos tipo "Entrada"' });
    }
    if (estado === 'Salida' && (!fechaSalida || !destino)) {
      return res.status(400).json({ success: false, error: 'Debe ingresar la fecha de salida y el destino para movimientos tipo "Salida"' });
    }
    next();
  };
  