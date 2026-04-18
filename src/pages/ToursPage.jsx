import React, { useState } from 'react';
import { Row, Col, Card, Button, Tag, Modal, Typography, Input, Select } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, MessageOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import OrnamentDivider from '../components/OrnamentDivider';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const toursData = [
  {
    id: 1,
    title: "Юрточный лагерь на Сон-Куле",
    category: "Культурный",
    price: "4500",
    duration: "3 дня",
    location: "Нарынская область",
    img: "https://plus.unsplash.com/premium_photo-1663045423397-eff0984894e5?q=80&w=1074&auto=format&fit=crop",
    description: "Почувствуйте жизнь истинного кочевника. Ночевка в традиционных юртах, дегустация кумыса и прогулки на лошадях под бесконечным звездным небом."
  },
  {
    id: 2,
    title: "Треккинг к озеру Ала-Куль",
    category: "Активный",
    price: "6200",
    duration: "4 дня",
    location: "Иссык-Кульская область",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    description: "Сложный, но невероятно красивый маршрут к бирюзовому озеру на высоте 3500 метров. Только для любителей настоящих гор."
  },
  {
    id: 3,
    title: "Каньоны Конорчек",
    category: "Фото-тур",
    price: "2800",
    duration: "1 день",
    location: "Боомское ущелье",
    img: "https://images.unsplash.com/photo-1628102420443-463289053350",
    description: "Марсианские пейзажи в паре часов от Бишкека. Идеальное место для крутых фотографий и легкого хайкинга."
  }
];

const ToursPage = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [filter, setFilter] = useState('Все');
  const navigate = useNavigate();

  const filteredTours = filter === 'Все' 
    ? toursData 
    : toursData.filter(t => t.category === filter);

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-20">
      {/* Шапка страницы */}
      <div className="bg-kg-red py-16 px-8 text-center text-white relative overflow-hidden">
        <div className="relative z-10">
          <Title level={1} className="!text-white !font-black !m-0 uppercase italic tracking-tighter">Наши маршруты</Title>
          <Text className="text-kg-gold font-bold tracking-widest uppercase text-xs">Найдите свое приключение с Nomad AI</Text>
        </div>
        {/* Анимированный узор на фоне */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 -mt-8 relative z-20">
        {/* Панель фильтров */}
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-kg-gold/20 flex flex-wrap gap-4 items-center justify-between">
          <Input 
            prefix={<SearchOutlined className="text-gray-400" />} 
            placeholder="Поиск по названию..." 
            className="w-full md:w-64 rounded-xl"
          />
          <div className="flex gap-2">
            {['Все', 'Активный', 'Культурный', 'Фото-тур'].map(cat => (
              <Button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full border-none font-bold ${filter === cat ? 'bg-kg-gold text-black' : 'bg-gray-100 text-gray-500'}`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Сетка туров */}
        <Row gutter={[32, 32]} className="mt-12">
          {filteredTours.map(tour => (
            <Col xs={24} md={12} lg={8} key={tour.id}>
              <Card
                hoverable
                className="rounded-[2.5rem] overflow-hidden border-none shadow-md group"
                cover={<img alt={tour.title} src={tour.img} className="h-64 object-cover group-hover:scale-110 transition-transform duration-700" />}
                onClick={() => setSelectedTour(tour)}
              >
                <Tag color="gold" className="rounded-full border-none px-4 font-bold mb-3">{tour.category}</Tag>
                <Title level={3} className="group-hover:text-kg-red transition-colors">{tour.title}</Title>
                <div className="flex flex-col gap-2 text-gray-500 mb-4">
                  <span><EnvironmentOutlined className="text-kg-red" /> {tour.location}</span>
                  <span><ClockCircleOutlined className="text-kg-red" /> {tour.duration}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <Text className="text-2xl font-black">{tour.price} с</Text>
                  <Button className="bg-kg-gold border-none rounded-full font-bold">Детали</Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* МОДАЛЬНОЕ ОКНО ТУРА */}
      <Modal
        open={!!selectedTour}
        onCancel={() => setSelectedTour(null)}
        footer={null}
        width={900}
        centered
        className="tour-modal"
      >
        {selectedTour && (
          <div className="p-4">
            <Row gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <img src={selectedTour.img} className="w-full h-[400px] object-cover rounded-[2rem] shadow-lg" alt="" />
              </Col>
              <Col xs={24} md={12} className="flex flex-col justify-between">
                <div>
                  <Tag color="red" className="mb-4">Популярный выбор</Tag>
                  <Title level={2} className="!font-black uppercase">{selectedTour.title}</Title>
                  <Paragraph className="text-gray-500 text-lg leading-relaxed">
                    {selectedTour.description}
                  </Paragraph>
                  <div className="bg-gray-50 p-6 rounded-2xl mb-6">
                    <div className="flex justify-between mb-2">
                      <Text strong>Продолжительность:</Text>
                      <Text>{selectedTour.duration}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text strong>Цена за человека:</Text>
                      <Text className="text-xl font-black text-kg-red">{selectedTour.price} сом</Text>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="primary" 
                    size="large" 
                    block 
                    className="h-14 rounded-2xl bg-kg-red border-none font-bold text-lg"
                    onClick={() => navigate('/booking')}
                  >
                    Забронировать
                  </Button>
                  <Button 
                    size="large" 
                    icon={<MessageOutlined />} 
                    className="h-14 w-20 rounded-2xl border-2 border-kg-gold text-kg-gold"
                    onClick={() => navigate('/chat', { state: { tourName: selectedTour.title } })}
                  />
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      <OrnamentDivider />
    </div>
  );
};

export default ToursPage;