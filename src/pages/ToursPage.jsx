import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Input, InputNumber, Modal, Row, Space, Tag, Typography, message } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { tourService } from '../services/tourService';

const { Title, Paragraph, Text } = Typography;

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState('');
  const [selectedTour, setSelectedTour] = useState(null);
  const [buySeats, setBuySeats] = useState(1);
  const [buyUserId, setBuyUserId] = useState(1);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const loadTours = async (params = {}) => {
    setLoading(true);
    try {
      const data = await tourService.getMarketplaceTours(params);
      setTours(data);
    } catch (error) {
      message.error(error.message || 'Не удалось загрузить туры');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  const handleSearch = () => {
    const params = destination.trim() ? { destination: destination.trim() } : {};
    loadTours(params);
  };

  const handlePurchase = async () => {
    if (!selectedTour) return;
    try {
      await tourService.purchaseTour({
        user_id: buyUserId,
        tour_id: selectedTour.id,
        seats: buySeats,
      });
      message.success('Тур успешно куплен');
      setSelectedTour(null);
      loadTours(destination.trim() ? { destination: destination.trim() } : {});
    } catch (error) {
      message.error(error.message || 'Не удалось оформить покупку');
    }
  };

  const askAi = async () => {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    try {
      const res = await tourService.sendChatMessage(aiQuestion.trim(), buyUserId);
      setAiAnswer(res.answer || '');
    } catch (error) {
      message.error(error.message || 'Ошибка ИИ-консультации');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <Title level={2}>Маркетплейс туров</Title>
        <Space.Compact style={{ width: '100%', marginBottom: 24 }}>
          <Input
            placeholder="Фильтр по направлению (например, Karakol)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Button type="primary" onClick={handleSearch}>Найти</Button>
        </Space.Compact>

        <Row gutter={[16, 16]}>
          {tours.map((tour) => (
            <Col xs={24} md={12} lg={8} key={tour.id}>
              <Card
                title={tour.title}
                loading={loading}
                extra={<Tag color="blue">{tour.category || 'Без категории'}</Tag>}
              >
                <Paragraph>{tour.description}</Paragraph>
                <Paragraph>
                  <Text strong>Локация:</Text> {tour.destination}
                </Paragraph>
                <Paragraph>
                  <Text strong>Партнер:</Text> {tour.partner_name}
                </Paragraph>
                <Paragraph>
                  <Text strong>Цена:</Text>{' '}
                  {tour.promo_price ? (
                    <>
                      <Text delete>{tour.price}</Text>{' '}
                      <Text type="danger">{tour.promo_price}</Text>
                    </>
                  ) : (
                    <Text>{tour.price}</Text>
                  )}{' '}
                  сом
                </Paragraph>
                <Paragraph>
                  <Text strong>Мест:</Text> {tour.slots_available}
                </Paragraph>
                <Space>
                  <Button type="primary" onClick={() => setSelectedTour(tour)}>Купить</Button>
                  <Button icon={<MessageOutlined />} onClick={() => setAiQuestion(`Подбери похожие туры как "${tour.title}"`)}>
                    Консультация ИИ
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="mt-10 bg-white p-6 rounded-2xl">
          <Title level={4}>ИИ-консультация</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              placeholder="Задайте вопрос ИИ по турам"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              onPressEnter={askAi}
            />
            <Button onClick={askAi} loading={aiLoading}>Спросить</Button>
            {aiAnswer && <Paragraph>{aiAnswer}</Paragraph>}
          </Space>
        </div>
      </div>

      <Modal
        open={!!selectedTour}
        onCancel={() => setSelectedTour(null)}
        onOk={handlePurchase}
        okText="Подтвердить покупку"
        title={selectedTour ? `Покупка: ${selectedTour.title}` : 'Покупка'}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <InputNumber
            min={1}
            value={buyUserId}
            onChange={(v) => setBuyUserId(Number(v) || 1)}
            addonBefore="User ID"
            style={{ width: '100%' }}
          />
          <InputNumber
            min={1}
            value={buySeats}
            onChange={(v) => setBuySeats(Number(v) || 1)}
            addonBefore="Seats"
            style={{ width: '100%' }}
          />
        </Space>
      </Modal>
    </div>
  );
};

export default ToursPage;