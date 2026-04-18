import React from 'react';
import { Input, Button, Divider } from 'antd';
import { MailOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Колонка 1: О нас */}
          <div className="lg:col-span-2">
            <h2 className="text-white text-2xl font-bold mb-6 italic">NomadAI</h2>
            <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
              Мы объединяем традиции гостеприимства кочевников с технологиями будущего. Наш ИИ поможет вам открыть настоящий Кыргызстан.
            </p>
            <div className="flex gap-4">
              <Input 
                placeholder="Ваш e-mail" 
                className="bg-gray-800 border-gray-700 text-white rounded-lg h-12" 
              />
              <Button type="primary" className="bg-kg-red hover:bg-red-700 border-none h-12 px-6 rounded-lg font-bold">
                Рассылка
              </Button>
            </div>
          </div>

          {/* Колонка 2: Туристам */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Туристам</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-kg-gold transition-colors cursor-pointer text-gray-400">Популярные туры</li>
              <li className="hover:text-kg-gold transition-colors cursor-pointer text-gray-400">Локации (Карта)</li>
              <li className="hover:text-kg-gold transition-colors cursor-pointer text-gray-400">Что взять с собой?</li>
              <li className="hover:text-kg-gold transition-colors cursor-pointer text-gray-400">Оставить отзыв</li>
            </ul>
          </div>

          {/* Колонка 3: Платформа */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Партнерам</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-kg-gold transition-colors cursor-pointer text-gray-400">Стать гидом</li>
              <li className="hover:text-kg-gold transition-colors cursor-pointer text-gray-400">Для агентств</li>
              <li className="hover:text-kg-gold transition-colors cursor-pointer text-gray-400">API доступа</li>
            </ul>
          </div>

          {/* Колонка 4: Контакты */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Контакты</h4>
            <div className="space-y-4 text-sm">
              <p className="flex items-center gap-2"><PhoneOutlined className="text-kg-red" /> +996 (555) 00-00-00</p>
              <p className="flex items-center gap-2"><MailOutlined className="text-kg-red" /> support@nomadai.kg</p>
              <div className="flex gap-4 pt-4">
                <InstagramOutlined className="text-xl hover:text-kg-gold cursor-pointer" />
                <span className="font-bold text-kg-gold">Telegram</span>
              </div>
            </div>
          </div>
        </div>

        <Divider className="border-gray-800 mt-16" />
        <p className="text-center text-xs text-gray-500">
          © 2026 NomadAI. Сделано с любовью в Кыргызстане 🇰🇬
        </p>
      </div>
    </footer>
  );
};

export default Footer;