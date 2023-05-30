import { Button, Input } from 'antd';
import styled from 'styled-components'

export const Div = styled.div`
    display : flex;
    align-items : center;
    flex-direction : column;
`;

export const BottomButton = styled.div`
    margin-top: 20px;
`;

export const AmountInput = styled(Input)`
    margin-left: 10px;
    height: 30px;
    max-width: 150px;
`;

export const Spacer = styled.div`
    flex: 1;
`;

export const AmountInputWrapper = styled.div`
    display: flex;
    width: 450px;
    align-items: center;
`;

export const SubmitButton = styled(Button)`
    margin-left: 10px;
`;

export const TossModuleWrapper = styled.div`
    width: 450px;
`;
