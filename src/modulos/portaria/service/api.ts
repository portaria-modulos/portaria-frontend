import axios from "axios"
const base = import.meta.env.VITE_API_URL;
const rotasPublicas = ["/portaria/v1/usuario/login",
];
import { notify } from "./snackbarService";
axios.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("acessToken")
  const urlPath = new URL(config.url, window.location.origin).pathname;
  if (!rotasPublicas.some(rota => urlPath.includes(rota))) {
    if (!config.headers) config.headers = {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (erro) => {
  return Promise.reject(erro)
})
const removeToken = async () => {
  localStorage.removeItem("acessToken")
  localStorage.removeItem("order")
}


const salvaRegistro = async (endpoint: string, data: any, file: File) => {
  const form = new FormData();
  form.append("file", file);
  form.append("data", JSON.stringify(data))
  const response = await axios.post(base + endpoint, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  return response.data;
}
////////////////////////////////////////////////
axios.interceptors.response.use(response => {
  return response;

}, (error) => {
  if (error.code === "ERR_NETWORK") {
        notify(error.message)

   notify("Servidor indisponível. Verifique sua conexão.","info")
    throw new Error("Servidor indisponível. Verifique sua conexão.");
  }
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;
    
    switch (status) {
      case 400:
        if (error.message) {
          notify(data.message)
        } else {
          notify(data.erro)
        }
        break
      case 401:
        const from = location.pathname + location.search + location.hash;
        sessionStorage.setItem("redirectAfterLogin", from);
        const msg = data.message || data.error;
        notify(msg)
        break
      case 403:
         if(data.error){
           notify(data.error)
         }
        removeToken()
        setTimeout(() => {
          window.location.href = "/verify";

        }, 2000)
        break
      case 500:
        removeToken()
        setTimeout(() => {
          window.location.href = "/verify";

        }, 1000)
        notify(data.message)
        break
      case 502:
        notify("bad gateway")
        break
      case 5023:
        notify("serviço indisponível")
        break
      case 504:
        notify("gateway timeout")
        break
    }
  }
})

const atualizaCadastro = async (endpoint: string, body: any) => {
  try {
    const response = await axios.put(base + endpoint, body);
    return response.data;
  } catch (error: any) {
    // Tratar todos os casos: com response e sem response
    if (axios.isAxiosError(error)) {
      console.error("Erro ao atualizar usuário:", error.response?.data ?? error.message);
      throw error.response?.data ?? error.message;
    } else {
      console.error("Erro inesperado:", error);
      throw error;
    }
  }
}
const listaVisistante = async (endpoint: string, busca: string,page:any,selectedFilial:any) => {
  const params = new URLSearchParams();
  params.append("busca", busca)
  params.append("size","150")
  if(selectedFilial) params.append("filial",selectedFilial)
   if (page !== undefined && page !== null) {
      params.append("page", page)
    }
  try {
    const response = await axios.get(base + endpoint, { params: Object.fromEntries(params) });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

const listHistory = async (endpoint: string, busca: string, page: any) => {
  try {
    const params = new URLSearchParams();
    params.append("busca", busca);
    if (page !== undefined && page !== null) {
      params.append("page", page)
    }
    const response = await axios.get(base + endpoint, { params: Object.fromEntries(params) });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
const deletar = async (endpoint: string, id: any, usuarioId: any) => {
  try {
    const params = new URLSearchParams();
    params.append("id", id)
    params.append("usuario_id", usuarioId)
    const response = await axios.put(base + endpoint, null, { params: Object.fromEntries(params) });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
const deleteItem = async (endpoint: string, id: any, usuarioId: any) => {
  try {
    const params = new URLSearchParams();
    params.append("registroId", id)
    params.append("usuarioId", usuarioId)
    const response = await axios.delete(base + endpoint, { params: Object.fromEntries(params) });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
const Logs = async (endpoint: any, busca: any, page: any) => {
  try {
    const params = new URLSearchParams();
    params.append("busca", busca);
    if (page !== undefined && page !== null) {
      params.append("page", page)
    }
    const response = await axios.get(base + endpoint, { params: Object.fromEntries(params) });
    return response.data;
  } catch (erro: any) {
    throw erro;
  }
}

////////////////////////////
const api = {
  salvaRegistro: async (data: any, file: File) => {
    const json = await salvaRegistro("/portaria/v1/cadastro", data, file)
    return json;
  },
  atualizarRegistro: async (data: any) => {
    const json = await atualizaCadastro("/portaria/v1/update", data)
    return json;
  },
  listaVisistante: async (busca: string,page:any,selectedFilial:any) => {
    const json = await listaVisistante("/visitante/lista", busca,page,selectedFilial)
    return json;
  },
  listHistory: async (busca: string, page: any) => {
    const json = await listHistory("/historico/lista", busca, page)
    return json;
  },
  deletar: async (id: any, usuarioId: any) => {
    const json = await deletar("/historico/delete", id, usuarioId)
    return json;
  },

  deletarPortaria: async (id: any, usuarioId: any) => {
    const json = await deleteItem("/portaria/v1/solicitacao/delete/registro", id, usuarioId)
    return json;
  },
  buscaLogs: async (busca: any, page: any) => {
    const json = await Logs("/logs/lista", busca, page)
    return json;
  }
}


export default api;


