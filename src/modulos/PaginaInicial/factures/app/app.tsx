import { useState } from 'react';
import styled from 'styled-components';
import { CheckCircle, AlertCircle, DownloadCloud } from 'lucide-react';
import api from "../../service/apiUsuario";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f8fafc; /* Fundo levemente acinzentado para destacar o conteúdo */
  font-family: 'Inter', 'Segoe UI', sans-serif;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px 20px; /* Padding superior para não ficar sob o header */
`;

const Content = styled.div`
  width: 100%;
  max-width: 480px;
  background: white;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const Track = styled.div`
  height: 12px;
  width: 100%;
  background-color: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 25px;
`;

type PropsBar = {
    percent: number;
}
const Bar = styled.div<PropsBar>`
  height: 100%;
  background: linear-gradient(90deg, #4527A0, #1565C0);
  width: ${props => props.percent}%;
  transition: width 0.3s ease-out;
`;

const PercentageText = styled.h2`
  color: #1e293b;
  font-size: 3.5rem;
  font-weight: 900;
  margin: 10px 0;
`;

const StatusText = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const VersionTag = styled.div`
  background: #f1f5f9;
  color: #475569;
  padding: 6px 16px;
  border-radius: 100px;
  display: inline-block;
  margin-top: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid #e2e8f0;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  background: linear-gradient(90deg, #4527A0, #1565C0);
  color: white;
  border: none;
  padding: 18px;
  border-radius: 14px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(21, 101, 192, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(21, 101, 192, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// --- Componente ---

export default function BaixeOApp() {
    const [progresso, setProgresso] = useState(0);
    const [status, setStatus] = useState<string>("Pronto para começar?");
    const [dadosApp, setDadosApp] = useState<any>();
    const [erro, setErro] = useState<string>("");
    const [downloading, setDownloading] = useState(false);

    const fetchDadosEDownload = async () => {
        setDownloading(true);
        setErro("");
        try {
            const responseApi = await api.baixarApp();

            if (responseApi) {
                setDadosApp(responseApi);
                setStatus(`Baixando: ${responseApi?.nome || 'Aplicativo'}`);

                const responseFile = await fetch(responseApi.url);
                if (!responseFile.body) throw new Error("Falha ao ler corpo da resposta");

                const reader = responseFile.body.getReader();
                const contentLength = +(responseFile.headers.get('Content-Length') ?? 0);

                let receivedLength = 0;
                let chunks: Uint8Array[] | any = [];

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    chunks.push(value);
                    receivedLength += value.length;

                    if (contentLength) {
                        setProgresso(Math.round((receivedLength / contentLength) * 100));
                    }
                }

                setStatus("Download concluído!");
                const blob = new Blob(chunks);
                const fileUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = fileUrl;
                a.download = `${responseApi?.nome || 'app'}.apk`;
                document.body.appendChild(a);
                a.click();
                a.remove();

                setTimeout(() => setDownloading(false), 3000);
            }
        } catch (err) {
            console.error(err);
            setErro("Erro ao conectar com o servidor.");
            setDownloading(false);
        }
    };

    return (
        <Container>
            <Main>
                <Content>
                    {erro ? (
                        <div style={{ color: '#ef4444' }}>
                            <AlertCircle size={54} style={{ margin: '0 auto 20px' }} />
                            <StatusText style={{ color: '#ef4444' }}>{erro}</StatusText>
                            <ActionButton onClick={fetchDadosEDownload} style={{ marginTop: '20px' }}>
                                Tentar Novamente
                            </ActionButton>
                        </div>
                    ) : !downloading ? (
                        <>
                            <div style={{ color: '#4527A0', marginBottom: '20px' }}>
                                <DownloadCloud size={60} strokeWidth={1.5} />
                            </div>
                            <h2 style={{ color: '#1e293b', marginBottom: '10px' }}>Versão Atualizada</h2>
                            <StatusText>Clique no botão abaixo para iniciar o download direto.</StatusText>
                            <ActionButton onClick={fetchDadosEDownload} style={{ marginTop: '30px' }}>
                                <DownloadCloud size={20} />
                                Baixar Agora
                            </ActionButton>
                        </>
                    ) : (
                        <>
                            <StatusText>{status}</StatusText>
                            <Track>
                                <Bar percent={progresso} />
                            </Track>
                            <PercentageText>{progresso}%</PercentageText>

                            {progresso === 100 && (
                                <div style={{ color: '#1565C0', marginTop: '15px' }}>
                                    <CheckCircle size={48} style={{ margin: '0 auto' }} />
                                </div>
                            )}

                            {dadosApp && (
                                <VersionTag>
                                    Versão: <strong>{dadosApp?.subtitlo}</strong>
                                </VersionTag>
                            )}
                        </>
                    )}
                </Content>
            </Main>
        </Container>
    );
}