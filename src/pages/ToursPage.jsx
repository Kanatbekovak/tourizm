import React, { useState } from 'react';
import { Row, Col, Card, Button, Typography, Input, Select, DatePicker, InputNumber, Modal, Tag, Checkbox, Radio } from 'antd';
import { 
  EnvironmentOutlined, 
  ClockCircleOutlined, 
  MessageOutlined, 
  SearchOutlined, 
  UserOutlined,
  FilterOutlined,
  GlobalOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const initialTours = [
  {
    id: 1,
    title: "Юрточный лагерь на Сон-Куле",
    type: "Многодневные",
    category: "Семейная",
    lang: "Русский",
    price: 4500,
    duration: "3 дня",
    location: "Нарын",
    img: "https://plus.unsplash.com/premium_photo-1663045423397-eff0984894e5?q=80&w=1074&auto=format&fit=crop",
    fullDesc: "Проведите незабываемые дни в сердце Тянь-Шаня. В программу включено: проживание в юртах, национальная кухня и мастер-классы по установке юрт."
  },
  {
    id: 2,
    title: "Треккинг к озеру Ала-Куль",
    type: "Многодневные",
    category: "Авторские",
    lang: "Русский",
    price: 6200,
    duration: "4 дня",
    location: "Каракол",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    fullDesc: "Маршрут для настоящих ценителей гор. Подъем на перевал, вид на ледники и ночевка у бирюзового озера на высоте 3500 метров."
  },
  {
    id: 3,
    title: "Каньоны Конорчек",
    type: "Однодневные",
    category: "Фото-тур",
    lang: "English",
    price: 2800,
    duration: "1 день",
    location: "Боом",
    img: "https://images.unsplash.com/photo-1628102420443-463289053350",
    fullDesc: "Однодневное путешествие в 'Красные каньоны'. Легкий хайкинг, уникальные ландшафты и идеальные локации для фотосессий."
  }
];

const ToursPage = () => {
  const navigate = useNavigate();
  const [selectedTour, setSelectedTour] = useState(null);
  const [mainType, setMainType] = useState('Многодневные'); // Фильтр по центру

  const handleBooking = (tour) => {
    navigate('/booking', { state: { tourData: tour } });
  };

  const handleChat = (tour) => {
    navigate('/chat', { state: { tourName: tour.title } });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      
      {/* 1. ВЕРХНИЙ БЛОК С ПОИСКОМ И ЦЕНТРАЛЬНЫМ ФИЛЬТРОМ */}
      <section className="bg-kg-red pt-16 pb-32 px-4 text-center">
        <Title level={1} className="!text-white !font-black !text-5xl uppercase mb-8">
          Выбери свой <span className="text-kg-gold">Маршрут</span>
        </Title>

        {/* ЦЕНТРАЛЬНЫЙ ФИЛЬТР (ДЛИТЕЛЬНОСТЬ) */}
        <div className="flex justify-center gap-4 mb-10">
          {['Многодневные', 'Однодневные', 'Необычные'].map(type => (
            <Button 
              key={type}
              size="large"
              onClick={() => setMainType(type)}
              className={`h-14 px-8 rounded-2xl font-black uppercase transition-all border-none shadow-lg ${mainType === type ? 'bg-kg-gold text-black scale-105' : 'bg-white text-gray-400 hover:text-kg-red'}`}
            >
              {type}
            </Button>
          ))}
        </div>
        
        <div className="max-w-5xl mx-auto bg-white p-4 rounded-[2rem] shadow-2xl flex flex-wrap gap-4 items-center">
          <Input placeholder="Куда вы хотите поехать?" prefix={<SearchOutlined />} className="flex-1 min-w-[200px] h-12 rounded-xl" />
          <RangePicker placeholder={['Начало', 'Конец']} className="flex-1 h-12 rounded-xl" />
          <InputNumber min={1} defaultValue={1} prefix={<UserOutlined />} className="w-32 h-12 flex items-center rounded-xl" />
          <Button className="h-12 px-8 bg-black text-white border-none rounded-xl font-bold hover:bg-kg-gold hover:text-black transition-all">ПОИСК</Button>
        </div>
      </section>

      {/* 2. ОСНОВНОЙ КОНТЕНТ С БОКОВЫМ ФИЛЬТРОМ */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Row gutter={40}>
          
          {/* ЛЕВОЕ МЕНЮ ФИЛЬТРОВ */}
          <Col xs={24} lg={7}>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-24">
              <Title level={4} className="mb-8 flex items-center gap-2">
                <FilterOutlined className="text-kg-red" /> Фильтры
              </Title>

              {/* Формат тура */}
              <div className="mb-8">
                <Text className="font-bold text-gray-400 uppercase text-[10px] block mb-4">Формат отдыха</Text>
                <Radio.Group className="flex flex-col gap-3">
                  <Radio value="family">Семейная</Radio>
                  <Radio value="corp">Корпоративная</Radio>
                  <Radio value="author">Авторские туры</Radio>
                </Radio.Group>
              </div>

              {/* Дети */}
              <div className="mb-8 pt-6 border-t border-gray-50">
                <Text className="font-bold text-gray-400 uppercase text-[10px] block mb-4">Дополнительно</Text>
                <Checkbox.Group className="flex flex-col gap-3">
                  <Checkbox value="kids">Можно с детьми</Checkbox>
                  <Checkbox value="no-kids">Без детей</Checkbox>
                </Checkbox.Group>
              </div>

              {/* Язык */}
              <div className="mb-8 pt-6 border-t border-gray-50">
                <Text className="font-bold text-gray-400 uppercase text-[10px] block mb-4"><GlobalOutlined /> Язык гида</Text>
                <Select defaultValue="ru" className="w-full" variant="filled">
                  <Option value="ru">Русский</Option>
                  <Option value="kg">Кыргызча</Option>
                  <Option value="en">English</Option>
                </Select>
              </div>

              <Button block className="h-12 bg-kg-red text-white border-none rounded-xl font-bold shadow-md hover:opacity-90">
                Применить фильтры
              </Button>
            </div>
          </Col>

          {/* СПИСОК КАРТОЧЕК */}
          <Col xs={24} lg={17}>
            <Row gutter={[24, 24]}>
              {initialTours
                .filter(t => t.type === mainType) // Пример фильтрации по центральным кнопкам
                .map(tour => (
                <Col xs={24} md={12} key={tour.id}>
                  <Card
                    hoverable
                    className="rounded-[2rem] overflow-hidden border-none shadow-sm hover:shadow-xl transition-all group"
                    cover={
                      <div className="relative overflow-hidden h-60" onClick={() => setSelectedTour(tour)}>
                        <img src={tour.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={tour.title} />
                        <div className="absolute top-4 left-4">
                           <Tag color="black" className="rounded-full px-3 border-none font-bold shadow-md">{tour.lang}</Tag>
                        </div>
                      </div>
                    }
                  >
                    <div onClick={() => setSelectedTour(tour)}>
                      <div className="flex justify-between items-start mb-2">
                        <Tag color="red" className="rounded-full border-none px-3 font-bold">{tour.category}</Tag>
                        <Text className="text-kg-gold font-black text-lg">{tour.price} с</Text>
                      </div>
                      <Title level={3} className="!mb-4 !text-xl group-hover:text-kg-gold transition-colors">{tour.title}</Title>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-50">
                      <Button 
                        block 
                        className="bg-black text-white border-none rounded-xl font-bold h-12 transition-all"
                        onClick={(e) => { e.stopPropagation(); handleBooking(tour); }}
                      >
                        Забронировать
                      </Button>
                      <Button 
                        icon={<MessageOutlined />} 
                        className="rounded-xl border-2 border-kg-gold text-kg-gold h-12 w-14 hover:!bg-kg-gold hover:!text-white"
                        onClick={(e) => { e.stopPropagation(); handleChat(tour); }}
                      />
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>

      {/* МОДАЛКА (БЕЗ ИЗМЕНЕНИЙ) */}
      <Modal open={!!selectedTour} onCancel={() => setSelectedTour(null)} footer={null} width={800} centered>
        {selectedTour && (
          <div className="py-4">
            <img src={selectedTour.img} className="w-full h-80 object-cover rounded-3xl mb-6" alt="" />
            <Title level={2}>{selectedTour.title}</Title>
            <div className="flex gap-4 mb-6">
               <Tag icon={<EnvironmentOutlined />}>{selectedTour.location}</Tag>
               <Tag icon={<ClockCircleOutlined />}>{selectedTour.duration}</Tag>
            </div>
            <Paragraph className="text-gray-500 text-lg">{selectedTour.fullDesc}</Paragraph>
            <div className="flex gap-4 mt-8">
              <Button size="large" block className="bg-kg-red text-white border-none rounded-2xl font-bold h-14" onClick={() => handleBooking(selectedTour)}>Забронировать</Button>
              <Button size="large" icon={<MessageOutlined />} className="rounded-2xl border-2 border-kg-gold text-kg-gold h-14 w-20" onClick={() => handleChat(selectedTour)} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ToursPage;