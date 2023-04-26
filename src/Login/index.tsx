import styled from 'styled-components';
import axios from 'axios';
import { Button, Form, Input } from 'antd';

const LoginForm = styled(Form)`
    margin-left: auto;
    margin-right: auto;
    max-width: 600px;
`;
const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const Login = () => {
    const [form] = Form.useForm();
    const onFinish = async (values: any) => {
        console.log(values);
        await axios.post('/api/user/login', {
            email: values.email,
            password: values.password,
        });
    };

    return (
        <LoginForm
            {...layout}
            onFinish={onFinish}
            form={form}
            name="loginForm"
        >
            <Form.Item name="email" label="email" rules={[{required: true}]}>
                <Input />
            </Form.Item>
            <Form.Item name="pw" label="pw" rules={[{required: true}]}>
                <Input type="password"/>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <ButtonWrapper>
                    <Button type="primary" htmlType="submit">로그인</Button>
                    <Button htmlType="button">회원가입</Button>
                </ButtonWrapper>
            </Form.Item>
        </LoginForm>
    );
};

export default Login;
