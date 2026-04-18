import React, { useState } from 'react';
import { Card, Tabs, Form, Input, Button, Radio, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Путь к твоему файлу с axios.create

const { Title, Text } = Typography;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let response;
      
      if (values.role === 'tourist') {
        // Эндпоинты для обычных пользователей
        const endpoint = isLogin ? '/users/login' : '/users/register';
        const payload = isLogin 
          ? { email: values.email, password: values.password } 
          : { 
              full_name: values.username, 
              email: values.email, 
              password: values.password, 
              age: 18 // Ставим по дефолту или добавь Input в форму
            };
        response = await api.post(endpoint, payload);
      } else {
        // Эндпоинты для партнеров
        const endpoint = isLogin ? '/partners/login' : '/partners/';
        const payload = isLogin 
          ? { contact_email: values.email, password: values.password } 
          : { 
              name: values.username, 
              contact_email: values.email, 
              password: values.password,
              description: "Новый партнер",
              address: "Бишкек" 
            };
        response = await api.post(endpoint, payload);
      }

      message.success(isLogin ? 'С возвращением!' : 'Регистрация прошла успешно!');
      
      // Сохраняем данные (id пригодится для покупок и создания туров)
      localStorage.setItem('user_data', JSON.stringify(response.data));
      localStorage.setItem('role', values.role);
      
      navigate('/tours');
    } catch (error) {
      // Ошибка выведется через интерцептор в api.js, если ты его добавил
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (values) => {
  try {
    const res = await api.post('/auth/login', values);
    // Сохраняем данные пользователя (id, имя, токен)
    localStorage.setItem('user_data', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);
    
    message.success("Добро пожаловать!");
    navigate('/tours'); // Перенаправляем на туры после входа
  } catch (err) {
    message.error("Ошибка входа");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9] py-20 px-4">
      <Card className="w-full max-w-md rounded-[3rem] shadow-2xl border-none p-6">
        <div className="text-center mb-6">
          <Title level={2} className="!font-black uppercase tracking-tighter">
            Nomad <span className="text-kg-red">ID</span>
          </Title>
          <Text type="secondary">Войдите в систему NomadAI</Text>
        </div>

        <Tabs 
          centered 
          activeKey={isLogin ? '1' : '2'} 
          onChange={(key) => setIsLogin(key === '1')}
          items={[{ label: 'ВХОД', key: '1' }, { label: 'РЕГИСТРАЦИЯ', key: '2' }]}
        />

        <Form layout="vertical" onFinish={onFinish} className="mt-6">
          {!isLogin && (
            <Form.Item name="username" rules={[{ required: true, message: 'Введите имя' }]}>
              <Input prefix={<UserOutlined />} placeholder="Имя / Название компании" className="h-12 rounded-xl" />
            </Form.Item>
          )}
          <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" className="h-12 rounded-xl" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" className="h-12 rounded-xl" />
          </Form.Item>

          <Form.Item name="role" initialValue="tourist" label="Кто вы?">
            <Radio.Group className="w-full flex">
              <Radio.Button value="tourist" className="flex-1 text-center h-12 flex items-center justify-center rounded-l-xl">ТУРИСТ</Radio.Button>
              <Radio.Button value="partner" className="flex-1 text-center h-12 flex items-center justify-center rounded-r-xl">ПАРТНЕР</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading} className="h-14 bg-kg-red border-none rounded-2xl font-black text-lg shadow-lg mt-4">
            {isLogin ? 'ВОЙТИ' : 'СОЗДАТЬ АККАУНТ'}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AuthPage;