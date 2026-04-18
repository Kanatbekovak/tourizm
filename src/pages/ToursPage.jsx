import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Typography, Input, Select, DatePicker, InputNumber, Modal, Tag, Checkbox, Radio, message } from 'antd';
import { 
  EnvironmentOutlined, ClockCircleOutlined, MessageOutlined, SearchOutlined, 
  UserOutlined, FilterOutlined, GlobalOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const ToursPage = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [mainType, setMainType] = useState('Многодневные');

  // 1. Загрузка туров из бэкенда
  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await api.get('/marketplace/tours');
      setTours(res.data);
    } catch (err) {
      message.error("Не удалось загрузить туры");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // 2. Логика покупки (бронирования)
  const handleBooking = async (tour) => {
    const rawData = localStorage.getItem('user_data');
    if (!rawData) {
      message.info("Сначала войдите в систему");
      return navigate('/auth');
    }

    const userData = JSON.parse(rawData);
    try {
      await api.post('/marketplace/purchase', {
        user_id: userData.id,
        tour_id: tour.id,
        seats: 1
      });
      message.success("Билет куплен! Проверьте историю платежей.");
      fetchTours(); // Обновляем количество доступных мест
    } catch (err) {
      console.error(err);
    }
  };

  const handleChat = (tour) => {
    navigate('/chat', { state: { tourName: tour.title } });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      {/* Шапка с поиском (без изменений) */}
      <section className="bg-kg-red pt-16 pb-32 px-4 text-center">
        <Title level={1} className="!text-white !font-black !text-5xl uppercase mb-8">
          Выбери свой <span className="text-kg-gold">Маршрут</span>
        </Title>
        <div className="flex justify-center gap-4 mb-10">
          {['Многодневные', 'Однодневные', 'Необычные'].map(type => (
            <Button key={type} size="large" onClick={() => setMainType(type)}
              className={`h-14 px-8 rounded-2xl font-black uppercase border-none shadow-lg ${mainType === type ? 'bg-kg-gold text-black scale-105' : 'bg-white text-gray-400'}`}>
              {type}
            </Button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Row gutter={40}>
          {/* Боковой фильтр (без изменений) */}
          <Col xs={24} lg={7}>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-24">
              <Title level={4} className="mb-8 flex items-center gap-2"><FilterOutlined /> Фильтры</Title>
              <Button block onClick={fetchTours} className="h-12 bg-kg-red text-white border-none rounded-xl font-bold">ОБНОВИТЬ СПИСОК</Button>
            </div>
          </Col>

          {/* Список туров из API */}
          <Col xs={24} lg={17}>
            <Row gutter={[24, 24]}>
              {tours.map(tour => (
                <Col xs={24} md={12} key={tour.id}>
                  <Card hoverable className="rounded-[2rem] overflow-hidden border-none shadow-sm group">
                    <div className="relative h-60 overflow-hidden" onClick={() => setSelectedTour(tour)}>
                      <img src={tour.image_url || "https://images.unsplash.com/photo-1544735716-392fe2489ffa"} className="w-full h-full object-cover group-hover:scale-110 transition-all" alt="" />
                      <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full font-bold text-xs">
                        Мест: {tour.slots_available}
                      </div>
                    </div>
                    
                    <div className="p-4" onClick={() => setSelectedTour(tour)}>
                      <div className="flex justify-between items-center mb-2">
                        <Tag color="red" className="rounded-full border-none px-3 font-bold">{tour.category || 'Тур'}</Tag>
                        <div>
                          {tour.promo_price ? (
                            <div className="flex flex-col items-end">
                              <Text delete className="text-gray-400 text-xs">{tour.price} с</Text>
                              <Text className="text-kg-red font-black text-lg">{tour.promo_price} с</Text>
                            </div>
                          ) : (
                            <Text className="text-kg-gold font-black text-lg">{tour.price} с</Text>
                          )}
                        </div>
                      </div>
                      <Title level={4} className="!mb-4 !text-xl group-hover:text-kg-gold">{tour.title}</Title>
                    </div>

                    <div className="flex gap-2 p-4 border-t border-gray-50">
                      <Button block disabled={tour.slots_available <= 0} className="bg-black text-white border-none rounded-xl font-bold h-12" 
                        onClick={(e) => { e.stopPropagation(); handleBooking(tour); }}>
                        {tour.slots_available > 0 ? 'Забронировать' : 'Мест нет'}
                      </Button>
                      <Button icon={<MessageOutlined />} className="rounded-xl border-2 border-kg-gold text-kg-gold h-12 w-14" 
                        onClick={(e) => { e.stopPropagation(); handleChat(tour); }} />
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>

      {/* Модальное окно (без изменений) */}
      <Modal open={!!selectedTour} onCancel={() => setSelectedTour(null)} footer={null} width={800} centered>
        {selectedTour && (
          <div className="py-4">
            <Title level={2}>{selectedTour.title}</Title>
            <Paragraph className="text-gray-500 text-lg">{selectedTour.description}</Paragraph>
            <Button size="large" block className="bg-kg-red text-white border-none rounded-2xl font-bold h-14 mt-4" onClick={() => handleBooking(selectedTour)}>Купить за {selectedTour.promo_price || selectedTour.price} с</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ToursPage;