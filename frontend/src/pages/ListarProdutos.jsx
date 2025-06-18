import { useEffect, useState } from "react";
import {
  Search,
  ShoppingBag,
  Star,
  Filter,
  Grid,
  List,
  Plus,
  X,
} from "lucide-react";

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    estoque: "",
    imagem: "",
  });

  // Dados de exemplo com estoque
  const produtosExemplo = [
    {
      id: 1,
      nome: "iPhone 14 Pro",
      descricao: "Smartphone Apple com chip A16 Bionic e câmera de 48MP",
      preco: 7999.99,
      categoria: "Eletrônicos",
      estoque: 15,
      imagem:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    },
    {
      id: 2,
      nome: "Nike Air Max",
      descricao: "Tênis esportivo confortável para corrida e caminhada",
      preco: 299.9,
      categoria: "Calçados",
      estoque: 42,
      imagem:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    },
    {
      id: 3,
      nome: "MacBook Pro M2",
      descricao: "Notebook profissional com chip M2 e tela Retina 13 polegadas",
      preco: 12999.99,
      categoria: "Eletrônicos",
      estoque: 8,
      imagem:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
    },
    {
      id: 4,
      nome: "Camiseta Básica",
      descricao: "Camiseta 100% algodão, confortável para o dia a dia",
      preco: 49.9,
      categoria: "Roupas",
      estoque: 76,
      imagem:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    },
    {
      id: 5,
      nome: "Fone Bluetooth",
      descricao: "Fone de ouvido sem fio com cancelamento de ruído",
      preco: 450.0,
      categoria: "Eletrônicos",
      estoque: 23,
      imagem:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    },
    {
      id: 6,
      nome: "Jaqueta Jeans",
      descricao: "Jaqueta jeans clássica, perfeita para o inverno",
      preco: 189.9,
      categoria: "Roupas",
      estoque: 34,
      imagem:
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop",
    },
  ];

  useEffect(() => {
    // Simula carregamento da API
    const timer = setTimeout(() => {
      setProdutos(produtosExemplo);
      setProdutosFiltrados(produtosExemplo);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let produtosFiltradosTemp = produtos;

    // Filtro por nome
    if (busca) {
      produtosFiltradosTemp = produtosFiltradosTemp.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
          produto.descricao.toLowerCase().includes(busca.toLowerCase())
      );
    }

    // Filtro por categoria
    if (categoriaFiltro) {
      produtosFiltradosTemp = produtosFiltradosTemp.filter(
        (produto) => produto.categoria === categoriaFiltro
      );
    }

    setProdutosFiltrados(produtosFiltradosTemp);
  }, [busca, categoriaFiltro, produtos]);

  const categorias = [...new Set(produtos.map((produto) => produto.categoria))];

  const limparFiltros = () => {
    setBusca("");
    setCategoriaFiltro("");
  };

  // Funções para o modal
  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setNovoProduto({
      nome: "",
      descricao: "",
      preco: "",
      categoria: "",
      estoque: "",
      imagem: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto({
      ...novoProduto,
      [name]: value,
    });
  };

  const adicionarProduto = () => {
    // Validação básica
    if (
      !novoProduto.nome ||
      !novoProduto.descricao ||
      !novoProduto.preco ||
      !novoProduto.categoria ||
      !novoProduto.estoque
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const produto = {
      id: produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1,
      nome: novoProduto.nome,
      descricao: novoProduto.descricao,
      preco: parseFloat(novoProduto.preco),
      categoria: novoProduto.categoria,
      estoque: parseInt(novoProduto.estoque),
      imagem: novoProduto.imagem || "https://via.placeholder.com/300",
    };

    setProdutos([...produtos, produto]);
    setProdutosFiltrados([...produtos, produto]);
    fecharModal();
  };

  if (loading) {
    return (
      <div className="container my-5">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="text-center">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="text-muted">Carregando produtos...</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light" style={{ minHeight: "70vh" }}>
      {/* Seção de Filtros */}
      <div className="bg-white shadow-sm py-4">
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-md-6">
              <h2 className="mb-0 fw-bold text-dark">
                <ShoppingBag className="me-2 text-danger" size={28} />
                Produtos Cadastrados
              </h2>
            </div>
            <div className="col-md-6 text-end">
              <div className="d-flex align-items-center justify-content-end">
                <div className="btn-group me-3" role="group">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`btn ${
                      viewMode === "grid" ? "btn-danger" : "btn-outline-danger"
                    }`}
                    title="Visualização em Grade"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`btn ${
                      viewMode === "list" ? "btn-danger" : "btn-outline-danger"
                    }`}
                    title="Visualização em Lista"
                  >
                    <List size={18} />
                  </button>
                </div>
                <button
                  onClick={abrirModal}
                  className="btn btn-danger"
                  title="Adicionar novo produto"
                >
                  <Plus size={18} className="me-1" />
                  Adicionar
                </button>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <Search size={18} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Buscar produtos..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <Filter size={18} className="text-muted" />
                </span>
                <select
                  className="form-select border-start-0"
                  value={categoriaFiltro}
                  onChange={(e) => setCategoriaFiltro(e.target.value)}
                >
                  <option value="">Todas as categorias</option>
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-2">
              {(busca || categoriaFiltro) && (
                <button
                  onClick={limparFiltros}
                  className="btn btn-outline-secondary w-100"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="container py-5">
        {produtosFiltrados.length === 0 ? (
          <div className="text-center py-5">
            <div className="bg-white rounded shadow-sm p-5">
              <ShoppingBag className="text-muted mb-3" size={64} />
              <h3 className="text-muted mb-2">Nenhum produto encontrado</h3>
              <p className="text-muted">Tente ajustar os filtros de busca</p>
              {(busca || categoriaFiltro) && (
                <button
                  onClick={limparFiltros}
                  className="btn btn-primary mt-3"
                >
                  Ver todos os produtos
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="text-muted mb-0">
                  <strong>{produtosFiltrados.length}</strong> produto
                  {produtosFiltrados.length !== 1 ? "s" : ""} encontrado
                  {produtosFiltrados.length !== 1 ? "s" : ""}
                  {busca && ` para "${busca}"`}
                  {categoriaFiltro && ` na categoria "${categoriaFiltro}"`}
                </p>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="row g-4">
                {produtosFiltrados.map((produto) => (
                  <div key={produto.id} className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card h-100 shadow-sm border-0 produto-card">
                      <div className="position-relative overflow-hidden">
                        <img
                          src={produto.imagem}
                          alt={produto.nome}
                          className="card-img-top"
                          style={{ height: "220px", objectFit: "cover" }}
                        />
                        <div className="position-absolute top-0 end-0 p-2">
                          <button className="btn btn-light btn-sm rounded-circle shadow-sm">
                            <Star size={16} className="text-warning" />
                          </button>
                        </div>
                      </div>
                      <div className="card-body d-flex flex-column">
                        <div className="mb-2">
                          <span className="badge bg-light text-dark border me-2">
                            Estoque: {produto.estoque}
                          </span>
                          <span className="badge bg-danger rounded-pill">
                            {produto.categoria}
                          </span>
                        </div>
                        <h5 className="card-title fw-bold mb-2">
                          {produto.nome}
                        </h5>
                        <p className="card-text text-muted small flex-grow-1 mb-3">
                          {produto.descricao}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          <div>
                            <span className="h5 text-dark fw-bold mb-0">
                              R$ {produto.preco.toFixed(2).replace(".", ",")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="row g-3">
                {produtosFiltrados.map((produto) => (
                  <div key={produto.id} className="col-12">
                    <div className="card shadow-sm border-0">
                      <div className="row g-0">
                        <div className="col-md-3">
                          <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="img-fluid rounded-start h-100"
                            style={{ objectFit: "cover", minHeight: "200px" }}
                          />
                        </div>
                        <div className="col-md-9">
                          <div className="card-body h-100 d-flex flex-column">
                            <div className="d-flex justify-content-between">
                              <div className="flex-grow-1">
                                <div className="mb-2">
                                  <span className="badge bg-danger rounded-pill me-2">
                                    {produto.categoria}
                                  </span>
                                  <span className="badge bg-light text-dark border">
                                    Estoque: {produto.estoque}
                                  </span>
                                </div>
                                <h5 className="card-title fw-bold">
                                  {produto.nome}
                                </h5>
                                <p className="card-text text-muted">
                                  {produto.descricao}
                                </p>
                              </div>
                              <div className="d-flex flex-column align-items-end ms-4">
                                <span className="h4 text-dark fw-bold mb-3">
                                  R${" "}
                                  {produto.preco.toFixed(2).replace(".", ",")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de Cadastro */}
      {modalAberto && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Cadastrar Novo Produto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={fecharModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nome do Produto*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nome"
                      value={novoProduto.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Categoria*</label>
                    <select
                      className="form-select"
                      name="categoria"
                      value={novoProduto.categoria}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="nova">+ Adicionar nova categoria</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Descrição*</label>
                    <textarea
                      className="form-control"
                      name="descricao"
                      value={novoProduto.descricao}
                      onChange={handleInputChange}
                      rows="3"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Preço (R$)*</label>
                    <div className="input-group">
                      <span className="input-group-text">R$</span>
                      <input
                        type="number"
                        className="form-control"
                        name="preco"
                        value={novoProduto.preco}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Estoque*</label>
                    <input
                      type="number"
                      className="form-control"
                      name="estoque"
                      value={novoProduto.estoque}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">URL da Imagem</label>
                    <input
                      type="url"
                      className="form-control"
                      name="imagem"
                      value={novoProduto.imagem}
                      onChange={handleInputChange}
                      placeholder="Opcional"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={fecharModal}
                >
                  <X size={18} className="me-1" /> Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={adicionarProduto}
                >
                  <Plus size={18} className="me-1" /> Salvar Produto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .produto-card {
          transition: all 0.3s ease;
        }
        .produto-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
        }
        .modal {
          backdrop-filter: blur(5px);
        }
        .modal-content {
          border: none;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }
        .form-label {
          font-weight: 500;
          color: #555;
        }
        .modal-header {
          border-bottom: 1px solid #eee;
        }
        .modal-footer {
          border-top: 1px solid #eee;
        }
      `}</style>
    </div>
  );
}
