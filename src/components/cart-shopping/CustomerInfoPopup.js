import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from '@fortawesome/free-solid-svg-icons';
import { clearCart, toggleBtnCart } from "../../redux/products/products.slice";
import { API_URL } from '../../constant';

export function CustomerInfoPopup({ onClose }) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.product.cart);  // Lấy giỏ hàng từ Redux
    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        address: '',
        deliveryDateTime: '',
        note: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showThankYouPopup, setShowThankYouPopup] = useState(false);

    const handleClose = () => {
        onClose();
    };

    const handleCloseThankYouPopup = () => {
        setShowThankYouPopup(false);
        onClose();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date();
        const selectedDate = new Date(formData.deliveryDateTime);

        if (selectedDate < now) {
            setErrorMessage('Delivery date and time must be in the future.');
            return;
        }

        setErrorMessage('');  // Clear the error message if validation passes

        try {
            // Xóa các thuộc tính không cần thiết khỏi giỏ hàng trước khi gửi
            const simplifiedCart = cart.map(item => {
                const { image, productName, price, productId, ...rest } = item;
                return rest;
            });

            const orderData = {
                username: formData.username,
                phoneNumber: formData.phone,
                address: formData.address,
                deliveryDate: formData.deliveryDateTime,
                note: formData.note,
                cartItems: simplifiedCart  // Gửi thông tin giỏ hàng đã đơn giản hóa
            };
            console.log(orderData)

            // Gửi request lên API (ví dụ sử dụng fetch)
            const response = await fetch(API_URL + '/Order/AddOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Error submitting order');
            }

            // Xử lý kết quả thành công (ví dụ: đóng popup, xoá giỏ hàng)
            dispatch(clearCart());
            setShowThankYouPopup(true);
            dispatch(clearCart(cart));
        } catch (error) {
            console.error('Error submitting order:', error.message);
            setErrorMessage('Failed to submit order. Please try again later.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-[2]">
            <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Customer Information</h2>
                    <button onClick={handleClose}>
                        <FontAwesomeIcon className='text-gray-500 hover:text-gray-600 transition' icon={faX} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">User Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Delivery DateTime</label>
                        <input
                            type="datetime-local"
                            name="deliveryDateTime"
                            value={formData.deliveryDateTime}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Note</label>
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        ></textarea>
                    </div>
                    {errorMessage && <p className="text-red-500 text-sm mt-1 mb-3">{errorMessage}</p>}
                    <div className="flex justify-end">
                        <button type="button" className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition" onClick={handleClose}>Cancel</button>
                        <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition">Submit</button>
                    </div>
                </form>
            </div>

            {showThankYouPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-[3]">
                    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md text-center">
                        <h2 className="text-xl font-semibold mb-4">Thank You!</h2>
                        <p className="mb-4">Thank you for your order. We will contact you soon to confirm your order!</p>
                        <button onClick={handleCloseThankYouPopup} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
