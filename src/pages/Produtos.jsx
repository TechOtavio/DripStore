import React, { useEffect, useState } from 'react';
import Ordenar from '../components/Ordenar';
import FiltroProd from '../components/FiltroProd';
import CardProd from '../components/CardProd';
import produtosJson from '../assets/produtos.json';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [filtros, setFiltros] = useState({
    brand: [],
    category: [],
    gender: [],
    estado: ''
  });

  const handleFiltro = (tipo, valor) => {
    if (tipo === 'estado') {
      setFiltros({ ...filtros, estado: filtros.estado === valor ? '' : valor });
    } else {
      const existe = filtros[tipo].includes(valor);
      const atualizado = existe
        ? filtros[tipo].filter(item => item !== valor)
        : [...filtros[tipo], valor];
      setFiltros({ ...filtros, [tipo]: atualizado });
    }
  };

  const filtrarProdutos = () => {
    return produtos.filter(produto => {
      const marcaOK = filtros.brand.length === 0 || filtros.brand.includes(produto.brand);
      const categoriaOK = filtros.category.length === 0 || filtros.category.includes(produto.category);
      const generoOK = filtros.gender.length === 0 || filtros.gender.includes(produto.gender);
      const estadoOK = filtros.estado === '' || produto.estado === filtros.estado;
      return marcaOK && categoriaOK && generoOK && estadoOK;
    });
  };

  useEffect(() => {
    setProdutos(produtosJson);
  }, []);

  return (
    <div style={{ backgroundColor: '#f9f8f6' }}>
      <Ordenar />
      <div className="d-flex">
        <FiltroProd filtros={filtros} onFiltroChange={handleFiltro} />
        <CardProd produtos={filtrarProdutos()} />
      </div>
    </div>
  );
};

export default Produtos;
