// import {
//     Container
//     , Form,
//     FormSub
//     , Logo,
//     Campos,
//     Text,
//     Foooter,
//     Select,
//     LinkText,
//     Titulo,
//     Divid,
//     Or,
// } from "./verifyCode"
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { LoadingSecundary } from "../../../components/LoadingSecundary/LoadingSecundary";
// import OtpInput from "react-otp-input";
// import { Btn } from "../../../components/btn/button";
// import { notify } from "../../portaria/service/snackbarService";

// export const Verify_code = () => {
//     const [otp, setOtp] = useState('');
//     const queryParams = new URLSearchParams(window.location.search);
//     const token: any = queryParams.get("token");
//     const number: any = queryParams.get("number");

//     const onSubmit = async (value?: any) => {
//         try {
//             setLoading(true);
//             const numero = value ?? otp
//             // const resposta = await Api.code_valid(parseInt(numero), token)
//             // const json = await resposta.data
//             // if (json.authToken) {
//             //     setTimeout(() => {
//             //         navigate("/", { replace: true, state: { refresh: Date.now() } });
//             //         setLoading(false);

//             //     }, 1000);

//             // }
//         }
//         finally {
//             setTimeout(() => {
//                 setLoading(false);
//             }, 1000);
//         }



//     };

//     const nav = () => {

//         setLoading(true);
//         setTimeout(() => {
//             navigate("/login-whats", { replace: true, state: { refresh: Date.now() } });
//             setLoading(false);

//         }, 1000);


//     }
//     const isValidOtp = otp.length === 6;

//     const onSubmitReenvie = async () => {
//         setLoading(true);
//         const data = { number: number };
//         // const dataResposta = await Api.code(data as any)
//         // if (dataResposta.token && dataResposta.message) {
//         //     notify(dataResposta.message, "success")
//         //     const tk = dataResposta.token;
//         //     const params = new URLSearchParams({ token: tk, number: number });
//         //     setTimeout(() => {
//         //         navigate(`/code?${params.toString()}`, { replace: true, state: { refresh: Date.now() } });
//         //         setLoading(false);
//         //     }, 1000);
//         // }
//     };

//     // criando loading para ir para a rota de login pelo whats
//     const [loading, setLoading] = useState(false)
//     const navigate = useNavigate()

//     // const handleMarckClick = (e: React.MouseEvent<HTMLImageElement>) => {
//     //     e.stopPropagation(); // só pra garantir que o clique não dispare em outro lugar
//     //     setLoading(true);
//     //     setTimeout(() => {
//     //         setLoading(false);
//     //         navigate("/marketPlace", { replace: true, state: { refresh: Date.now() } });
//     //     }, 2000);
//     // };
//     // useEffect(() => {
//     //     setTimeout(() => {
//     //         console.log("parou")
//     //         setLoading(false);
//     //     }, 3000);
//     // }, [loading])


//     return (
//         <Container>
//             <Form>
//                 {/* <Logo src={zapdaiLogo} onClick={handleMarckClick} /> */}
//                 <Text>Olá, Seja bem-vindo</Text>
//                 {/* <Or>OR</Or> */}
//                 <FormSub>
//                     <Titulo>Informe o codigo enviado ao seu email! {'*******'}.</Titulo>

//                     <Select>
//                         {/* <Cod>Informe o codigo</Cod> */}
//                         {/* campos input*/}
//                         <OtpInput
//                             value={otp}
//                             onChange={(value) => {
//                                 // valida só dígitos
//                                 if (/^[0-9]*$/.test(value)) {
//                                     setOtp(value);

//                                     // se digitou todos os 6 dígitos, envia automaticamente
//                                     if (value.length === 6) {
//                                         onSubmit(value);
//                                     }
//                                 }
//                             }}
//                             numInputs={6}
//                             renderSeparator={<span style={{ margin: "0 4px" }}></span>}
//                             renderInput={(props) => (
//                                 <Campos
//                                     pattern="[0-9]"
//                                     {...props}
//                                     // valida o evento digitado dentro do campo
//                                     onChange={(e) => {
//                                         // aceita so digitos usando as expressao
//                                         const value = e.target.value
//                                         if (/^[0-9]*$/.test(value)) {
//                                             props.onChange?.(e)
//                                         }

//                                     }}
//                                     onPaste={(e) => {
//                                         e.preventDefault();
//                                         const pasteData = e.clipboardData.getData("Text").trim();
//                                         const onlyNumbers = pasteData.replace(/\D/g, ""); // mantém só números
//                                         if (onlyNumbers) {
//                                             const code = onlyNumbers.slice(0, 6);
//                                             setOtp(code.toString());  // atualiza estado
//                                             if (code.length === 6) {
//                                                 onSubmit(code); // envia usando o valor correto, não o estado
//                                             }
//                                         }
//                                     }}
//                                     style={{
//                                         width: "3rem",
//                                         height: "3rem",
//                                         fontSize: "1.5rem",
//                                         border: 0,
//                                         borderBottom: "0.1px solid #888",
//                                         textAlign: "center",
//                                         color: "#888"
//                                     }}
//                                 />
//                             )}
//                         />

//                     </Select>
//                     <Select>
//                         <Divid>
//                             <LinkText onClick={onSubmitReenvie}>Reenviar codigo</LinkText>
//                             <Or>|</Or>
//                             <LinkText onClick={nav}>Corrigir numero</LinkText>
//                         </Divid>
//                     </Select>

//                     <Btn click={()=>onSubmit()} titulo={"CONFIRMAR CODIGO"} nome_btn={1 as any} isvalid={!isValidOtp || loading} ></Btn>


//                 </FormSub>



//             </Form>
//             {
//                 loading && <LoadingSecundary />

//             }
//         </Container>
//     )
// }