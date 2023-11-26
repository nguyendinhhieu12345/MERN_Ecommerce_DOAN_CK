import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
  useGetProductsQuery,
  useGetTopProductsByPriceQuery,
} from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PRODUCTS_URL } from '../constants';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [product, setProducts] = useState();
  const [active, setActive] = useState(false);
  
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  useEffect(() => {
    setActive(false);
    return () => {
      setActive(false);
    };
  }, [data]);

  

  const { data: productTopPrice } = useGetTopProductsByPriceQuery('0');

  const handleFilter = async (minPrice, maxPrice, minRating) => {
    try {
      setActive(true);
      const response = await axios.post(
        `${PRODUCTS_URL}/filter?keyword=${keyword}`,
        {
          minPrice,
          maxPrice,
          minRating,
        }
      );
      console.log(response);
      setProducts(response?.data);
      // setActive(false);
      // const data = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4' style={{ color: 'blue' }}>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1 style={{ color: 'black' }}>Latest Products</h1>
          {keyword && (
            <div style={{ display: 'flex' }}>
              <button
                style={{ margin: '3px', padding: '5px', borderRadius: '5px' }}
                onClick={() => handleFilter(0, 100, 0)}
              >
                $0 - $100 - min: 0*
              </button>
              <button
                style={{ margin: '3px', padding: '5px', borderRadius: '5px' }}
                onClick={() => handleFilter(0, 100, 3)}
              >
                $0 - $100 - min: 3*
              </button>
              <button
                style={{ margin: '3px', padding: '5px', borderRadius: '5px' }}
                onClick={() => handleFilter(50, 100, 0)}
              >
                $50 - $100 - min: 0*
              </button>
              <button
                style={{ margin: '3px', padding: '5px', borderRadius: '5px' }}
                onClick={() => handleFilter(50, 100, 3)}
              >
                $50 - $100 - min: 3*
              </button>
            </div>
          )}

          {!active ? (
            <>
              <Row>
                {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
              />
            </>
          ) : (
            <Row>
              {product?.products?.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}

          {/* <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          /> */}

          {!keyword && (
            <>
              <h1 style={{ color: 'black' }}>Top Products By Price</h1>
              <Row>
                {productTopPrice?.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
