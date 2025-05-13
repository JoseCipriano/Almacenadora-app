import { Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Typography, TextField, Box} from "@mui/material"
import React, { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { deleteProduct, getProducts } from "../../services/product-service"

export default function ProductList(){
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilterProducts] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState( ' ');
    const navigate = useNavigate();
    const [isAdmin] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            if(Array.isArray(response)){
                setProducts(response);
                setFilterProducts(response);
            }else{
                console.error("Error al cargar Productos:", response);
            }
         };
         fetchProducts();
        
        }, []);

        useEffect(() =>{
            if (searchTerm){
                const results = products.filter((product) =>
                    product.name.toLowerCase().inCludes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().inCludes(searchTerm.toLowerCase())
                );
                setFilterProducts(results);
            } else{
                setFilterProducts(products)
            }
        }, [searchTerm, products]);

        const handleDelete =async (id) => {
            const confirm = window.confirm("Quires eliminar este producto?");
            if(!confirm) return;
            try {
                await deleteProduct(id);
                setFilterProducts((prev) => prev.filter((p) => p.id !== id));      
            } catch (error) {
                alert("Error al eliminar el producto");
                console.error(error);
          }
 };

    return(
        <Paper
        elevation={4}
        sx={{
          mt: 4,
          mx: "auto",
          maxWidth: 1000,
          p: 4,
          background: "linear-gradient(to top, #f9f9f9, #ffffff)"
        }}
      >
        {/* Encabezado y botón de regreso */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" color="primary">
            Lista de Productos
          </Typography>
        </Box>
  
        {/* Buscador */}
        <TextField
          label="Buscar Producto"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
        />
  
        {/* Botón para agregar */}
        {isAdmin && (
          <Button
            variant="contained"
            onClick={() => navigate("/productos/newProduct")}
            sx={{ mb: 3 }}
            color="success"
          >
            Agregar Producto
          </Button>
        )}
  
        {/* Tabla */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Categoría</strong></TableCell>
              <TableCell><strong>Precio</strong></TableCell>
              {isAdmin && <TableCell><strong>Acciones</strong></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((p) => {
              if (!p || !p.id) return null;
  
              return (
                <TableRow key={p.id}>
                  <TableCell>{p.name || "-"}</TableCell>
                  <TableCell>{p.category || "-"}</TableCell>
                  <TableCell>{p.price || "-"}</TableCell>
                  {isAdmin && p.id?.length === 24 && (
                    <TableCell>
                      <Button onClick={() => navigate(`/productos/:${p.id}`)}>Editar</Button>
                      <Button color="error" onClick={() => handleDelete(p.id)}>
                        Eliminar
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>



    );






}

