import axios from "axios";

const BASE_URL = "http://localhost:3001/Almacenadora_app/v1/products";
const HEADERS = {'Content-Type' : 'application/json'};

export const getProducts = async () => {
    try {
        const response = await axios.get(BASE_URL, {headers : HEADERS});
        return response.data;
        
    } catch (error) {
        console.error("Erro al obtener productos", error.response?.data || error);
        throw error;
        
    }
}


export const createProduct = async (productData) => {
    try {
        const response = await axios.post(BASE_URL, productData, {headers: HEADERS});
        return response.data.product;
    } catch (error) {
        console.error("Error al crear producto", error.response?.data || error);
        throw error;
    }
};

export const getProductsByName = async (name) => {
    try {
        const response = await axios.get(`${BASE_URL}/search?name=${name}`, {headers: HEADERS});
        return response.data;
    } catch (error) {
        console.error("Error al buscar producto por nombre", error.response?.data || error);
        throw error;
        
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, productData, {headers: HEADERS});
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el producto", error.response?.data || error);
        throw error; 
    } 
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`, { headers: HEADERS });
        return response.data;
    } catch (error) {
        console.error("Error al eliminar producto", error.response?.data || error);
        throw error;
    
    }
    
};

export const getLowStockProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/low-stock`, { headers: HEADERS });
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos con poco stock", error.response?.data || error);
      throw error;
    }
  };



