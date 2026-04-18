import React, { useState } from 'react';
import { Input, Button, Typography, message, Modal } from 'antd';
import { RobotOutlined, SendOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { tourService } from '../services/tourService';

const { Title, Paragraph } = Typography;

const ConsultationBlock = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStartConsultation = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const data = await tourService.sendChatMessage(question.trim(), 1);
      setAnswer(data.answer || 'Нет ответа');
      setOpen(true);
    } catch (error) {
      message.error(error.message || 'Ошибка консультации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-8 bg-kg-red rounded-[3rem] my-12 shadow-2xl relative overflow-hidden border-4 border-kg-gold/30">
      
      {/* Декоративный ИИ-фон (сетка или частицы) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
        
        {/* Текстовая часть */}
        <div className="lg:w-1/2 text-white mb-10 lg:mb-0">
          <div className="inline-flex items-center px-4 py-2 bg-kg-gold text-kg-red rounded-full font-bold mb-6 animate-bounce">
            <ThunderboltOutlined className="mr-2" />
            Менеджер онлайн
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight leading-none">
            Найди свой <br /> 
            <span className="text-kg-gold font-serif italic">идеальный путь</span>
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-md">
            Наш Менеджер знает всё о перевалах, погоде и лучших гидах. Напиши свои пожелания, и он соберет тур специально для тебя.
          </p>
        </div>

        {/* Форма ввода (Имитация чата) */}
        <div className="lg:w-5/12 w-full">
          <div className="bg-white/10 backdrop-blur-xl p-2 rounded-[2.5rem] border border-white/20 shadow-inner">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <RobotOutlined className="text-kg-red" /> Спросить кочевника-ИИ
              </h3>
              <Input.TextArea 
                rows={4} 
                placeholder="Например: Я хочу поехать на Иссык-Куль, но не в Чолпон-Ату, а в тихое место с юртами и конями..." 
                className="rounded-2xl border-gray-100 bg-gray-50 p-4 text-base focus:shadow-md transition-all"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <Button 
                type="primary" 
                size="large" 
                block 
                onClick={handleStartConsultation}
                loading={loading}
                className="h-16 mt-4 rounded-2xl bg-kg-red hover:bg-red-700 border-none font-black text-lg uppercase tracking-widest flex items-center justify-center transition-transform active:scale-95"
              >
                Получить план <SendOutlined className="ml-2" />
              </Button>
            </div>
          </div>
        </div>

      </div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title="Ответ NomadAI"
      >
        <Paragraph>{answer}</Paragraph>
      </Modal>
    </section>
  );
};

export default ConsultationBlock;