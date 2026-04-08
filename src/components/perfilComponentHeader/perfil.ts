import styled from "styled-components";

export default{
        container:styled.div`
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 10px 0;
        `,
        avatar: styled.div`
            width: 54px;
            height: 54px;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0 2px 12px rgba(161, 114, 114, 0.18);
            border: 2.5px solid rgba(161, 114, 114, 0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            background: #232323;
        `,
        userDetails: styled.div`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
            strong {
                color: #fff;
                font-size: 1.08rem;
                font-weight: 700;
                letter-spacing: 0.2px;
            }
            span {
                color: rgba(161, 114, 114, 0.85);
                font-size: 0.92rem;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
        `
}