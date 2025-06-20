import { useState, useEffect } from "react";
import PerfilInformacao from "./PerfilInformacao";
import PerfilPedido from "./PerfilPedido";
import PerfilPessoal from "./PerfilPessoal";
import PerfilPagamento from "./PerfilPagamento";

const PerfilMenu = () => {
  const [perfil, setPerfil] = useState(null);
  const [mostrarCard, setMostrarCard] = useState("perfil");

  // Verifica se há um usuário no localStorage
  const usuarioLocal = JSON.parse(localStorage.getItem("usuario") || "{}");
  const idPerfil = usuarioLocal?.id;

  useEffect(() => {
    if (!idPerfil) return;

    const buscarPerfil = async () => {
      try {
        const resposta = await fetch(`http://localhost:3000/perfil/${idPerfil}`);
        const dados = await resposta.json();
        setPerfil(dados);
      } catch (erro) {
        console.error("Erro ao buscar Perfil", erro);
      }
    };

    buscarPerfil();
  }, [idPerfil]);

  // Estiliza o item ativo do menu
  const getItemClass = (nome) =>
    mostrarCard === nome ? "fw-bold text-primary" : "";

  return (
    <div className="container vh-100">
      <div className="row">
        {/* Menu lateral */}
        <section className="p-4 col-12 col-md-4">
          <ul className="navbar-nav">
            <li
              className={getItemClass("perfil")}
              onClick={() => setMostrarCard("perfil")}
              style={{ cursor: "pointer" }}
            >
              Meu Perfil
            </li>
            <hr />

            <li
              className={getItemClass("pedido")}
              onClick={() => setMostrarCard("pedido")}
              style={{ cursor: "pointer" }}
            >
              Meus Pedidos
            </li>
            <hr />

            <li
              className={getItemClass("informacao")}
              onClick={() => setMostrarCard("informacao")}
              style={{ cursor: "pointer" }}
            >
              Minhas Informações
            </li>
            <hr />

            <li
              className={getItemClass("pagamento")}
              onClick={() => setMostrarCard("pagamento")}
              style={{ cursor: "pointer" }}
            >
              Métodos de Pagamento
            </li>
          </ul>
        </section>

        {/* Conteúdo do card */}
        <div className="col-12 col-md-8">
          {!perfil && <p>Carregando dados do perfil...</p>}

          {mostrarCard === "perfil" && perfil && (
            <PerfilInformacao perfil={perfil} />
          )}

          {mostrarCard === "pedido" && perfil && <PerfilPedido />}

          {mostrarCard === "informacao" && perfil && (
            <PerfilPessoal perfil={perfil} />
          )}

          {mostrarCard === "pagamento" && perfil && (
            <PerfilPagamento perfil={perfil} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilMenu;
