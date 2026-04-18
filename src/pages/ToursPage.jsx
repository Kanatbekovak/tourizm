import React, { useMemo, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Typography,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Modal,
  Tag,
  Checkbox,
  Radio,
  Space,
  message,
  Form,
  Popconfirm,
} from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  SearchOutlined,
  UserOutlined,
  FilterOutlined,
  GlobalOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { tourService } from '../services/tourService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const ToursPage = () => {
  const role = localStorage.getItem('role') || 'guest';
  const userData = JSON.parse(localStorage.getItem('user_data') || 'null');
  const isPartner = role === 'partner';

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [mainType, setMainType] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [language, setLanguage] = useState('all');
  const [formats, setFormats] = useState([]);
  const [kidsOptions, setKidsOptions] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [creatingTour, setCreatingTour] = useState(false);
  const [deletingTourId, setDeletingTourId] = useState(null);
  const [buySeats, setBuySeats] = useState(1);
  const [buyUserId, ] = useState(userData?.id || 1);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [addTourForm] = Form.useForm();

  const loadTours = async () => {
    setLoading(true);
    try {
      const data = await tourService.getMarketplaceTours();
      setTours(data);
    } catch (error) {
      message.error(error.message || 'Не удалось загрузить туры');
    } finally {
      setLoading(false);
    }
  };


  const handlePurchase = async () => {
    if (!selectedTour) return;
    if (!userData?.id) {
      message.info('Для бронирования войдите как турист');
      return;
    }

    try {
      await tourService.purchaseTour({
        user_id: buyUserId,
        tour_id: selectedTour.id,
        seats: buySeats,
      });
      message.success('Тур успешно куплен');
      setSelectedTour(null);
      loadTours();
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

  const handleAddTour = async (values) => {
    if (!isPartner) return;

    setCreatingTour(true);
    try {
      await tourService.createTour({
        title: values.title,
        description: values.description,
        destination: values.location,
        category: values.category,
        price: Number(values.price),
        promo_price: values.promoPrice ? Number(values.promoPrice) : null,
        slots_available: Number(values.slots),
        image_url: values.imageUrl,
        partner_id: userData?.id,
      });
      message.success('Тур добавлен');
      setAddModalOpen(false);
      addTourForm.resetFields();
      loadTours();
    } catch (error) {
      message.error(error.message || 'Не удалось добавить тур');
    } finally {
      setCreatingTour(false);
    }
  };

  const handleDeleteTour = async (tourId) => {
    if (!isPartner) return;

    setDeletingTourId(tourId);
    try {
      await tourService.deleteTour(tourId);
      message.success('Тур удален');
      loadTours();
    } catch (error) {
      message.error(error.message || 'Не удалось удалить тур');
    } finally {
      setDeletingTourId(null);
    }
  };

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const title = (tour.title || '').toLowerCase();
      const destination = (tour.destination || '').toLowerCase();
      const query = searchText.trim().toLowerCase();
      const tourType = (tour.type || 'all').toLowerCase();
      const tourLang = (tour.lang || 'all').toLowerCase();
      const tourCategory = (tour.category || '').toLowerCase();

      if (mainType !== 'all' && tourType !== mainType.toLowerCase()) return false;
      if (language !== 'all' && tourLang !== language) return false;
      if (formats.length > 0 && !formats.includes(tourCategory)) return false;
      if (query && !(title.includes(query) || destination.includes(query))) return false;

      return true;
    });
  }, [tours, mainType, language, formats, searchText]);

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <section className="bg-kg-red pt-16 pb-32 px-4 text-center">
        <Title level={1} className="!text-white !font-black !text-5xl uppercase mb-8">
          Выбери свой <span className="text-kg-gold">Маршрут</span>
        </Title>

        <div className="flex justify-center gap-4 mb-10">
          {[
            { key: 'all', label: 'Все' },
            { key: 'многодневные', label: 'Многодневные' },
            { key: 'однодневные', label: 'Однодневные' },
            { key: 'необычные', label: 'Необычные' },
          ].map((type) => (
            <Button
              key={type.key}
              size="large"
              onClick={() => setMainType(type.key)}
              className={`h-14 px-8 rounded-2xl font-black uppercase transition-all border-none shadow-lg ${mainType === type.key ? 'bg-kg-gold text-black scale-105' : 'bg-white text-gray-400 hover:text-kg-red'}`}
            >
              {type.label}
            </Button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto bg-white p-4 rounded-[2rem] shadow-2xl flex flex-wrap gap-4 items-center">
          <Input
            placeholder="Куда вы хотите поехать?"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 min-w-[200px] h-12 rounded-xl"
          />
          <RangePicker
            placeholder={['Начало', 'Конец']}
            value={dateRange}
            onChange={(v) => setDateRange(v || [])}
            className="flex-1 h-12 rounded-xl"
          />
          <InputNumber
            min={1}
            value={guestCount}
            onChange={(v) => setGuestCount(Number(v) || 1)}
            prefix={<UserOutlined />}
            className="w-32 h-12 flex items-center rounded-xl"
          />
          <Button onClick={loadTours} className="h-12 px-8 bg-black text-white border-none rounded-xl font-bold hover:bg-kg-gold hover:text-black transition-all">
            ПОИСК
          </Button>
          {isPartner && (
            <Button icon={<PlusOutlined />} onClick={() => setAddModalOpen(true)} className="h-12 px-6 bg-kg-gold text-black border-none rounded-xl font-bold">
              Добавить тур
            </Button>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Row gutter={40}>
          <Col xs={24} lg={7}>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-24">
              <Title level={4} className="mb-8 flex items-center gap-2">
                <FilterOutlined className="text-kg-red" /> Фильтры
              </Title>

              <div className="mb-8">
                <Text className="font-bold text-gray-400 uppercase text-[10px] block mb-4">Формат отдыха</Text>
                <Checkbox.Group
                  value={formats}
                  onChange={(v) => setFormats(v)}
                  className="flex flex-col gap-3"
                >
                  <Checkbox value="семейная">Семейная</Checkbox>
                  <Checkbox value="корпоративная">Корпоративная</Checkbox>
                  <Checkbox value="авторские">Авторские туры</Checkbox>
                  <Checkbox value="фото-тур">Фото-тур</Checkbox>
                </Checkbox.Group>
              </div>

              <div className="mb-8 pt-6 border-t border-gray-50">
                <Text className="font-bold text-gray-400 uppercase text-[10px] block mb-4">Дополнительно</Text>
                <Checkbox.Group
                  value={kidsOptions}
                  onChange={(v) => setKidsOptions(v)}
                  className="flex flex-col gap-3"
                >
                  <Checkbox value="kids">Можно с детьми</Checkbox>
                  <Checkbox value="no-kids">Без детей</Checkbox>
                </Checkbox.Group>
              </div>

              <div className="mb-8 pt-6 border-t border-gray-50">
                <Text className="font-bold text-gray-400 uppercase text-[10px] block mb-4"><GlobalOutlined /> Язык гида</Text>
                <Select value={language} onChange={setLanguage} className="w-full" variant="filled">
                  <Option value="all">Любой</Option>
                  <Option value="русский">Русский</Option>
                  <Option value="кыргызча">Кыргызча</Option>
                  <Option value="english">English</Option>
                </Select>
              </div>

              <Button block onClick={loadTours} className="h-12 bg-kg-red text-white border-none rounded-xl font-bold shadow-md hover:opacity-90">
                Применить фильтры
              </Button>
            </div>
          </Col>

          <Col xs={24} lg={17}>
            <Row gutter={[24, 24]}>
              {filteredTours.map((tour) => (
                <Col xs={24} md={12} key={tour.id}>
                  <Card
                    hoverable
                    loading={loading}
                    className="rounded-[2rem] overflow-hidden border-none shadow-sm hover:shadow-xl transition-all group"
                    cover={
                      <div className="relative overflow-hidden h-60" onClick={() => setSelectedTour(tour)}>
                        <img src={tour.image_url || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={tour.title} />
                        <div className="absolute top-4 left-4">
                          <Tag color="black" className="rounded-full px-3 border-none font-bold shadow-md">{tour.lang || 'RU'}</Tag>
                        </div>
                      </div>
                    }
                  >
                    <div onClick={() => setSelectedTour(tour)}>
                      <div className="flex justify-between items-start mb-2">
                        <Tag color="red" className="rounded-full border-none px-3 font-bold">{tour.category || 'Тур'}</Tag>
                        <Text className="text-kg-gold font-black text-lg">{tour.promo_price || tour.price} с</Text>
                      </div>
                      <Title level={3} className="!mb-4 !text-xl group-hover:text-kg-gold transition-colors">{tour.title}</Title>
                      <Paragraph className="!mb-3 !text-gray-500">{tour.destination}</Paragraph>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-50">
                      {!isPartner ? (
                        <>
                          <Button
                            block
                            className="bg-black text-white border-none rounded-xl font-bold h-12 transition-all"
                            onClick={(e) => { e.stopPropagation(); setSelectedTour(tour); }}
                          >
                            Забронировать
                          </Button>
                          <Button
                            icon={<MessageOutlined />}
                            className="rounded-xl border-2 border-kg-gold text-kg-gold h-12 w-14 hover:!bg-kg-gold hover:!text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              setAiQuestion(`Подбери похожие туры как "${tour.title}"`);
                            }}
                          />
                        </>
                      ) : (
                        <Popconfirm
                          title="Удалить тур?"
                          description="Это действие нельзя отменить"
                          onConfirm={(e) => {
                            e?.stopPropagation?.();
                            handleDeleteTour(tour.id);
                          }}
                          okText="Удалить"
                          cancelText="Отмена"
                        >
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            loading={deletingTourId === tour.id}
                            className="w-full rounded-xl font-bold h-12"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Удалить тур
                          </Button>
                        </Popconfirm>
                      )}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
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
        footer={null}
        width={800}
        centered
      >
        {selectedTour && (
          <div className="py-4">
            <img src={selectedTour.image_url || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa'} className="w-full h-80 object-cover rounded-3xl mb-6" alt={selectedTour.title} />
            <Title level={2}>{selectedTour.title}</Title>
            <div className="flex gap-4 mb-6">
              <Tag icon={<EnvironmentOutlined />}>{selectedTour.destination || 'Кыргызстан'}</Tag>
              <Tag icon={<ClockCircleOutlined />}>{selectedTour.duration || 'Тур'}</Tag>
            </div>
            <Paragraph className="text-gray-500 text-lg">{selectedTour.description}</Paragraph>
            {!isPartner && (
              <div className="flex gap-4 mt-8">
                <InputNumber min={1} value={buySeats} onChange={(v) => setBuySeats(Number(v) || 1)} className="h-14 rounded-2xl" />
                <Button size="large" block className="bg-kg-red text-white border-none rounded-2xl font-bold h-14" onClick={handlePurchase}>
                  Забронировать
                </Button>
                <Button size="large" icon={<MessageOutlined />} className="rounded-2xl border-2 border-kg-gold text-kg-gold h-14 w-20" onClick={() => setAiQuestion(`Расскажи подробнее про тур "${selectedTour.title}"`)} />
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        open={addModalOpen}
        onCancel={() => setAddModalOpen(false)}
        onOk={() => addTourForm.submit()}
        okText="Создать тур"
        title="Добавить новый тур"
        confirmLoading={creatingTour}
      >
        <Form form={addTourForm} layout="vertical" onFinish={handleAddTour}>
          <Form.Item name="title" label="Название" rules={[{ required: true, message: 'Введите название' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Описание" rules={[{ required: true, message: 'Введите описание' }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="location" label="Локация" rules={[{ required: true, message: 'Введите локацию' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Категория" rules={[{ required: true, message: 'Введите категорию' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="imageUrl" label="URL картинки">
            <Input />
          </Form.Item>
          <Space style={{ width: '100%' }}>
            <Form.Item name="price" label="Цена" rules={[{ required: true, message: 'Введите цену' }]} style={{ flex: 1 }}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="promoPrice" label="Промо-цена" style={{ flex: 1 }}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="slots" label="Мест" rules={[{ required: true, message: 'Введите кол-во мест' }]} style={{ flex: 1 }}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default ToursPage;