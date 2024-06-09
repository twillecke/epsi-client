import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import {
    Button,
    Center,
    Container,
    Group,
    Paper,
    TextInput,
} from '@mantine/core';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [invalidAuth, setInvalidAuth] = useState(false);
    const navigate = useNavigate();

    async function LoginClickHandler(e: React.FormEvent) {
        e.preventDefault();
        const loginInputData = {
            username: formData.username,
            password: formData.password,
        };

        try {
            const response = await AuthService.login(loginInputData);

            if (response && response.accessToken) {
                console.log(response);
                navigate('/user-profile');
            } else {
                setInvalidAuth(true);
            }
        } catch (error) {
            console.error('Login Error:', error);
            setInvalidAuth(true);
        }
    }

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        const value = e.target.value;
        setFormData({ ...formData, [field]: value });
        setInvalidAuth(false);
    };

    const SignUpClickHandler = () => {
        navigate('/sign-up');
    };

    return (
        <Container size="sm">
            <Center mx="auto" my="auto">
                {' '}
                <Paper p="xl" bg="#EEE" shadow="xs">
                    <h2>Login Form</h2>
                    <form
                        onSubmit={LoginClickHandler}
                        className="flex flex-col"
                    >
                        <TextInput
                            mb="sm"
                            placeholder="Username"
                            required
                            value={formData.username}
                            onChange={(e) => handleInputChange(e, 'username')}
                        />
                        <TextInput
                            type="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={(e) => handleInputChange(e, 'password')}
                        />
                        <Group position="center" spacing="xl" grow mt="lg">
                            <Button
                                type="submit"
                                onClick={SignUpClickHandler}
                                variant="light"
                            >
                                Sign-up
                            </Button>
                            <Button
                                type="submit"
                                onClick={LoginClickHandler}
                                variant="filled"
                            >
                                Login
                            </Button>
                        </Group>
                    </form>
                </Paper>
            </Center>
        </Container>
    );
}
