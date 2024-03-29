import { Form } from "antd"
import styled from "styled-components"

export {}

export const AdsDiv = styled.div`
    display: flex;
    flex-direction : column;
    align-items: center;
    margin-bottom : 100px;
`
export const AdsTableStyle = styled.table`
    margin : 50px;
    border : 1px solid black;
    width : 70%;
    border-collapse : collapse;
    border-spacing : 20px 30px;
`
export const Th = styled.th`
    border : 1px solid black;
    padding : 10px;
`
export const Td = styled.td`
    border : 1px solid black;
    text-align : center;
    padding : 10px;
`

export const Label = styled.label`
    font-size : 24px;
`
export const Input = styled.input`
    width: 300px;
    height : 50px;
    font-size : 24px;
    text-align : center;
    margin-left : 20px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gold;
`

export const CreateAdsFormWrapper = styled.div`
    display: flex;
    margin-bottom: 50px;
`;

export const CreateAdsForm = styled(Form)`
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
`;
export const P = styled.p`
    width: 300px;
    margin : 10px 0px 40px 0px;
    font-size : 20px;
    text-align : center;
`
