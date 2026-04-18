import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Badge, Avatar } from 'antd';
import { SearchOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons';

const Navbar = () => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    
  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-kg-gold/20 px-6 py-3 flex items-center justify-between">
        
        {/* Логотип в национальном цвете */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-kg-red rounded-full flex items-center justify-center shadow-md">
            <span className="text-kg-gold font-bold text-xl">N</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-900">
            Nomad<span className="text-kg-red">AI</span>
          </span>
        </Link>

        {/* Навигация */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-600">
          <Link to="/tours" className="hover:text-kg-red transition-colors">Туры</Link>
          <Link to="/agencies" className="hover:text-kg-red transition-colors">Турагентства</Link>
          <Link to="/map" className="hover:text-kg-red flex items-center gap-1">
            <EnvironmentOutlined /> Карта
          </Link>
        </div>

        {/* Поиск и Аккаунт */}
        <div className="flex items-center gap-6">
          <Input 
            prefix={<SearchOutlined className="text-gray-400" />} 
            placeholder="Поиск приключений..." 
            className="hidden lg:flex w-64 rounded-xl border-none bg-gray-100 focus:bg-white transition-all"
          />
          <Link to={userData ? "/account" : "/auth"} className="flex items-center gap-2 group">
      <div className="text-right hidden sm:block">
        <p className="text-sm font-bold group-hover:text-kg-red transition-colors">
          {userData ? userData.name : "Войти"}
        </p>
      </div>
      <Avatar icon={<UserOutlined />} className="bg-kg-red shadow-md" />
    </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;