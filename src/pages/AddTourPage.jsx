// 1. Сначала импорты
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd'; // Проверь, установлена ли antd
import { tourService } from '../services/tourService'; // Проверь, есть ли такой файл

const AddTourPage = () => {
  // 2. Логика внутри функции
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
      await tourService.createTour(values);
      message.success('Успех!');
  };

  // 3. Обязательно return с версткой
  return (
    <div className="p-8"> 
       <Form form={form} onFinish={onFinish}>
         {/* Поля формы */}
         <Button htmlType="submit" loading={loading}>Создать</Button>
       </Form>
    </div>
  );
}; // Проверь, закрыта ли эта скобка!

// 4. Обязательно экспорт
export default AddTourPage;