import { useState, useEffect } from 'react';
import {
  FormContainer,
  Form,
  Label,
  Input,
  FormRow,
  FormGroup,
  Button,
} from '../../styles/FormStyles';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../../services/SettingApi';
import toast from 'react-hot-toast';

export default function SettingsForm() {
  const { data, isLoading: isLoadingData } = useGetSettingsQuery();
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();

  const [formData, setFormData] = useState({
    minBookingLength: '',
    maxBookingLength: '',
    maxGuestsPerBooking: '',
    breakfastPrice: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        minBookingLength: data.minBookingLength || '',
        maxBookingLength: data.maxBookingLength || '',
        maxGuestsPerBooking: data.maxGuestsPerBooking || '',
        breakfastPrice: data.breakfastPrice || '',
      });
    }
  }, [data]);

  const ChangeHandler = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const SubmitHandler = async e => {
    e.preventDefault();
    try {
      await updateSettings({ documentId: data.documentId, settingsData: { data: formData } });
      toast.success('设置已更新！');
    } catch (error) {
      toast.error('更新失败');
    }
  };

  if (isLoadingData) return <div>加载中...</div>;

  return (
    <FormContainer>
      <Form onSubmit={SubmitHandler}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="minBookingLength">MinBookingLength</Label>
            <Input
              type="number"
              id="minBookingLength"
              name="minBookingLength"
              value={formData.minBookingLength}
              onChange={ChangeHandler}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="maxBookingLength">MaxBookingLength</Label>
            <Input
              type="number"
              id="maxBookingLength"
              name="maxBookingLength"
              value={formData.maxBookingLength}
              onChange={ChangeHandler}
              required
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="maxGuestsPerBooking">MaxGuestsPerBooking</Label>
            <Input
              type="number"
              id="maxGuestsPerBooking"
              name="maxGuestsPerBooking"
              value={formData.maxGuestsPerBooking}
              onChange={ChangeHandler}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="breakfastPrice">BreakfastPrice</Label>
            <Input
              type="number"
              id="breakfastPrice"
              name="breakfastPrice"
              value={formData.breakfastPrice}
              onChange={ChangeHandler}
            />
          </FormGroup>
        </FormRow>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '更新中...' : 'Update Setting'}
        </Button>
      </Form>
    </FormContainer>
  );
}
