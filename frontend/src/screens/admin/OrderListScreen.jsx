import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1 style={{color:'black'}}>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm' style={{color:'black'}}>
          <thead>
            <tr>
              <th style={{color:'black'}}>ID</th>
              <th style={{color:'black'}}>USER</th>
              <th style={{color:'black'}}>DATE</th>
              <th style={{color:'black'}}>TOTAL</th>
              <th style={{color:'black'}}>PAID</th>
              <th style={{color:'black'}}>DELIVERED</th>
              <th style={{color:'black'}}></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={{color:'black'}}>{order._id}</td>
                <td style={{color:'black'}}>{order.user && order.user.name}</td>
                <td style={{color:'black'}}>{order.createdAt.substring(0, 10)}</td>
                <td style={{color:'black'}}>${order.totalPrice}</td>
                <td style={{color:'black'}}>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td style={{color:'black'}}>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td style={{color:'black'}}>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
