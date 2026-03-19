import {
    Container, Form, FormSub, LogoText, Subtitle,
    Campos, Erros, Foooter, Select, Label,
    InputWrapper, Password
} from "./Container";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import salve from "../../../localStorage/service-localStorage";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Api from "../../PaginaInicial/service/apiUsuario";
import IconButton from "@mui/material/IconButton";
import { Button, CircularProgress } from "@mui/material";
import { AlertComponent } from "../../../components/alert/alertaComponent";

type FormData = {
    email: string;
    password: string;
};

export const LoginComponen = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ativaPasswd, setAtivaPasswd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [logued, setLogued] = useState(false);

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
            const resposta = await Api.login(data);
            if (resposta && resposta.acessToken) {
                salve.salva_token(resposta.acessToken);
                localStorage.setItem("order", String(resposta.usuario.id));
                setLogued(true);
                window.location.href = "/";
            }
        } catch (e) {
            // Adicione um catch para tratar erros de senha/email
        } finally {
            setLoading(false);
        }
    };

    const senhaRef = useRef<HTMLInputElement>(null);

    return (
        <Container>
            <Form>
                <header>
                    <LogoText>Portaria<span>CD</span></LogoText>
                    <Subtitle>Entre com suas credenciais para acessar o painel</Subtitle>
                </header>

                <FormSub onSubmit={handleSubmit(onSubmit)}>
                    <Select>
                        <Label>E-mail</Label>
                        <InputWrapper hasError={!!errors.email}>
                            <Campos
                                type="email"
                                placeholder="nome@exemplo.com"
                                {...register("email", {
                                    required: "E-mail é obrigatório",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Formato de e-mail inválido",
                                    }
                                })}
                            />
                        </InputWrapper>
                        {errors.email && <Erros>{errors.email.message}</Erros>}
                    </Select>

                    <Select>
                        <Label>Senha</Label>
                        <InputWrapper hasError={!!errors.password}>
                            <Password
                                placeholder="••••••••"
                                type={ativaPasswd ? "text" : "password"}
                                {...register("password", {
                                    required: "Senha é obrigatória",
                                })}
                            />
                            <IconButton
                                onClick={() => setAtivaPasswd(!ativaPasswd)}
                                sx={{ color: '#94a3b8' }}
                            >
                                {ativaPasswd ? (
                                    <VisibilityOffIcon sx={{ fontSize: 20 }} />
                                ) : (
                                    <VisibilityIcon sx={{ fontSize: 20 }} />
                                )}
                            </IconButton>
                        </InputWrapper>
                        {errors.password && <Erros>{errors.password.message}</Erros>}
                    </Select>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                            height: '48px',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 600,
                            bgcolor: '#5B7FFF',
                            boxShadow: '0 4px 12px rgba(91, 127, 255, 0.25)',
                            '&:hover': { bgcolor: '#4a6cf0' }
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Acessar Painel'}
                    </Button>

                    {logued && <AlertComponent titulo={"success"} msg={"Login confirmado"} />}
                </FormSub>
            </Form>

            <Foooter>Sistema de Gestão de Portaria &copy; 2026</Foooter>
        </Container>
    );
}