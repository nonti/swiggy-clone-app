import Order from "../models/Order";

export class OrderController {

  static async placeOrder(req, res, next) {
    const data = req.body;
    const user_id = req.user.aud;
    const restaurant = req.restaurant;
    try {
      let orderData: any = {
        user_id,
        restaurant_id: data.restaurant_id,
        order: data.order,
        address: data.address,
        status: data.status,
        payment_mode: data.payment_mode,
        payment_status: data.payment_status,
        total: data.total,
        grand_total: data.grand_total,
        delivery_charge: data.delivery_charge,
      }
      if (data.instruction) orderData = { ...orderData, instruction: data.instruction };
      const order = await new Order(orderData).save();
      // delete order.user_id;
      // delete order.__v;
      const response_order = {
        restaurant_id: restaurant,
        order: JSON.parse(order.order),
        address: JSON.parse(order.address),
        instruction: order.instruction || null,
        status: order.status,
        payment_mode: order.payment_mode,
        payment_status: order.payment_status,
        total: order.total,
        grand_total: data.grand_total,
        delivery_charge: data.delivery_charge,
        created_at: order.created_at,
        updated_at: order.updated_at
      };
      res.send(response_order);
    } catch (err) {
      next(err);
    }
  }

  static async getUserOrders(req, res, next) {
    const user_id = req.user.aud;
    try {
      const orders = await Order.find({ user_id }, { user_id: 0, __v: 0 })
        .sort({'created_at': -1})
        .populate('restaurant_id')
        .exec();
      res.send(orders);
    } catch (err) {
      next(err);
    }
  }
}