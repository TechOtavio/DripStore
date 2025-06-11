import React, { useState } from "react";
import styles from "./CompLogin.module.css";
import { useNavigate } from "react-router-dom";

const CompLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const fazerLogin = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setMensagem("Informe um e-mail válido.");
      return;
    }

    setCarregando(true);
    setMensagem("");

    try {
      const resposta = await fetch("http://localhost:3000/verificarLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (dados.sucesso && dados.token) {
        localStorage.setItem("token", dados.token);
        localStorage.setItem("usuario", JSON.stringify(dados.usuario));
        setMensagem("Login realizado com sucesso!");
        onLogin(dados.usuario);

        if (dados.usuario.id_roles === 1) {
          navigate("/DripStore/AdmPerfil");
        } else if (dados.usuario.id_roles === 2) {
          navigate("/DripStore/Perfil");
        }
      } else {
        setMensagem(dados.mensagem || "Email ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setMensagem("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  const mostrarSenha = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className={styles.card}>
        <form onSubmit={fazerLogin} className={styles.form}>
          <div className={styles.title}>Login</div>

          <label className={styles.label_input} htmlFor="email-input">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            spellCheck="false"
            className={styles.input}
            type="email"
            name="email"
            id="email-input"
            required
          />

          <div className={styles.frg_pss}>
            <label className={styles.label_input} htmlFor="password-input">
              Senha
            </label>
            <a href="#">Esqueceu a Senha?</a>
          </div>

          <div
            className={styles.passwordWrapper}
            style={{ display: "flex", alignItems: "start", gap: "10px" }}
          >
            <input
              onChange={(e) => setSenha(e.target.value)}
              spellCheck="false"
              className={styles.input}
              type={showPassword ? "text" : "password"}
              name="password"
              id="password-input"
              required
            />
            <button
              type="button"
              className={styles.input}
              style={{ width: "100px" }}
              onClick={mostrarSenha}
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? "Esconder" : "Mostrar"}
            </button>
          </div>

          <button className={styles.submit} type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Logar"}
          </button>

          {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
        </form>

        <div className={styles.avatar}>
          {/* SVG do macaco */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 64 64"
            id="monkey"
          >
            <ellipse
              cx="53.7"
              cy="33"
              rx="8.3"
              ry="8.2"
              fill="#89664c"
            ></ellipse>
            <ellipse
              cx="53.7"
              cy="33"
              rx="5.4"
              ry="5.4"
              fill="#ffc5d3"
            ></ellipse>
            <ellipse
              cx="10.2"
              cy="33"
              rx="8.2"
              ry="8.2"
              fill="#89664c"
            ></ellipse>
            <ellipse
              cx="10.2"
              cy="33"
              rx="5.4"
              ry="5.4"
              fill="#ffc5d3"
            ></ellipse>
            <g fill="#89664c">
              <path d="m43.4 10.8c1.1-.6 1.9-.9 1.9-.9-3.2-1.1-6-1.8-8.5-2.1 1.3-1 2.1-1.3 2.1-1.3-20.4-2.9-30.1 9-30.1 19.5h46.4c-.7-7.4-4.8-12.4-11.8-15.2"></path>
              <path d="m55.3 27.6c0-9.7-10.4-17.6-23.3-17.6s-23.3 7.9-23.3 17.6c0 2.3.6 4.4 1.6 6.4-1 2-1.6 4.2-1.6 6.4 0 9.7 10.4 17.6 23.3 17.6s23.3-7.9 23.3-17.6c0-2.3-.6-4.4-1.6-6.4 1-2 1.6-4.2 1.6-6.4"></path>
            </g>
            <path
              d="m52 28.2c0-16.9-20-6.1-20-6.1s-20-10.8-20 6.1c0 4.7 2.9 9 7.5 11.7-1.3 1.7-2.1 3.6-2.1 5.7 0 6.1 6.6 11 14.7 11s14.7-4.9 14.7-11c0-2.1-.8-4-2.1-5.7 4.4-2.7 7.3-7 7.3-11.7"
              fill="#e0ac7e"
            ></path>
            <g fill="#3b302a" className="monkey-eye-nose">
              <path d="m35.1 38.7c0 1.1-.4 2.1-1 2.1-.6 0-1-.9-1-2.1 0-1.1.4-2.1 1-2.1.6.1 1 1 1 2.1"></path>
              <path d="m30.9 38.7c0 1.1-.4 2.1-1 2.1-.6 0-1-.9-1-2.1 0-1.1.4-2.1 1-2.1.5.1 1 1 1 2.1"></path>
              <ellipse
                cx="40.7"
                cy="31.7"
                rx="3.5"
                ry="4.5"
                className="monkey-eye-r"
              ></ellipse>
              <ellipse
                cx="23.3"
                cy="31.7"
                rx="3.5"
                ry="4.5"
                className="monkey-eye-l"
              ></ellipse>
            </g>
          </svg>
          {!showPassword && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 64 64"
              id="monkey-hands"
            >
              <path
                fill="#89664C"
                d="M9.4,32.5L2.1,61.9H14c-1.6-7.7,4-21,4-21L9.4,32.5z"
              ></path>
              <path
                fill="#FFD6BB"
                d="M15.8,24.8c0,0,4.9-4.5,9.5-3.9c2.3,0.3-7.1,7.6-7.1,7.6s9.7-8.2,11.7-5.6c1.8,2.3-8.9,9.8-8.9,9.8
    s10-8.1,9.6-4.6c-0.3,3.8-7.9,12.8-12.5,13.8C11.5,43.2,6.3,39,9.8,24.4C11.6,17,13.3,25.2,15.8,24.8"
              ></path>
              <path
                fill="#89664C"
                d="M54.8,32.5l7.3,29.4H50c1.6-7.7-4-21-4-21l8.8-8.4z"
              ></path>
              <path
                fill="#FFD6BB"
                d="M48.4,24.8c0,0-4.9-4.5-9.5-3.9c-2.3,0.3,7.1,7.6,7.1,7.6s-9.7-8.2-11.7-5.6c-1.8,2.3,8.9,9.8,8.9,9.8
    s-10-8.1-9.7-4.6c0.4,3.8,8,12.8,12.6,13.8c6.6,1.3,11.8-2.9,8.3-17.5C52.6,17,50.9,25.2,48.4,24.8"
              ></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompLogin;
