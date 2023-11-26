import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light'>
        Go Back
      </Link>
      <Container>
        <Row className='d-flex justify-content-center align-items-center'>
          <Col md={8} lg={6} xs={12}>
            <div className='border border-2 border-primary'></div>
            <Card className='shadow px-4'>
              <Card.Body>
                <div className='mb-3 '>
                  <h1 style={{ color: 'black' }}>Edit Product</h1>
                  {loadingUpdate && <Loader />}
                  {isLoading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant='danger'>{error}</Message>
                  ) : (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='name'>
                        <Form.Label style={{ color: 'black' }}>Name</Form.Label>
                        <Form.Control
                          style={{ color: 'black' }}
                          type='name'
                          placeholder='Enter name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId='price'>
                        <Form.Label style={{ color: 'black' }}>
                          Price
                        </Form.Label>
                        <Form.Control
                          style={{ color: 'black' }}
                          type='number'
                          placeholder='Enter price'
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId='image'>
                        <Form.Label style={{ color: 'black' }}>
                          Image
                        </Form.Label>
                        <Form.Control
                          style={{ color: 'black', marginBottom:'12px' }}
                          type='text'
                          placeholder='Enter image url'
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        <Form.Control
                          style={{ color: 'black' }}
                          label='Choose File'
                          onChange={uploadFileHandler}
                          type='file'
                        ></Form.Control>
                        {loadingUpload && <Loader />}
                      </Form.Group>

                      <Form.Group controlId='brand'>
                        <Form.Label style={{ color: 'black' }}>
                          Brand
                        </Form.Label>
                        <Form.Control
                          style={{ color: 'black' }}
                          type='text'
                          placeholder='Enter brand'
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId='countInStock'>
                        <Form.Label style={{ color: 'black' }}>
                          Count In Stock
                        </Form.Label>
                        <Form.Control
                          style={{ color: 'black' }}
                          type='number'
                          placeholder='Enter countInStock'
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId='category'>
                        <Form.Label style={{ color: 'black' }}>
                          Category
                        </Form.Label>
                        <Form.Control
                          style={{ color: 'black' }}
                          type='text'
                          placeholder='Enter category'
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId='description'>
                        <Form.Label style={{ color: 'black' }}>
                          Description
                        </Form.Label>
                        <Form.Control
                          style={{ color: 'black' }}
                          type='text'
                          placeholder='Enter description'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        type='submit'
                        variant='primary'
                        style={{ marginTop: '1rem' }}
                      >
                        Update
                      </Button>
                    </Form>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductEditScreen;
