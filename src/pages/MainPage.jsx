import React from 'react';
import { Carousel, Typography, Button, Row, Col, Rate } from 'antd';

import ConsultationBlock from '../components/ConsultationBlock';

const { Title, Text } = Typography;

const MarketplacePage = () => {
  // Данные для рекламной карусели
  const hotTours = [
    { id: 1, title: "ЗОЛОТОЕ НАСЛЕДИЕ", sub: "КОЧЕВНИКОВ", img: "https://images.unsplash.com/photo-1569429593410-b498b3fb3387" },
    { id: 2, title: "ТАЙНЫ НЕБЕСНЫХ", sub: "ГОР ТЯНЬ-ШАНЯ", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa" },
    { id: 3, title: "БЕРЕГ ЛЕГЕНД", sub: "ИССЫК-КУЛЯ", img: "https://plus.unsplash.com/premium_photo-1663045423397-eff0984894e5?q=80&w=1074&auto=format&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      
      {/* 1. ГЛАВНАЯ РЕКЛАМНАЯ КАРУСЕЛЬ (ГОРЯЧИЕ ТУРЫ) */}
      <section className="px-4 py-4">
        <Carousel autoplay effect="fade" speed={1000} autoplaySpeed={5000}>
          {hotTours.map(tour => (
            <div key={tour.id} className="relative h-[600px] rounded-[3rem] overflow-hidden outline-none">
              <img src={tour.img} className="w-full h-full object-cover" alt="Banner" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent flex flex-col justify-center px-16">
                <div className="flex items-center gap-3 mb-4">
                   <div className="h-[2px] w-12 bg-kg-gold shadow-[0_0_10px_#FFD100]"></div>
                   <span className="text-kg-gold font-bold tracking-[0.2em] uppercase">Горящее предложение</span>
                </div>
                <h1 className="text-7xl font-black text-white mb-6 leading-none">
                  {tour.title} <br/> 
                  <span className="text-kg-gold">{tour.sub}</span>
                </h1>
                <p className="text-white/80 text-xl max-w-lg mb-8 font-light italic">
                  Скидка до 20% при бронировании через наш ИИ-ассистент в этом месяце.
                </p>
                <Button 
                  size="large"
                  className="w-fit h-14 px-12 rounded-full bg-kg-gold border-none text-black font-black text-lg hover:scale-110 transition-all shadow-[0_0_30px_rgba(255,209,0,0.5)]"
                >
                  ЗАБРОНИРОВАТЬ СО СКИДКОЙ
                </Button>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

    

      {/* 2. ПОПУЛЯРНЫЕ ТУРЫ (Сетка) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Title level={2} className="!m-0 !font-black uppercase tracking-tighter">Популярные туры</Title>
            <Text type="secondary">То, что выбирают путешественники сегодня</Text>
          </div>
          <Button type="link" className="text-kg-red font-bold text-lg">Смотреть все →</Button>
        </div>
        
        <Row gutter={[32, 32]}>
          {[1, 2, 3, 4].map((i) => (
            <Col xs={24} sm={12} lg={6} key={i}>
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1628102420443-463289053350" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute top-4 right-4 bg-kg-gold text-black px-4 py-1 rounded-full font-black text-xs shadow-md">
                    POPULAR
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">3 дня • Активный отдых</span>
                    <Rate disabled defaultValue={5} className="text-[10px] text-kg-gold" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 group-hover:text-kg-gold transition-colors">Каньоны Конорчек</h3>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                    <span className="text-lg font-black text-gray-900">3 200 сом</span>
                    <Button type="text" className="text-kg-red font-bold p-0">Подробнее</Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      {/* 3. ИИ-КОНСУЛЬТАЦИЯ */}
      <div className="max-w-7xl mx-auto px-8 pb-24">
        <ConsultationBlock />
      </div>

      {/* 3. БЕСКОНЕЧНАЯ КАРУСЕЛЬ ПАРТНЕРОВ */}
      <section className="py-16 bg-white overflow-hidden border-y border-gray-50">
        <div className="text-center mb-10 text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Наши официальные партнеры</div>
        <div className="relative flex overflow-hidden">
          <div className="logo-track flex gap-20 items-center">
            {/* Повторяем список дважды для бесшовности */}
            {[1, 2, 1, 2].map(() => (
              <>
                <span className="text-3xl font-black italic text-gray-200 hover:text-kg-gold transition-colors cursor-default">BishkekTravel</span>
                <span className="text-3xl font-black italic text-gray-200 hover:text-kg-red transition-colors cursor-default">NomadLife</span>
                <span className="text-3xl font-black italic text-gray-200 hover:text-kg-gold transition-colors cursor-default">PeakDiscovery</span>
                <span className="text-3xl font-black italic text-gray-200 hover:text-kg-red transition-colors cursor-default">KyrgyzGuiding</span>
                <span className="text-3xl font-black italic text-gray-200 hover:text-kg-gold transition-colors cursor-default">SkyTours</span>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ОТЗЫВЫ */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Title level={2} className="!font-black uppercase tracking-tight">Отзывы наших кочевников</Title>
            <div className="h-1 w-20 bg-kg-gold mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border-b-4 border-kg-gold hover:-translate-y-2 transition-transform">
                <Text className="italic text-gray-500 text-lg block mb-6">
                  "Потрясающий опыт! ИИ не просто предложил тур, а учел все мои капризы по еде и темпу ходьбы. Золотой сервис!"
                </Text>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-kg-red rounded-full flex items-center justify-center text-white font-bold">А</div>
                  <div>
                    <div className="font-black text-gray-900">Айсулуу М.</div>
                    <div className="text-xs text-kg-gold">Путешественник</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



    </div>
  );
};

export default MarketplacePage;