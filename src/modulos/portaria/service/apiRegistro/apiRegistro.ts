import axios from "axios"
const base = import.meta.env.VITE_API_URL;

const findAll = async(endpoint:any,filial:any,busca:any,ativo:any,page:any,data:any,situacaoEnum:any)=>{
   console.log(data)
    const params:any = {
        sort:"status,asc"
    }
    if(filial) params.filial = filial;
    if(ativo!=null) params.ativo = ativo;
    if(busca) params.busca = busca;
    if(page!=null) params.page = page;
    if(data!=null) params.data = data;
    if(situacaoEnum!=null) params.status = situacaoEnum
    params.size=100
    const json = await axios.get(base+endpoint,{params});
    return json.data;
}
const salvaRegistro = async (endpoint: string, data: any, file?: File) => {
  const form = new FormData();
  if(file!=null){
    form.append("file", file);
  }
  form.append("data", JSON.stringify(data))
  const response = await axios.post(base + endpoint, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  return response.data;
}
const buscaVisitanteID = async(endpoint:any,id:any,dataAntes:any,dataDepois:any)=>{
    const params:any = {
        sort:"status,asc"
    }
    if(id) params.visitanteId = id;
    if(dataAntes!=null) params.dataAntes = dataAntes;
    if(dataDepois!=null) params.dataDepois = dataDepois;
    params.size=100
    const json = await axios.get(base+endpoint,{params});
    return json.data;
}
export default {
    findAll:async (filial:number,busca:any,ativo:any,page:any,data:any,situacaoEnum:any)=>{
        const json = await findAll("/portaria/v1/findAll",filial,busca,ativo,page,data,situacaoEnum);
        return json;
    },
     RegistroFactory: async (data: any, file?: File) => {
    const json = await salvaRegistro("/portaria/v1/factory", data, file)
    return json;
  },
  buscaEntradaUnicaVisitante:async (id:any,dataAntes:any,dataDepois:any)=>{
        const json = await buscaVisitanteID("/portaria/v1/entrada-vistante",id,dataAntes,dataDepois);
        return json;
  },
}