import React, { useState } from 'react';
import { Typography, Row, Col, Modal, Button, Tag } from 'antd';
import { StarFilled } from '@ant-design/icons'; // Добавил иконку для красоты

const { Title, Text } = Typography;

const TurAgents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);

  const agencies = [
    {
      id: 1,
      name: "Bishkek Travel",
      description: "Лидеры по внутреннему туризму в Кыргызстане с 10-летним стажем.",
      logo: "https://images.unsplash.com/photo-1569429593410-b498b3fb3387",
      rating: "4.9",
      specialization: "Горные походы"
    },
    {
      id: 2,
      name: "Nomad Life",
      description: "Аутентичные туры с проживанием в юртах и конными прогулками.",
      logo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
      rating: "5.0",
      specialization: "Этно-туры"
    }
  ];

  const handleOpenAgency = (agency) => {
    setSelectedAgency(agency);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <Title level={1} className="!font-black uppercase tracking-tighter">Наши партнеры</Title>
          <Text className="text-gray-500 text-lg">Надежные турагентства, проверенные временем и дорогами</Text>
        </div>

        <Row gutter={[32, 32]}>
          {agencies.map((agency) => (
            <Col xs={24} sm={12} lg={8} key={agency.id}>
              <div 
                onClick={() => handleOpenAgency(agency)}
                className="bg-white rounded-[2.5rem] p-8 border border-gray-100 hover:shadow-2xl transition-all cursor-pointer group text-center h-full"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-kg-gold shadow-md">
                  <img src={agency.logo} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={agency.name} />
                </div>
                <Tag color="gold" className="mb-2 uppercase font-bold border-none">{agency.specialization}</Tag>
                <h3 className="font-black text-2xl mb-2 group-hover:text-kg-gold transition-colors">{agency.name}</h3>
                <div className="text-kg-gold font-bold mb-4"><StarFilled /> {agency.rating}</div>
                <Button type="text" className="text-kg-red font-bold p-0">Посмотреть туры →</Button>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={700}
        styles={{ body: { padding: '40px', borderRadius: '3rem' } }} // Исправлено здесь
      >
        {selectedAgency && (
          <div className="text-center">
            <img 
              src={selectedAgency.logo} 
              className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-kg-gold mb-6" 
              alt="Logo" 
            />
            <Title level={2} className="!font-black uppercase !m-0">{selectedAgency.name}</Title>
            <div className="h-1 w-16 bg-kg-gold mx-auto my-4"></div>
            
            <Text className="text-gray-600 text-lg block mb-8">
              {selectedAgency.description}
            </Text>

            <div className="bg-gray-50 rounded-[2rem] p-8 border-2 border-dashed border-gray-200">
              <h4 className="font-bold text-gray-400 uppercase tracking-widest mb-2">Актуальные туры</h4>
              <p className="text-gray-400 italic">
                Раздел находится в разработке. <br /> Скоро здесь появится список предложений от {selectedAgency.name}.
              </p>
            </div>

            <Button 
              onClick={() => setIsModalOpen(false)}
              className="mt-8 h-12 px-10 rounded-full bg-black text-white font-bold border-none hover:bg-kg-red transition-colors"
            >
              ЗАКРЫТЬ
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TurAgents;