import { useState, useEffect, useRef } from "react";
import {
  useCreateCabinMutation,
  useUpdateCabinMutation,
  useUploadImageMutation,
} from "../../services/cabinApi";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import {
  Form,
  FormRow,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  Button,
  FileInputWrapper,
  FileLabel,
  StyledFileInput,
  FormContainer
} from "../../styles/FormStyles";

function AddCabinForm({ Cancel, editCabin }) {
  const fileInputRef = useRef(null);
  const [createCabin, { isLoading }] = useCreateCabinMutation();
  const [updateCabin] = useUpdateCabinMutation();
  const [uploadImage] = useUploadImageMutation();
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    maxCapacity: "",
    regularPrice: "",
    discount: "",
    description: "",
    image: "",
  });

  // 回填表单
  useEffect(() => {
    if (editCabin) {
      setFormData({
        name: editCabin.name || "",
        maxCapacity: editCabin.maxCapacity || "",
        regularPrice: editCabin.regularPrice || "",
        discount: editCabin.discount || "",
        description: editCabin.description || "",
        image: editCabin.image || "",
      });
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } else {
      //没有点击编辑的话，就是添加模式
      setFormData({
        name: "",
        maxCapacity: "",
        regularPrice: "",
        discount: "",
        description: "",
        image: "",
      });
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    }
  }, [editCabin]);

  const CancelHandler = () => {
    setFormData({
      name: "",
      maxCapacity: "",
      regularPrice: "",
      discount: "",
      description: "",
      image: "",
    });
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
    Cancel();
  };

  const ImageChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const ChangeHandler = (e) => {
    const { name, value } = e.target; //获取输入框的name属性和用户输入的内容
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    // 禁止 name 包含空格
    if (/\s/.test(formData.name)) {
      toast.error("Cabin name 不能包含空格");
      return;
    }

    // 校验 maxCapacity、regularPrice、discount
    if (Number(formData.maxCapacity) <= 0) {
      toast.error("maxCapacity必须为正数");
      return;
    }
    if (Number(formData.regularPrice) <= 0) {
      toast.error("Price必须为正数");
      return;
    }
    if (formData.discount && Number(formData.discount) < 0) {
      toast.error("Discount不能为负数");
      return;
    }
    // discount 不能大于 regularPrice
    if (
      formData.discount &&
      Number(formData.discount) > Number(formData.regularPrice)
    ) {
      toast.error("Discount不能大于 Price");
      return;
    }

    try {
      let cabinData = { ...formData };
      // discount 为空字符串时，删除该字段
      if (cabinData.discount === "" || cabinData.discount === null) {
        delete cabinData.discount;
      }

      if (!selectedImage) {
        delete cabinData.image;
      }
      if (selectedImage) {
        const formDataImage = new FormData();
        formDataImage.append("files", selectedImage);

        const imageRes = await uploadImage(formDataImage).unwrap();
        cabinData.image = imageRes[0].id;
      }

      if (editCabin) {
        await updateCabin({
          documentId: editCabin.documentId,
          cabinData: { data: cabinData },
        });
        toast.success("修改成功！");
      } else {
        // 添加模式
        await createCabin({ data: cabinData });
        toast.success("添加成功！");
      }

      setFormData({
        name: "",
        maxCapacity: "",
        regularPrice: "",
        discount: "",
        description: "",
        image: "",
      });
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
      Cancel();
    } catch (error) {
      toast.error("操作失败：" + error.message || "未知错误");
    }
  };

  return (
    <FormContainer>
      {editCabin ? <h2>Edit cabin</h2> : <h2>Add new cabin</h2>}
      <Form onSubmit={SubmitHandler}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="name">Cabin name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={ChangeHandler}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="maxCapacity">maxCapacity</Label>
            <Input
              type="number"
              id="maxCapacity"
              name="maxCapacity"
              value={formData.maxCapacity}
              max={10} // 限制最大值为 10
              onChange={ChangeHandler}
              required
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="regularPrice">Price</Label>
            <Input
              type="number"
              id="regularPrice"
              name="regularPrice"
              value={formData.regularPrice}
              onChange={ChangeHandler}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="discount">Discount</Label>
            <Input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={ChangeHandler}
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label htmlFor="description">Description (Optional)</Label>
            <TextArea
              id="description"
              name="description"
              value={formData.description}
              onChange={ChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="image">Image (Optional)</Label>
            <FileInputWrapper>
              <FileLabel>
                {selectedImage
                  ? selectedImage.name
                  : editCabin && editCabin.image && editCabin.image.name
                    ? editCabin.image.name
                    : "No image"}
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                >
                  Add Image
                </button>
              </FileLabel>
              <StyledFileInput
                ref={fileInputRef}
                type="file"
                id="image"
                accept="image/*"
                onChange={ImageChangeHandler}
              />
            </FileInputWrapper>
          </FormGroup>
        </FormRow>

        <ButtonGroup>
          <Button type="button" className="cancel" onClick={CancelHandler}>
            Cancel
          </Button>
          <Button type="submit" className="submit" disabled={isLoading}>
            {isLoading
              ? editCabin
                ? "Updating..."
                : "Adding..."
              : editCabin
                ? "Update Cabin"
                : "Add Cabin"}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
}

AddCabinForm.propTypes = {
  Cancel: PropTypes.func.isRequired,
  editCabin: PropTypes.object
};
export default AddCabinForm;
