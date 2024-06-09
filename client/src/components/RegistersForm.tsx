import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import {
    Button,
    Center,
    Container,
    Group,
    Paper,
    Stack,
    TextInput,
} from '@mantine/core';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        birthday: '',
        role: '',
        cpf: '',
        phone: '',
        city: '',
        province: '',
        address: '',
        emailAddress: '',
        username: '',
        password: '',
    });

    const [invalidAuth, setInvalidAuth] = useState(false);

    const navigate = useNavigate();

    const SignUpClickHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const registrationData = {
            name: formData.fullName,
            birthday: formData.birthday,
            email: formData.emailAddress,
            cpf: formData.cpf,
            phone: formData.phone,
            city: formData.city,
            province: formData.province,
            address: formData.address,
            username: formData.username,
            password: formData.password,
        };

        try {
            const response = await AuthService.register(registrationData);

            if (response.status === 201) {
                console.log(response);

                navigate('/login');
            } else {
                setInvalidAuth(true);
            }
        } catch (error) {
            setInvalidAuth(true);
        }
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        const value = e.target.value;
        setFormData({ ...formData, [field]: value });
    };

    function LoginClickHandler(
        event: MouseEvent<HTMLButtonElement, MouseEvent>
    ): void {
        navigate('/login');
    }

    return (
        <Container>
            <Center>
                <Paper p="xl" bg="#EEE" shadow="xs">
                    <h2 className="mb-4">Register Form</h2>
                    <form onSubmit={SignUpClickHandler}>
                        <Stack mb="md" align="flex-start">
                            <TextInput
                                name="name-input"
                                type="text"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={(e) =>
                                    handleInputChange(e, 'fullName')
                                }
                            />
                            <TextInput
                                name="birthday-input"
                                type="text"
                                placeholder="Birthday"
                                value={formData.birthday}
                                onChange={(e) =>
                                    handleInputChange(e, 'birthday')
                                }
                            />
                        </Stack>
                        <Group mb="md">
                            <TextInput
                                name="cpf-input"
                                type="text"
                                placeholder="CPF"
                                value={formData.cpf}
                                onChange={(e) => handleInputChange(e, 'cpf')}
                            />
                            <TextInput
                                name="phone-input"
                                type="text"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange(e, 'phone')}
                            />
                        </Group>
                        <Group mb="md">
                            <TextInput
                                name="city-input"
                                placeholder="City"
                                value={formData.city}
                                onChange={(e) => handleInputChange(e, 'city')}
                            />
                            <TextInput
                                name="province-input"
                                type="text"
                                placeholder="Province"
                                value={formData.province}
                                onChange={(e) =>
                                    handleInputChange(e, 'province')
                                }
                            />
                        </Group>
                        <Group mb="md">
                            <TextInput
                                name="adress-input"
                                className={`mb-3 mr-3 p-3 rounded-md border-2 ${
                                    invalidAuth ? 'border-2 border-red-700' : ''
                                }`}
                                type="text"
                                placeholder="Address"
                                value={formData.address}
                                onChange={(e) =>
                                    handleInputChange(e, 'address')
                                }
                            />
                            <TextInput
                                name="email-input"
                                className={`mb-12 p-3 rounded-md border-2 ${
                                    invalidAuth ? 'border-2 border-red-700' : ''
                                }`}
                                type="email"
                                placeholder="E-mail"
                                value={formData.emailAddress}
                                onChange={(e) =>
                                    handleInputChange(e, 'emailAddress')
                                }
                            />
                        </Group>
                        {invalidAuth ? (
                            <span className="mb-4 ml-4 text-sm text-red-500">
                                *Invalid input fields
                            </span>
                        ) : null}

                        <h2 className="mb-4">Login Data</h2>
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
                                onClick={LoginClickHandler}
                                variant="light"
                            >
                                Login
                            </Button>
                            <Button
                                type="submit"
                                onClick={SignUpClickHandler}
                                variant="filled"
                            >
                                Sign-up
                            </Button>
                        </Group>
                    </form>
                </Paper>
            </Center>
        </Container>
    );
}
